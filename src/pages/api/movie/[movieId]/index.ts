import type { NextApiRequest, NextApiResponse } from "next";
import prisma  from "@/libs/prismadb";

type Data = {
  name: string;
};

async function getMovieById(id: string) {
  return prisma.movie.findUnique({
    where: {
      id,
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // if (req.method !== "GET") {
  //   res.setHeader("Allow", ["GET"]);
  //   return res.status(405).end(`Method ${req.method} Not Allowed`);
  // }
  const { movieId } = req.query;

  try {
    const movies = await getMovieById(movieId as string);
    res.status(200).json(movies);
  } catch (error) {
  
    res.status(500).json( {error:`parado no bailao ${error}`} );
  }
}
