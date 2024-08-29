import React, { useState } from 'react'
import Modal from './Modal';
import useTopUpModal from '@/hooks/useTopUpModal';
import Input from './Input';
import { 
    FieldValues, 
    SubmitHandler, 
    useForm
  } from "react-hook-form";

export default function TopUpModal() {
    const [isLoading, setIsLoading] = useState(false);
    const topUpModal = useTopUpModal();

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          amount: 0.0,
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    setIsLoading(true);

    
  }
    const bodyContent = (
        <div className="flex flex-col gap-4">
          
            <div className='text-center' >
          
          <div className="font-light text-neutral-500 ">
            Enter the amount you'd like to add to your balance. 
          </div>
        </div>
    
          <Input
            id="amount"
            label="Amount"
            type='number'
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
          
        </div>
    )

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
      )
    
    


  return (
<Modal
      disabled={isLoading}
      isOpen={topUpModal.isOpen}
      title="Top Up Balance"
      actionLabel="Continue"
      onClose={topUpModal.onClose}
      onSubmit={()=>{}}
      body={bodyContent}
      footer={footerContent}
    />  )
}
