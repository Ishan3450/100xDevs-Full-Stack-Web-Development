"use client"
import { signIn } from "next-auth/react";

export default function () {
  return (
    <div>
      <button onClick={() => {
        signIn("google")
      }}>Login with google</button>
<br />
      <button
        onClick={() => {
            signIn("github")
        }}
      >Login with github</button>
<br />
      <button
        onClick={() => {
            signIn("credentials", {
                username: "",
                password: "",
                redirect: false
            })
        }}
      >Login with credentials</button>
    </div>
  );
}
