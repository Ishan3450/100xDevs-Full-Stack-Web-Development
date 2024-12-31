import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function getUser(email: string){
    const user = await prisma.user.findFirst({
        where: {email}        
    });
    console.log(user);
}

getUser("johndoe@gmail.com");
getUser("testupdated@gmail.com");
