import React, { useState } from "react";
import InputBox from "./InputBox";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useAsyncEffect(async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
      headers: {
        authorization: localStorage.getItem("authToken"),
      }
    });
    setUsers(response.data.users);
  }, [filter]);

  return (
    <div className="mt-4">
      <InputBox
        type={"text"}
        label={"Search user"}
        placeholder={"Enter username to search"}
        onChange={e => setFilter(e.target.value)}
      />

      <div className="mt-3">
        {users.map((user) => {
          return <User key={user._id} userId={user._id} username={user.firstName + " " + user.lastName} />;
        })}
      </div>
    </div>
  );
}

function User({ userId, username }) {
  return (
    <div className="my-3 flex justify-between items-center text-lg">
      <div className="flex items-center gap-2">
        <Avatar initialLetter={username.charAt(0).toUpperCase()} />
        <div>{username}</div>
      </div>

      <Link
        to={`/send?id=${userId}&username=${username}`}
        className="h-fit bg-blue-700 hover:bg-blue-800 duration-200 text-white py-1 px-2 text-sm rounded-md"
      >
        Send Money
      </Link>
    </div>
  );
}

export default Users;
