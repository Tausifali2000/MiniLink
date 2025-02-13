import React from "react";
import styles from "./cssModules/HomeLoading.module.css";

const HomeLoading = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
        <img src="/cuvette.svg" alt="" />
        </div>
       
        <div className={styles.sidebarItem}></div>
        <div className={styles.sidebarItem}></div>
        <div className={styles.sidebarItem}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.head}>
        <div className={styles.header}></div>
        <div className={styles.profile}></div>
        </div>
        

        <div className={styles.cardsWrapper}>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
        </div>

        <div className={styles.graphsWrapper}>
          <div className={styles.graph}></div>
          <div className={styles.graph}></div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoading;