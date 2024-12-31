import GoogleProvider from "next-auth/providers/google";
import prisma from "@repo/db/client";

export const AUTH_OPTIONS = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn({ user, account }: any) {
            if (!user || !user.email) {
                return false;
            }

            await prisma.merchant.upsert({
                select: {
                    id: true
                },
                where: {
                    email: user.email
                },
                create: {
                    email: user.email,
                    name: user.name,
                    auth_type: account.provider === 'google' ? "Google" : "Github"
                },
                update: {
                    name: user.name,
                    auth_type: account.provider === 'google' ? "Google" : "Github"
                }
            });
            return true;
        }
    }

}