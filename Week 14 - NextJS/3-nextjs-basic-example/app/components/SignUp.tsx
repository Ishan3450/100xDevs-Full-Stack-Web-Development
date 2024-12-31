"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <div className="bg-white h-screen flex justify-center items-center gap-2">
      <div className="border px-2 py-5 flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter email"
          className=" border rounded p-1 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          className=" border rounded p-1 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="border text-black border-black p-1 rounded"
          onClick={async () => {
            const res = await axios.post("http://localhost:3000/api/user", {
              email,
              password,
            });

            if(res.data.success){
              router.push("/");
            }
          }}
        >
          Signin
        </button>
      </div>
    </div>
  );
}
