import { CurrentUser } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";

type UpdateUserArgs = {
    avatarUrl?: string | null
    displayName?: string
    username?: string
    balance? : number
    bio?: string
}
  

export function useDelayedIsAuthenticated() {
    const { status } = useSession()

    const [isAuthenticated, setIsAuthenticated] = React.useState(
        status === 'authenticated'
    )

    React.useEffect(() => {
        let timeout: NodeJS.Timeout
        if (status === 'loading' || status === 'unauthenticated') {
          timeout = setTimeout(() => {
            setIsAuthenticated(false)
          }, 300)
        } else {
          setIsAuthenticated(true)
        }
    
        return () => clearTimeout(timeout)
      }, [status])
      return isAuthenticated

}

export function useUser() {
    const { data: session, status, update } = useSession()
  
    const user = session?.user 
  
    const isAuthenticated = React.useMemo(
      () => status === 'authenticated',
      [status]
    )
  
    return {
      user: {
        avatarUrl: user?.avatarUrl ?? null,
        name: user?.name,
        username: user?.username ?? '',
        id: user?.id ?? '',
        createdAt: user?.createdAt,
        balance : user?.balance,
        bio: user?.bio,
      } as CurrentUser,
      status,
      updateUser: async (args: UpdateUserArgs) => {
        const sessionObj = {
          ...session,
          user: {
            ...session?.user,
            ...args,
          },
        }
  
        await update(sessionObj)
      },
      isAuthenticated,
    }
  }
  