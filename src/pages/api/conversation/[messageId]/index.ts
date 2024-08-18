import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../libs/prismadb";
import { requestHandler } from "@/libs/utils/request-handler";

interface IParams {
    Id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    
    const { messageId } = req.query; // Example parameter
    await requestHandler(req, res, {
      allowedRoles: {
        GET: ["USER", "PUBLIC"],
      },
      GET: async (session) => {
        const conversation = await prisma.conversation.findUnique({
          where: {
            id: messageId?.toString(),
          },
          include: {
            users: true,
          },
        });

        res.status(200).json(conversation);
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
