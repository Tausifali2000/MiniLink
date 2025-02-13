export const handlePageClick = (setCurrentPage) => ({ selected }) => {
  setCurrentPage(selected);
};

export const toggleSortOrder = (setSortOrder) => () => {
  setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
};
