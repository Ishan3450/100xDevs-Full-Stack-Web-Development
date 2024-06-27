import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function updateEmail(email: string, newEmail: string){
    const response = await prisma.user.update({
        where: {
            email
        },
        data: {
            email: newEmail
        }
    });
    console.log(response);
}

async function updateFirstname(email: string, updatedFirstname: string){
    const response = await prisma.user.update({
        where: {
            email
        },
        data: {
            firstName: updatedFirstname
        }
    });
    console.log(response);
}

async function updateLastName(email: string, updatedLastname: string){
    const response = await prisma.user.update({
        where: {
            email
        },
        data: {
            lastName: updatedLastname
        }
    });
    console.log(response);
}

async function changePassowrd(email: string, newPassword: string){
    const response = await prisma.user.update({
        where: {
            email
        },
        data: {
            password: newPassword
        }
    });
    console.log(response);
}

// updateEmail("test@gmail.com", "testupdated@gmail.com");
// updateFirstname("testupdated@gmail.com", "John Updated");
// updateLastName("testupdated@gmail.com", "Doe Updated");
// changePassowrd("testupdated@gmail.com", "Password updated");
