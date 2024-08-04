import AccountFAQ from "@/components/AccountSettings/AccountFAQ";
import Breadcrumb from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import PreferenceIcon from "/images/preferences.svg"
import { ChevronRightIcon } from "lucide-react";

export default function Preferences() {
    const breadcrumbs = [
        { href: '/account-settings', label: 'Account' },
        { href: '/account-settings/preferences', label: 'Global Preferences', current: true },
      ];
  return (
    <motion.div
      className={"flex-grow antialiased"}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0,
        },
      }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          flex flex-col gap-6
        "
      >
        <Breadcrumb items={breadcrumbs}/>

        <h1 className="text-4xl font-bold ">Global Preferences</h1>
        <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-12
              mt-6
            "
          >
            <div className="col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div
                  className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-4
            border-b-[1px]
            pb-6
            mb-2
          "
                >
                  {/* <div>Legal Name </div> */}
                  <div
                    className="text-left w-full md:hover:bg-hovered active:bg-hovered duration-200 flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-auto">
                      <h3 className="text-lg font-bold text-primary">Preferred Language</h3>
                      <div className="mt-1 flex gap-2 items-center">
                        <p className="font-thin text-sm">English</p>

                        
                      </div>
                    </div>

                    <h2 className="text-base">Edit</h2>
                  
                  </div>

                  
                 
                </div>
                <div
                  className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-4
            border-b-[1px]
            pb-6
          "
                >
                  <div
                    className="text-left w-full md:hover:bg-hovered active:bg-hovered duration-200 flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-auto">
                      <h3 className="text-lg font-bold text-primary">Preferred Currency</h3>
                      <div className="mt-1 flex gap-2 items-center">
                        <p className="font-thin text-sm">Australian Dollar</p>

                        
                      </div>
                    </div>

                    <h2 className="text-base">Edit</h2>
                  
                  </div>

                  
                 
                </div>
              </div>
            </div>

            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
<AccountFAQ title="Your global preferences" description="Changing your currency updates how you see prices. You can change how you get payments in your payments & payouts preferences." icon={ <svg viewBox="0 0 24 24" className="h-[40px] w-[40px] block fill-current text-yellow-600" role="presentation" aria-hidden="true" focusable="false">
  <path d="m21.31 5.91a1.31 1.31 0 1 1 -1.31-1.31 1.31 1.31 0 0 1 1.31 1.31zm-8.31 9.69a1.31 1.31 0 1 0 1.31 1.31 1.31 1.31 0 0 0 -1.31-1.31zm-7-11a1.31 1.31 0 1 0 1.31 1.31 1.31 1.31 0 0 0 -1.31-1.31z"></path>
  <path d="m22 6.5a2.5 2.5 0 0 1 -2 2.45v13.55a.5.5 0 0 1 -1 0v-13.55a2.5 2.5 0 0 1 0-4.9v-2.55a.5.5 0 0 1 1 0v2.56a2.44 2.44 0 0 1 .33.09.5.5 0 0 1 -.33.94h-.01a1.45 1.45 0 0 0 -.99.01 1.49 1.49 0 0 0 0 2.82 1.4 1.4 0 0 0 1 0 1.5 1.5 0 0 0 1-1.41 1.48 1.48 0 0 0 -.09-.52.5.5 0 0 1 .94-.35 2.5 2.5 0 0 1 .16.87zm-7.8 9.83a.5.5 0 0 0 -.29.64 1.48 1.48 0 0 1 .09.52 1.5 1.5 0 0 1 -1 1.41 1.4 1.4 0 0 1 -1 0 1.49 1.49 0 0 1 0-2.82 1.48 1.48 0 0 1 .5-.09 1.52 1.52 0 0 1 .5.08h.01a.5.5 0 0 0 .32-.94 2.46 2.46 0 0 0 -.32-.08v-13.56a.5.5 0 0 0 -1 0v13.55a2.5 2.5 0 0 0 0 4.9v2.55a.5.5 0 0 0 1 0v-2.55a2.5 2.5 0 0 0 1.84-3.32.5.5 0 0 0 -.64-.29zm-7-11a .5.5 0 0 0 -.29.64 1.48 1.48 0 1 1 -1.41-.98 1.47 1.47 0 0 1 .49.08h.01a.5.5 0 0 0 .33-.94 2.44 2.44 0 0 0 -.33-.09v-2.56a.5.5 0 0 0 -1 0v2.55a2.5 2.5 0 0 0 0 4.9v13.55a.5.5 0 0 0 1 0v-13.55a2.5 2.5 0 0 0 1.84-3.32.5.5 0 0 0 -.64-.29z"></path>
</svg>
}/>
            </div>

          </div>
        </div>
      </Container>
    </motion.div>
  );
}
