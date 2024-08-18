import { requestHandler } from "@/libs/utils/request-handler";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";

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
      POST: async (session) => {},
      GET: async (session) => {
        const { id } = req.query;

        const messages = await prisma.message.findMany({
          where: {
            conversationId: id?.toString(),
          },
          include: {
            sender: true,
            seen: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return res.status(200).json(messages)
      },
    });
  } catch (error) {
    return res.status(500).json(error)
  }
}
