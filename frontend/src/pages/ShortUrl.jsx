import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLinkStore } from "../store/link.store";
import RedirectingLoading from "./skeletons/RedirectingLoading";
import ErrorPage from "./skeletons/ErrorPage";


const ShortUrl = () => {
  const { hash } = useParams(); // Get the hash from URL params
  const { fetchRedirectUrl, redirectUrl, isLoading, error, fetchLinks} = useLinkStore();

  useEffect(() => {
    if (hash) {
      
      fetchRedirectUrl(hash); // Fetch the original URL using the hash
    }
  }, [hash, fetchRedirectUrl]);

  useEffect(() => {
    if (redirectUrl) {
      
      window.location.href = redirectUrl;
     
    }
  }, [redirectUrl]);

  if (isLoading) return <RedirectingLoading />;
  if (error) return <ErrorPage errorMessage={error} />;

  return null; 
};

export default ShortUrl;
