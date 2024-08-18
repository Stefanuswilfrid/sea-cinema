import { requestHandler } from "@/libs/utils/request-handler";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, {
    allowedRoles: {
      POST: ["USER", "PUBLIC"],
    },
    POST: async (session) => {
      const { messageId } = req.query; // Example parameter
      // Find existing conversation
      const conversation = await prisma.conversation.findUnique({
        where: {
          id: messageId?.toString(),
        },
        include: {
          messages: {
            include: {
              seen: true,
            },
          },
          users: true,
        },
      });
      if (!conversation) {
        return res.status(400).json({ msg: "Invalid ID" });
      }

      // Find last message
      const lastMessage =
        conversation.messages[conversation.messages.length - 1];

      if (!lastMessage) {
        return res.status(200).json(conversation);
      }

      // Update seen of last message
      const updatedMessage = await prisma.message.update({
        where: {
          id: lastMessage.id,
        },
        include: {
          sender: true,
          seen: true,
        },
        data: {
          seen: {
            connect: {
              id: session.id,
            },
          },
        },
      });

      // Update all connections with new seen
      await pusherServer.trigger(session.username, "conversation:update", {
        id: messageId,
        messages: [updatedMessage],
      });

      // If user has already seen the message, no need to go further
      if (lastMessage.seenIds.indexOf(session.id) !== -1) {
        return res.status(200).json(conversation);
      }

      // Update last message seen
      await pusherServer.trigger(messageId!, "message:update", updatedMessage);

      return res.status(200).json("Success");
    },
  });
}
