import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const response = await prisma.user.create({
        data: {
            name: "Test",
            email: "test@test.com",
            age: 20
        }
    })
    console.log(response)
}

main()
    .catch(e => console.log(e))
    .finally(async () => {
        await prisma.$disconnect();
    })