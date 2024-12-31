import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); // use navigate hook must always be used in the component wrapped around <BrowserRouter></BrowserRouter> here I've wrapped the main.jsx with BrowserRouter
  return (
    <>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
    </>
  );
}

export default Header;
