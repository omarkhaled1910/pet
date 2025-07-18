// lib/store.ts
import { create } from "zustand";
import { COOKIE_TOKEN, COOKIE_USER } from "@/constants";

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
  user: {
    name:
      JSON.parse(
        typeof window !== "undefined"
          ? localStorage.getItem(COOKIE_USER) || "{}"
          : "{}"
      ).name || "",
    username:
      JSON.parse(
        typeof window !== "undefined"
          ? localStorage.getItem(COOKIE_USER) || "{}"
          : "{}"
      ).username || "",
    token:
      typeof window !== "undefined"
        ? localStorage.getItem(COOKIE_TOKEN) || ""
        : "",
  },
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));
