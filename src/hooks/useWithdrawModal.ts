import { create } from 'zustand';

interface WithdrawStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useWithdraw = create<WithdrawStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useWithdraw;