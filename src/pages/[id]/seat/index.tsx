import SeatBookingSummary from '@/components/Seat/SeatBookingSummary'
import SeatLegend from '@/components/Seat/SeatLegend'
import SeatSelectionComponent from '@/components/Seat/SeatSelectionComponent'
import React, { useState } from 'react'

const ROWS = ['A', 'B', 'C', 'D', 'E']
const COLUMNS = 5

type SeatStatus = 'available' | 'selected' | 'unavailable'

interface Seat {
  id: string
  status: SeatStatus
}

export default function ChooseSeat() {
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
    <div className="w-full min-h-screen  p-2 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg  overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 p-4 sm:p-8">
<SeatLegend/>
<SeatSelectionComponent seats={seats} handleSeatClick={handleSeatClick} />


          </div>
          <SeatBookingSummary selectedSeats={selectedSeats} />



        </div>
      </div>
    </div>
  )
}