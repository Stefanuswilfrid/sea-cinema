import Container from "@/components/Container";
import React, { useEffect } from "react";

import Link from "next/link";

import { useRouter } from "next/router";
import { useState } from "react";
import AuthCheck from "@/components/AuthCheck";
import SEO from "@/components/SEO";
import { CurrentUser } from "@/types";
import { useUser } from "@/hooks/useUser";

import PlusIcon from "@/components/Icons/PlusIcon";
import MinusIcon from "@/components/Icons/MinusIcon";
import CreditCardIcon from "@/components/Icons/CreditCardIcon";
import useTopUpModal from "@/hooks/useTopUpModal";
import TransactionList from "@/components/Transactions/TransactionList";
import useWithdrawModal from "@/hooks/useWithdrawModal";
import { motion } from "framer-motion";

export default function Balance() {
  return (
    <>
      <AuthCheck>
        <BalancePage />
      </AuthCheck>
    </>
  );
}
export interface Transaction {
  id: string;
  type: string;
  totalCost: number;
  createdAt: string;
}
function BalancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
  const { user } = useUser();

  const currentUser = user;
  const topUpModal = useTopUpModal();
  const withdrawModal = useWithdrawModal();

  return (
    <Container>
      <SEO
        title="User Balance | SEA Cinema"
        desc="User Balance Page, to withdraw and top up."
      />
      {currentUser ? (
        <motion.div
        initial={{ height: 0, opacity: 0 }}
        
        animate={{
          height: "auto",
          opacity: 1,
          transition:{
            delay:0.2
          }
        }}
        exit={{
          height: 0,
          opacity: 0,
          transition:{
            delay:0.5
          }
        }}
      >
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
                    <button
                      onClick={() => {
                        topUpModal.onOpen();
                      }}
                      className="flex items-center bg-indigo-600 text-white font-extrabold py-2 px-4 rounded-md hover:bg-indigo-600/80"
                    >
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
                    <button
                      onClick={() => {
                        withdrawModal.onOpen();
                      }}
                      className="flex items-center bg-white border-2 border-primary font-extrabold   text-primary py-2 px-4 rounded-md hover:opacity-60"
                    >
                      <MinusIcon className="w-5 h-5 mr-2" />
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold">Recent Transactions</h2>
                <div className="mt-4 space-y-4">
                  <TransactionList transactions={transactions} />
                </div>
              </div>
            </div>
          </main>
        </div>
        </motion.div>
      ) : (
        <div className="h-screen text-center place-items-center items-center flex justify-center">
          <Link href="/">You must be signed in</Link>
        </div>
      )}
    </Container>
  );
}
