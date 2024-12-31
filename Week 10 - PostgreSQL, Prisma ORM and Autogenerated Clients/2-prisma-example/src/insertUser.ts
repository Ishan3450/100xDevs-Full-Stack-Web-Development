import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function insertUser(email: string, firstName: string, lastName: string, password: string){
    const response = await prisma.user.create({
        data: {
            email, 
            firstName,
            lastName,
            password
        }
    });

    console.log(response);
}

insertUser("johndoe@gmail.com", "John", "Doe", "JohnDoe");