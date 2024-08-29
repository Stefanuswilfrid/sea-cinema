import React, { useState } from 'react'

const ROWS = ['A', 'B', 'C', 'D', 'E']
const COLUMNS = 5

type SeatStatus = 'available' | 'selected' | 'unavailable'

interface Seat {
  id: string
  status: SeatStatus
}

export default function Component() {
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: ROWS.length * COLUMNS }, (_, index) => ({
      id: `${ROWS[Math.floor(index / COLUMNS)]}${(index % COLUMNS) + 1}`,
      status: Math.random() > 0.8 ? 'unavailable' : 'available',
    }))
  )

  const handleSeatClick = (clickedSeat: Seat) => {
    if (clickedSeat.status === 'unavailable') return

    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === clickedSeat.id
          ? { ...seat, status: seat.status === 'available' ? 'selected' : 'available' }
          : seat
      )
    )
  }

  const selectedSeats = seats.filter(seat => seat.status === 'selected')

  return (
    <div className="w-full min-h-screen  p-8">
      <div className="max-w-[960px] mx-auto bg-white rounded-lg  overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Select Your Favorite Seat</h1>
            
            <div className="flex justify-start space-x-8 mb-8">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-md bg-violet-300 mr-2"></div>
                <span className="text-base text-gray-600">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-md bg-primary mr-2"></div>
                <span className="text-base text-gray-600">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-md bg-gray-300 mr-2"></div>
                <span className="text-base text-gray-500">Unavailable</span>
              </div>
            </div>

            <div className="mb-8 relative">
              <div className="w-full h-16 bg-gray-400 rounded-t-lg flex items-center justify-center text-white text-lg font-semibold mb-8">
                Movie Screen
              </div>
              
              <div className="flex">
                <div className="w-10 mt-2 mr-4">
                  {ROWS.map(row => (
                    <div key={row} className="h-24 flex items-center justify-center font-semibold text-xl text-gray-700">
                      {row}
                    </div>
                  ))}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-4">
                    
                  </div>
                  {ROWS.map(row => (
                    <div key={row} className="flex justify-between mb-4">
                      {Array.from({ length: COLUMNS }, (_, columnIndex) => {
                        const seat = seats.find(s => s.id === `${row}${columnIndex + 1}`)
                        return (
                          <button
                            key={`${row}${columnIndex + 1}`}
                            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-lg font-semibold
                              ${seat?.status === 'available' ? 'bg-violet-200 text-purple-800 hover:bg-violet-100' : 
                                seat?.status === 'selected' ? 'bg-primary text-white' : 
                                'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            onClick={() => seat && handleSeatClick(seat)}
                            disabled={seat?.status === 'unavailable'}
                          >
                            {seat?.status === 'selected' ? 'YOU' : seat?.id}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

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

            <button className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary/80 transition duration-300">
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}