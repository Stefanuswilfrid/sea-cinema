import Container from "@/components/Container";
import React from "react";
import { useSession, getSession } from "next-auth/react";
import { motion, useAnimation } from "framer-motion";
import toast from "react-hot-toast";
import Link from 'next/link';

import { useRouter } from "next/router";
import { useState } from "react";
import AuthCheck from "@/components/AuthCheck";
import SEO from "@/components/SEO";

export type UserData = {
  id: string;
  username: string;
  name: string;
  age: number;
  balance: number;
};


export default function Balance() {
  return (
    <>
    <AuthCheck>
      <BalancePage/>
    </AuthCheck>
    </>

  )
  
  
}

function BalancePage(){
  const [isHasChoosen, setHasChoosen] = useState<Boolean>(false);
  const [isTopUp, setIsTopUp] = useState<Boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);  
  const [errorDeposit, setErrorDeposit] = useState<Boolean>(false);
  const [errorWithdraw, setErrorWithdraw] = useState<Boolean>(false);


  const router = useRouter();
  const { data, status, update } = useSession();

  const currentUser = data?.user as UserData;

  const handleSubmitDeposit = async() => {
    if (selectedAmount == 0) {
      setErrorDeposit(true);
    } else {
      setErrorDeposit(false);
      await update({
        user: {
          balance: selectedAmount,
        },
      });
      toast.success("Top Up Successfull!")
      setSelectedAmount(0);
      
    }
  };

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleWithdraw = async() => {
    if (withdrawAmount == 0) {
      return
    } else {
      setErrorDeposit(false);
      await update({
        user: {
          balance: -withdrawAmount,
        },
      });
      toast.success("Withdrawn Successfull!")
      setWithdrawAmount(0);
      
    }


  }

  return (
    <Container>
      <SEO
        title="User Balance | SEA Cinema"
        desc="User Balance Page, to withdraw and top up."
      />
      {currentUser ?
      <div className="h-screen text-center flex mt-16 flex-col items-center">
        <h1 className="text-2xl font-bold ">Available Balance</h1>
        <h1 className="text-5xl font-bold mt-8">
          <span className="font-semibold">$</span> {currentUser?.balance}{" "}
          <span className="text-4xl text-gray-400">AUD</span>
        </h1>
        <div className="flex  mt-6 gap-8">
          <button
            onClick={() => {
              setIsTopUp(false), setHasChoosen(true);
            }}
            className="btn bg-red-600 py-3 
                px-5 rounded-lg k text-white font-bold
                hover:scale-110 hover:-translate-y-1 transition 
                ease-in-out delay-150 duration-300
                
                "
          >
            Withdraw
          </button>
          <button
            onClick={() => {
              setIsTopUp(true), setHasChoosen(true);
            }}
            className="btn bg-green-600 py-3 px-5 rounded-lg 
            text-white font-bold hover:scale-110 hover:-translate-y-1 t
            ransition ease-in-out delay-150 duration-300"
          >
            Top Up
          </button>
        </div>

        {isHasChoosen ? (
          isTopUp ? (
            <ChooseDeposit
              selectedAmount={selectedAmount}
              handleAmountClick={handleAmountClick}
              handleSubmit={handleSubmitDeposit}
              errorDeposit={errorDeposit}
            />
          ) : (
            <WithDraw 
              balance={currentUser?.balance} 
              withdrawAmount={withdrawAmount} 
              handleSubmit={handleWithdraw} 
              errorWithdraw={errorWithdraw}
              setWithDrawAmount={setWithdrawAmount}
              />
          )
        ) : null}
      </div>:<div className="h-screen text-center place-items-center items-center flex justify-center"> 
      <Link href="/">You must be signed in</Link></div>
}
    </Container>
  );
  
}

interface ChooseDepositProps {
  selectedAmount: number | undefined;
  handleAmountClick: (amount: number) => void;
  handleSubmit: () => void;
  errorDeposit: Boolean;
}

function ChooseDeposit({
  selectedAmount,
  handleAmountClick,
  handleSubmit,
  errorDeposit,
}: ChooseDepositProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: "spring",
        duration: 2,
      }}
      className="w-5/6 mt-12  transition ease-linear   "
    >
      <h1 className="text-center md:text-left font-black text-xl ">Choose Sum:</h1>
      <div className="grid grid-cols-2  mt-6 gap-10">
        <div
          className={`cursor-pointer border text-xl hover:bg-violet-600 duration-300 hover:text-white ${
            selectedAmount === 5
              ? "bg-violet-600 text-white"
              : "border-gray-300 text-black"
          } font-bold rounded-md py-4`}
          onClick={() => handleAmountClick(5)}
        >
          $5
        </div>
        <div
          className={`cursor-pointer border text-xl hover:bg-violet-600 duration-300 hover:text-white ${
            selectedAmount === 20
              ? "bg-violet-600 text-white"
              : "border-gray-300 text-black"
          } font-bold rounded-md py-4`}
          onClick={() => handleAmountClick(20)}
        >
          $20
        </div>
        <div
          className={`cursor-pointer border text-xl hover:bg-violet-600 duration-300 hover:text-white ${
            selectedAmount === 50
              ? "bg-violet-600 text-white"
              : "border-gray-300 text-black"
          } font-bold rounded-md py-4`}
          onClick={() => handleAmountClick(50)}
        >
          $50
        </div>
        <div
          className={`
          cursor-pointer border text-xl hover:bg-violet-500 duration-300 hover:text-white ${
            selectedAmount === 100
              ? "bg-violet-500 text-white"
              : "border-gray-300 text-black"
          } font-bold rounded-md py-4`}
          onClick={() => handleAmountClick(100)}
        >
          $100
        </div>
      </div>
      <button 
              onClick={handleSubmit}

      className="bg-violet-600 mt-6 mr-auto flex ml-auto md:ml-0 md:items-start p-3 
      rounded-lg text-white font-bold hover:-translate-y-1 transition 
      ease-in-out delay-150 duration-300 hover:scale-110">Confirm Top Up</button>

      {errorDeposit && (
        <p className="text-red-500 text-xs italic text-left mt-3">
          Choose an amount
        </p>
      )}
    </motion.div>
  );
}

interface WithDrawProps {
  balance: number ;
  withdrawAmount: number;
  handleSubmit: () => void;
  errorWithdraw: Boolean;
  setWithDrawAmount : React.Dispatch<React.SetStateAction<number>>;
}

function WithDraw({ balance,withdrawAmount,handleSubmit,errorWithdraw, setWithDrawAmount }: WithDrawProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        duration: 2,
      }}
      className="w-5/6 mt-12  transition ease-linear text-center md:text-left  "
    >
      <h1 className="text-2xl font-black">Withdrawal Amount : </h1>
      <div className="mt-6 flex items-center mb-4">
        <form action="" className="flex mx-auto md:mx-0" onSubmit={handleSubmit}>
        <label htmlFor="" className="text-4xl font-black">
          AU$
        </label>
        <input
          type="text"
          className="font-black ml-4 p-2
        peer focus:outline-none text-lg"
          placeholder="Enter amount"
          value={withdrawAmount.toString()}
          onChange={(e) => {
            const value = e.target.value;
            const amount = value !== "" ? parseInt(value) : 0;
            setWithDrawAmount(amount);
          }}

        />
        </form>
      </div>
      <span className="text-gray-400 text-sm">
        Available to Withdraw: {balance}{" "}
        <button className=" text-left ml-3 text-violet-500" onClick={()=>{setWithDrawAmount(balance)}}>withdraw all</button>
      </span>
      <button 
      onClick={handleSubmit}
      className="block mt-4 hover:-translate-y-1 transition mx-auto md:mx-0
      ease-in-out delay-150 duration-300 hover:scale-110 bg-violet-500 p-3 text-white rounded-md">Withdraw</button>
      {errorWithdraw && (
        <p className="text-red-500 text-xs italic text-center mt-3 flex items-center mx-auto md:mx-0 w-fit">
          Maximum amount that can be withdrawn is {balance}
        </p>
      )}
    </motion.div>
  );
}
