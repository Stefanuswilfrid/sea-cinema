import { useUser } from '@/hooks/useUser';
import prisma from  "../../../libs/prismadb";
import type { NextApiRequest, NextApiResponse } from 'next'
// import getCurrentUser from '@/actions/getCurrentUser';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    try {
      const { username } = req.query; // Example parameter
      const users = await prisma.user.findMany({
        orderBy: {
          name: 'desc'
        },
        where: {
          NOT: {
            username: username?.toString()
          }
        }
      });
  
      res.status(200).json(users);
    } catch (error: any) {
      console.log("user",error)
      return res.status(500).json(error);
    }

  }