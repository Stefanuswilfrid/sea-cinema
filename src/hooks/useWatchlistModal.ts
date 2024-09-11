import { create } from 'zustand';

interface WatchlistStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useWatchlistModal = create<WatchlistStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useWatchlistModal;