import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@/hooks/useMutation";
import { apiClient } from "@/libs/utils/api-client";
import useSelectInterestModal from "@/hooks/useSelectInterestModal";
import { useState, useCallback, useMemo } from "react";

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
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { trigger, isMutating } = useMutation('/profile/', async (url, payload) => {
    return await apiClient.post(url, payload);
  });

  // Memoize the toggleInterest function to avoid unnecessary re-renders
  const toggleInterest = useCallback((label: string) => {
    setSelectedInterests(prev =>
      prev.includes(label)
        ? prev.filter(i => i !== label)
        : [...prev, label]
    );
  }, []);

  const { handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Handle form submission logic
  };

  const bodyContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="text-left">
        <div className="font-light text-neutral-500 mt-3">
          Pick some interests you enjoy that you want to show on your profile.
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {interests.map(({ icon, label }) => (
          <button
            key={label}
            onClick={() => toggleInterest(label)}
            className={`flex items-center px-3 py-2 rounded-full border ${
              selectedInterests.includes(label)
                ? 'bg-blue-100 border-blue-500'
                : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            <span className="mr-2">{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  ), [selectedInterests, toggleInterest]);

  const footerContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {`${selectedInterests.length}/${interests.length} selected`}
        </p>
        <button
          onClick={handleSubmit(onSubmit)}
          className="transition rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-indigo-800 text-md font-semibold text-white py-2 px-4"
          disabled={isMutating}
        >
          Continue
        </button>
      </div>
    </div>
  ), [selectedInterests, handleSubmit, onSubmit, isMutating]);

  return (
    <Modal
      disabled={isMutating}
      isOpen={SelectInterestModal.isOpen}
      title="What You're Into"
      actionLabel="Continue"
      onClose={SelectInterestModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
