import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { HistoryItem } from '~/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HistoryState {
  items: HistoryItem[];
  addItem: (data: HistoryItem) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  selectedItem: HistoryItem | null;
  setSelectedItem: (selectedItem: HistoryItem | null) => void;
}

export const useHistoryStore = create(
  persist<HistoryState>(
    (set, get) => ({
      selectedItem: null,
      setSelectedItem: (selectedItem) => set({ selectedItem }),
      items: [],
      addItem: (data) => {
        // add item
        const items = get().items;

        set({ items: [...items, data] });
      },

      removeItem: (id) => {},

      removeAll: () => {
        set({ items: [] });
      },
    }),

    {
      name: 'order-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
