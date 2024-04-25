import { create } from 'zustand';
import { Book } from '~/types';

interface BookState {
  book: Book | null;
  bookId: string;
  setBookId: (id: string) => void;
  setBook: (book: Book | null) => void;
}

export const useBookStore = create<BookState>((set) => ({
  book: null,
  bookId: '',
  setBookId: (id) => set({ bookId: id }),
  setBook: (book) => set({ book }),
}));
