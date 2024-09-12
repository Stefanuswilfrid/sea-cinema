import SeatBookingSummary from "@/components/Seat/SeatBookingSummary";
import SeatLegend from "@/components/Seat/SeatLegend";
import SeatSelectionComponent from "@/components/Seat/SeatSelectionComponent";
import { fetcher } from "@/libs";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type SeatStatus = "available" | "selected" | "unavailable";

interface Seat {
  id: string;
  status: SeatStatus;
}

export default function ChooseSeat() {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]); // State to store selected seats

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id as string);
    }
  }, [router.isReady, router.query.id]);

  const { data: movie, error } = useSWR<any>(id ? `/movie/${id}` : null, fetcher);

  useEffect(() => {
    if (movie && movie.seats) {
      const initializedSeats = movie.seats.map((seat: any) => ({
        id: seat.label,
        status: seat.occupied ? "unavailable" : "available",
      }));
      setSeats(initializedSeats);
    }
  }, [movie]);

  const handleSeatClick = (clickedSeat: Seat) => {
    if (clickedSeat.status === "unavailable") return;

    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === clickedSeat.id
          ? {
              ...seat,
              status: seat.status === "available" ? "selected" : "available",
            }
          : seat
      )
    );
    setSelectedSeats((prevSelectedSeats) => {
      if (clickedSeat.status === "available") {
        // Add the seat to selectedSeats
        return [...prevSelectedSeats, clickedSeat];
      } else {
        // Remove the seat from selectedSeats
        return prevSelectedSeats.filter((seat) => seat.id !== clickedSeat.id);
      }
    });
  
  };


  const handleCheckout = (movieName: string, selectedSeats: string[], totalPrice: number, movieUrl: string) => {
    const existingCheckouts = localStorage.getItem("checkouts");
    console.log("mov",movieUrl)
    let checkouts = existingCheckouts ? JSON.parse(existingCheckouts) : [];
  
    const existingMovie = checkouts.find((checkout: any) => checkout.movieName === movieName);
  
    if (existingMovie) {
      // Movie already exists, update the seats and total price
      existingMovie.totalPrice += totalPrice;
      existingMovie.seats = [...new Set([...existingMovie.seats, ...selectedSeats])]; // Combine seats and remove duplicates
    } else {
      const newCheckout = {
        movieName,
        seats: selectedSeats,
        totalPrice,
        movieUrl,
      };
      checkouts.push(newCheckout);
    }
  
    localStorage.setItem("checkouts", JSON.stringify(checkouts));
  
    toast.success("Checkout successful!");
  };


  // const selectedSeats = seats.filter((seat) => seat.status === "selected");

  if (!id || !movie) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return (
    <div className="w-full min-h-screen  p-2 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg  overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 p-4 sm:p-8">
            <SeatLegend />
            <SeatSelectionComponent
              seats={seats}
              handleSeatClick={handleSeatClick}
            />
          </div>
          <SeatBookingSummary
          
          selectedSeats={selectedSeats} 
  price={movie.price} 
  movieName={movie.title} 
  movieUrl={movie.poster_url}
  handleCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
