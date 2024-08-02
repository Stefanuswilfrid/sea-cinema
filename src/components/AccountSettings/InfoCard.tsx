import React from 'react'
import Image from "next/image";

export default function InfoCard() {
  return (
    <div className='rounded-xl p-6 flex justify-between  mb-6 shadow-custom border-custom border-1 sm:hidden'>
    <div className='flex flex-col justify-center'>
    <h1 className='text-lg font-black mb-2'>SEA Cinema</h1>
    <p className='text-[#6A6A6A] font-thin text-sm leading-5 text-left  '>Simple to get started and up and running.</p>
    </div>
    <Image alt="" width={104} height={88} src={'/images/compfest-logo.png'} className='w-[66px] h-[66px]'/>
  </div>
   )
}
