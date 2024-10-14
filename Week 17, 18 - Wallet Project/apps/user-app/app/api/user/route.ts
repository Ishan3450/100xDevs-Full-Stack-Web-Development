import { getServerSession } from "next-auth"
import { AUTH_OPTIONS } from "../../lib/auth"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await getServerSession(AUTH_OPTIONS);

        if (session.user) {
            return NextResponse.json({
                user: session.user
            })
        }
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({
        message: "Not logged in"
    }, {
        status: 403
    })
}