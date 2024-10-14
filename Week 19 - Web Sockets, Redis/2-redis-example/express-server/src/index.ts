import express from "express";
import { createClient } from "redis";

const redisClient = createClient();
const app = express();

app.use(express.json());

app.post("/submitSolution", async (req, res) => {
    try {
        const { problemId, code, language, userId } = req.body;
        await redisClient.lPush("submissions", JSON.stringify({ userId, problemId, code, language }));
        res.status(200).json({ message: "Submited." });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Something went wrong while submitting your solution"
        });
    }
})

async function startServer() {
    try {
        await redisClient.connect();
        console.log("Redis connected");

        app.listen(3000, () => {
            console.log("Server started");
        })

    } catch (error) {
        console.log("Failed to connect to redis");
        console.log(error);
    }
}
startServer();