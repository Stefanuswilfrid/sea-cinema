"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useMemo, useState } from "react";

import useSeatModal from "../../hooks/useSeatModal";
import Modal from "./Modal";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "@/libs/context";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import { fetcher } from "@/libs";

interface IMovie{
  title: string;
  seats: Array<Boolean>;
  price: number;
}

const SeatModal = () => {
  const { cartItems, addToCart } = useContext(CartContext);

  const seatModal = useSeatModal();
  const router = useRouter();
  const id = router.query.details as string;

  const [isLoading, setIsLoading] = useState(false);
  const [seatArray, setSeatArray] = useState<Array<boolean>>([]);
  // const [movies,setMovies] = useState<IMovie>();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const { data: movies, error } = useSWR<any>(`/movie/${id}`, fetcher);

  

  useEffect(() => {
    // Reset selected seats when the modal is opened
    setSelectedSeats([]);
    
    
  }, [seatModal.isOpen]);




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

  const onSubmit = () => {
    if(selectedSeats.length > 0 && movies) {
      if (movies){
        const { title, price } = movies;
        const seatNumbers = selectedSeats.map((seatNumber) => parseInt(seatNumber));
        addToCart({ name: title, price, quantity: seatNumbers.length, seatNumber: seatNumbers });      
        router.push("/payment")
        seatModal.onClose()
        toast.success("Ticket added to cart!")
      }
    }
    else {
      return 
    }
  }

  

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="text-2xl font-bold">Select your seat position</div>
        <div className="font-light text-neutral-500 mt-4 md:mt-2 flex justify-between w-6/6 md:w-5/6 mx-auto ">
          <div className="flex justify-between">
            <div className="rounded-md w-[1.6rem] h-[1.6rem] bg-green-600" ></div>
            <span className="ml-2">Selected</span>
          </div>

          <div className="flex">
            <div className="rounded-md w-[1.6rem] h-[1.6rem] bg-red-600" ></div>
            <span className="ml-2" >Unavailable</span>
          </div>

          <div className="flex">
            <div className="rounded-md w-[1.6rem] h-[1.6rem] bg-gray-300" ></div>
            <span className="ml-2" >Available</span>
          </div>

        </div>
      </div>
      <div className=" items-center text-center justify-center">
        <h2 className="flex text-center mx-auto w-fit font-black mb-3 text-base 
        tracking-widest text-gray-500">SCREEN</h2>
        <div className="grid grid-cols-8 gap-6 mx-auto w-fit">
          {movies && movies.seats.map((seatValue : any, index : number) => (
            <div
              key={index}
              className={`w-[1.6rem] h-[1.6rem] rounded-md cursor-pointer ${
                seatValue
                  ? "bg-red-600" // Occupied seat
                  : selectedSeats.includes(index.toString())
                  ? "bg-green-600" // Selected seat
                  : selectedSeats.length === 6
                  ? "bg-red-600" // Max seats selected
                  : "bg-gray-300" // Available seat
              }`}
              onClick={() => handleSeatClick(index)}
            >

            </div>
          ))}
        </div>
        <button
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:bg-gradient-to-r hover:from-indigo-700 
        hover:to-indigo-800 text-white font-bold py-2 px-4 rounded mt-8 w-5/6"
        onClick={onSubmit}
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
