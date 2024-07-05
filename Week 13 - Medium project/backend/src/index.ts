import cors from 'cors';
import express from "express";
import rootRouter from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(3000, () => {
    console.log("Server is listening"); 
})