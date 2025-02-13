import mongoose from "mongoose";
import { formatDate } from "../utils/formatDate.js";

const urlSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: String,
    default: () => formatDate(new Date())
  },
  url: {
    type: String,
    required: true,
  },
  shorturl: {
    type: String,
    required: true,
    unique: true,
  },
  remark: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },

  expiration: {
    type: String,
    default: null
  },
  status: {
    type: Boolean,
    default: true,
  },
});





export const URL = mongoose.model("URL", urlSchema);