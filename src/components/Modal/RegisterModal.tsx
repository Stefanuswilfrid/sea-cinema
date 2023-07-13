import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import Modal from "./Modal";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "./Input";
import useLoginModal from "../../hooks/useLoginModal";

export interface IUser {
  name: string;
  username: string;
  age: number | null;
  password: string;
}

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      name: "",
      age: null,
      password: "",
    },
  });

    const onSubmit: SubmitHandler<FieldValues> = async (data : FieldValues) => {
        
      setIsLoading(true);
      await axios.post('/api/register', data)
      .then(() => {
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      })
    };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="text-start">
        <div className="text-2xl font-bold">Register</div>
        <div className="font-light text-neutral-500 mt-2">
          Create your account
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
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="age"
        label="Age"
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
  );

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
        Register
      </button>
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={() => {}}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Register "
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
