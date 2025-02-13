import React, { useState, useEffect } from "react";
import { useLinkStore } from "../../store/link.store";
import styles from "./cssModules/Links.module.css";
import EditLink from "../../components/EditLink";
import DeleteLink from "../../components/DeleteLink";
import TableLoading from "../skeletons/TableLoading";
import ReactPaginate from "react-paginate";
import { sortLinks } from "../../utils/sortTable.js";
import { useSearchStore } from "../../store/search.store.js";
import { useScreenStore } from "../../store/screen.store.js";
import {
  handleEdit,
  closeEditDialog,
  handleDelete,
  handleCopy,
  toggleSortOrder,
  toggleStatusSortOrder,
  handlePageClick,
} from "../../utils/linksHandlers.js";  // Handlers import

const Links = () => {

  const { fetchLinks, fetchedlinks, isFetching } = useLinkStore();
 const { searchQuery} = useSearchStore()
 const {screenSize} = useScreenStore()
 console.log(screenSize);
  
  //States
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusSortOrder, setStatusSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  //UseEffect fetching table data 
  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const filteredLinks = fetchedlinks.filter((link) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      link.url.toLowerCase().includes(lowerCaseSearchQuery) ||
      link.shorturl.toLowerCase().includes(lowerCaseSearchQuery) ||
      link.remark.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  //Sorting and Pagination variables
  const sortedLinks = sortLinks(filteredLinks, sortOrder, statusSortOrder);
  const pageCount = Math.ceil(sortedLinks.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = sortedLinks.slice(offset, offset + itemsPerPage);

   // Filtering links based on search
 

  return (
    <div className={styles.body}>
         <div className={styles.tableContainer}>
      {isFetching ? (
        <TableLoading />
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
              <th style={{ width: screenSize <= 650 ? '100px' : '150px' }}>
                  <div className={styles.shortUrlTd}>
                    Date
                    <div className={styles.sortLogo} onClick={() => toggleSortOrder(setSortOrder, setStatusSortOrder)}>
                      <img src="/sort.svg" alt="" />
                    </div>
                  </div>
                </th>
                <th style={{ width: screenSize <= 650 ? '120px' : '250px' }}>Original Link</th>
                <th style={{ width: screenSize <= 650 ? '120px' : '200px' }}>Short Link</th>
                <th style={{ width: screenSize <= 650 ? '80px' : '120px' }}>Remarks</th>
                <th style={{ width: screenSize <= 650 ? '60px' : '100px', textAlign: "center"}}>Clicks</th>
                <th style={{ width: screenSize <= 650 ? '60px' : '100px' }}>
                  <div className={styles.shortUrlTd} onClick={() => toggleStatusSortOrder(setStatusSortOrder)}>
                    Status
                    <div className={styles.sortLogo}><img src="/sort.svg" alt="" /></div>
                  </div>
                </th>
                <th style={{ width: screenSize <= 650 ? '100px' : '150px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.length > 0 ? (
                currentPageData.map((link, index) => (
                  <tr key={index}>
                    <td>{link.date}</td>
                    <td>{link.url}</td>
                    <td>
                      <div className={styles.shortUrlTd}>
                        <div>{link.shorturl}</div>
                        <div className={styles.copyLogo} onClick={() => handleCopy(link.shorturl)}>
                          <img src="/copy.svg" alt="" />
                        </div>
                      </div>
                    </td>
                    <td>{link.remark}</td>
                    <td>{link.clicks}</td>
                    <td className={link.status === "Active" ? styles.activeStatus : styles.inactiveStatus}>
                      {link.status}
                    </td>
                    <td>
                      <button className={styles.editButton} onClick={() => handleEdit(link, setSelectedLink, setIsEditDialogOpen)}>
                        <img src="/Edit.svg" alt="" />
                      </button>
                      <button className={styles.deleteButton} onClick={() => handleDelete(link, setSelectedLink, setDialogOpen)}>
                        <img src="/Delete.svg" alt="" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>No links found.</td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/*Edit Link Dialogbox*/}
          {isEditDialogOpen && (
            <EditLink
              onClose={() => closeEditDialog(setSelectedLink, setIsEditDialogOpen)}
              selectedLink={selectedLink}
            />
          )}

           {/*Delete Link Dialogbox*/}
          {isDialogOpen && (
            <DeleteLink 
              selectedLink={selectedLink}
              onCancel={() => setDialogOpen(false)} 
            />
          )}

        
        </>
      )}
    </div>

       {/*Pagination Component*/}
       {sortedLinks.length > itemsPerPage && (
            <div className={styles.paginationContainer}>
              <ReactPaginate
                previousLabel={"‹"}
                nextLabel={"›"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={({ selected }) => handlePageClick(selected, setCurrentPage)}
                containerClassName={styles.pagination}
                activeClassName={styles.activePage}
                previousClassName={styles.previous}
                nextClassName={styles.next}
                disabledClassName={styles.disabled}
              />
            </div>
          )}

    </div>
   
  );
};

export default Links;
