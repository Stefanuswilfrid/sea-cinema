import { requestHandler } from "@/libs/utils/request-handler";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await requestHandler(req, res, {
      allowedRoles: {
        POST: ["USER", "PUBLIC"],
        GET: ["USER", "PUBLIC"],
      },
      POST: async (session) => {
        try {
          console.log("kepanggil gak")
          const { message, conversationId, image } = req.body;
          console.log("reqquery", req.body);
          console.log("img",image)

          const newMessage = await prisma.message.create({
            include: {
              seen: true,
              sender: true,
            },
            data: {
              body: message,
              image: image,
              conversation: {
                connect: { id: conversationId },
              },
              sender: {
                connect: { id: session.id },
              },
              seen: {
                connect: {
                  id: session.id,
                },
              },
            },
          });

          const updatedConversation = await prisma.conversation.update({
            where: {
              id: conversationId,
            },
            data: {
              lastMessageAt: new Date(),
              messages: {
                connect: {
                  id: newMessage.id,
                },
              },
            },
            include: {
              users: true,
              messages: {
                include: {
                  seen: true,
                },
              },
            },
          });

          //add new msg in real time
          await pusherServer.trigger(
            conversationId,
            "messages:new",
            newMessage
          );

          const lastMessage =
            updatedConversation.messages[
              updatedConversation.messages.length - 1
            ];

          // update the convo for every single one of them
          updatedConversation.users.map((user) => {
            pusherServer.trigger(user.username!, "conversation:update", {
              id: conversationId,
              messages: [lastMessage],
            });
          });

          return res.status(200).json(newMessage)
        } catch (error) {
          return res.status(500).json(error);
        }
      },
      GET: async (session) => {
        
        const { messageId } = req.query;
        console.log("iddd",req.query)

        const messages = await prisma.message.findMany({
          where: {
            conversationId: messageId?.toString(),
          },
          include: {
            sender: true,
            seen: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return res.status(200).json(messages);
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
