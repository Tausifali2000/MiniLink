import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAnalyticsStore = create((set) => ({
  analyticsData: [], 
  isLoading: false,  
  error: null,       

  fetchAnalytics: async () => {
    set({ isLoading: true, error: null }); 

    try {
      const response = await axios.get("/api/analytics/fetchanalytics"); 
      
      set({ analyticsData: response.data.data, isLoading: false }); 
      
    } catch (error) {
      console.error("Error fetching analytics data:", error.response?.data || error.message);
      set({ error: "Failed to fetch analytics data", isLoading: false }); 
      toast.error("Failed to fetch analytics data. Please try again."); 
    }
  },
}));
