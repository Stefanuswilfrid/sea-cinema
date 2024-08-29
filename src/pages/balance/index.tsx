import Container from "@/components/Container";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from 'next/link';

import { useRouter } from "next/router";
import { useState } from "react";
import AuthCheck from "@/components/AuthCheck";
import SEO from "@/components/SEO";
import { CurrentUser } from "@/types";
import { useUser } from "@/hooks/useUser";
import ShoppingBagIcon from "@/components/Icons/ShoppingBagIcon";
import MenuIcon from "@/components/Icons/MenuIcon";
import BriefcaseIcon from "@/components/Icons/BriefcaseIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import MinusIcon from "@/components/Icons/MinusIcon";
import CreditCardIcon from "@/components/Icons/CreditCardIcon";
import useTopUpModal from "@/hooks/useTopUpModal";
import TransactionList from "@/components/Transactions/TransactionList";
import useWithdrawModal from "@/hooks/useWithdrawModal";

export default function Balance() {
  return (
    <>
    <AuthCheck>
      <BalancePage/>
    </AuthCheck>
    </>

  )
  
  
}
export interface Transaction {
  id: string;
  type: string; // This could be a specific union type like 'TOP_UP' | 'WITHDRAWAL' | 'MOVIE_TICKET_BOOKING' if known
  totalCost: number;
  createdAt: string; // Assuming ISO string, adjust as necessary
}
function BalancePage(){
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [isHasChoosen, setHasChoosen] = useState<Boolean>(false);
  const [isTopUp, setIsTopUp] = useState<Boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);  
  const [errorDeposit, setErrorDeposit] = useState<Boolean>(false);
  const [errorWithdraw, setErrorWithdraw] = useState<Boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transaction/get");
        if (response.ok) {
          const transactionsData = await response.json();
          setTransactions(transactionsData as Transaction[]);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  const router = useRouter();
  // const { data, status, update } = useSession();
  const { updateUser, user  } = useUser()


  const currentUser = user ;

  const handleSubmitDeposit = async() => {
    if (selectedAmount == 0) {
      setErrorDeposit(true);
    } else {
      setErrorDeposit(false);
      updateUser({ 
        balance: selectedAmount

      })
      // await update({
      //   user: {
      //     balance: selectedAmount,
      //   },
      // });
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
      updateUser({balance: -withdrawAmount})
      
      toast.success("Withdrawn Successfull!")
      setWithdrawAmount(0);
      
    }


  }

  const topUpModal = useTopUpModal();
  const withdrawModal = useWithdrawModal();


  return (
    <Container>
      <SEO
        title="User Balance | SEA Cinema"
        desc="User Balance Page, to withdraw and top up."
      />
      {currentUser ?
      // <div className="h-screen text-center flex mt-16 flex-col items-center">
      //   <h1 className="text-2xl font-bold ">Available Balance</h1>
      //   <h1 className="text-5xl font-bold mt-8">
      //     <span className="font-semibold">$</span> {currentUser?.balance}{" "}
      //     <span className="text-4xl text-gray-400">AUD</span>
      //   </h1>
      //   <div className="flex  mt-6 gap-8">
      //     <button
      //       onClick={() => {
      //         setIsTopUp(false), setHasChoosen(true);
      //       }}
      //       className="btn bg-red-600 py-3 
      //           px-5 rounded-lg k text-white font-bold
      //           hover:scale-110 hover:-translate-y-1 transition 
      //           ease-in-out delay-150 duration-300
                
      //           "
      //     >
      //       Withdraw
      //     </button>
      //     <button
      //       onClick={() => {
      //         setIsTopUp(true), setHasChoosen(true);
      //       }}
      //       className="btn bg-green-600 py-3 px-5 rounded-lg 
      //       text-white font-bold hover:scale-110 hover:-translate-y-1 t
      //       ransition ease-in-out delay-150 duration-300"
      //     >
      //       Top Up
      //     </button>
      //   </div>

      //   {isHasChoosen ? (
      //     isTopUp ? (
      //       <ChooseDeposit
      //         selectedAmount={selectedAmount}
      //         handleAmountClick={handleAmountClick}
      //         handleSubmit={handleSubmitDeposit}
      //         errorDeposit={errorDeposit}
      //       />
      //     ) : (
      //       <WithDraw 
      //         balance={currentUser?.balance} 
      //         withdrawAmount={withdrawAmount} 
      //         handleSubmit={handleWithdraw} 
      //         errorWithdraw={errorWithdraw}
      //         setWithDrawAmount={setWithdrawAmount}
      //         />
      //     )
      //   ) : null}
      // </div>
      <div className="bg-background text-foreground min-h-screen flex flex-col mt-16">
     
      <main className="flex-1 py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-violet-500 text-primary-foreground p-8 rounded-2xl">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm">Current Balance</p>
                <p className="text-4xl font-bold">$ {user.balance}</p>
              </div>
              <CreditCardIcon className="w-12 h-12" />
            </div>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className=" border text-card-foreground p-6 rounded-2xl">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <p className="text-sm">Top Up</p>
                  <p className="text-2xl font-bold">Add Funds</p>
                </div>
                <button onClick={()=>{topUpModal.onOpen()}} className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded-md">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Top Up
                </button>
              </div>
            </div>
            <div className="border text-card-foreground p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Withdraw</p>
                  <p className="text-2xl font-bold">Cash Out</p>
                </div>
                <button onClick={()=>{withdrawModal.onOpen()}} className="flex items-center bg-white border-2 border-primary  text-primary py-2 px-4 rounded-md">
                  <MinusIcon className="w-5 h-5 mr-2" />
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Recent Transactions</h2>
            <div className="mt-4 space-y-4">
              <TransactionList transactions={transactions}/>
</div>

          </div>
        </div>
      </main>
      
    </div>
      
      :<div className="h-screen text-center place-items-center items-center flex justify-center"> 
      <Link href="/">You must be signed in</Link></div>
}
    </Container>
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
