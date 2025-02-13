
import { useEffect, useState } from "react";
import styles from "./cssModules/NewLink.module.css";
import { useLinkStore } from "../store/link.store";
import { formatDate } from "../../../backend/utils/formatDate";

import { useSidebarStore } from "../store/sidebar.store";


const NewLink = ({ onClose }) => {
  
  //Store FUnctions
  const { createLink, fetchLinks, isCreating } = useLinkStore()
  const { selectedOption, setSelectedOption } = useSidebarStore();
  
  //States
  const [url, setUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [linkExpiration, setLinkExpiration] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [minDateTime, setMinDateTime] = useState("");
  const [error, setError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [remarkError, setRemarkError] = useState("");
  const [timeError, setTimeError] = useState("");
 
  
  //Stop user from selecting Past Date
  useEffect(() => {
    const now = new Date();
    const isoString = now.toISOString().slice(0, 16); 
    setMinDateTime(isoString);
  }, []);

  const handleExpirationDateChange = (e) => {
    const selectedDateTime = e.target.value;
    const now = new Date();
    const selectedDate = new Date(selectedDateTime);

    if (selectedDate < now) {
     setTimeError("Please select a future time");
      return;
    }

    setExpirationDate(selectedDateTime);
  };

  //Format date for storage
  const formattedExpirationDate = linkExpiration
      ? formatDate(expirationDate)
      : null;

      const isValidUrl = (string) => {
        try {
          new URL(string); 
          return true;
        } catch {
          return false; 
        }
      };


  //Handles form submission
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
    const linkData = {
      newUrl : url,
      remarks,
      expiration: formattedExpirationDate,
    };

    try {
      await createLink(linkData);
      setUrl("");
      setRemarks("");
      setLinkExpiration(false);
      setExpirationDate("");
      await fetchLinks();
      onClose();
      setSelectedOption("links");
    } 
    catch (error) {}
  };

 //Handle Clear 
  const handleClear = async (e) => {
    e.preventDefault();
    setUrl("");
    setRemarks("");
    setLinkExpiration(false);
    setExpirationDate("");
    setError("");
    setRemarkError("");
    setUrlError("");
    setTimeError("");

  }




  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h3>New Link</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
      
        <form className={styles.form}>
          <div className={styles.fixbody}>
          <label>
            Destination Url <span className={styles.required}>*</span>
          </label>
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`${styles.input} ${urlError || error ? styles.errorBorder : ""}`}
            required
          />
          {urlError && <div className={styles.errormsg}>{urlError}</div>}
          {error && <div className={styles.errormsg}>{error}</div>}
          <label>
            Remarks <span className={styles.required}>*</span>
          </label>
          <textarea
            placeholder="Add remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className={`${styles.textarea} ${remarkError ? styles.errorBorder : ""}`}
            required
          />
            {remarkError && <div className={styles.errormsg}>{remarkError}</div>}
          <div className={styles.switchRow}>
            <label>Link Expiration</label>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={linkExpiration}
                onChange={() => setLinkExpiration(!linkExpiration)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {linkExpiration && (
            <input
              type="datetime-local"
              value={expirationDate}
              onChange={handleExpirationDateChange}
              className={styles.datetime}
              min={minDateTime}
              required={linkExpiration}
            />
            
          )}
          {timeError && <div className={styles.errormsg}>{timeError}</div>}
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.clearButton} onClick={handleClear}>
              Clear
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.submitButton}
              disabled={isCreating} // Disable the button while creating
            >
             {isCreating ? (
                             <>
                               <div className={styles.spinner}></div>
                               <span className={styles.spinnerText}>Create New</span>
                             </>
                           ) : (
                             "Create New"
                           )}
            </button>
          </div>
       
        </form>

       
      </div>
    </div>
  );
};

export default NewLink;
