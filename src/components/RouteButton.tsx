import { cn } from "@/utils/cn";
import { back } from "@/utils/page-router";
import { useRouter } from "next/navigation";
import React from "react";

const buttonClassName =
  "mt-4 py-2  pr-4 rounded-md duration-200 active:bg-hovered flex items-center gap-2";

export function BackRouteButton({
  defaultBack = false,
  className,
}: {
  defaultBack?: boolean;
  className?: string;
}) {
  const router = useRouter();

  const ref = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <button
      ref={ref}
      onClick={() => {
        if (defaultBack) {
          router.back();
        } else {
          if (ref.current) {
            ref.current.disabled = true;
            back(router);
          }
        }
      }}
      type="button"
      className={cn(buttonClassName, className)}
    >
      <div className="mb-[3px] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-square-chevron-left"
        >
          <path d="m14 16-4-4 4-4" />
        </svg>
      </div>
      Return
    </button>
  );
}
