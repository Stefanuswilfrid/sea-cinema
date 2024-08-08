

import prisma from "../../../libs/prismadb";

import { NextApiResponse } from "next";

export default async function POST(
  request: Request,
  response: NextApiResponse
) {
  const body = await request.body;
  const { addedBalance, username } = body as unknown as any;

  const user = await prisma.user.update({
    data: {
      balance: {
        increment: addedBalance as number,
      },
    },
    where: {
      username: username,
    },
  });

  return response.json(user);
}
