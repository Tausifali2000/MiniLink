import { useEffect, useRef, useState } from "react";
import NewLink from "./NewLink";
import styles from "./cssModules/Header.module.css";
import { useAuthStore } from "../store/auth.store";
import { useSidebarStore } from "../store/sidebar.store";
import { useSearchStore } from "../store/search.store";

const Header = () => {

  //Stores
  const { user, logout } = useAuthStore();
  const { search } = useSearchStore();
  const { setSelectedOption } = useSidebarStore();

  //States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [searchQuery, setSearchQuery] = useState("")
  const [icon, setIcon] = useState("🌟");
  
  //useRef for logout
  const dropdownRef = useRef(null);
 
 //Setting Greeting Image based on time
  useEffect(() => {
   const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      setGreeting("Good morning");
      setIcon("/morning.png"); 
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
      setIcon("/sun.png"); 
    } else {
      setGreeting("Good evening");
      setIcon("/moon.png"); 
    }
  }, []);

//Handle click outside Logout
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);


 //Handlers
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleNewLinkSubmit = (data) => {
    
    setIsDialogOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  //Set userName in Greeting  
  const userName = user?.name || "there";

  //Set Current Date in Greeting
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  //Handle Searchbar query
  const handleSearchSubmit = (e) => {
    search(searchQuery);
    setSelectedOption("links");

  };

  return (
    <div className={styles.header}>
      <div className={styles.greeting}>
        <div className={styles.iconC}>
          <img src={icon} alt="greeting icon" className={styles.icon} /> 
        </div>

        <div>
          <h2 className={styles.title}>
            {greeting}, {userName}
          </h2>
          <p className={styles.date}>{currentDate}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.createButton} onClick={handleOpenDialog}>
          + Create new
        </button>
        <img onClick={handleSearchSubmit} className={styles.searchIcon} src="/search.svg" alt="" />
        <input
          type="text"
          placeholder="Search by remarks"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(e);
            }
          }}
        />

        <div
          className={styles.profile}
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          {user?.name ? user.name.slice(0, 2).toUpperCase() : "LK"}
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <button className={styles.logoutButton} onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render NewLink Dialog */}
      {isDialogOpen && (
        <NewLink onClose={handleCloseDialog} onSubmit={handleNewLinkSubmit} />
      )}
    </div>
  );
};

export default Header;
