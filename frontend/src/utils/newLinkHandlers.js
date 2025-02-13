// utils/linkUtils.js

export const handleSubmit = async (
  e,
  url,
  remarks,
  linkExpiration,
  expirationDate,
  setUrl,
  setRemarks,
  setLinkExpiration,
  setExpirationDate,
  setError,
  setRemarkError,
  setUrlError,
  setTimeError,
  createLink,
  fetchLinks,
  onClose,
  setSelectedOption
) => {
  e.preventDefault();

  if (!url && !remarks) {
    setError("This field is mandatory");
    setRemarkError("This field is mandatory");
    return;
  }
  if (!url) {
    setError("This field is mandatory");
    return;
  }

  if (!remarks) {
    setRemarkError("This field is mandatory");
    return;
  }

  const isValidUrl = (string) => {
    try {
      new URL(string); // If this works, the URL is valid
      return true;
    } catch {
      return false; // If this fails, the URL is invalid
    }
  };

  if (!isValidUrl(url)) {
    setUrlError("Please enter a valid URL.");
    return;
  }

  const formattedExpirationDate = linkExpiration ? formatDate(expirationDate) : null;

  const linkData = {
    newUrl: url,
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
  } catch (error) {
    console.error(error);
  }
};

export const handleClear = (
  e,
  setUrl,
  setRemarks,
  setLinkExpiration,
  setExpirationDate,
  setError,
  setRemarkError,
  setUrlError,
  setTimeError
) => {
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
