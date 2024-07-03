import jwt, { decode, JwtHeader } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const secretPassword: string = process.env.JWT_SECRET_KEY!;

interface CustomRequest extends Request {
    userId?: string; // Add a userId property to the Request interface
}

interface JwtPayload{
    id: string,
    email: string
}

async function userAuth(req: CustomRequest, res: Response, next: NextFunction){
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

        const decoded = jwt.verify(mainToken, secretPassword) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(411).json({
            "error": "Token verification failed"
        });
    }
}

export default userAuth;