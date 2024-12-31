const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message, isBinary) => {
        const msg = isBinary ? message : message.toString();
        console.log(`Received ${msg}`);

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
            // else {
            //     console.log(`Client ${JSON.stringify(client)}`);
            // }
        })
    })

    ws.on("close", () => {
        console.log("Client Disconnected");
    })
})