import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "../../../libs/prismadb";
import { FieldValue } from "react-hook-form";
import { IUser } from "@/components/Modal/RegisterModal";
import { NextApiResponse } from "next";
import { UserData } from "@/pages/balance";

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
