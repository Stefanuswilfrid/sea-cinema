import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import { NextApiResponse,NextApiRequest } from "next";


export default async function POST(request: Request, response: NextApiResponse) {
  const body = await request.body;
  const { cartItems, totalPrice, username } = body as any;

  const existingUser = await prisma.user.findFirst({
    where: { username },
  });


  if (existingUser) {
    const transactionPromises = cartItems.map(async (cartItem: any) => {
      const movie = await prisma.movie.findUnique({
        where: { title: cartItem.name },
      });

      if (movie) {

        const updatedSeats = movie.seats?.map((seatValue: boolean, index: number) => {
          if (cartItem.seatNumber && cartItem.seatNumber.includes(index)) {
            return true;
          } else {
            return seatValue;
          }
        });

        await prisma.movie.update({
          where: { id: movie.id },
          data: {
            seats: updatedSeats,
          },
        });


        const transaction = await prisma.transaction.create({
          data: {
            user: { connect: { id: existingUser.id } },
            movie: { connect: { id: movie.id } },
            seats: cartItem.seatNumber.map((seat: string) => parseInt(seat)),
            quantity: cartItem.quantity,
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
    } catch (error: any) {
      // Handle error if any of the movies are not found
      return response.status(404).json({ error: error.message });
    }
  }

  return response.status(400).json({ error: "User not found" });
}

