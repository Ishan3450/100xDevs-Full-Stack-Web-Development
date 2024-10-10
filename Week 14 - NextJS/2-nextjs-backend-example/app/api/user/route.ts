import { NextRequest, NextResponse } from "next/server";
import client from "@/db" // singleton class client import

export function GET() {
    return NextResponse.json({
        name: "user",
        email: "user@gmail.com"
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { username, password } = body;

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