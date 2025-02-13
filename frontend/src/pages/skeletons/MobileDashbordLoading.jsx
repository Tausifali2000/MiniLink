import styles from "./cssModules/MobileLoading.module.css"

const MobileDashbordLoading = () => {
  return (
    <div className={styles.cont}>
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

export default MobileDashbordLoading