import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const AUTH_OPTIONS = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone", type: "text", placeholder: "+XX12345670" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                const isUserExists = await prisma.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (isUserExists) {
                    const passwordValidation = await bcrypt.compare(credentials.password, isUserExists.password);
                    if (passwordValidation) {
                        return {
                            id: isUserExists.id.toString(),
                            name: isUserExists.name,
                            email: isUserExists.email,
                        }
                    }
                    return null;
                }

                try {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const newUser = await prisma.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    })
                    return {
                        id: newUser.id.toString(),
                    }
                } catch (error) {
                    console.log(error);
                }
                return null;
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "",
    callbacks: {
        async session({ token, session }: any) {
            if (session.user) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
}

