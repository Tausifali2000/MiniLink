import { URL } from "../models/url.model.js";
import mongoose from "mongoose";
export async function getTotalClicks(userId) {

  const result = await URL.aggregate([
    { 
      $match: { 
        user: new mongoose.Types.ObjectId(userId) 
      } 
    },
    { 
      $group: { 
        _id: null, 
        totalClicks: { $sum: "$clicks" } 
      } 
    }
  ]);

  return result.length > 0 ? result[0].totalClicks : 0; 
}
