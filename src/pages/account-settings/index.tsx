import SettingsCard from '@/components/AccountSettings/SettingsCard';
import Container from '@/components/Container'
import { motion } from 'framer-motion';
import { ChevronRightIcon, IdCard } from 'lucide-react';
import { ShieldHalf } from 'lucide-react';
import { Banknote } from 'lucide-react';
import { File } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";


import React from 'react'

export default function AccountSettings() {
  const buttons: Array<{
    icon:  React.ComponentType;
    text: string;
    label: string;
    path: string;
  }> = [
    {
      icon: IdCard ,
      text: "Personal info",
      label:"Provide personal details and how we can reach you",
      path: "/account-settings/personal-info",
    },
    {
      icon: ShieldHalf,
      text: "Login & security",
      label:"Update your password and secure your account",

      path: "/",
    },
    {
      icon: Banknote,
      text: "Payments & payouts",
      label:"Review payments, payouts, coupons and gift cards",

      path: "/",
    },
    {
      icon: File ,
      text: "Taxes",
      label:"Manage taxpayer information and tax documents",
      path: "/",
    },
  ];

  return (
    <Container>
        <div className='mx-6  sm:max-w-5xl sm:mx-auto'>
            <section className='mt-16 mb-8 sm:mb-14'>
            <h1 className='text-4xl font-bold'>Account</h1>
            <div className='text-lg leading-6 mt-2'>
                <span className='font-bold'>sadssaddas</span>
                <span className='font-thin text-gray-600'> , sadssaddas@gmail.com · </span>
                <span className='font-bold underline'> Go To Profile</span>

            </div>
            

            </section>

            <div className='rounded-xl p-6 flex justify-between  mb-6 shadow-custom border-custom border-1 sm:hidden'>
              <div className='flex flex-col justify-center'>
              <h1 className='text-lg font-black mb-2'>SEA Cinema</h1>
              <p className='text-[#6A6A6A] font-thin text-sm leading-5 text-left  '>Simple to get started and up and running.</p>
              </div>
              <Image alt="" width={104} height={88} src={'/images/compfest-logo.png'} className='w-[66px] h-[66px]'/>
            </div>
           

            <div 
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3
            
            sm:gap-5
          "
        >

          {buttons.map((button, index) => {
            return (
              <motion.div
              key={index}
              transition={{ type: "tween", duration: 0.4 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SettingsCard title={button.text} label={button.label} icon={button.icon} path={button.path}/>
              {(index + 1) % 2 === 0  && (
                            <hr/>

              )}
            </motion.div>
            )
          }
          )}
        </div>
        </div>
    </Container>
  )
}
