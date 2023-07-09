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


const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      password: ''
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
        loginModal.onClose();
      }
      
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      
        <div className='text-center' >
      <div className="text-2xl font-bold">
        Welcome !
      </div>
      <div className="font-light text-neutral-500 mt-2">
        Login to your account ! 
      </div>
    </div>

      <Input
        id="username"
        label="Username"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full transition 
      rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 
      hover:bg-gradient-to-r hover:from-indigo-700 
      hover:to-indigo-800 text-lg py-3 text-md font-semibold text-white"
      >
        Login
      </button>
      
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>Don't have an account ? 
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={()=>{}}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;