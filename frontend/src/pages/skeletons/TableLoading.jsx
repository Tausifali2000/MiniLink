import styles from "../userPages/cssModules/Links.module.css";
import skeleton from "./cssModules/TableLoading.module.css";

const TableLoading = () => {
  return (
    <>
       <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '150px' }}>
                    <div className={styles.shortUrlTd}>
                    Date
                    <div><img src="/sort.svg" alt="" /></div>
                    </div>
                    </th>
                  <th style={{ width: '300px' }}>Original Link</th>
                  <th style={{ width: '200px' }}>Short Link</th>
                  <th style={{ width: '150px' }}>Remarks</th>
                  <th style={{ width: '100px' }}>Clicks</th>
                  <th style={{ width: '100px' }}>Status</th>
                  <th style={{ width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody className={skeleton.body}>
              <div className={skeleton.header}></div>
              <div className={skeleton.header}></div>
              <div className={skeleton.header}></div>

              <div className={skeleton.header}></div>
                    
              </tbody>
        </table>
    </>
    
  )
}

export default TableLoading