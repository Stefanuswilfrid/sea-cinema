// Breadcrumb.tsx
import React from 'react';
import Link from 'next/link'; // or 'react-router-dom' if using React Router

interface BreadcrumbItem {
  href: string;
  label: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex mt-10 " aria-label="Breadcrumb">
      <ol className="inline-flex items-center text-base space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className={`inline-flex items-center ${item.current ? '' : 'text-gray-700'}`}>
            {!item.current ? (
              <>
                <Link href={item.href} className="inline-flex items-center font-medium text-gray-700 hover:text-indigo-700 ">
                    {index > 0 && (
                      <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                      </svg>
                    )}
                    {item.label}
                </Link>
                {index < items.length - 1 && (
                  <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                )}
              </>
            ) : (
              <span className="ms-1 font-medium text-gray-500 md:ms-2 ">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
