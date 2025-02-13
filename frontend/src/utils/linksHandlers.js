import toast from "react-hot-toast";
import { CustomToast } from "../App";

export const handleEdit = (link, setSelectedLink, setIsEditDialogOpen) => {
  setSelectedLink(link);
  setIsEditDialogOpen(true);
};

export const closeEditDialog = (setSelectedLink, setIsEditDialogOpen) => {
  setSelectedLink(null);
  setIsEditDialogOpen(false);
};

export const handleDelete = (link, setSelectedLink, setDialogOpen) => {
  setSelectedLink(link);
  setDialogOpen(true);
};

export const handleCopy = (shortUrl) => {
  navigator.clipboard.writeText(shortUrl)
    .then(() => {
      CustomToast.success("Link Copied");
    })
    .catch(() => {
      toast.error("Failed to copy link");
    });
};

export const toggleSortOrder = (setSortOrder, setStatusSortOrder) => {
  setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  setStatusSortOrder(null);
};

export const toggleStatusSortOrder = (setStatusSortOrder) => {
  setStatusSortOrder((prevOrder) =>
    prevOrder === "active-first" ? "inactive-first" : "active-first"
  );
};

export const handlePageClick = (selected, setCurrentPage) => {
  setCurrentPage(selected);
};
