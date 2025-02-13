import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchQuery: "",

  search: async (query) => {
    
    set({ searchQuery: query}
      
    );
  }

}));
