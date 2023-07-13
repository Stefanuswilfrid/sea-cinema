import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../libs/prismadb";


interface IParams {
  transactionId?: string;
}

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const { transactionId } = request.query as IParams;

    if (!transactionId) {
      return response.status(400).json({ error: "Missing transaction ID" });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      return response.status(404).json({ error: "Transaction not found" });
    }

    return response.json({ transaction});
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}
