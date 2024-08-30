import React from 'react';

interface BookingSummaryProps {
  destination: string;
  country: string;
  rating: number;
  travelers: number;
  seats: string[];
  insurance: boolean;
  refundable: boolean;
  vat: number;
  price: number;
  grandTotal: number;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  destination,
  country,
  rating,
  travelers,
  seats,
  insurance,
  refundable,
  vat,
  price,
  grandTotal,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{destination}</h2>
          <p className="text-sm text-gray-500">{country}</p>
        </div>
        <div className="flex items-center">
          <span className="text-orange-400 text-lg font-semibold">{rating}</span>
          <svg className="w-4 h-4 text-orange-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.285 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.36 2.392a1 1 0 00-.363 1.118l1.285 3.967c.3.921-.755 1.688-1.54 1.118l-3.36-2.392a1 1 0 00-1.175 0l-3.36 2.392c-.784.57-1.84-.197-1.54-1.118l1.285-3.967a1 1 0 00-.363-1.118L2.035 8.395c-.784-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.049 2.927z"/>
          </svg>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <span>Traveler</span>
          <span>{travelers} person</span>
        </div>
        <div className="flex justify-between">
          <span>Seat</span>
          <span>{seats.join(', ')}</span>
        </div>
        <div className="flex justify-between">
          <span>Insurance</span>
          <span>{insurance ? 'YES' : 'NO'}</span>
        </div>
        <div className="flex justify-between">
          <span>Refundable</span>
          <span>{refundable ? 'YES' : 'NO'}</span>
        </div>
        <div className="flex justify-between">
          <span>VAT</span>
          <span>{vat}%</span>
        </div>
        <div className="flex justify-between">
          <span>Price</span>
          <span>Rp {price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-purple-600">
          <span>Grand Total</span>
          <span>Rp {grandTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
