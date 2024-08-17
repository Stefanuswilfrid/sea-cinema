// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "./getCurrentUser";
import { useUser } from "@/hooks/useUser";
import prisma from "../libs/prismadb"

const getConversations = async () => {
    const { user : currentUser} = useUser()

//   const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          }
        },
      }
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
