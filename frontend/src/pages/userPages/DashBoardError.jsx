import styles from "./cssModules/Dashboard.module.css";



const DashboardError = () => {
  
  

  return (
    <div className={styles.analyticsWrapper}>
    <h1 className={styles.totalClicks}>
      Total Clicks <span className={styles.clickCount}>0</span>
    </h1>
    <div className={styles.cardsWrapper}>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Date-wise Clicks</h2>
        {
          
            <div className={styles.bar}>
              <span>Date</span>
              
              <span>0</span>
            </div>
          
          }
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Click Devices</h2>
        <div className={styles.bar}>
          <span className={styles.label}>Mobile</span>
          
          <span className={styles.labelright}>0</span>
        </div>
        <div className={styles.bar}>
          <span className={styles.label}>Desktop</span>
          
          <span className={styles.labelright}>0</span>
        </div>
        <div className={styles.bar}>
          <span className={styles.label}>Tablet</span>
         
          <span className={styles.labelright}>0</span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default DashboardError;
