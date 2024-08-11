import Link from 'next/link';

import { useSession } from "next-auth/react";
import { ReactNode } from 'react';


type AuthCheckProps = {
    children: ReactNode;
  };


// Component's children only shown to logged-in users
export default function AuthCheck({ children }: AuthCheckProps) {
    const { data: session, status } = useSession();
    const currentUser = session?.user;

    if (status === 'loading') {
        // Optional: Render a loading state while checking the session status
        return <div>Loading...</div>;
      }
    
      if (!currentUser) {
        // User is not logged in, render the fallback content or the sign-in link
        return  <div className='flex h-screen justify-center items-center'> <Link className='text-3xl' href="/">
          You must be signed in</Link></div>
      }
    
      // User is logged in, render the children
      return (
        <>
          {children}
        </>
      );  
  }