
import { Outlet } from "react-router-dom";

import styles from "./csModules/MainLayout.module.css";
import MobileHeader from "../components/MobileHeader";





const MobileLayout = () => {
 
  
  return (
    <>
  
     <div className={styles.container}>
      
      <MobileHeader />
    
    <div className={styles.body}>
         <Outlet />
        
        </div>
    </div>
    </>
   
  );
};

export default MobileLayout;
