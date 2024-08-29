import React from 'react';

interface Seat {
  id: string;
  status: 'available' | 'selected' | 'unavailable';
}

interface BookingSummaryProps {
  selectedSeats: Seat[];
}

const SeatBookingSummary: React.FC<BookingSummaryProps> = ({ selectedSeats }) => (
  <div className="w-full lg:w-1/3 bg-white p-8 border-t lg:border-l lg:border-t-0 border-gray-200">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Booking Summary</h2>
    
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Selected Seats</h3>
      {selectedSeats.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedSeats.map(seat => (
            <span key={seat.id} className="bg-primary text-purple-100 px-3 py-1 rounded-full text-sm font-semibold">
              {seat.id}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No seats selected</p>
      )}
    </div>

    <div className="flex justify-between items-center mb-8">
      <span className="text-lg text-gray-600">Total</span>
      <span className="text-2xl font-bold text-primary">
        AUD {(selectedSeats.length * 3500000).toLocaleString()}
      </span>
    </div>

    <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-primary/80 transition duration-300">
      Continue to Checkout
    </button>
  </div>
);

export default SeatBookingSummary;