import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../libs/prismadb";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Get the session to authenticate the user
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // Parse data from the request body
      const { transactions, totalCost } = req.body;

      if (!transactions || transactions.length === 0 || !totalCost) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      // Create the transaction for each movie in the transactions array
      const createdTransactions = await Promise.all(
        transactions.map(async (transaction: any) => {
          const { movieName, seats, totalPrice } = transaction;

          // 1. Fetch the movie using the movieName
          const movie = await prisma.movie.findUnique({
            where: { title: movieName }, // Assuming movieName is unique
          });

          if (!movie) {
            throw new Error(`Movie with name "${movieName}" not found.`);
          }

          // 2. Fetch seat details from the database based on seat labels and movieId
          const seatDetails = await Promise.all(
            seats.map(async (seatLabel: string) => {
              const seat = await prisma.seat.findFirst({
                where: {
                  label: seatLabel,
                  movieId: movie.id, // Ensure the seat belongs to the correct movie
                },
                include:{

                }
              });

              if (!seat) {
                throw new Error(`Seat "${seatLabel}" not found for movie "${movieName}".`);
              }

              return seat;
            })
          );

          // 3. Create the transaction using the movieId and seat details
          return prisma.transaction.create({
            data: {
              userId: session.user.id,
              movieId: movie.id, // Use the fetched movieId
              seats: seatDetails, // Store seat IDs
              quantity: seatDetails.length, // Quantity is the number of seats booked
              type: "MOVIE_TICKET_BOOKING", // Transaction type enum
              totalCost: totalPrice, // Total cost for this transaction
            },
          });
        })
      );

      // Respond with success and the created transactions
      return res.status(201).json({
        message: "Transactions created successfully",
        transactions: createdTransactions,
      });
    } catch (error : any) {
      console.error("Error creating transaction:", error);
      if (error.message.includes("not found")) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Handle non-POST methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
