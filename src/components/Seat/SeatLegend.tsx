import React from 'react'

export default function SeatLegend() {
  return (
    <>
                <h1 className="mt-8 sm:mt-2 text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Select Your Favorite Seat</h1>
            
            <div className="flex justify-start space-x-8 mb-8">
              <div className="flex items-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-md bg-violet-300 mr-2"></div>
                <span className="text-sm sm:text-base text-gray-600">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-md bg-primary mr-2"></div>
                <span className="text-sm sm:text-base text-gray-600">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-md bg-gray-300 mr-2"></div>
                <span className="text-sm sm:text-base text-gray-500">Unavailable</span>
              </div>
            </div>
    </>

  )
}
