import { create } from 'zustand';

interface OrderState {
  totalSum: number;
  setTotalSum: (value: number) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  totalSum: 0,
  setTotalSum: (value) => set({ totalSum: value }),
}));
