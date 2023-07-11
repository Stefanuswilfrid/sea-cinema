import { NextResponse } from "next/server";

import prisma from "../../../libs/prismadb"
import { NextApiResponse } from "next";

export default async function POST(
  request: Request, response: NextApiResponse
) {
    const body = await request.body;
    const { cartItems, totalPrice , username } = body as any;




    
  


    
   

   return response.status(400).json({error:"username already exists ! "})
}