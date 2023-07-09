import React from "react";
import { Listing } from "..";
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSidePropsContext,
  GetStaticPropsContext,
} from "next";
import Image from "next/image";
import Container from "../../components/Container";

interface MovieDetailsProps {
  listing: Listing;
}
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of items or IDs from your API
  const response = await fetch(
    "https://seleksi-sea-2023.vercel.app/api/movies"
  );
  const data = await response.json();

  // Generate the paths based on the item IDs
  const paths = data.map((item: Listing) => ({
    params: { details: item.title },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const itemTitle = context.params?.details;

  // Fetch the item data based on the ID
  const response = await fetch(
    `https://seleksi-sea-2023.vercel.app/api/movies/`
  );
  const datas: Listing[] = await response.json();
  const movies = datas.filter((data) => data.title == itemTitle);

  return {
    props: {
      listing: movies[0],
    },
  };
};

export default function index({ listing }: MovieDetailsProps) {
  return (
    <Container>
      <div className="w-11/12 grid md:grid-cols-2  m-auto mt-12">
        <div className="">
          <Image className="rounded-3xl" src={listing.poster_url} width={350} height={200} alt="" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-light text-indigo-500 tracking-[0.3em]">
            
            {Math.ceil((new Date().getTime() - new Date(listing.release_date).getTime())/(1000 * 60 * 60 * 24)) > 120 ? "": "New Movie"}
          </h1>
          <h1 className="text-3xl font-semibold">{listing.title}</h1>
          <h1 className="text-2xl font-normal opacity-50">{listing.description}</h1>

          <h1 className="text-lg  font-extrabold my-3 tracking-widest">
            $ {listing.ticket_price}
          </h1>
          <h1 className="text-base font-normal">
            Age Rating: {listing.age_rating}+
          </h1>
          <div>
            <button className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-2 px-4 rounded">
              Book Tickets
            </button>
          </div>
        </div>
      </div>
      
    </Container>
  );
}
