import AddPhoto from "@/components/AccountSettings/AddPhoto";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CurrentUser } from "@/types";
import SEO from "@/components/SEO";
import { AlarmClock, ArrowRight, Lightbulb, PlusIcon } from "lucide-react";
import { ChevronRight } from "react-feather";
import { button } from "@material-tailwind/react";
import AuthCheck from "@/components/AuthCheck";

const interests = [
  { icon: '🍝', label: 'Food' },
  { icon: '🏞️', label: 'Outdoors' },
  { icon: '🎵', label: 'Live music' },
  { icon: '🛍️', label: 'Shopping' },
  { icon: '📚', label: 'Reading' },
  { icon: '📷', label: 'Photography' },
  { icon: '🐾', label: 'Animals' },
  { icon: '🏟️', label: 'Live sports' },
  { icon: '🏛️', label: 'Museums' },
  { icon: '🎬', label: 'Movies' },
  { icon: '🍷', label: 'Wine' },
  { icon: '🍳', label: 'Cooking' },
  { icon: '🏛️', label: 'Architecture' },
  { icon: '🌍', label: 'History' },
  { icon: '🏄', label: 'Water sports' },
  { icon: '🎭', label: 'Theatre' },
]

export default function EditProfile() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const { data } = useSession();
  const currentUser = data?.user! ;
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
          <AuthCheck>

      <div className="w-full xl:px-20 md:px-10 sm:px-6 px-4 mt-12 mx-6 sm:max-w-5xl sm:mx-auto flex flex-col sm:flex-row gap-20">
        <div className="relative">
          <AddPhoto id={currentUser.id} />
        </div>
        <div className="md:ml-12 w-full mt-6">

          <section>
            <h1
              className="text-2xl  font-bold "
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
              <h2 className="text-2xl font-bold mb-4 mt-12 ">What you're into</h2>
      <p className="text-gray-600 mb-4">
        Find common ground with other users by adding interests to your profile.
      </p>

      <div className="space-y-2">
      <div className="flex space-x-4  ">
        {[1, 2, 3].map((_, index) => (
          <button
            key={index}
            className="w-24 h-12 mb-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"
          >
            <PlusIcon className="h-6 w-6 text-gray-400" />
            <span className="sr-only">Add interest</span>
          </button>
        ))}
      </div>
      <button  className="p-0 mb-8  h-auto font-semibold text-gray-900 underline">
        Add interests
      </button>
    </div>

      {/* <div className="flex flex-wrap gap-2 mb-4">
        {selectedInterests.map(interest => (
          // <Button key={interest} variant="secondary" className="rounded-full">
          //   {interest}
          // </Button>
          <button>
            {interest}
          </button>
        ))}
      </div> */}
            
          </section>
      
          {/* <h1 className="h-96 last-h1">Hello</h1> */}
          <div
            className={`bg-white border-t-2 w-full px-10 py-4 mt-8 ${
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
      </AuthCheck>
    </>
  );
}
