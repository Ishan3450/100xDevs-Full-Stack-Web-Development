"use server"

import client from "@/db";
import { NextResponse } from "next/server";

async function signup(username: string, password: string){
    const user = await client.user.create({
        data: {
            username, password
        }
    });

    return NextResponse.json({
        message: "Login successful",
        userId: user.id
    });
}