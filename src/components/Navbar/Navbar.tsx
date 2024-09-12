"use client";
import React from 'react'
import Container from '../Container'
import UserMenu from './UserMenu';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { CurrentUser } from '@/types';


const Navbar =() => {
  const { data: session } = useSession();
  const currentUser = session?.user ;

  
  return (
    <div className='w-full bg-white z-10 shadow-sm'>
         <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center 
                justify-between gap-3 md:gap-0'>
                  <Link href="/">
                    <span className='w-100 h-100 font-semibold '>
                      <Image
                        src={"/images/compfest-logo.png"}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </span>
                    </Link>
                    <UserMenu currentUser={currentUser!} />


                </div>
            </Container>
        </div>
        
    </div>
  )
}

export default Navbar