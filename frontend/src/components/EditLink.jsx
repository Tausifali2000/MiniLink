import { useState, useEffect } from "react";
import styles from "./cssModules/NewLink.module.css";
import { useLinkStore } from "../store/link.store";
import { isoFormat } from "../../../backend/utils/formatDate";
import { handleClear, handleExpirationDateChange } from "../utils/editLinkHandlers";

const EditLink = ({ onClose, selectedLink }) => {
  //Store Functions
  const { editLink, fetchLinks, isEditing } = useLinkStore();

  //States
  const [url, setUrl] = useState(selectedLink?.url || "");
  const [remarks, setRemarks] = useState(selectedLink?.remark || "");
  const [linkExpiration, setLinkExpiration] = useState(!!selectedLink?.expiration);
  const [expirationDate, setExpirationDate] = useState(
    selectedLink?.expiration ? isoFormat(selectedLink.expiration) : ""
  );
  const [minDateTime, setMinDateTime] = useState("");
  const [error, setError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [remarkError, setRemarkError] = useState("");
  const [timeError, setTimeError] = useState("");

  //Not Allow user to select Past date
  useEffect(() => {

    const now = new Date();
    const isoString = now.toISOString().slice(0, 16);
    setMinDateTime(isoString);
  }, []);

  //Validates Url
  const isValidUrl = (string) => {
    try {
      new URL(string); 
      return true;
    } catch {
      return false; 
    }
  };

  //Handles Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url && !remarks) {
      setError("This field is mandatory")
      setRemarkError("This field is mandatory")
      return;
    }
    if (!url) {
      setError("This field is mandatory")
      return;
    }

    if (!remarks) {
      setRemarkError("This field is mandatory")
      return;
    }

    if (!isValidUrl(url)) {
      setUrlError("Please enter a valid URL.");
      return;
    }

    const updatedData = {
      id: selectedLink.id,
      newUrl: url,
      remark: remarks,
      expiration: linkExpiration ? expirationDate : null,
    };

    try {
      await editLink(updatedData);
      await fetchLinks();
      onClose();

    } catch (error) {
      console.error("Error updating link:", error);
    }


  };


  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h3>Edit Link</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <form className={styles.form} >
          <div className={styles.fixbody}>
            <label>
              Destination Url <span className={styles.required}>*</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={styles.input}
              required
            />
            {urlError && <div className={styles.errormsg}>{urlError}</div>}
            {error && <div className={styles.errormsg}>{error}</div>}

            <label>
              Remarks
            </label>
            <textarea
              placeholder="Add remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className={styles.textarea}
              required
            />
            {remarkError && <div className={styles.errormsg}>{remarkError}</div>}
            <div className={styles.switchRow}>
              <label>Link Expiration</label>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={linkExpiration}
                  onChange={() => {
                    setLinkExpiration(!linkExpiration);

                    // Clear expiration date if unchecked
                    if (linkExpiration) {
                      setExpirationDate(null); // Reset expiration date when the checkbox is unchecked
                    }
                  }}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            {linkExpiration && (
              <input
                type="datetime-local"
                value={expirationDate}

                className={styles.datetime}
                onChange={(e) => handleExpirationDateChange(e, setExpirationDate, setTimeError)}
                min={minDateTime}
              />
            )}

            {timeError && <div className={styles.errormsg}>{timeError}</div>}
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.clearButton}
              onClick={(e) => handleClear(e, setUrl, setRemarks, setLinkExpiration, 
                setExpirationDate, setError, setRemarkError, 
                setUrlError, setTimeError)}
            >
              Clear
            </button>
            <button type="submit" onClick={handleSubmit} className={styles.submitButton}>
              {isEditing ? (
                <>
                  <div className={styles.spinner}></div>
                  <span className={styles.spinnerText}>Save</span>
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default EditLink;
