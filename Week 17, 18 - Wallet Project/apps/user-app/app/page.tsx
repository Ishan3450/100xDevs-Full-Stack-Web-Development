"use client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AUTH_OPTIONS } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(AUTH_OPTIONS);
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}
