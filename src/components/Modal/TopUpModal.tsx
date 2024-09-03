import React, { useState } from "react";
import Modal from "./Modal";
import useTopUpModal from "@/hooks/useTopUpModal";
import Input from "./Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useMutation } from "@/hooks/useMutation";
import { apiClient } from "@/libs/utils/api-client";

export default function TopUpModal() {
  const topUpModal = useTopUpModal();
  const { updateUser, user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      amount: 0.0,
    },
  });

  const { trigger, isMutating } = useMutation('/transaction/topup', async (url, payload) => {
    console.log("payload", payload); 
    return await apiClient.post(url, payload);
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // setIsLoading(true);
    const { amount } = data;
    if (amount <= 0) {
      toast.error("Balance must be more than 0");
      // setIsLoading(false);
      return;
    } else {
      updateUser({
        balance: parseFloat(amount),
      });
      trigger({userId: user.id,totalCost:parseFloat(amount)}).finally(()=> {
        // setIsLoading(false);
      topUpModal.onClose();
      })
      
    }
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <div className="font-light text-neutral-500 ">
          Enter the amount you'd like to add to your balance.
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
      isOpen={topUpModal.isOpen}
      title="Top Up Balance"
      actionLabel="Continue"
      onClose={topUpModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
