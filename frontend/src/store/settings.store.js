import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { CustomToast } from "../App";

export const useSettingsStore = create((set) => ({
  user: null, 
  isUpdating: false,
  isDeleting: false ,

  updateUser: async (userData) => {
    set({ isUpdating: true });

    try {

      const response = await axios.post("/api/settings/updateuser", userData, {
        withCredentials: true, 
      });

      set({ user: response.data.user, isUpdating: false });

      CustomToast.success("Profile Updated");
    } catch (error) {
      set({ isUpdating: false });

      console.error("Error updating user:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  },
  deleteUser: async () => {
    set({ isDeleting: true });

    try {

      await axios.delete("/api/settings/deleteuser", {
        withCredentials: true, 
      });

      set({ user: null, isUpdating: false });

      CustomToast.success("Account deleted successfully");
    } catch (error) {
      set({ isDeleting: false });

      console.error("Error deleting user:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to delete account."
        
      );
    }
  },
}));