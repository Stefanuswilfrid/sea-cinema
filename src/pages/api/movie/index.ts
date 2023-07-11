import { NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";

export default async function GET(request: Request, response: NextApiResponse) {
  try {
    const dbMovies = await prisma.movie.findMany();
    if (dbMovies.length === 0) {
      const data = await fetch(
        "https://seleksi-sea-2023.vercel.app/api/movies"
      );
      const jsonData = await data.json();

      jsonData.map(async (movie: any) => {
        const createdMovie = await prisma.movie.create({
          data: {
            title: movie.title,
            seats: Array.from({ length: 64 }, () => false),
            // Include other relevant properties from the JSON data
          },
        });

        console.log(`Created movie: ${createdMovie.title}`);
      });
    } 
    else {
    }
  } catch (err) {}

  //https://seleksi-sea-2023.vercel.app/api/movies
}
