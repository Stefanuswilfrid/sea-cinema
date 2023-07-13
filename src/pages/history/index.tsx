import Container from "@/components/Container";
import SEO from "@/components/SEO";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Transaction {
  id: string;
  movieName:string;
  createdAt: string;
  totalCost: number;
  quantity: number;
}


export default function index() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { data, status, update } = useSession();


  const deleteTransaction = async (transactionId: String) => {
    try {
      await axios.delete(`/api/transaction/delete`,{ data: { transactionId } });
      

      window.location.reload();
      // Perform any additional actions after successful deletion
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transaction/get");
        if (response.ok) {
          const transactionsData = await response.json();
          setTransactions(transactionsData);
        } else {
          console.log("Failed to fetch transactions.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <main>
      <SEO
        title="User Transaction History | SEA Cinema"
        desc="User Transaction History page."
      />
      <Container>
        <h1 className="mt-12 text-3xl font-extrabold ">Transactions History</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 mt-8 shadow-md rounded-md">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Cost
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                  {transaction.quantity} X    {transaction.movieName}
                  </th>
                  <td className="px-6 py-4">
                    {new Date(transaction.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
                   {"   "}AEST
                  </td>
                  <td className="px-6 py-4">$ {transaction.totalCost} AUD</td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-blue-600 hover:underline"
                      onClick={()=>{deleteTransaction(transaction.id)}}

                    >
                      Cancel Transaction
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}
