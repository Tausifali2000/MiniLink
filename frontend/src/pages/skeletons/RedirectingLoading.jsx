import React from "react";
import styles from "./cssModules/Redirecting.module.css";

const RedirectingLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <p className={styles.loadingText}>Redirecting</p>
      <div className={styles.dots}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default RedirectingLoading;
