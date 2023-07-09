import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "../../../libs/prismadb"
import { FieldValue } from "react-hook-form";
import { IUser } from "@/components/Modal/RegisterModal";
import { NextApiResponse } from "next";

export default async function POST(
  request: Request, response: NextApiResponse
) {
  console.log("s",request.body)
  const body = await request.body;
  const { 
    username,
    name,
    age,
    password,
   } = body as unknown as IUser;

   const hashedPassword = await bcrypt.hash(password, 12);
   const ageInt = parseInt(age);

   const userExist= await prisma.user.findFirst({
    where:{
      username: username
    }
   })

   if (!userExist) {
    const user = await prisma.user.create({
      data: {
        username,
        name,
        age: ageInt,
        hashedPassword,
      }
    });

    return response.json(user);
   }

   return response.status(400).json({error:"username already exists ! "})

   

}