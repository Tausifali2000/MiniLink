import mongoose from "mongoose";


const dashboardSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  totalClicks: {
    type: Number,
    default: 0,
  },


  datewise: {
    type: Map,
    of: {
      date: { type: String, required: true, unique: true, },
      clickCount: { type: Number, default: 0 }
    }
  }


});

export const Dashboard = mongoose.model("Dashboard", dashboardSchema);