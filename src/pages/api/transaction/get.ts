import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        movie: true,
      },
    });

    // Map the transactions and extract the movie name
    // const transactionsWithMovieName = transactions.map((transaction) => ({
    //   id: transaction.id,
    //   movieName: transaction.movie.title,
    //   seats: transaction.seats,
    //   totalCost: transaction.totalCost,
    //   createdAt: transaction.createdAt,
    //   updatedAt: transaction.updatedAt,
    //   quantity: transaction.quantity,
    // }));
    console.log("trans",transactions)

    return response.status(200).json(transactions);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch transactions" });
  }
}
