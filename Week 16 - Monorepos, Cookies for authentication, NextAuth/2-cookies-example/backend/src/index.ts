import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173" // here we can also put list of domains
}));

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // do db validations, fetch id of user from db
    const token = jwt.sign({
        id: 1
    }, "JWT_SECRET");
    res.cookie("token", token); // setting up token as cookie value in response headers
    res.send("Logged in!");
});

app.get("/user", (req, res) => {
    const token = req.cookies.token; // here we can directly use .token because we are using cookie-parser
    console.log(token);
    // console.log(req.cookies.notfoundtoken); // if cookie not exists it will print undefined
    const decoded = jwt.verify(token, "JWT_SECRET") as JwtPayload;
    // Get email of the user from the database
    res.send({
        userId: decoded.id
    })
});

app.post("/logout", (req, res) => {
    res.cookie("token", "ads");
    res.json({
        message: "Logged out!"
    })
});

app.listen(3000);