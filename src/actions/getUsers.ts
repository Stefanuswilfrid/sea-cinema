import getSession from "./getSession";
import prisma from "../libs/prismadb";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.username) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc'
      },
      where: {
        NOT: {
          username: session.user.username
        }
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
