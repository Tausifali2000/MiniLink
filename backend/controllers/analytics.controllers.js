import { Analytics } from "../models/analytics.model.js";

//Fetch Analytics Page
export async function fetchAnalytics(req, res) {
  try {
    const loggedInUserId = req.user.id; 
    const analyticsData = await Analytics.find({ user: loggedInUserId });
    
    res.status(200).json({
      success: true,
      message: "Analytics data fetched successfully.",
      data: analyticsData,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching analytics data.",
    });
  }
}
