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

export default function Balance() {
  return (
    <>
    <AuthCheck>
      <BalancePage/>
    </AuthCheck>
    </>

  )
  
  
}
interface Transaction {
  id: string;
  movieName: string;
  createdAt: string;
  totalCost: number;
  quantity: number;
  seats: any;
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
                <p className="text-4xl font-bold">$5,234.56</p>
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
                <button onClick={()=>{topUpModal.onOpen()}} className="flex items-center bg-black text-white py-2 px-4 rounded-md">
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
                <button className="flex items-center bg-slate-200 text-black py-2 px-4 rounded-md">
                  <MinusIcon className="w-5 h-5 mr-2" />
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Recent Transactions</h2>
            {/* <h2>WIP</h2> */}
            <div className="mt-4 space-y-4">
  {transactions.length !== 0 ? (
    transactions.map((transaction) => (
      <div key={transaction.id} className="border text-card-foreground p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
            <ShoppingBagIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Amazon Purchase</p>
            <p className="text-sm text-muted-foreground">{transaction.createdAt} Aug 15, 2023</p>
          </div>
        </div>
        <p className="text-red-500 font-medium"> -${transaction.totalCost} </p>
      </div>
    ))
  ) : (
    <div className="text-center p-4 mt-12">
      <CreditCardIcon className="mx-auto h-12 w-12" />
      <h3 className="mt-2 text-base font-semibold text-gray-900">No Transactions</h3>
      <p className="mt-1 text-sm text-gray-500">You haven't made any transactions in the past.</p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Explore Movies
        </button>
      </div>
    </div>
  )}
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
