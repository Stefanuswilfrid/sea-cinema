import React, { useState } from 'react'
import Modal from './Modal';
import useTopUpModal from '@/hooks/useTopUpModal';
import Input from './Input';
import { 
    FieldValues, 
    SubmitHandler, 
    useForm
  } from "react-hook-form";
import useWithdrawModal from '@/hooks/useWithdrawModal';
import toast from 'react-hot-toast';
import { useMutation } from '@/hooks/useMutation';
import { apiClient } from '@/libs/utils/api-client';
import { useUser } from '@/hooks/useUser';

export default function WithdrawModal() {
    const topUpModal = useWithdrawModal();
    const { updateUser, user } = useUser();


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

    const { trigger, isMutating } = useMutation('/transaction/withdraw', async (url, payload) => {
      console.log("payload", payload); 
      return await apiClient.post(url, payload);
    });

    const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    const { amount } = data;
    if (amount <= 0) {
      toast.error("Balance must be more than 0");
      return;
    } else {
      updateUser({
        balance: -parseFloat(amount),
      });
      trigger({userId: user.id,totalCost:parseFloat(amount)}).finally(()=> {
      topUpModal.onClose();
      })
      
    }

    
  }
    const bodyContent = (
        <div className="flex flex-col gap-4">
          
            <div className='text-center' >
          
          <div className="font-light text-neutral-500 ">
            Enter the amount you'd like to withdraw from your balance. 
          </div>
        </div>
    
          <Input
            id="amount"
            label="Amount"
            type='number'
            disabled={isMutating}
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
            Withdraw
          </button>
          
          
        </div>
      )
    
    


  return (
<Modal
      disabled={isMutating}
      isOpen={topUpModal.isOpen}
      title="Top Up Balance"
      actionLabel="Continue"
      onClose={topUpModal.onClose}
      onSubmit={()=>{}}
      body={bodyContent}
      footer={footerContent}
    />  )
}
