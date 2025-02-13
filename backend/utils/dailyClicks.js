import mongoose from "mongoose";
import { Analytics } from "../models/analytics.model.js";

// Function to format the date into dd-mm-yy
function formatDateToDDMMYY(dateString) {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
}


export async function getDailyClicks(userId) {
  const dailyClicks = await Analytics.aggregate([
    {
      $match: { user: new mongoose.Types.ObjectId(userId) }
    },
    {
      $project: {
        day: { $substr: ["$timeStamp", 0, 10] },
        clicks: 1,
      }
    },
    {
      $group: {
        _id: "$day",
        totalClicksPerDay: { $sum: 1 }
      }
    },
    {
      $sort: { _id: -1 }
    }
  ]);

  let cumulativeClicks = 0;
  const dailyWithCumulative = dailyClicks.map((dayData) => {
    cumulativeClicks += dayData.totalClicksPerDay;
    const formattedDate = formatDateToDDMMYY(dayData._id);

    return {
      date: formattedDate,
      dailyClicks: dayData.totalClicksPerDay,
      cumulativeClicks,
    };
  });

  return dailyWithCumulative;
}
