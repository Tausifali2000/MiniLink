import { useEffect, useRef, useState } from "react";
import NewLink from "./NewLink";
import styles from "./cssModules/MobileHeader.module.css";
import { useAuthStore } from "../store/auth.store";
import { useSidebarStore } from "../store/sidebar.store";
import { useSearchStore } from "../store/search.store";
import MobileSidebar from "./MobileSidebar";

const MobileHeader = () => {

  //Stores
  const { user, logout } = useAuthStore();
  const { search } = useSearchStore();
  const { setSelectedOption } = useSidebarStore();


  //States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [icon, setIcon] = useState("🌟");

  //useRef for logout
  const dropdownRef = useRef(null);

  //Setting Greeting Image based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      setGreeting("Good morning");
      setIcon("/morning.svg");
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
    console.log("New Link Data:", data);
    setIsDialogOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
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
      <div className={styles.top}>
        <div className={styles.logo}>
          <img src="/cuvette.svg" alt="Logo" />
        </div>
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


      </div>

      <div className={styles.mid}>
        <img src="/menu.svg" className={styles.menu} onClick={toggleSidebar} alt="" />
        <div className={styles.actions}>
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


          <button className={styles.createButton} onClick={handleOpenDialog}>
            + Create new
          </button>

        </div>
      </div>

      {isSidebarOpen && <MobileSidebar onClose={closeSidebar} />} {/* Render MobileSideBar */}

      {/* Render NewLink Dialog */}
      {isDialogOpen && (
        <NewLink onClose={handleCloseDialog} onSubmit={handleNewLinkSubmit} />
      )}
    </div>
  );
};

export default MobileHeader;
