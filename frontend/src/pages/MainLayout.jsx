
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "./csModules/MainLayout.module.css";





const MainLayout = () => {
 
  
  return (
    <>
   
     <div className={styles.container}>
     <div className={styles.sidebar}>
        <Sidebar />
      </div>
      
     

      <div className={styles.body}>
        <div className={styles.header}>
        <Header />
        </div>
     <div className={styles.page}>
     <Outlet />
     </div>
   
      
        
        </div>
    </div>
    </>
   
  );
};

export default MainLayout;
