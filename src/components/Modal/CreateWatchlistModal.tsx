'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { signIn } from 'next-auth/react';

import { useRouter } from "next/navigation";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";

import Modal from "./Modal";
import Input from "./Input";
import useWatchlistModal from "@/hooks/useWatchlistModal";


const CreateWatchlistModal = () => {
  const router = useRouter();
  const watchlistModal = useWatchlistModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    setIsLoading(true);

    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        watchlistModal.onClose();
      }
      
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  const onToggle = useCallback(() => {
    watchlistModal.onClose();
  }, [watchlistModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
    
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
      <p className="text-slate-500 text-sm font-black">{name?.length}/50 Characters</p>
      
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="
      text-neutral-500 items-center text-center mt-4 font-light flex justify-between w-full">
          <span 
            onClick={onToggle} 
            className="
              text-neutral-900
              cursor-pointer 
              hover:underline
              font-bold
            "
            > Clear</span>

            <button className="bg-black text-white px-6 py-3 rounded-md">
              Create
            </button>
      </div>
      {/* <button
        onClick={handleSubmit(onSubmit)}
        className="w-full transition 
      rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 
      hover:bg-gradient-to-r hover:from-indigo-700 
      hover:to-indigo-800 text-lg py-3 text-md font-semibold text-white"
      >
        Login
      </button> */}
      
      
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={watchlistModal.isOpen}
      title="Create Watchlist"
      actionLabel="Continue"
      onClose={watchlistModal.onClose}
      onSubmit={()=>{}}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default CreateWatchlistModal;