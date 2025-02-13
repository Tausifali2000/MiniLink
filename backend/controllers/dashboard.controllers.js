import { Analytics } from "../models/analytics.model.js";
import { Dashboard } from "../models/dashboard.model.js";
import { formatDateDash } from "../utils/formatDate.js";

//Fetch Dashboard Page
export async function fetchDashboard(req, res) {
  try {
    const userId = req.user.id;

    //Device Specific Clicks
    const mobileCount = await Analytics.countDocuments({ userDevice: "mobile", user: userId });
    const tabletCount = await Analytics.countDocuments({ userDevice: "Tablet", user: userId });
    const desktopCount = await Analytics.countDocuments({ userDevice: "Desktop", user: userId });

    //Total CLicks
    const dashboardData = await Dashboard.findOne({ user: userId });
    const totalClicksCount = dashboardData.totalClicks;

    const today = formatDateDash(new Date());

    const existingEntry = await Dashboard.findOne({
      user: userId,
      [`datewise.${today}`]: { $exists: true },
    });

    if (!existingEntry) {
      await Dashboard.updateOne(
        { user: userId },
        {
          $set: {
            [`datewise.${today}`]: { date: today, clickCount: 0 },
          },
        },
        { upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      data: {
        Mobile: mobileCount,
        Tablet: tabletCount,
        Desktop: desktopCount,
        TotalClicks: totalClicksCount,
        DateWise: existingEntry,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching analytics data",
      error: error.message,
    });
  }
}

//For testing Purpose
export async function addDate(req, res) {
  try {
    const userId = req.user.id;
    const { date, count } = req.body;

    if (!date || count === undefined) {
      return res.status(400).json({
        success: false,
        message: "Date and count are required."
      });
    }

  
    const existingEntry = await Dashboard.findOne({ user: userId, [`datewise.${date}`]: { $exists: true } });

    if (existingEntry) {
      
      await Dashboard.updateOne(
        { user: userId },
        { $set: { [`datewise.${date}.clickCount`]: count } }
      );
    } else {
     
      await Dashboard.updateOne(
        { user: userId },
        { $set: { [`datewise.${date}`]: { date, clickCount: count } } },
        { upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Date and count updated successfully.",
      Datewise: existingEntry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating date and count.",
      error: error.message,
    });
  }
}
