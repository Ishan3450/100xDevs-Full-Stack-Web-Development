import React from "react";

function Button({ label, onSubmit }) {
  return <button className=" bg-blue-700 hover:bg-blue-800 duration-200 text-white p-2 rounded-md mt-3" onClick={onSubmit}>{label}</button>;
}

export default Button;
