import AddPhoto from "@/components/AccountSettings/AddPhoto";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CurrentUser } from "@/types";
import SEO from "@/components/SEO";
import { AlarmClock, ArrowRight, Lightbulb } from "lucide-react";
import { ChevronRight } from "react-feather";

export default function EditProfile() {
  const { data } = useSession();
  const currentUser = data?.user as CurrentUser;
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const lastH1 = document.querySelector(".last-h1") as HTMLElement;
      const bottomOfLastH1 = lastH1?.getBoundingClientRect().bottom;

      if (bottomOfLastH1 && bottomOfLastH1 < window.innerHeight + -80) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <SEO
        title="Edit Profile - SEA Cinema"
        desc="SEA Cinema is a rising star in the movie theater industry known for
        its affordable ticket prices and wide range of movie genres."
      />
      <div className="w-full xl:px-20 md:px-10 sm:px-6 px-4 mt-12 mx-6 sm:max-w-5xl sm:mx-auto flex flex-col sm:flex-row gap-20">
        <div className="relative">
          <AddPhoto id={currentUser?.id} />
        </div>
        <div className="md:ml-12 w-full mt-6">
          <div>
            <h1 className="text-[32px] font-black tracking-tight leading-9">
              Your Profile
            </h1>
            <p className="text-gray-500 my-5">The information you share will be used across SEA Cinema users to get to know you.</p>
            <div className="grid grid-cols-2 gap-8">
              <button className="border-b-[1px] border-gray-300  hover:bg-gray-100 px-3 py-4 hover:rounded-lg duration-200">
                <div className="flex items-start ">
                  <AlarmClock/>
                <span className="text-gray-500 ml-3">I spend too much time
                </span>
                  {/* <ChevronRight className="tex"/> */}
                </div>
              </button>
              <button className="border-b-[1px] border-gray-300  hover:bg-gray-100 px-3 py-4 hover:rounded-lg duration-200">
                <div className="flex items-start ">
                  <Lightbulb/>
                <span className="text-gray-500 ml-3">My Fun Fact
                </span>
                  {/* <ChevronRight className="tex"/> */}
                </div>
              </button>
            </div>
          </div>
          <section>
            <h1
              className="text-2xl mt-8 font-bold "
            >
                About you
            </h1>
            {currentUser?.bio ? <span>eu</span> :
            <div className="my-6 px-4 py-5 border-dashed border-2 border-grey rounded-xl">
              <p >
              Write something fun.
              </p>
              <p className="mt-1 underline underline-offset-4 ">Add Intro</p>

              </div>}
              <hr/>
              <h1
              className="text-2xl mt-8 font-bold "
            >
                What you're into
            </h1>
            
          </section>
      
          <h1 className="h-96 last-h1">Hello</h1>
          <div
            className={`bg-white border-t-2 w-full px-10 py-4 ${
              isFixed ? "" : "relative"
            }`}
          >
            <div className="max-w-6xl text-right m-auto">
              <button className="px-6 py-3 bg-black text-white rounded-lg ml-auto">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-100 transform bg-white border-t-2 w-full px-10 py-4 ${
          isFixed ? "opacity-100 fixed bottom-0" : " opacity-0 "
        }`}
      >
        <div className="max-w-6xl text-right m-auto">
          <button className="px-6 py-3 bg-black text-white rounded-lg">
            Done
          </button>
        </div>
      </div>
    </>
  );
}
