import { create, StoreApi, UseBoundStore } from "zustand";

interface markdown_store {
  content: string;
  change_content: (content: string) => void;
}

export const markdownStore: UseBoundStore<StoreApi<markdown_store>> = create(
  (set) => ({
    content: "",
    change_content: (content: string) => set({ content: content }),
  }),
);
