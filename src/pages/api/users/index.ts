import { useUser } from '@/hooks/useUser';
import prisma from  "../../../libs/prismadb";
import type { NextApiRequest, NextApiResponse } from 'next'
// import getCurrentUser from '@/actions/getCurrentUser';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {


    // const currentUser = await getCurrentUser();
    // console.log("uname",currentUser)

    // // const { isAuthenticated,user : currentUser } = useUser()
    // if(isAuthenticated===false){
    //   return []
    // } 

    try {
      const { username } = req.query; // Example parameter
      console.log("params",username)
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
      console.log("db",users)
  
      res.status(200).json(users);
    } catch (error: any) {
      console.log("user",error)
      return res.status(500).json(error);
    }

  }