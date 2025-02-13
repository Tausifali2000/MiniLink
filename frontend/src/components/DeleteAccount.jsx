import { useSettingsStore } from "../store/settings.store";
import styles from "./cssModules/DeleteAccount.module.css";

const DeleteAccount = ({ onConfirm, onCancel }) => {
  //Store Function
  const { isDeleting } = useSettingsStore();

  return (
    <div className={styles.overlay}>
      <div className={`${styles.dialogBox} ${isDeleting ? styles.shrink : ""}`}>
        <button className={styles.closeButton} onClick={onCancel} disabled={isDeleting}>
          ✖
        </button>
        <div className={styles.body}>
          <p className={styles.message}>
            Are you sure you want to delete your account?
          </p>

          {isDeleting && <div className={styles.spinner}></div>}

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={onCancel} disabled={isDeleting}>
              NO
            </button>
            <button className={styles.confirmButton} onClick={onConfirm} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <div className={styles.spinner}></div>
                  <span className={styles.spinnerText}>YES</span>
                </>
              ) : (
                "YES"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
