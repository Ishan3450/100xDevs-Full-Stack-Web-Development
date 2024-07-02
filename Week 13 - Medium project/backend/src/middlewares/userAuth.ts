import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const secretPassword: string = process.env.JWT_SECRET_KEY!;

async function userAuth(req: Request, res: Response, next: NextFunction){
    const authToken = req.header('authorization');

    if(!authToken){
        res.status(404).json({
            "error": "No token found"
        })
        return;
    }
    
    try {
        const splitted: string[] = authToken!.split(' ');
        const mainToken = splitted[1];

        jwt.verify(mainToken, secretPassword);
        next();
    } catch (error) {
        res.status(411).json({
            "error": "Token verification failed"
        });
    }
}

export default userAuth;