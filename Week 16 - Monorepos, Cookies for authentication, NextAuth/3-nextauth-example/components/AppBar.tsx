"use client"

import { useRouter } from "next/navigation";
import {signIn, signOut, useSession} from "next-auth/react";

export const AppBar = () => {
    // const router = useRouter();
    const session = useSession();
    return <div>
        <button className="bg-blue-600 m-3 px-5 py-1 rounded hover:bg-blue-700 duration-300" onClick={() => {
            // router.push("/api/auth/signin");
            signIn();
        }}>Login</button>

        <button className="bg-red-600 m-3 px-5 py-1 rounded hover:bg-red-700 duration-300" onClick={() => {
            signOut();
        }}>Logout</button>

        {JSON.stringify(session)}
    </div>
}