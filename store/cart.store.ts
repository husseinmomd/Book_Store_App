import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Book, CartItem } from '~/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartState {
  items: CartItem[];
  addItem: (data: Book, qty: number) => void;
  isItemInCart: (id: string) => boolean;
  removeItem: (id: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],

      isItemInCart: (id) => {
        const currentItems = get().items;
        const isInCart = currentItems.some((cartBook) => cartBook?.book?._id === id);
        return isInCart;
      },

      addItem: (data, qty) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item?.book?._id === data._id);

        if (existingItem) {
          set({ items: [...currentItems.filter((i) => i.book?._id !== data._id)] });
          return;
        }
        set((state) => ({ items: [...state.items, { book: data, qty }] }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: [...state.items.filter((x) => x.book._id !== id)],
        }));
      },

      removeAll: () => {
        set({ items: [] });
      },

      increaseQuantity: (id: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((x) => x.book._id === id);
        if (existingItem && existingItem.qty <= existingItem.book.quantity) {
          existingItem.qty += 1;
          set({ items: [...currentItems] });
          return;
        }
      },

      decreaseQuantity: (id: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.book._id === id);
        if (existingItem && existingItem.qty > 1) {
          existingItem.qty -= 1;
          set({ items: [...currentItems] });
        }
      },
    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
