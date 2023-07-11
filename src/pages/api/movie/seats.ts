import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prismadb';

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const { movieName } = request.query;
    const dbMovies = await prisma.movie.findMany();

    const movie = await prisma.movie.findUnique({
      where: { title: movieName as string },
      select: { seats: true },
    });

    if (movie) {
      // Access the seats array
      const seats = movie.seats;
      return response.json(seats);
    } else {
      console.log(`Movie with title "${movieName}" not found.`);
      return response.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
