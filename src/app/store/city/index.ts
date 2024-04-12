import { ICity } from "@/app/components/atoms/city";
import { getTimeNow } from "@/app/utils/getTimeNow";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  cities: ICity[];
  isDone: boolean;
  date: string;
  setCities: (city: ICity) => void;
  done: () => void;
  clear: () => void;
};

export const useCityStore = create<Store>()(
  persist(
    (set) => ({
      cities: [],
      isDone: false,
      date: getTimeNow(),
      setCities: (city: ICity) => set((s) => ({ cities: [...s.cities, city] })),
      done: () => set({ isDone: true }),
      clear: () => set({ cities: [], isDone: false, date: getTimeNow() }),
    }),
    {
      name: "city-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
