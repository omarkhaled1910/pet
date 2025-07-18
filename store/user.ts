// lib/store.ts
import { create } from "zustand";

type User = {
  name: string;
  username: string;
  token: string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
};

export const useUserStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));
