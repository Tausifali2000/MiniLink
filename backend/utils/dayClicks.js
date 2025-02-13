import { Dashboard } from "../models/dashboard.model.js";


export async function dayClicks(userId) {
  try {
    const dashboard = await Dashboard.findOne({ user: userId }).lean(); // Use lean() for better performance

    if (!dashboard) {
      return { DateWise: [] }; // Return empty array if no dashboard found
    }

    const dateWiseData = Object.entries(dashboard.datewise)
      .map(([date, { clickCount }]) => ({ date, clickCount }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date in descending order

    return { DateWise: dateWiseData };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { DateWise: [] }; // Return empty array on error
  }
}

