import mongoose from "mongoose";
import { formatDate } from "../utils/formatDate.js";

const analyticsSchema = mongoose.Schema({
  timeStamp: {
    type: String,
    default: () => formatDate(new Date())
  },

  originalLink: {
    type: String,
    required: true,
  },

  shortLink: {
    type: String,
    required: true,
  },

  ip: {
    type: String,
    required: true,
  },

  userDevice: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },



});

export const Analytics = mongoose.model("Analytics", analyticsSchema);