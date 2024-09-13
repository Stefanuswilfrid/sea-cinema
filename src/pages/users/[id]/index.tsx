import AddPhoto from "@/components/AccountSettings/AddPhoto";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import { PlusIcon } from "lucide-react";
import AuthCheck from "@/components/AuthCheck";
import Button from "@/components/Button/Button";
import useSelectInterestModal from "@/hooks/useSelectInterestModal";

export default function EditProfile() {
  const interestModal = useSelectInterestModal();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { data } = useSession();
  const currentUser = data?.user!;
  const [isFixed, setIsFixed] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const [intro, setIntro] = useState(currentUser?.bio || "");
  const [isEditing, setIsEditing] = useState(false);

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

  const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntro(e.target.value);
  };

  const handleSaveIntro = () => {
    // Here you would typically save the intro to your backend
    // For now, we'll just update the local state
    setIsEditing(false);
  };

  return (
    <>
      <SEO
        title="Edit Profile - SEA Cinema"
        desc="SEA Cinema is a rising star in the movie theater industry known for
        its affordable ticket prices and wide range of movie genres."
      />
      <AuthCheck>
        <div className="w-full xl:px-20 md:px-10 sm:px-6 mt-12 mx-3 sm:max-w-5xl sm:mx-auto flex flex-col sm:flex-row gap-20">
          <div className="relative mx-auto">
            {id && <AddPhoto id={id.toString()} />}
          </div>
          <div className="md:ml-12 w-full mt-6 px-7 sm:px-0">
            <section>
              <h1 className="text-2xl font-bold">About you</h1>

              <div className="my-6 px-4 py-5 border-dashed border-2 border-grey rounded-xl overflow-hidden">
                {!isEditing ? (
                  <>
                    {intro ? (
                      <>
                        <p>{intro}</p>
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="mt-2 text-black underline focus:outline-none"
                        >
                          Edit Intro
                        </button>
                      </>
                    ) : (
                      <>
                        <p>Write something fun.</p>
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="mt-2 text-black underline focus:outline-none"
                        >
                          Add Intro
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <textarea
                      value={intro}
                      onChange={handleIntroChange}
                      placeholder="Write something fun and punchy."
                      className="w-full min-h-[100px] p-2 border-2 border-dashed border-gray-300 rounded-md resize-none focus:outline-none focus:border-black-500 transition-colors duration-200"
                    />
                    <button
                      onClick={handleSaveIntro}
                      className="mt-2 px-4 py-2 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-opacity-50 transition-colors duration-200"
                    >
                      Save Intro
                    </button>
                  </>
                )}
              </div>

              <hr />
              <h2 className="text-2xl font-bold mb-4 mt-12">What you're into</h2>
              <p className="text-gray-600 mb-4">
                Find common ground with other users by adding interests to your profile.
              </p>

              <div className="space-y-2">
                <div className="flex space-x-4">
                  {[1, 2, 3].map((_, index) => (
                    <button
                      key={index}
                      onClick={()=>{interestModal.onOpen()}}
                      className="w-24 h-12 mb-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                    >
                      <PlusIcon className="h-6 w-6 text-gray-400" />
                      <span className="sr-only">Add interest</span>
                    </button>
                  ))}
                </div>
                <button className="p-0 mb-8 h-auto font-semibold text-gray-900 underline">
                  Add interests
                </button>
              </div>
            </section>

            <div
              className={`bg-white border-t-2 w-full px-10 py-4 mt-8 ${
                isFixed ? "" : "relative"
              }`}
            >
              <div className="max-w-6xl text-right m-auto">
                <Button label="Done" onClick={()=>{}} className="px-6 py-3 border-black w-auto bg-black text-white rounded-lg ml-auto"/>
                  
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    </>
  );
}
