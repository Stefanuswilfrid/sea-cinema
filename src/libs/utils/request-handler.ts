import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

type Role = 'USER' | 'ADMIN' | 'PUBLIC'
type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

type AllowedRoles = {
  [method in HttpMethods]?: Role[]
}

export type CurrentUser = {
  id: string
  username: string
  avatarUrl: string
  displayName: string
}

type HandlerType = {
  allowedRoles?: AllowedRoles
} & {
  [method in HttpMethods]?: (currentUser: CurrentUser) => Promise<void>
}



// function isCurrentUser(user: any): user is CurrentUser {
//     return typeof user === 'object' &&
//       typeof user.id === 'string' &&
//       typeof user.username === 'string' &&
//       // typeof user.avatarUrl === 'string' &&
//       typeof user.name === 'string';
//   }
  
  export async function requestHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: HandlerType
  ) {
    try {
      const method: HttpMethods | undefined = req.method as HttpMethods | undefined
  
      if (
        !method ||
        !handler[method] ||
        !handler.allowedRoles ||
        !handler.allowedRoles[method]
      ) {
        return res.status(405).json({ message: 'Method not allowed' })
      }
  
      const allowedRoles = handler.allowedRoles[method] ?? ['PUBLIC']
  
      const session =
        allowedRoles.includes('PUBLIC') && allowedRoles.length === 1
          ? null
          : await getServerSession(req, res, authOptions)

  
      let currentUser: CurrentUser = {
        avatarUrl: '',
        displayName: '',
        id: '',
        username: '',
      }
      console.log("receba",session?.user)
      const sessionUser = session?.user as CurrentUser;
  
      if (session?.user ) {
        console.log("neymar")
        currentUser  = {
          avatarUrl: sessionUser.avatarUrl as string,
          displayName: sessionUser.displayName as string,
          id: sessionUser.id  ?? '',
          username: sessionUser.username ?? '',
        }
      }
  
      await handler[method]?.(currentUser)
    } catch (err) {
      const statusCode = err instanceof Error ? 400 : 500
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      return res.status(statusCode).json({ statusCode, message })
    }
  }
  

// export async function requestHandler(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   handler: HandlerType
// ) {
//   try {
//     const method: HttpMethods | undefined = req.method as
//       | HttpMethods
//       | undefined

//     if (
//       !method ||
//       !handler[method] ||
//       !handler.allowedRoles ||
//       !handler.allowedRoles[method]
//     ) {
//       return res.status(405).json({ message: 'Method not allowed' })
//     }

//     const allowedRoles = handler.allowedRoles[method] ?? ['PUBLIC']

//     const session =
//       allowedRoles.includes('PUBLIC') && allowedRoles.length === 1
//         ? null
//         : await getServerSession(req, res, authOptions)

//     const sessionRole: Role | null = 'PUBLIC'

//     const requestValid = await isRequestValid(allowedRoles, sessionRole)

//     if (!requestValid) {
//       return res.status(401).json({ message: 'Unauthorized' })
//     }

//     const currentUser = {
//       avatarUrl: session?.user?.image as string,
//       displayName: session?.user?.name as string,
//       id: session?.user?.id ?? '',
//       username: session?.user?.username ?? '',
//     }

//     await handler[method]?.(currentUser as CurrentUser)
//   } catch (err) {
//     const statusCode = err instanceof Error ? 400 : 500
//     const message = err instanceof Error ? err.message : 'Something went wrong.'
//     return res.status(statusCode).json({ statusCode, message })
//   }
// }
