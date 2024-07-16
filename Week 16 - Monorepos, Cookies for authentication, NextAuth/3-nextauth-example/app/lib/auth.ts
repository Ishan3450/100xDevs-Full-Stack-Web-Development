import CredentialsProvider from "next-auth/providers/credentials";
export const NEXT_AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: {label: "email", type: "text", placeholder: "Email"},
                password: {label: "password", type: "text", placeholder: "Password"}
            },
            async authorize(credentials: any){
                const username = credentials.username;
                const password = credentials.password;

                // logic here

                return {
                    id: "user1",
                    name: "test name",
                    email: "test email"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({token, user}: any) => {
            // console.log(token);
            // token.userId = token.sub; // sub is available as id in the token object
            // console.log(user);
            return token;
        },
        session: ({session, token, user}: any) => {
            if(session && session.user){
                session.user.id = token.sub;
            }
            console.log(session);
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    }
}