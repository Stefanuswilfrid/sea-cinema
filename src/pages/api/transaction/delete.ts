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
    const movie = await prisma.movie.findUnique({
      where: {
        id: transaction.movieId, // Replace 'movieId' with the actual field name that represents the movie ID in the transaction
      },
    });

    if (movie) {
      const updatedSeats = movie.seats.map((seatValue: boolean, index: number) => {
        if (transaction.seats.includes(index)) {
          return false; // Set the seat to 'false' to make it available again
        } else {
          return seatValue;
        }
      });

      await prisma.movie.update({
        where: {
          id: movie.id,
        },
        data: {
          seats: updatedSeats,
        },
      });
    }

    return response.status(200).json({ message: "Transaction deleted successfully", transaction });
  } catch (error: any) {
    return response.status(500).json({ error: "Failed to delete transaction" });
  }
}
