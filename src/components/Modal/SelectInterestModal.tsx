import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@/hooks/useMutation";
import { apiClient } from "@/libs/utils/api-client";
import useSelectInterestModal from "@/hooks/useSelectInterestModal";
import Input from "./Input";
import { useState } from "react";
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
    { icon: '🎭', label: 'Theatre' },
    { icon: '🏄', label: 'Water sports' },
  ];
export default function SelectInterestModal() {
    const SelectInterestModal = useSelectInterestModal();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const { trigger, isMutating } = useMutation('/profile/', async (url, payload) => {
      return await apiClient.post(url, payload);
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FieldValues>({
      defaultValues: {
      },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      // setIsLoading(true);
      
        
    }

    const bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="text-left">
          <div className="font-bold text-neutral-900 text-2xl ">
            What You're Into
          </div>
          <div className="font-light text-neutral-500 mt-3 ">
          Pick some interests you enjoy that you want to show on your profile.


</div>
        </div>
  
        <Input
          id="amount"
          label="Amount"
          type="number"
          disabled={isMutating}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
    


    const footerContent = (
      <div className="flex flex-col gap-4 ">
        <hr />
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full transition 
            rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 
            hover:bg-gradient-to-r hover:from-indigo-700 
            hover:to-indigo-800 text-lg py-3 text-md font-semibold text-white"
        >
          Top Up
        </button>
      </div>
    );

    return (
      <Modal
        disabled={isMutating}
        isOpen={SelectInterestModal.isOpen}
        title=""
        actionLabel="Continue"
        onClose={SelectInterestModal.onClose}
        onSubmit={() => {}}
        body={bodyContent}
        footer={footerContent}
      />
    );

  
}
