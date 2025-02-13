
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

export const handleExpirationDateChange = (e, setExpirationDate, setTimeError) => {
  const selectedDateTime = e.target.value;
  const now = new Date();
  const selectedDate = new Date(selectedDateTime);

  if (selectedDate < now) {
    setTimeError("Please select a future time");
    return;
  }

  setExpirationDate(selectedDateTime);
};

export const handleClear = (e, setUrl, setRemarks, setLinkExpiration, setExpirationDate, setError, setRemarkError, setUrlError, setTimeError) => {
  e.preventDefault();
  setUrl("");
  setRemarks("");
  setLinkExpiration(false);
  setExpirationDate("");
  setError("");
  setRemarkError("");
  setUrlError("");
  setTimeError("");
};

export const handleToggleExpiration = (linkExpiration, setLinkExpiration, setExpirationDate) => {
  setLinkExpiration(!linkExpiration);

  if (linkExpiration) {
    setExpirationDate(null);
  }
};
