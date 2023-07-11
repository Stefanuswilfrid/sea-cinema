import { create } from 'zustand';

interface SeatModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSeatModal = create<SeatModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSeatModal;