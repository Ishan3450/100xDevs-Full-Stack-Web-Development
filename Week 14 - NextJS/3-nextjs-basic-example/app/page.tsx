import prisma from "@/prismaSingleton";

type User = {
  id: String;
  email: String;
  password: String;
};

async function getUsers() {
  try {
    const response = await prisma.user.findMany();
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const users = await getUsers();
  return (
    <div>
      {users.map((user: User, index: number) => (
        <div key={index}>
          {index} : {user.email}, {user.password}
        </div>
      ))}
    </div>
  );
}
