import React from "react";
import Avatar from "./Avatar"

function AppBar({ username }) {
  return (
    <div className="flex justify-between py-2 px-5 border-b items-center border-b-gray-200 bg-slate-100">
      <div className="font-medium">Paytm App</div>
      <div className="flex justify-between gap-3 items-center">
        Hello {username}
        <Avatar initialLetter={username.charAt(0).toUpperCase()} />
      </div>
    </div>
  );
}

export default AppBar;
