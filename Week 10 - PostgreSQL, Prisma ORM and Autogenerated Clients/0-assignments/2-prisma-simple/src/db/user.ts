import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    return await prisma.user.create({
        data: {
            username, password, name
        }
    })
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 *   id: number
 * }
 */
export async function getUser(userId: number) {
    return await prisma.user.findFirst({
        where: {
            id: userId
        },
    })
}
