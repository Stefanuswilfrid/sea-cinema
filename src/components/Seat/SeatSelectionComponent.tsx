import React from 'react';

interface Seat {
  id: string;
  status: 'available' | 'selected' | 'unavailable';
}

interface SeatSelectionProps {
  seats: Seat[];
  handleSeatClick: (clickedSeat: Seat) => void;
}

const ROWS = ['A', 'B', 'C', 'D', 'E'];
const COLUMNS = 5;

const SeatSelectionComponent: React.FC<SeatSelectionProps> = ({ seats, handleSeatClick }) => (
  <div className="mb-8 relative">
    <div className="w-full h-16 bg-gray-400 rounded-t-lg flex items-center justify-center text-white text-lg font-semibold mb-8">
      Movie Screen
    </div>
    
    <div className="flex">
      <div className="w-10  sm:mt-4 mr-4">
        {ROWS.map(row => (
          <div key={row} className="h-[62px] sm:h-[90px] flex items-center justify-center font-semibold text-sm sm:text-xl text-gray-700">
            {row}
          </div>
        ))}
      </div>
      <div className="flex-grow">
        {ROWS.map(row => (
          <div key={row} className="flex justify-between mb-4">
            {Array.from({ length: COLUMNS }, (_, columnIndex) => {
              const seat = seats.find(s => s.id === `${row}${columnIndex + 1}`);
              return (
                <button
                  key={`${row}${columnIndex + 1}`}
                  className={`w-12 h-12 sm:w-[76px] sm:h-[76px] rounded-2xl flex items-center justify-center text-sm sm:text-lg font-semibold
                    ${seat?.status === 'available' ? 'bg-violet-200 text-purple-800 hover:bg-violet-100' : 
                      seat?.status === 'selected' ? 'bg-primary text-white' : 
                      'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  onClick={() => seat && handleSeatClick(seat)}
                  disabled={seat?.status === 'unavailable'}
                >
                  {seat?.status === 'selected' ? 'YOU' : seat?.id}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SeatSelectionComponent;
