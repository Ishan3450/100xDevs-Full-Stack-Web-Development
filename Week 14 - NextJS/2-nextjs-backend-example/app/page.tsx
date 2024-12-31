// this is a server component i didn't use use server as by default components behanves as server components

import axios from "axios";

async function getUserDetails() {
  const res = await axios.get(
    "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
  );
  return res.data;
}

export default async function Home() {
  const userDetails = await getUserDetails(); // this only works in server conponents not client components

  return (
    <div>
      {userDetails.name}
      <br />
      {userDetails.email}
    </div>
  );
}
