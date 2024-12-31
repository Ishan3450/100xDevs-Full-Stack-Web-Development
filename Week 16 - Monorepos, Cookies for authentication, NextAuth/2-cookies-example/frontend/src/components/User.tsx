import axios from "axios";
import { useEffect, useState } from "react";

interface UserType {
  userId: number;
}

export const User = () => {
  const [userData, setUserData] = useState<UserType>({ userId: -1 });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  return (
    <div>
      You're id is {userData?.userId}
      <br />
      <br />
      <button
        onClick={() => {
          axios.post(
            `http://localhost:3000/logout`,
            {},
            {
              withCredentials: true,
            }
          );
        }}
      >
        Logout
      </button>
    </div>
  );
};
