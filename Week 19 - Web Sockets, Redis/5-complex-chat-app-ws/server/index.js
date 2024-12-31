const WebSocket = require("ws");
// const redis = require("redis");

// const redisClient = redis.createClient();
const socketMap = new Map(); // senderId => Socket
const roomMap = new Map(); // roomname => set<Socket>
const previousMessagesMap = new Map(); // roomname => MessageObj {senderId, msg, timestamp}

async function startServer() {
    // await redisClient.connect();

    const wss = new WebSocket.Server({ port: 8080 });

    wss.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("message", async (data) => {
            const { type, senderId, roomName, message } = JSON.parse(data);
            socket.id = senderId;
            socket.room = roomName;
            // console.log("Message: ", type, senderId, roomName, message);

            if (type === 'join') {
                // store this socket of user in the  map
                socketMap.set(senderId, socket);

                // store the user socket in the set
                if (!roomMap.has(roomName)) {
                    roomMap.set(roomName, new Set());
                }

                // adding the user in the room
                roomMap.get(roomName).add(socket);
                const roomMembers = roomMap.get(roomName);

                if (!previousMessagesMap.has(roomName)) {
                    previousMessagesMap.set(roomName, [{
                        senderId,
                        message: `${senderId} has joined the room ${roomName}`,
                        timestamp: Date.now(),
                        type: "joinedRoom",
                    }]);
                } else {
                    previousMessagesMap.set(roomName, [
                        ...previousMessagesMap.get(roomName), {
                            senderId,
                            message: `${senderId} has joined the room ${roomName}`,
                            timestamp: Date.now(),
                            type: "joinedRoom",
                        }
                    ])
                }

                const dataToSend = JSON.stringify({
                    roomName,
                    type: "joinedRoom",
                    roomChatHistory: previousMessagesMap.get(roomName)
                })

                roomMembers.forEach(socket => (
                    socket.send(dataToSend)
                ))

                console.log(`${senderId} joined ${roomName}`);
            }

            if (type === 'message') {
                // create message object
                const messageObject = {
                    type: "message",
                    senderId, message, timestamp: Date.now()
                }

                if (!previousMessagesMap.has(roomName)) {
                    previousMessagesMap.set(roomName, [messageObject]);
                } else {
                    previousMessagesMap.get(roomName).push(messageObject);
                }

                // previousMessagesMap.get(roomName).forEach(messageObj => console.log(JSON.stringify(messageObj)));

                roomMap.get(roomName).forEach(roomMember => {
                    roomMember.send(JSON.stringify(messageObject));
                })
            }
        });

        socket.on("close", () => {
            if (socket.room) {
                const room = roomMap.get(socket.room);

                const data = {
                    type: "leftRoom",
                    message: `${socket.id} is disconnected`,
                    timestamp: Date.now(),
                    senderId: socket.id
                };
                previousMessagesMap.get(socket.room).push(data);

                room.forEach(roomUser => roomUser.send(JSON.stringify(data)));
                roomMap.get(socket.room).delete(socket);
            }

            if (socket.id) {
                socketMap.delete(socket.id);
            }

            console.log("Client disconnected");
        })
    })
}

startServer();