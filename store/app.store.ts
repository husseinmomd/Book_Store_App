import { create } from 'zustand';

export enum AlertType {
  Bookmark = 'bookmark',
  Cart = 'cart',
  Error = 'error',
}
interface AppStoreState {
  bottomSheetValue: boolean;
  setBottomSheetValue: (value: boolean) => void;
  snackBarValue: boolean;
  alertType: AlertType | null;
  setSnackBarValue: (snackBarValue: boolean, alertType: AlertType | null) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  snackBarValue: false,
  alertType: null,
  bottomSheetValue: false,
  setBottomSheetValue: (bottomSheetValue) => set({ bottomSheetValue }),
  setSnackBarValue: (snackBarValue, alertType) => {
    set({ snackBarValue, alertType });
  },
}));
