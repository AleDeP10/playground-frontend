import { create } from "zustand";
import { devtools } from "zustand/middleware";

const spinnerStore = (set, get) => ({
  showSpinner: false,
  setShowSpinner: (value) => set({ showSpinner: value }),
  localSpinner: {},
  setLocalSpinner: (key, value) => {
    const currentLocalSpinner = get().localSpinner;
    set({ localSpinner: { ...currentLocalSpinner, [key]: value } })
  },
});

const logoutStore = (set) => ({
  isLoggedOut: false,
  setLogout: (value) => set({ isLoggedOut: value }),
});

const useSpinnerStore = create(devtools(spinnerStore));
const useLogoutStore = create(devtools(logoutStore));

export { useSpinnerStore, useLogoutStore };
