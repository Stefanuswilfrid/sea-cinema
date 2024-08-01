import React from "react";
import { Listing } from "..";

import Image from "next/image";
import Container from "../../components/Container";
import { useSession } from "next-auth/react";
import { UserData } from "../balance";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import useSeatModal from "../../hooks/useSeatModal";
import useLoginModal from "../../hooks/useLoginModal";
import useSWR from "swr";
import { fetcher } from "@/libs";
import { motion } from "framer-motion";
import { AudioButton } from "@/components/AudioButton";

interface MovieDetailsProps {
  listing: Listing;
}

export default function index() {
  const { data } = useSession();
  const currentUser = data?.user as UserData;
  const loginModal = useLoginModal();
  const seatModal = useSeatModal();
  const router = useRouter();

  const id = router.query.details! as string;

  const { data: listing, error } = useSWR<any>(`api/movie/${id}`, fetcher);

  const handleBookTicket = () => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      if (currentUser.age < listing.age_rating) {
        toast.error("Age is below the movie's age rating");
      } else {
        seatModal.onOpen();
      }
    }
  };
  if (error)
    return (
      <Container>
        <h1 className="mt-12">An Error Occured </h1>
      </Container>
    );

  return (
    <Container>
      {!listing && <h1 className="mt-12">Loading Movie Details ....</h1>}
      {listing && (
        <>
          <SEO
            title={`${listing.title.toUpperCase()} | SEA Cinema`}
            desc={`${listing.title.toUpperCase()} details`}
          />
          <motion.div
            transition={{ type: "tween", duration: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-11/12 grid md:grid-cols-2  m-auto mt-12">
              <div className="relative mx-auto">
                <Image
                  className="rounded-3xl  md:m-0"
                  src={listing.poster_url}
                  width={350}
                  height={200}
                  alt=""
                />

                <div className="absolute w-full sm:w-[350px] aspect-[350/525]  rounded-3xl   grid place-content-center gap-5   top-0 opacity-0 bg-black/50  transition-all duration-300 hover:opacity-100">
                  <AudioButton text={listing.title + " ...... " + listing.description}/>
                </div>
                
              </div>
              <div className="flex flex-col gap-3 text-center md:text-left mt-12 md:mt-0">
                <div className=" inline-flex text-base max-w-fit mx-auto md:ml-0 items-center rounded-md bg-sky-500/10 px-2 py-1 font-medium text-sky-500 ring-1 ring-inset ring-sky-500/20">
                  New Movie
                </div>

                <h1 className="text-3xl font-semibold">{listing.title}</h1>
                <h1 className="text-xl font-normal opacity-50">
                  {listing.description}
                </h1>
                
                <div className="flex md:flex-col mx-auto gap-3 md:mx-0">
                <span className="inline-flex max-w-fit  md:mx-0 items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset text-green-400 ring-green-500/20 bg-green-500/10">
                  Ticket Price : $ {listing.price}
                </span>

                <span className=" max-w-fit  md:mx-0 items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset text-pink-400 ring-pink-500/20 bg-pink-500/10">
                  Age rating : {listing.age_rating} +
                </span>
                </div>

                <div>
                  <button
                    className="mt-4 mx-auto md:mx-0 flex items-center justify-center gap-2 w-1/2 py-3 font-medium rounded-md bg-indigo-600 active:bg-hovered duration-200 text-white"

                    onClick={handleBookTicket}
                  >
                    Book Tickets &#8594;
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </Container>
  );
}
