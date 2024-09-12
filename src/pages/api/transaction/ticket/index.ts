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

      const { transactions, totalCost } = req.body;

      if (!transactions || transactions.length === 0 || !totalCost) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const failedSeats: { seatLabel: string; reason: string }[] = [];

      const createdTransactions = await Promise.all(
        transactions.map(async (transaction: any) => {
          const { movieName, seats, totalPrice } = transaction;

          const movie = await prisma.movie.findUnique({
            where: { title: movieName },
          });

          if (!movie) {
            throw new Error(`Movie with name "${movieName}" not found.`);
          }

          const seatIds = await Promise.all(
            seats.map(async (seatLabel: string) => {
              console.log(`Attempting to fetch seat: ${seatLabel} for movie ${movieName}`);

              const seat = await prisma.seat.findFirst({
                where: {
                  label: seatLabel,
                  movieId: movie.id,
                },
              });

              if (!seat) {
                failedSeats.push({
                  seatLabel,
                  reason: `Seat "${seatLabel}" not found or already occupied for movie "${movieName}".`,
                });
                console.log(`Seat ${seatLabel} for movie ${movieName} not found or already occupied.`);
                return null;
              }

              // Log the seat information
              console.log(`Found seat: ${seatLabel} (ID: ${seat.id}) for movie ${movieName}`);

              // Mark the seat as occupied
              await prisma.seat.update({
                where: { id: seat.id },
                data: { occupied: true },
              });

              return seat.id; // Return the seat ID to link it with the transaction
            })
          );

          // Filter out any null seatIds (those that failed)
          const validSeatIds = seatIds.filter((seatId) => seatId !== null);

          console.log(`Valid seats for movie ${movieName}: ${validSeatIds.length}`);

          // If there are no valid seats, skip transaction creation
          if (validSeatIds.length === 0) {
            console.log(`No valid seats found for movie ${movieName}, skipping transaction.`);
            return null;
          }

          return prisma.transaction.create({
            data: {
              userId: session.user.id,
              movieId: movie.id,
              seats: {
                connect: validSeatIds.map((seatId) => ({ id: seatId })),
              }, // Link all the valid seats to the transaction
              quantity: validSeatIds.length, // The number of seats booked
              type: "MOVIE_TICKET_BOOKING", // Transaction type enum
              totalCost: (totalPrice / seats.length) * validSeatIds.length, // Adjust totalCost for the valid seats booked
            },
          });
        })
      );

      // Filter out null transactions
      const validTransactions = createdTransactions.filter((transaction) => transaction !== null);

      if (failedSeats.length > 0) {
        return res.status(400).json({
          message: "Some seats could not be booked.",
          failedSeats,
          transactions: validTransactions,
        });
      }

      return res.status(201).json({
        message: "Transactions created successfully",
        transactions: validTransactions,
      });
    } catch (error: any) {
      console.error("Error creating transaction:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    // Handle non-POST methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
