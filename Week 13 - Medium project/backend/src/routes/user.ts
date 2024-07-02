import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import * as env from "dotenv";

env.config();

const userRouter = Router();
const prisma = new PrismaClient();
const jwtSecretKey = process.env.JWT_SECRET_KEY!;

const userZodObject = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

userRouter.post("/signup", async (req, res) => {
    const email: string = req.body.email;
    const name: string = req.body.name;
    const password: string = req.body.password;

    const zodValidationResponse = userZodObject.safeParse({
        email, name, password
    });

    if(!zodValidationResponse.success){
        res.status(411).json({
            "error": "Wrong inputs provided"
        });
    }

    try {
        const dbResponse = await prisma.user.create({
            data: {
                name, email, password
            }
        });

        const jwtSignedToken = jwt.sign({
            id: dbResponse.id,
            email: dbResponse.email
        }, jwtSecretKey, {expiresIn: "1h"});

        res.status(200).json({
            "message": "Successfully signed up",
            "token": `bearer ${jwtSignedToken}`
        });
    } catch (error) {
        res.status(411).json({
            "error": "Something went wrong while signing up"
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const zodValidationResponse = userZodObject.safeParse({
        email, password
    });

    if(!zodValidationResponse.success){
        res.status(411).json({
            "error": "Wrong inputs provided"
        })
    }

    try {
        const dbResponse = await prisma.user.findFirst({
            where: {
                email, password
            }
        });

        if(!dbResponse){
            res.status(411).json({
                "error": "Invalid username or password"
            })    
        }

        const jwtToken = jwt.sign( {
            id: dbResponse?.id,
            email: dbResponse?.email
        }, jwtSecretKey, {expiresIn: "1h"});

        res.status(200).json({
            message: "Successfully signed in",
            token: `bearer ${jwtToken}`
        });
    } catch (error) {
        res.status(411).json({
            "error": "Error while signing in"
        })
    }
});

export default userRouter;