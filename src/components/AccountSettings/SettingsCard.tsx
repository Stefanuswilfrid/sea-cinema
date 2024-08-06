import React from 'react';
import { ChevronRightIcon, Icon } from 'lucide-react'; // Import the necessary icon component from lucide-react
import Link from 'next/link';

interface SettingsCardProps {
  title: string;
  label: string;
  path: string;

  icon: React.ComponentType<any>; // Adjust the type according to the specific icon component type
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, label, icon: IconComponent ,path}) => {
  return (
    <Link href={path}
    
       className='mb-4 sm:mb-0 flex items-center sm:items-start sm:flex-col sm:shadow-custom p-1 sm:p-4 sm:min-h-[156px] my-2 rounded-xl sm:justify-between w-full'>
      <IconComponent className='h-[32px] w-[32px] sm:mb-4 mr-4'  />
      <div className='justify-between sm:justify-normal flex sm:flex-col w-full sm:w-fit'>

      <h1 className='text-lg font-thin sm:font-black'>{title}</h1>
      <p className='text-[#6A6A6A] font-thin text-sm leading-5 text-left hidden sm:block'>{label}</p>
           <ChevronRightIcon
      className=" h-5 w-5 shrink-0 flex-none text-secondary/50 sm:hidden"
      aria-hidden="true"
    />
    </div>
    </Link>
  );
}

export default SettingsCard;
