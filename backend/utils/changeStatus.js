import schedule from "node-schedule";
import { parse } from "date-fns";
import { URL } from "../models/url.model.js";

//Change Status of Links
export const changeStatus = async () => {
  try {
    const currentDate = new Date(); // Get current date-time

    // Find all active links that have an expiration date
    const expiredLinks = await URL.find({ expiration: { $ne: null }, status: true });

    let count = 0;
    for (let link of expiredLinks) {
      //Match The date Formats
      const expirationDate = parse(link.expiration, "MMM d, yyyy, HH:mm", new Date());
      if (expirationDate <= currentDate) {
        await URL.updateOne({ _id: link._id }, { $set: { status: false } });
        count++;
      }
    }

    if (count > 0) {
      console.log(`Deactivated ${count} expired links.`);
    }
  } catch (error) {
    console.error("Error checking and expiring links:", error);
  }
};

schedule.scheduleJob("*/50 * * * * *", changeStatus); //Scheduler runs every 50 secs


