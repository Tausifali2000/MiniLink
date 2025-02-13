import { useEffect, useState } from "react";
import { useAnalyticsStore } from "../../store/analytics.store";
import TableLoading from "../skeletons/TableLoading";
import styles from "./cssModules/Analytics.module.css";
import ReactPaginate from "react-paginate";
import { sortAnalytics } from "../../utils/sortTable";
import { useScreenStore } from "../../store/screen.store.js";
import { handlePageClick, toggleSortOrder } from "../../utils/analyticsHandlers.js"; // Handlers Import

const Analytics = () => {
  
  //Stores
  const { fetchAnalytics, analyticsData, isLoading } = useAnalyticsStore(); 
  const {screenSize} = useScreenStore()
  
  //States
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortedData, setSortedData] = useState([]);
  const itemsPerPage = 8;

  //UseEffect to fetch table data
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  //useEffect to sort data when new data arrvies
  useEffect(() => {
    if (analyticsData.length > 0) {
      setSortedData(sortAnalytics(analyticsData, sortOrder));
    }
  }, [analyticsData, sortOrder]);

  //Pagination variables
  const pageCount = Math.ceil(sortedData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = sortedData.slice(offset, offset + itemsPerPage);

  return (
      <div className={styles.body}>
      <div className={styles.tableContainer}>
        {isLoading ? (
          <TableLoading />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
              <th style={{ width: screenSize <= 650 ? '100px' : '180px' }}>
                  <div className={styles.date}>
                    Timestamp
                    <div className={styles.sortLogo} onClick={toggleSortOrder(setSortOrder)}>
                      <img src="/sort.svg" alt="Sort" />
                    </div>
                  </div>
                </th>
                <th style={{ width: screenSize <= 650 ? '200px' : '330px' }}>Original Link</th>
                <th style={{ width: screenSize <= 650 ? '150px' : '300px' }}>Short Link</th>
                <th style={{ width: screenSize <= 650 ? '150px' : '250px' }}>Ip Address</th>
                <th style={{ width: screenSize <= 650 ? '100px' : '180px' }}>User Device</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.length > 0 ? (
                currentPageData.map((link, index) => (
                  <tr key={index}>
                    <td>{link.timeStamp}</td>
                    <td>
                      <div>{link.originalLink}</div>
                    </td>
                    <td>
                      <div className={styles.shortUrlTd}>
                        <div>{link.shortLink}</div>
                      </div>
                    </td>
                    <td>{link.ip}</td>
                    <td>{link.userDevice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No clicks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Component */}
      {sortedData.length > itemsPerPage && (
        <div className={styles.paginationContainer}>
          <ReactPaginate
            previousLabel={"‹"}
            nextLabel={"›"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick(setCurrentPage)}
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

export default Analytics;
