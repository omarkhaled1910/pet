// lib/store.ts
import { Pet } from "@/app/actions/pets";
import { create } from "zustand";

type Store = {
  clientStoredPet: Pet | null;
  setClientStoredPet: (pet: Pet) => void;
  resetClientStoredPet: () => void;
};

export const useSelectedPetStore = create<Store>((set) => ({
  clientStoredPet: null,
  setClientStoredPet: (pet) => set({ clientStoredPet: pet }),
  resetClientStoredPet: () => set({ clientStoredPet: null }),
}));
