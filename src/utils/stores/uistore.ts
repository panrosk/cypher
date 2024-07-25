import { create } from "zustand";

export const uiStore = create((set) => ({
  screen: "init",
  change_to_main: () => set({ screen: "main" }),
}));
