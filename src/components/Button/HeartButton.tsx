'use client';

import { AiFillHeart, AiOutlineHeart , AiFillSave } from "react-icons/ai";
import { Bookmark } from "lucide-react";

import { UserData } from "@/pages/balance";
import useFavorite from "@/hooks/useFavourite";


interface HeartButtonProps {
  listingId: string
  currentUser?: UserData | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  listingId,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });

  return (
    <div 
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
         <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-[14px] ">
          <path
            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentFill"
          />
        </svg>
   
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
   );
}
 
export default HeartButton;