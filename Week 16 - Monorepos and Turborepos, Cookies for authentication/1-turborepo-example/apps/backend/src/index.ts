import { NAME } from '@repo/common/config';
import express from "express";

const server = express();

server.get("/", (req,res) => {
    res.json({
        "message": NAME
    });
})

server.listen(3000, () => { console.log("Server started"); })