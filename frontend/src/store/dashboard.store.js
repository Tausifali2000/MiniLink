import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  mobileCount: 0,
  tabletCount: 0,
  desktopCount: 0,
  totalClicks: 0,
  isLoading: false,
  error: null,
  datewise : [],

  // Function to fetch dashboard data
  fetchDashboard: async () => {
    set({ isLoading: true, error: null }); 

    try {
      const response = await axios.get(`/api/dashboard/fetchdashboard`, { withCredentials: true });

    
      const { Mobile, Tablet, Desktop, TotalClicks, DateWise } = response.data.data;

      const datewiseArray = Object.values(DateWise.datewise).map((entry) => ({
        date: entry.date,
        clickCount: entry.clickCount,
      }));
      
      set({
        mobileCount: Mobile,
        tabletCount: Tablet,
        desktopCount: Desktop,
        totalClicks: TotalClicks,
        datewise: datewiseArray,
        

        isLoading: false, 
      });
      
      
    } catch (error) {
      set({
        isLoading: false,
        error: error.message, 
      });
      
    }
  },
}));
