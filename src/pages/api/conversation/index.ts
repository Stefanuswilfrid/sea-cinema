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
      },
      POST: async (session) => {

        const { userId } = req.body;

        const currentUserId = session.id;

        if (!session.id || !session.username) {
          return res.status(400).json({ message: "Unauthorize" });
        }

        const existingConversations = await prisma.conversation.findMany({
          where: {
            OR: [
              {
                userIds: {
                  equals: [currentUserId, userId],
                },
              },
              {
                userIds: {
                  equals: [userId, currentUserId],
                },
              },
            ],
          },
        });

        console.log("excov",existingConversations)
        const singleConversation = existingConversations[0];
        if (singleConversation) {
          return res.status(200).json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
          data: {
            users: {
              connect: [
                {
                  id: currentUserId,
                },
                {
                  id: userId,
                },
              ],
            },
          },
          include: {
            users: true,
          },
        });

        // Update all connections with new conversation
        newConversation.users.map((user) => {
          if (user.username) {
            pusherServer.trigger(
              user.username,
              "conversation:new",
              newConversation
            );
          }
        });

        return res.status(200).json({ newConversation: null });
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
