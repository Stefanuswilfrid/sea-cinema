import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import { NextApiResponse } from "next";

export default async function POST(request: Request, response: NextApiResponse) {
  const body = await request.body;
  const { cartItems, totalPrice, username } = body as any;

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    const transactionPromises = cartItems.map(async (cartItem: any) => {
      const movie = await prisma.movie.findUnique({
        where: { title: cartItem.movieName },
      });

      if (movie) {
        const transaction = await prisma.transaction.create({
          data: {
            user: { connect: { id: existingUser.id } },
            movie: { connect: { id: movie.id } },
            seats: cartItem.seats,
            totalCost: cartItem.price * cartItem.quantity,
          },
        });

        return transaction;
      } else {
        // Handle case when movie is not found
        throw new Error(`Movie not found: ${cartItem.movieName}`);
      }
    });

    try {
      const transactions = await Promise.all(transactionPromises);

      // Return success response or perform any other actions
      return response.status(200).json({ message: "Transactions created successfully", transactions });
    } catch (error) {
      // Handle error if any of the movies are not found
      return response.status(404).json({ error: "internal server error" });
    }
  }

  return response.status(400).json({ error: "Username already exists!" });
}
