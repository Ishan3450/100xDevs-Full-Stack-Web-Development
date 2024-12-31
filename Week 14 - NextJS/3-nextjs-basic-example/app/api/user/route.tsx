import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismaSingleton";

export async function GET() {
  const response = await prisma.user.findMany();
  return NextResponse.json(response);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const response = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
    });
  }
}
