import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./cssModules/MobileSidebar.module.css";
import { useSidebarStore } from "../store/sidebar.store";

const MobileSidebar = ({ onClose }) => {
  
  //Store Function
  const { selectedOption, setSelectedOption } = useSidebarStore();
  
   //useNavigate Hook
  const navigate = useNavigate();

  //Navigates to selected option
  useEffect(() => {
    if (selectedOption) {
      navigate(selectedOption === "/" ? "/" : `/${selectedOption}`);
    }
  }, [selectedOption, navigate]);

   //Handle Sidebar clicks
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onClose();
  };

  return (
       <div className={styles.overlay} onClick={onClose}>
    <div className={styles.sidebar}>
      
      <div className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
          onClick={() => handleOptionClick("/")} 
        >
          {({ isActive }) => (
            <div className={styles.btns}>
              <img
                src={isActive ? "/activeDash.svg" : "/inactiveDash.svg"}
                alt="Dashboard Icon"
              />
              Dashboard
            </div>
          )}
        </NavLink>
        <NavLink
          to="/links"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
          onClick={() => handleOptionClick("links")}
        >
          {({ isActive }) => (
            <div className={styles.btns}>
              <img
                src={isActive ? "/activeLinks.svg" : "/inactiveLinks.svg"}
                alt="Links Icon"
              />
              Links
            </div>
          )}
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
          onClick={() => handleOptionClick("analytics")}
        >
          {({ isActive }) => (
            <div className={styles.btns}>
              <img
                src={isActive ? "/activeAnalytics.svg" : "/inactiveAnalytics.svg"}
                alt="Analytics Icon"
              />
              Analytics
            </div>
          )}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
          onClick={() => handleOptionClick("settings")}
        >
          {({ isActive }) => (
            <div className={styles.btns}>
              <img
                src={isActive ? "/activeSettings.svg" : "/inactiveSettings.svg"}
                alt="Settings Icon"
              />
              Settings
            </div>
          )}
        </NavLink>
      </div>
     
    </div>
    </div>
  );
};

export default MobileSidebar;
