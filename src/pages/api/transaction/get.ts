import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy:{
        createdAt: "desc",
      },
      include: {
        movie: true,
      },
    });

    return response.status(200).json(transactions);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch transactions" });
  }
}
