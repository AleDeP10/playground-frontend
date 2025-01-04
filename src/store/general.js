// ./general.js
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


const mainContentStore = (set) => ({
  currentContent: "ricerca",
  previusContent: null,
  setCurrentContent: (content) => {
    set({ currentContent: content });
  },
  setPreviusContent: (content) => {
    set({ previusContent: content });
  },
});

const useSpinnerStore = create(devtools(spinnerStore));
const useLogoutStore = create(devtools(logoutStore));
const useMainContentStore = create(devtools(mainContentStore));

export { useSpinnerStore, useLogoutStore, useMainContentStore };
