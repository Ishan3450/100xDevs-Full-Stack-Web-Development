import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function insertTodo(userId: number, title: string, description: string){
    const response = await prisma.todo.create({
        data: {
            userId, title, description, isCompleted: false
        }
    });

    console.log(response);
}

// insertTodo(1, "Test todo 2", "Description of test todo 2");
// insertTodo(1, "Test todo 3", "Description of test todo 3");
// insertTodo(1, "Test todo 4", "Description of test todo 4");
// insertTodo(1, "Test todo 5", "Description of test todo 5");