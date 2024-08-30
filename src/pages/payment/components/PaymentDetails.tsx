import React from 'react';

interface PaymentDetailsProps {
  balance: number;
  onPayNow: () => void;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  balance,
  onPayNow,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Pay
          </button>
          <span className="ml-4 text-gray-500">Rp {balance.toLocaleString()}</span>
        </div>
      </div>
      <button
        onClick={onPayNow}
        className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};
