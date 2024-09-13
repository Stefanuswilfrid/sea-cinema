import AddPhoto from "@/components/AccountSettings/AddPhoto";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import { PlusIcon } from "lucide-react";
import AuthCheck from "@/components/AuthCheck";
import Button from "@/components/Button/Button";
import useSelectInterestModal from "@/hooks/useSelectInterestModal";
import { useUser } from "@/hooks/useUser";

export default function EditProfile() {
  const interestModal = useSelectInterestModal();
  const { updateUser, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const currentUser = user!;
  const [isFixed, setIsFixed] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const [intro, setIntro] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser?.bio) {
      setIntro(currentUser.bio);
    }
    if (currentUser?.interests) {
      setSelectedInterests(currentUser.interests);
    }
  }, [currentUser?.bio, currentUser?.interests]);

  const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntro(e.target.value);
  };

  const handleSaveIntro = async () => {
    try {
      setIsLoading(true);
      await updateUser({
        bio: intro,
      });

      setIsEditing(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating bio:", error);
      setIsLoading(false);
    }
  };

  const handleEditInterests = () => {
    interestModal.onOpen();
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
                    <Button
                      disabled={isLoading}
                      label="Save Intro"
                      onClick={handleSaveIntro}
                      className="mt-2 px-4 py-2 bg-black w-auto border-none text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-opacity-50 transition-colors duration-200"
                    />
                  </>
                )}
              </div>

              <hr />
              <h2 className="text-2xl font-bold mb-4 mt-12">What you're into</h2>
              <p className="text-gray-600 mb-4">
                Find common ground with other users by adding interests to your profile.
              </p>

              <div className="space-y-4">
                {selectedInterests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Add interests to find common ground with other users.
                  </p>
                )}
                <button
                  onClick={handleEditInterests}
                  className="text-black underline focus:outline-none"
                >
                  Edit interests
                </button>
              </div>
            </section>

            <div
              className={`bg-white border-t-2 w-full px-10 py-4 mt-8 ${
                isFixed ? "" : "relative"
              }`}
            >
              <div className="max-w-6xl text-right m-auto">
                <Button
                  label="Done"
                  onClick={() => {}}
                  className="px-6 py-3 border-black w-auto bg-black text-white rounded-lg ml-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    </>
  );
}
