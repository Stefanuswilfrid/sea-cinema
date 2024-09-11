import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

// import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";
import { CurrentUser } from "@/types";
import useWatchlistModal from "./useWatchlistModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: CurrentUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const watchlistModal = useWatchlistModal();
  console.log("cu",currentUser)

  const hasFavorited = useMemo(() => {
    const list = currentUser?.wishlistIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }
    watchlistModal.onOpen();

    // try {
    //   let request;

    //   if (hasFavorited) {
    //     console.log("isfav")
    //     request = () => axios.delete(`/api/wishlist/${listingId}`);
    //   } else {
    //     console.log("test")
    //     request = () => axios.post(`/api/wishlist/${listingId}`);
    //   }

    //   await request();
    //   router.refresh();
    //   toast.success('Success');
    // } catch (error) {
    //   toast.error('Something went wrong.');
    // }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;