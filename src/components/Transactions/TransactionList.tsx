import { ArrowBigUp, WalletIcon } from 'lucide-react';
import React from 'react';
import ShoppingBagIcon from '../Icons/ShoppingBagIcon';
import CreditCardIcon from '../Icons/CreditCardIcon';
import { Transaction } from '@/pages/balance';
import { formatDate } from '@/libs/utils/time';

// Define TypeScript interfaces for props and transaction types
// interface Transaction {
//   id: string;
//   type: string; // This could be a specific union type like 'TOP_UP' | 'WITHDRAWAL' | 'MOVIE_TICKET_BOOKING' if known
//   totalCost: number;
//   createdAt: string; // Assuming ISO string, adjust as necessary
// }

interface TransactionProps {
  transactions: Transaction[];
}

interface TransactionDetail {
  icon: JSX.Element;
  description: string;
}

// Define a helper function to handle transaction type display
function getTransactionDetails(type: string): TransactionDetail {
  switch (type) {
    case 'TOP_UP':
      return {
        icon: <ArrowBigUp className="w-6 h-6 text-muted-foreground" />,
        description: 'Account Top Up'
      };
    case 'WITHDRAWAL':
      return {
        icon: <WalletIcon className="w-6 h-6 text-muted-foreground" />,
        description: 'Account Withdrawal'
      };
    case 'MOVIE_TICKET_BOOKING':
      return {
        icon: <ShoppingBagIcon className="w-6 h-6 text-muted-foreground" />,
        description: 'Movie Ticket Purchase'
      };
    default:
      return {
        icon: <ShoppingBagIcon className="w-6 h-6 text-muted-foreground" />,
        description: 'Miscellaneous Purchase'
      };
  }
}

const TransactionList: React.FC<TransactionProps> = ({ transactions }) => {
  return (
    transactions.length !== 0 ? (
      transactions.map(transaction => {
        const { icon, description } = getTransactionDetails(transaction.type);
        return (
          <div key={transaction.id} className="border text-card-foreground p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                {icon}
              </div>
              <div>
                <p className="font-medium">{description}</p>
                <p className="text-sm text-slate-500">{formatDate(transaction.createdAt)} </p>
              </div>
            </div>
            {description =="Account Top Up" ?
            <p className="text-green-500 font-medium">+${transaction.totalCost.toFixed(2)}</p>
            :<p className="text-red-500 font-medium">-${transaction.totalCost.toFixed(2)}</p>
      }
          </div>
        );
      })
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
    </div>    )
  );
};

export default TransactionList;
