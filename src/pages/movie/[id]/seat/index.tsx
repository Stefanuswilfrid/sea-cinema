import SeatBookingSummary from "@/components/Seat/SeatBookingSummary";
import SeatLegend from "@/components/Seat/SeatLegend";
import SeatSelectionComponent from "@/components/Seat/SeatSelectionComponent";
import { fetcher } from "@/libs";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
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
  };

  const selectedSeats = seats.filter((seat) => seat.status === "selected");

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
          <SeatBookingSummary price={movie.price} selectedSeats={selectedSeats} />
        </div>
      </div>
    </div>
  );
}