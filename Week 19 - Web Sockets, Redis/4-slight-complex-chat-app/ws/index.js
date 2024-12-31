const WebSocket = require("ws");
const redis = require("redis");

const redisClient = redis.createClient();
redisClient.connect();

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", async (data) => {
        // userId is sender id
        const { type, room, userId, message } = JSON.parse(data);

        console.log(`Called with ${type} ${room} ${userId} ${message}`);

        if (type === 'join') {
            console.log(`JOIN called with ${room} ${userId}`);
            // * below will store socketId and room as separate fields not in single object
            await redisClient.hSet(`user:${userId}`, {
                socketId: socket._socket.remoteAddress,
                room
            })

            await redisClient.sAdd(`room:${room}`, userId);

            console.log(`User ${userId} has joined room ${room}`);
        }

        if (type === 'message') {
            const messageObject = {
                // userId is the id of the user who sent the message
                userId, message, timestamp: Date.now()
            }

            // * storing all the room messages in the redis queue
            await redisClient.rPush(`room:${room}:message`, JSON.stringify(messageObject));

            const roomUsers = await redisClient.sMembers(`room:${room}`);
            roomUsers.forEach(async roomUserId => {
                const roomUserInfo = await redisClient.hGetAll(`user:${roomUserId}`); // will get socketid and room
                wss.clients.forEach(client => {
                    if (client._socket.remoteAddress === roomUserInfo.socketId && client.readyState === WebSocket.OPEN) {
                        // * sending the message sent by userId to the receiverSocket
                        client.send(JSON.stringify({ type: 'message', ...messageObject }));
                        return;
                    }
                });
            })
        }

        if (type === 'getHistory') {
            const messages = await redisClient.lRange(`room:${room}:message`, 0, -1); // getting all the messages from the queue -1 is the last element of the queue (redis docs)
            const parsedMessages = messages.map(msg => JSON.parse(msg));

            socket.send(JSON.stringify({ type: 'history', messages: parsedMessages }));
        }
    });

    socket.on("close", async () => {
        const senderId = await findSenderBySocket(socket._socket.remoteAddress);

        if (senderId) {
            const senderData = await redisClient.hGetAll(`user:${senderId}`);

            // remove the user from room
            await redisClient.sRem(`room:${senderData.room}`, senderId);

            // remove user data from the hash map
            await redisClient.del(`user:${senderId}`);

            console.log(`Sender ${senderId} disconnected from room ${senderData.room}`);
        }
    });

});

async function findSenderBySocket(socketId) {
    const keys = await redisClient.keys('user:*') // getting the keys from the hash map

    for (let key of keys) {
        const userData = await redisClient.hGetAll(key);
        if (socketId === userData.socketId) {
            return key.split(":")[1];
        }
    }
    return null;
}

console.log('WebSocket server is running on ws://localhost:8080');