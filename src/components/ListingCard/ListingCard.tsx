import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";
import HeartButton from "../Button/HeartButton";

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
      <div className="hover:scale-105 duration-700 cursor-pointer shadow-md rounded-xl overflow-hidden relative" onClick={()=>{router.push(`${id}`)}}>
        <div className="aspect-[3/4] group-hover:opacity-25">
          <Image
            src={url}
            alt={title}
            width={500}
            height={750}
            className="object-cover w-full h-full group-hover:opacity-25"
          />
          <div className="
            absolute
            top-5
            right-4
          ">
            <HeartButton 
              listingId={""} 
              currentUser={null}
            />
          </div>
        </div>
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent">
          <div className="p-8 space-y-2">
            <div className="flex items-center gap-4 text-white">
              <p>$ {price}</p>
              <p>{description.substring(0,15)+ "..."}</p>
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

      
    </motion.div>
  );
}
