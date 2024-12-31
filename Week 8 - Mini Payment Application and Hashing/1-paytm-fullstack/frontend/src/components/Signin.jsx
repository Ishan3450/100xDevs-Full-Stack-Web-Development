import React, { useState } from "react";
import Card from "./Card";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";
import FormBottomInfo from "./FormBottomInfo";
import axios from "axios";
import { useNavigate } from "react-router";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-300">
      <Card>
        <Heading label={"Signin to our platform"} />
        <SubHeading content={"Enter your crednetials to access your account"} />

        <InputBox
          type={"email"}
          placeholder={"johndoe@gmail.com"}
          label={"Email"}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <InputBox
          type={"password"}
          placeholder={"Length must be more than 6"}
          label={"Password"}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />

        <Button label={"Signin"} onSubmit={async () => {
          const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
            email, password
          });

          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("username", response.data.username);
          navigate("/dashboard");
        }}/>

        <FormBottomInfo content={"Don't have an account?"} buttonText={"Sign Up"} buttonLink={"/signup"}/>
      </Card>
    </div>
  );
}

export default Signin;
