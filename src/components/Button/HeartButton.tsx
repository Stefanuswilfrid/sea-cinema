'use client';

import { AiFillHeart, AiOutlineHeart , AiFillSave } from "react-icons/ai";
import { Bookmark } from "lucide-react";

import useFavorite from "@/hooks/useFavourite";
import { CurrentUser } from "@/types";


interface HeartButtonProps {
  listingId: string
  currentUser?: CurrentUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  listingId,
  currentUser
}) => {
  console.log("HU",currentUser)
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });

  console.log("isfav?",hasFavorited)
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