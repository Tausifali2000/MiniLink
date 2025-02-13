import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/landingPages/Signup";
import { useAuthStore } from "./store/auth.store";
import Login from "./pages/landingPages/Login";
import Dashboard from "./pages/userPages/Dashboard";
import Links from "./pages/userPages/Links";
import Analytics from "./pages/userPages/Analytics";
import Settings from "./pages/userPages/Settings";
import MainLayout from "./pages/MainLayout.jsx";
import ShortUrl from "./pages/ShortUrl";
import HomeLoading from "./pages/skeletons/HomeLoading";

import { toast, ToastContainer } from "react-toastify";
import './Toast.css';
import { useScreenStore } from "./store/screen.store.js";
import MobileLayout from "./pages/MobileLayout.jsx";
import DashboardError from "./pages/userPages/DashBoardError.jsx";
import MobileLoading from "./pages/skeletons/MobileLoading.jsx";


export const CustomToast = {



  success: (message) => {
    toast.success(message, {
      icon:  <img src="/tick.svg" alt="success" style={{ width: "20px" }} />,
      className: "success-toast",
      closeButton: false,
    });
  },
  error: (message) => {
    toast.error(message, {
      
      className: "error-toast",
      closeButton: false,
    });
  },
};



function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
   const { screen } = useScreenStore();
  
  
  
  useEffect(() => {
    authCheck();
    }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      screen(window.innerWidth)
      setScreenSize(window.innerWidth);
    };
    checkScreenSize();

   window.addEventListener("resize", checkScreenSize);
  return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isCheckingAuth) {

   
		return screenSize <= 650 ? <MobileLoading /> : <HomeLoading />
		
		
	}

  const Fade = {
    enter: "fade-in-animation",
    exit: "fade-out-animation",
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/:hash" element={<ShortUrl />} />
        

        {/* Protected Routes */}
        <Route
          path="/"
          element={user ? (screenSize <= 650 ? <MobileLayout/> : <MainLayout />) : <Navigate to="/login" />}
        >
          {/* Render Dashboard as the default page for authenticated users */}
          <Route index element={<Dashboard/>} />
          <Route path="links" element={<Links />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
      />
     
       
      
    </>
  );
}

export default App;
