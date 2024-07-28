import { PrismaClient } from "@repo/db-prisma-orm/client";

const client = new PrismaClient();

export default function Home() {
  return <div className="bg-blue-500 text-xl">Hey there</div>;
}
