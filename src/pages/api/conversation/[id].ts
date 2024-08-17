import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";
import { requestHandler } from "@/libs/utils/request-handler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("nyampe")
    const { id } = req.query; // Example parameter
    await requestHandler(req, res, {
        allowedRoles: {
            GET: ['USER',"PUBLIC"],
          },
      GET: async (session) => {
        const conversation = await prisma.conversation.findUnique({
          where: {
            id: id?.toString(),
          },
          include: {
            users: true,
          },
        });
        console.log("conv",conversation)

        res.status(200).json(conversation);
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
