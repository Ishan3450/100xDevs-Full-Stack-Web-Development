const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

// middleware in socket.io
io.use((socket, next) => {
    // creat the user if not or do something 
    next();
})

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // emit sends the event to all the sockets inculding the current one which triggered the event
    socket.emit("customEventName", "Welcome to the server")

    // broadcast works same as emit just the difference is it does not send the event to the curr socket
    socket.broadcast.emit("joined", `${socket.id} joined the area`)

    socket.on("message", (data) => {
        console.log(data);
    })

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    })
})

app.use(cors({
    origin: "http://localhost:5173"
}));

server.listen(3000, () => console.log("Server started"));