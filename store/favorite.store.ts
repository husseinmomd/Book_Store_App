import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '~/types';
import { Alert } from 'react-native';

interface FavoriteState {
  items: Book[];
  addItem: (data: Book) => void;
  removeItem: (id: string) => void;
  toggleFavorite: (data: Book, id: string) => void;
  isFavorite: (id: string) => boolean;
  removeAll: () => void;
}

export const useFavoriteStore = create(
  persist<FavoriteState>(
    (set, get) => ({
      items: [],
      isFavorite: (id) => {
        const currentItems = get().items || [];
        const existingItem = currentItems.find((item) => item._id === id);

        if (existingItem) {
          return true;
        }
        return false;
      },

      toggleFavorite: (data, id) => {
        const currentItems = get().items || [];
        const existingItem = currentItems.find((item) => item._id === data._id);

        if (existingItem) {
          set({ items: [...currentItems.filter((i) => i._id !== id)] });
          return;
        }
        set({ items: [...get().items, data] });
      },
      addItem: (data: Book) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item._id === data._id);

        if (existingItem) {
          Alert.alert('Ops!', 'Item already saved.');
          return;
        }

        set({ items: [...get().items, data] });
        Alert.alert('Done', 'Item added to cart.');
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item._id !== id)] });
        Alert.alert('Done', 'Item removed from cart.');
      },
      removeAll: () => {
        set({ items: [] });
        Alert.alert('Done', 'All items removed from cart.');
      },
    }),
    {
      name: 'bookmark-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
