import React, { useState } from "react";
import Card from "./Card";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";
import FormBottomInfo from "./FormBottomInfo";
import axios from "axios";
import { useNavigate } from "react-router";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-300">
      <Card>
        <Heading label={"Signup to our platform"} />
        <SubHeading content={"Enter your information to create your account"} />

        <InputBox
          type={"text"}
          placeholder={"John"}
          label={"First Name"}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <InputBox
          type={"text"}
          placeholder={"Doe"}
          label={"Last Name"}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <InputBox
          type={"email"}
          placeholder={"johndoe@gmail.com"}
          label={"Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputBox
          type={"password"}
          placeholder={"Length must be more than 6"}
          label={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button label={"Signup"} onSubmit={async () => {
          const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            firstName, lastName, email, password
          });
          
          localStorage.setItem("authToken", response.data.token);
          navigate("/dashboard");
        }} />

        <FormBottomInfo
          content={"Already have an account?"}
          buttonText={"Sign In"}
          buttonLink={"/signin"}
        />
      </Card>
    </div>
  );
}

export default Signup;
