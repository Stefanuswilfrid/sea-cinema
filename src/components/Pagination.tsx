import React from "react";

// type PaginationProps = {
//   currentPage: number;
//   totalPages: number;
//   canNextLevel: boolean;
//   canPreviousLevel: boolean;
//   previousHref: string;
//   nextHref: string;
// };

export function Pagination() {

  return (
    <div className="max-sm:w-full flex justify-center items-center gap-1 bg-white sm:p-1">
      
      <button className="select-none inline-block h-full text-center max-sm:flex-1 bg-softblack active:bg-softblack/40 text-smokewhite px-6 py-3.5 font-medium active:shadow-none active:translate-y-1 border-b border-secondary/10 aria-disabled:pointer-events-none aria-disabled:bg-softblack/80 aria-disabled:text-smokewhite/50 aria-disabled:border-secondary/10 backdrop-blur-md duration-200">
      &#x2190;
      </button>

      <button className="select-none inline-block h-full text-center max-sm:flex-1 bg-softblack active:bg-softblack/40 text-smokewhite px-6 py-3.5 font-medium active:shadow-none active:translate-y-1 border-b border-secondary/10 aria-disabled:pointer-events-none aria-disabled:bg-softblack/80 aria-disabled:text-smokewhite/50 aria-disabled:border-secondary/10 backdrop-blur-md duration-200">

        &#x2192;
      </button>
    </div>
  );
}
