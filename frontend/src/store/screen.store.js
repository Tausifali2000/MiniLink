import { create } from "zustand";

export const useScreenStore = create((set, get) => ({
  screenSize: "",

  screen: async (size) => {
  
    set({ screenSize: size}
     
    );
  
  }

}));
