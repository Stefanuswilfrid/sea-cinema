import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const { movieName } = request.query;
    const movie = await prisma.movie.findUnique({
      where: { title: String(movieName) },
      select: { title: true, seats: true,price:true  },
    });

    if (movie) {
      response.setHeader('Cache-Control', 'no-store, max-age=0');
      return response.status(200).json(movie);
    } else {
      // Movie not found
      console.log(`Movie with title "${movieName}" not found.`);
      return response.status(404).json({ error: "Movie not found" });
    }
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
