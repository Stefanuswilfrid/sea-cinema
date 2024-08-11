import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from "../../../libs/prismadb"
import { requestHandler } from '@/libs/utils/request-handler'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("idk")
  await requestHandler(req, res, {
    allowedRoles: {
      PUT: ['USER'],
    },

    PUT: async (currentUser) => {
      const { avatarUrl } = req.body
      console.log("eu",currentUser)
      const username = currentUser.username
      console.log("BRUH",username)

      const user = await prisma.user.update({
        where: {
          username,
        },
        data: {
          avatarUrl,
        },
      })

      res.status(200).json(user)
    },
  })
}
