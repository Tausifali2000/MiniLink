import { useEffect } from "react";

import styles from "./cssModules/Dashboard.module.css";
import { useDashboardStore } from "../../store/dashboard.store";
import DashboardLoading from "../skeletons/DashboardLoading";
import DashboardError from "./DashBoardError";
import { useScreenStore } from "../../store/screen.store";
import MobileDashbordLoading from "../skeletons/MobileDashbordLoading";

const ProgressBar = ({ mappedPercentage }) => {

 
  
  return (
    <div className={styles.progress}>
      <div
        style={{
          width: mappedPercentage,
          backgroundColor: "#1B48DA",
          transition: "width 0.6s ease",
        }}
      ></div>
    </div>
  );
};

const Dashboard = () => {
  const { 
    mobileCount, 
    tabletCount, 
    desktopCount, 
    totalClicks, 
    isLoading, 
    error, 
    fetchDashboard,
    datewise
  } = useDashboardStore();
  const {screenSize} = useScreenStore()
  
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) {
    return screenSize <= 650 ? <MobileDashbordLoading /> : <DashboardLoading />;
  }

  if (error) {
    return <DashboardError />;
  }

 

  const maxClickCount = datewise.length > 0 ? Math.max(...datewise.map((entry) => entry.clickCount)) : 1;

  

  return (
    <div className={styles.body}>
    <div className={styles.analyticsWrapper}>
    <h1 className={styles.totalClicks}>
      Total Clicks <span className={styles.clickCount}>{totalClicks}</span>
    </h1>
    <div className={styles.cardsWrapper}>

    <div className={styles.card}>
  <h2 className={styles.cardTitle}>Date-wise Clicks</h2>
  {datewise
    .sort((a, b) => {
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-"); // Split dd-mm-yy
        return new Date(`20${year}`, month - 1, day); // Convert to YYYY-MM-DD format
      };

      return parseDate(b.date) - parseDate(a.date); // Sort descending
    })
    .map((entry) => (
      <div key={entry.date} className={styles.bar}>
        <span className={styles.datewiseSpan}>{entry.date}</span>
        <ProgressBar mappedPercentage={`${(entry.clickCount / maxClickCount) * 100}%`} />
        <span>{entry.clickCount}</span>
      </div>
    ))}
</div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Click Devices</h2>
        <div className={styles.bar}>
          <span className={styles.label}>Mobile</span>
          <ProgressBar mappedPercentage={`${(mobileCount / totalClicks) * 100}%`} />
          <span className={styles.labelright}>{mobileCount}</span>
        </div>
        <div className={styles.bar}>
          <span className={styles.label}>Desktop</span>
          <ProgressBar mappedPercentage={`${(desktopCount / totalClicks) * 100}%`} />
          <span className={styles.labelright}>{desktopCount}</span>
        </div>
        <div className={styles.bar}>
          <span className={styles.label}>Tablet</span>
          <ProgressBar mappedPercentage={`${(tabletCount / totalClicks) * 100}%`} />
          <span className={styles.labelright}>{tabletCount}</span>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Dashboard;
