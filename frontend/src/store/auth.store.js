import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';
import { useSidebarStore } from './sidebar.store';
import { CustomToast } from "../App";

export const useAuthStore = create((set) => ({
  withCredentials: true,
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  error: null,


  signup: async (credentials) => {
    set({ isSigningUp: true, error: null });
    try {
      const response = await axios.post("/api/auth/signup", credentials, { withCredentials: true });
      set({ user: response.data.use, isSigningUp: false });
      CustomToast.success("Account created");
      return true;
    } catch (error) {
      const field = error.response?.data?.field || null;
      const message = error.response?.data?.message || "An error occurred";
      set({ isSigningUp: false, user: null, error: { field, message } });
      
      return false;
    }
  },
  
 
  login: async (credentials) => {
		set({ isLoggingIn: true, error: null});
		try {
			const response = await axios.post("/api/auth/login", credentials, { withCredentials: true });
			set({ user: response.data.user, isLoggingIn: false });
		} catch (error) {
      const field = error.response?.data?.field || null;
      const message = error.response?.data?.message || "An error occurred";
			set({ isLoggingIn: false, user: null, error: { field, message }});
			
		}
	},
  
  logout: async () => {
    set({isLoggingOut:true})
    try {
      await axios.post("/api/auth/logout",  { withCredentials: true })
      const { resetSidebar } = useSidebarStore.getState();
      resetSidebar(); 
      set({user: null, isLoggingOut: false});
    } catch (error) {
      set({isLoggingOut: false});
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  
  authCheck: async () => {
    set({ isCheckingAuth: true});
    try {
     
      const response = await axios.get("/api/auth/authCheck", {
        withCredentials: true, 
      });
      
      set({ user: response.data.user, isCheckingAuth: false});
    } catch (error) {
      set({ isCheckingAuth: false, user:null});      
    }
  },
}))