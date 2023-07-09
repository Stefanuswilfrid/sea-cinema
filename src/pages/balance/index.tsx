import Container from "@/components/Container";
import React from "react";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import getUser from "@/actions/getUser";
import { useState } from "react";

export type UserData = {
  id: string;
  username: string;
  name: string;
  age: number;
  balance: number;
};

export default function Balance() {
  const router = useRouter();
  const { data, status, update } = useSession();

  const currentUser = data?.user as UserData;

  return (
    <Container>
      <div className="h-screen text-center flex mt-16 flex-col items-center">
        <h1 className="text-2xl font-bold ">Available Balance</h1>
        <h1 className="text-5xl font-bold mt-8">
          <span>$</span> {currentUser.balance} <span>AUD</span>
        </h1>
        <div className="flex  mt-6 gap-8">
          <button
            className="btn bg-violet-500 py-3 
                px-5 rounded-lg k text-white font-bold"
          >
            Withdraw
          </button>
          <button
            onClick={async () => {
              await update({
                user: {
                  balance: 20000,
                },
              });
            }}
            className="btn bg-violet-500 py-3 px-5 rounded-lg text-white font-bold"
          >
            Top Up
          </button>
        </div>

        <div className="w-5/6 mt-12">
          <h1 className="text-left font-black text-xl ">Choose Sum:</h1>
          <div className="grid grid-cols-2  mt-6 gap-10">
            <div className="border text-xl hover:bg-gray-300 duration-300 hover:text-white   border-gray-300 text-black font-bold rounded-md py-4">
              $5
            </div>
            <div className="border text-xl hover:bg-gray-300 duration-300 hover:text-white  border-gray-300 text-black font-bold rounded-md py-4">
              $20
            </div>
            <div className="border text-xl hover:bg-gray-300 duration-300 hover:text-white  border-gray-300 text-black font-bold rounded-md py-4">
              $50
            </div>
            <div className="border text-xl hover:bg-gray-300 duration-300 hover:text-white  border-gray-300 text-black font-bold rounded-md py-4">
              $100
            </div>
          </div>
        </div>

        <div className="w-5/6 mt-12"></div>
      </div>
    </Container>
  );
}
