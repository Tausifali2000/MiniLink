export const sortLinks = (links, sortOrder, statusSortOrder) => {
  return [...links].sort((a, b) => {
    if (statusSortOrder) {
      if (statusSortOrder === "active-first") {
        return a.status === "Active" && b.status !== "Active" ? -1 : a.status !== "Active" && b.status === "Active" ? 1 : 0;
      }
      return a.status === "Inactive" && b.status !== "Inactive" ? -1 : a.status !== "Inactive" && b.status === "Inactive" ? 1 : 0;
    }
    return sortOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
  });
};


export const sortAnalytics = (data, order) => {
  return [...data].sort((a, b) => {
    return order === "desc"
      ? new Date(b.timeStamp) - new Date(a.timeStamp)
      : new Date(a.timeStamp) - new Date(b.timeStamp);
  });
};