import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { CustomToast } from "../App";

export const useLinkStore = create((set) => ({
  links: [],
  fetchedlinks: [],
  isCreating: false,
  isFetching: false,
  isEditing: false,
  isDeleting: false,
  redirectUrl: null,
  isLoading: false,
  error: null,

  createLink: async (linkData) => {
    set({ isCreating: true });

    try {
      const response = await axios.post("/api/link/createlink", linkData, {
        withCredentials: true,
      });

      set((state) => ({
        links: [...state.links, response.data.data],
        isCreating: false,
      }));

      CustomToast.success("Link Created");
    } catch (error) {
      set({ isCreating: false });
      console.error("Error creating link:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to create shortened URL."
      );
    }
  },

  fetchLinks: async () => {
    set({ isFetching: true });

    try {
      const response = await axios.get("/api/link/fetchlinks", {
        withCredentials: true,
      });

      set({
        fetchedlinks: response.data.data,
        isFetching: false,
      });
     
    } catch (error) {
      set({ isFetching: false });
      console.error("Error fetching links:", error.response?.data || error.message);
      CustomToast.error(
        error.response?.data?.message || "Failed to fetch links. Please try again later."
      );
    }
  },

  editLink: async (updatedData) => {
    set({ isEditing: true });
      console.log(updatedData.id);
      console.log(updatedData);

    try {
      const response = await axios.post(`/api/link/editlink`, { ...updatedData }, {
        withCredentials: true,
      });

      set({ isEditing: false });

      CustomToast.success("Link Edited");
    } catch (error) {
      set({ isEditing: false });
      console.error("Error editing link:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to update the link. Please try again."
      );
    }
  },

  deleteLink: async (id) => {
    set({ isDeleting: true });
    console.log(id)
    try {
      const response = await axios.delete(`/api/link/deletelink`, {
        params: { id }, 
        withCredentials: true,
      });

      set({ isDeleting: false });

      CustomToast.success("Link Deleted");
    } catch (error) {
      set({ isDeleting: false });
      console.error("Error deleting link:", error.response?.data || error.message);
      CustomToast.error(
        error.response?.data?.message || "Failed to delete the link. Please try again."
      );
    }
  },

  fetchRedirectUrl: async (hash) => {
    
    set({ isLoading: true, error: null });
  
    try {
      const response = await axios.get(`/api/link/${hash}`);
      set({ redirectUrl: response.data.url, isLoading: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
     set({ error: errorMessage, isLoading: false });
    }
  },
  
}));
