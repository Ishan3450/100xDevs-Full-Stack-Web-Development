"use client"

import { Button } from "./button";

export const AppBar = ({ user, onSignin, onSignout }: any) => {
  return (
    <div className="flex justify-between border-b px-8 py-2">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
