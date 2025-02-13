import skeleton from "./cssModules/DashboardLoading.module.css";

const DashboardLoading = () => {
  return (
    <div className={skeleton.pad}>
       <div className={skeleton.header}></div>
       <div className={skeleton.content}>
       <div className={skeleton.body}></div>
       <div className={skeleton.body}></div>
       </div>
        
    </div>
  )
}

export default DashboardLoading