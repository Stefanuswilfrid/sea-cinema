import { create } from 'zustand';

interface SelectInterestStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSelectInterestModal = create<SelectInterestStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSelectInterestModal;