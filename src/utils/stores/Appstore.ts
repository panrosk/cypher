import { create, StoreApi, UseBoundStore } from "zustand";

interface AppStore {
  current_file: File | null;
  change_content: (file: File) => void;
  change_markdown: (file: File, content: string, title: string) => void;
}

export const app_store: UseBoundStore<StoreApi<AppStore>> = create((set) => ({
  current_file: null,
  change_content: (file: File) => set({ current_file: file }),
  change_markdown: (file: File, content: string, title) =>
    set({
      current_file: {
        ...file,
        extension: {
          Markdown: {
            title: title,
            content: content,
          },
        },
      },
    }),
}));
