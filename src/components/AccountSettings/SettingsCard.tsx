import React from 'react';
import { ChevronRightIcon, Icon } from 'lucide-react'; // Import the necessary icon component from lucide-react
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SettingsCardProps {
  title: string;
  label: string;
  path: string;

  icon: React.ComponentType<any>; // Adjust the type according to the specific icon component type
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, label, icon: IconComponent ,path}) => {
    const router = useRouter();
//     <Link
//     href={`/flashcards/premade/`}
//     scroll={false}
//     className="text-left p-4 w-full md:hover:bg-gray-100 active:bg-gray-100 duration-200 flex items-center justify-between"
//   >
//     <div className="min-w-0 flex-auto">
//       <h3 className="text-xl font-medium text-primary">"sa"</h3>
//       <div className="mt-1 flex gap-2 items-center">
//         <p className="text-secondary text-sm">"desc"</p>

//         <div className="inline-flex max-sm:hidden text-xs items-center rounded-full backdrop-blur-sm bg-blue-500/10 dark:bg-blue-400/10 px-2 py-1 font-medium text-blue-500 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20 dark:ring-blue-400/20 w-fit">
//           s卡
//         </div>
//       </div>
//     </div>

//     <ChevronRightIcon
//       className="h-5 w-5 shrink-0 flex-none text-secondary/50 max-sm:hidden"
//       aria-hidden="true"
//     />

//     <div className="inline-flex sm:hidden text-sm items-center rounded-full backdrop-blur-sm bg-blue-500/10 dark:bg-blue-400/10 px-3 py-1 font-medium text-blue-500 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20 dark:ring-blue-400/20 w-fit">
//       12卡
//     </div>
//   </Link>
  return (
    <Link href={path}
    
       className='mb-4 sm:mb-0 flex items-center sm:items-start sm:flex-col sm:shadow-custom p-1 sm:p-4 sm:min-h-[156px] my-2 rounded-xl sm:justify-between w-full'>
      <IconComponent className='h-[32px] w-[32px] sm:mb-4 mr-4'  />
      <div className='justify-between sm:justify-normal flex sm:flex-col w-full sm:w-fit'>

      <h1 className='text-lg font-black'>{title}</h1>
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
