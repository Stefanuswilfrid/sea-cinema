import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../libs/prismadb";

export default async function DELETE(request: NextApiRequest, response: NextApiResponse) {
    const body = await request.body;

    const { transactionId } = body;

  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id: transactionId as string,
      },
    });

    return response.status(200).json({ message: "Transaction deleted successfully", transaction });
  } catch (error: any) {
    return response.status(500).json({ error: "Failed to delete transaction" });
  }
}
