import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function getTodosOfUser(id: number){
    const res = await prisma.todo.findMany({
        where: {
            userId: id
        }, select: {
            user: true,
            id: true,
            title: true,
            description: true,
        }
    });
    console.log(res);
}

getTodosOfUser(1);