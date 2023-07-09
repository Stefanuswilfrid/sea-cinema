import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";

interface ListingCardProps {
  id: Number;
  title: string;
  url: string;
  price: number;
  description: string;
}

export default function ListingCard({
  id,
  title,
  url,
  price,
  description,
}: ListingCardProps) {
  const router = useRouter();
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hover:scale-105 duration-700 cursor-pointer shadow-md rounded-xl overflow-hidden relative" onClick={()=>{router.push(`${title}`)}}>
        <div className="aspect-[3/4] group-hover:opacity-25">
          <Image
            src={url}
            alt={title}
            width={500}
            height={750}
            className="object-cover w-full h-full group-hover:opacity-25"
          />
        </div>
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent">
          <div className="p-8 space-y-2">
            <div className="flex items-center gap-4 text-white">
              <p>$ {price}</p>
              <p>{description.substring(0,10)+ "..."}</p>
            </div>
            <p className="font-semibold text-xl text-white">{title}</p>
          </div>
        </div>
        <div className="absolute opacity-0 fd-sh group-hover:opacity-100">
          <div className="pt-8 text-center">
            <button className="text-center rounded-lg p-4 bg-white text-gray-700 font-bold text-lg duration-500 hover:duration-500">Learn more</button>
          </div>
        </div>
      </div>

      {/* <div className="py-4">
      <div className="shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center mx-auto content-div hover:duration-500">
        <div>
          <div className="w-full image-cover rounded-t-md hover:duration-500">
            <div className="p-2 m-4 w-16 h-16 text-center bg-gray-700 rounded-full text-white float-right fd-cl group-hover:opacity-25  hover:duration-500 duration-500">
              <span className="text-base tracking-wide font-bold border-b border-white font-sans">12</span>
              <span className="text-xs tracking-wide font-bold uppercase block font-sans">April</span>
            </div>
          </div>
          <div className="py-8 px-4 bg-white rounded-b-md fd-cl group-hover:opacity-25">
            <span className="block text-lg text-gray-800 font-bold tracking-wide">Book a flight</span>
            <span className="block text-gray-600 text-sm">Vivamus ac ligula sit amet erat luctus laoreet ac quis ligula. Donec bibendum faucibus purus eget cursus. Proin enim ante, scelerisque vel sem sit amet, ultrices mollis risus. Praesent justo felis, ullamcorper a cursus sed, condimentum at dui.</span>
          </div>
        </div>
        <div className="absolute opacity-0 fd-sh group-hover:opacity-100">
          <div className="pt-8 text-center">
            <button className="text-center rounded-lg p-4 bg-white text-gray-700 font-bold text-lg duration-500 hover:duration-500">Learn more</button>
          </div>
        </div>
      </div>
    </div> */}
    </motion.div>
  );
}
