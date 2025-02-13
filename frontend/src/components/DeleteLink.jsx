import { useLinkStore } from "../store/link.store";
import styles from "./cssModules/DeleteAccount.module.css";

const DeleteLink = ({ onCancel, selectedLink }) => {

  //Store Function
  const { deleteLink, fetchLinks, isDeleting } = useLinkStore();

  //Onclick Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = selectedLink.id
    try {
      await deleteLink(id);
      await fetchLinks();
      onCancel();
    } catch (error) {
      console.error("Error updating link:", error);
    }

  }
  return (
    <div className={styles.overlay}>
      <div className={styles.dialogBox}>
        <button className={styles.closeButton} onClick={onCancel}>
          ✖
        </button>
        <div className={styles.body}>
          <p className={styles.message}>
            Are you sure, you want to remove it?
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={onCancel}>
              NO
            </button>
            <button className={styles.confirmButton} onClick={handleSubmit}>
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

export default DeleteLink;
