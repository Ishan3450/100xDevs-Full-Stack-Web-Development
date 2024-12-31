// import { NextRequest, NextResponse } from "next/server";
// export function GET(req: NextRequest, { params }: { params: { authRoutes: [] } }) { // destructured the second arg of GET function
//     return NextResponse.json({
//         message: params
//     });
// }

import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(NEXT_AUTH_CONFIG);

export const GET = handler;
export const POST = handler;