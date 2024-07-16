import { AppBar } from "@/components/AppBar";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return (
   <div>
    <AppBar />
    {JSON.stringify(session)}
   </div>
  );
}
