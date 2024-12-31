import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import Balance from "./Balance";
import Users from "./Users";
import useAsyncEffect from "use-async-effect";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState(0);

  useAsyncEffect(async () => {
    const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
      headers: {
        Authorization: localStorage.getItem("authToken")
      }
    });
    setBalance(response.data.balance);
  }, []);

  return (
    <>
      <AppBar username={localStorage.getItem("username")} />
      <div className="w-[95%] m-auto">
        <Balance balance={balance} />
        <Users />
      </div>
    </>
  );
}

export default Dashboard;
