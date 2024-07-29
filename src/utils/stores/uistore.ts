import { create, StoreApi, UseBoundStore } from "zustand";

interface uiStoreState {
  screen: string;
  change_to_main: () => void;
}

export const uiStore: UseBoundStore<StoreApi<uiStoreState>> = create((set) => ({
  screen: "init",
  change_to_main: () => set({ screen: "main" }),
}));
