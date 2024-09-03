import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBigUp, WalletIcon, CreditCard, ChevronDown } from 'lucide-react';
import { Transaction } from '@/pages/balance';
import { formatDate } from '@/libs/utils/time';
import ShoppingBagIcon from '../Icons/ShoppingBagIcon';
import { useRouter } from 'next/navigation';

interface TransactionProps {
  transactions: Transaction[] | null;
}

interface TransactionDetail {
  icon: JSX.Element;
  description: string;
}

function getTransactionDetails(type: string): TransactionDetail {
  switch (type) {
    case 'TOP_UP':
      return {
        icon: <ArrowBigUp className="w-6 h-6" />,
        description: 'Account Top Up'
      };
    case 'WITHDRAWAL':
      return {
        icon: <WalletIcon className="w-6 h-6" />,
        description: 'Account Withdrawal'
      };
    case 'MOVIE_TICKET_BOOKING':
      return {
        icon: <ShoppingBagIcon className="w-6 h-6" />,
        description: 'Movie Ticket Purchase'
      };
    default:
      return {
        icon: <ShoppingBagIcon className="w-6 h-6" />,
        description: 'Miscellaneous Purchase'
      };
  }
}

const TransactionList: React.FC<TransactionProps> = ({ transactions }) => {
  const router = useRouter();
  const [visibleTransactions, setVisibleTransactions] = useState(5);

  const loadMore = () => {
    setVisibleTransactions(prevVisible => Math.min(prevVisible + 5, transactions?.length || 0));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (transactions === null) {
    return (
      <motion.div
        variants={emptyStateVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="text-center p-4 mt-12"
      >
        <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-semibold">Unable to load transactions</h3>
        <p className="mt-1 text-sm text-muted-foreground">Please try again later.</p>
        <div className="mt-6">
          <button
            onClick={() => router.push("/")}
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Explore Movies
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {transactions.length !== 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="space-y-4"
        >
          {transactions.slice(0, visibleTransactions).map(transaction => {
            const { icon, description } = getTransactionDetails(transaction.type);
            return (
              <motion.div
                key={transaction.id}
                variants={itemVariants}
                className="border text-card-foreground p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p className="font-medium">{description}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(transaction.createdAt)}</p>
                  </div>
                </div>
                <p className={`font-medium ${description === "Account Top Up" ? "text-green-500" : "text-red-500"}`}>
                  {description === "Account Top Up" ? "+" : "-"}${transaction.totalCost.toFixed(2)}
                </p>
              </motion.div>
            );
          })}
          {visibleTransactions < transactions.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-4"
            >
              <button
                onClick={loadMore}
                className="flex items-center gap-2"
              >
                Load More <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={emptyStateVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="text-center p-4 mt-12"
        >
          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">No Transactions</h3>
          <p className="mt-1 text-sm text-muted-foreground">You haven't made any transactions in the past.</p>
          <div className="mt-6">
            <button
              onClick={() => router.push("/")}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Explore Movies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionList;
