import styles from "./cssModules/MobileLoading.module.css";

const MobileLoading = () => {
  return (
    <div className={styles.cont}>
    <div className={styles.header}>
    <div className={styles.top}>
      <div className={styles.logo}>
        <img src="/cuvette.svg" alt="Logo" />
      </div>
     <div className={styles.head}>
             <div className={styles.load}></div>
             <div className={styles.profile}></div>
             </div>


    </div>

    <div className={styles.mid}>
      <img src="/menu.svg" className={styles.menu} alt="" />
      <div className={styles.actions}>
        <img className={styles.searchIcon} src="/search.svg" alt="" />
        <input
          type="text"
          placeholder="Search by remarks"
          className={styles.searchInput}
          
        />


        <button className={styles.createButton} >
          + Create new
        </button>

      </div>
</div>
</div>

<div className={styles.cardsWrapper}>
          <div className={styles.card}></div>
         
        </div>

        <div className={styles.graphsWrapper}>
          <div className={styles.graph}></div>
          <div className={styles.graph}></div>
        </div>
</div>
  )
}

export default MobileLoading