import React from "react";

function Card({ children }) {
  return (
    <div className="grid gap-3 px-7 py-8 border w-[25%] bg-white shadow-lg rounded-md">
      {children}
    </div>
  );
}

export default Card;
