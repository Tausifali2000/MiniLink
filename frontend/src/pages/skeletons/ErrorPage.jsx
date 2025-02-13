

import styles from "./cssModules/ErrorPage.module.css";

const ErrorPage = ({ errorMessage }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorBox}>
        <h2 className={styles.errorTitle}>Something went wrong.</h2>
        <p className={styles.errorMessage}>{errorMessage || "An unknown error occurred."}</p>
       
      </div>
    </div>
  );
};

export default ErrorPage;
