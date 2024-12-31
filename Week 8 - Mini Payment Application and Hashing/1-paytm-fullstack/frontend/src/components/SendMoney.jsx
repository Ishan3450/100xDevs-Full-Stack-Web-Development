import React, { useState } from "react";
import Card from "./Card";
import Heading from "./Heading";
import Avatar from "./Avatar";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function SendMoney() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("id");
  const username = searchParams.get("username");

  const [amount, setAmount] = useState();

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center">
      <Card>
        <Heading label={"Send Money"} />
        <SubHeading content={"Transfer will be done securely"} />

        <div className="flex items-center gap-3 mt-4">
          <Avatar initialLetter={username.charAt(0).toUpperCase()} />
          <div className="font-medium text-xl">{username}</div>
        </div>

        <InputBox
          type={"text"}
          placeholder={"Enter amount"}
          label={"Amount (in Rs)"}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          onSubmit={async () => {
            await axios.post(
              "http://localhost:3000/api/v1/account/transfer",
              {
                to: userId,
                amount: parseInt(amount),
              },
              {
                headers: {
                  Authorization: localStorage.getItem("authToken"),
                },
              }
            );
            navigate("/dashboard");
          }}
          label={"Initiate Transfer"}
        />
      </Card>
    </div>
  );
}

export default SendMoney;
