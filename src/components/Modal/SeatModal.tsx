"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useMemo, useState } from "react";

import useSeatModal from "../../hooks/useSeatModal";
import Modal from "./Modal";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SeatModal = ({ movieName }: { movieName: string }) => {
  const seatModal = useSeatModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [seatArray, setSeatArray] = useState<Array<boolean>>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    fetchSeatsByMovieName();
  }, []);


  const handleSeatClick = (index: number) => {
    if (selectedSeats.includes(index.toString())) {
      // If the seat is already selected, remove it from the selectedSeats array
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seatIndex) => seatIndex !== index.toString())
      );
    } else if (selectedSeats.length < 6 && !seatArray[index]) {
      // If the seat is not selected and less than 6 seats are already selected
      setSelectedSeats((prevSelectedSeats) => [
        ...prevSelectedSeats,
        index.toString(),
      ]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Router.pu
    // if (step !== STEPS.PRICE) {
    //   return onNext();
    // }

    // setIsLoading(true);

    // axios.post('/api/listings', data)
    // .then(() => {
    //   toast.success('Listing created!');
    //   router.refresh();
    //   reset();
    //   setStep(STEPS.CATEGORY)
    //   rentModal.onClose();
    // })
    // .catch(() => {
    //   toast.error('Something went wrong.');
    // })
    // .finally(() => {
    //   setIsLoading(false);
    // })
  }

  const fetchSeatsByMovieName = async () => {
    try {
      const response = await fetch(`/api/movie/seats?movieName=${movieName}`);
      if (response.ok) {
        const seats = await response.json();
        setSeatArray(seats);
      } else {
        console.log(`Failed to fetch seats for movie "${movieName}".`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <div className="text-2xl font-bold">Select your seat position</div>
        <div className="font-light text-neutral-500 mt-2">🟢 🔴 ⚪ Screen</div>
      </div>
      <div className="d-flec items-center text-center justify-center">
        <div className="grid grid-cols-8 gap-6 mx-auto w-fit">
          {seatArray.map((seatValue, index) => (
            <div
              key={index}
              className={`w-[1.6rem] h-[1.6rem] rounded-md cursor-pointer ${
                seatValue
                  ? "bg-green-600" // Occupied seat
                  : selectedSeats.includes(index.toString())
                  ? "bg-green-600" // Selected seat
                  : selectedSeats.length === 6
                  ? "bg-red-600" // Max seats selected
                  : "bg-gray-300" // Available seat
              }`}
              onClick={() => handleSeatClick(index)}
            ></div>
          ))}
        </div>
        <button
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:bg-gradient-to-r hover:from-indigo-700 
        hover:to-indigo-800 text-white font-bold py-2 px-4 rounded mt-8"
        onClick={()=>{router.push("/payment")}}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={seatModal.isOpen}
      title="Choose your seat !"
      actionLabel="action label"
      onSubmit={() => {}}
      onClose={seatModal.onClose}
      body={bodyContent}
    />
  );
};

export default SeatModal;
