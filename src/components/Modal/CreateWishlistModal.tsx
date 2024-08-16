import React, { useState } from 'react'
import Heading from '../Heading'
import Modal from './Modal'
import Input from './Input'
import { 
    FieldValues, 
    SubmitHandler, 
    useForm
  } from "react-hook-form";
export default function CreateWishlistModal() {
    const [isLoading, setIsLoading] = useState(false);

    let bodyContent = (
        <div className="flex flex-col gap-8">
         <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
         
          <hr />
        </div>
      )
  return (
<Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />  )
}
