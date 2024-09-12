import { requestHandler } from "@/libs/utils/request-handler";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../libs/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    requestHandler(req,res,{
        allowedRoles:{
            DELETE: ["USER","PUBLIC"],
            POST:["USER","PUBLIC"]
        },
        POST: async (session) => {
            const {movieId} = req.query;

            if (!movieId || typeof movieId !== 'string'){
                throw new Error("Invalid ID");
            }
            // const currentUser = session 

            let wishlistIds = [...(session.wishlistIds || [])]

            wishlistIds.push(movieId);

            const user = await prisma.user.update({
                where: {
                  id: session.id 
                },
                data: {
                    wishlistIds
                }
              });
              console.log("user",user)
            
              return res.status(200).json(user)  
        },
        DELETE: async (session) =>{
            const {movieId} = req.query;

            if (!movieId || typeof movieId !== 'string'){
                throw new Error("Invalid ID");
            }

            let wishlistIds = [...(session.wishlistIds || [])];

            wishlistIds = wishlistIds.filter((id) => id !== movieId);
            
            const user = await prisma.user.update({
                where: {
                    id : session.id
                },
                data: {
                    wishlistIds
                }
            });

            return res.status(200).json(user)
        }
    })
  }