import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSidebarStore = create(
  persist(
    (set) => ({
      
      selectedOption: "/", 
      setSelectedOption: (option) => set({ selectedOption: option }),
      resetSidebar: () => set({ selectedOption: "/" }),
    }),
    {
      name: "sidebar-storage", 
    }
  )
);
