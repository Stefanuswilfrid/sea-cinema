import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useCallback, useMemo, useEffect } from "react";
import Button from "../Button/Button";
import { useUser } from "@/hooks/useUser";
import useSelectInterestModal from "@/hooks/useSelectInterestModal";

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
];

export default function SelectInterestModal() {
  const SelectInterestModal = useSelectInterestModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { updateUser, user } = useUser();

  // Load user interests when component mounts
  useEffect(() => {
    if (user?.interests) {
    setSelectedInterests(user.interests)
    }
  }, [user?.interests]);

  const toggleInterest = useCallback((label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  }, []);

  // Initialize react-hook-form
  const { handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      interests: [],
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async () => {
    setIsLoading(true);
    try {
      await updateUser({ interests: selectedInterests });
      setIsLoading(false);
      SelectInterestModal.onClose(); // Close modal on success
    } catch (error) {
      console.error("Failed to update interests", error);
      setIsLoading(false);
    }
  };

  const bodyContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="text-left">
          <div className="font-light text-neutral-500 mt-3">
            Pick some interests you enjoy that you want to show on your profile.
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {interests.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => toggleInterest(label)}
              className={`flex items-center px-3 py-2 rounded-full border ${
                selectedInterests.includes(label)
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300 hover:border-blue-500"
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    ),
    [selectedInterests, toggleInterest]
  );

  const footerContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">{`${selectedInterests.length}/${interests.length} selected`}</p>
          <Button
            label="Continue"
            onClick={handleSubmit(onSubmit)}
            className="w-auto px-4"
            disabled={isLoading}
          />
        </div>
      </div>
    ),
    [selectedInterests, handleSubmit, onSubmit, isLoading]
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={SelectInterestModal.isOpen}
      title="What You're Into"
      actionLabel="Continue"
      onClose={SelectInterestModal.onClose}
      onSubmit={handleSubmit(onSubmit)} // Submit when form is submitted
      body={bodyContent}
      footer={footerContent}
    />
  );
}
