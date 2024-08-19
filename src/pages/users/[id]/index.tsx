import AddPhoto from '@/components/AccountSettings/AddPhoto'
import Container from '@/components/Container'
import React from 'react'
import { useSession } from "next-auth/react";
import { CurrentUser } from '@/types';

export default function EditProfile() {
  const { data } = useSession();
  const currentUser = data?.user as CurrentUser;


  return (
      <div className='w-full xl:px-20 md:px-10 sm:px-6 px-4 mt-8 mx-6 sm:max-w-5xl sm:mx-auto flex gap-20'>
        <div className='relative'>
<AddPhoto id={currentUser?.id}/>
        </div>
        <div>
          <h1 className='h-96'>Hello</h1>
          <h1 className='h-96'>Hello</h1>
          <h1 className='h-96'>Hello</h1>
          <h1 className='h-96'>Hello</h1>
          <h1 className='h-96'>Hello</h1>
        </div>
      </div>
  )
}
