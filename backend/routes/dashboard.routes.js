import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { addDate, fetchDashboard } from "../controllers/dashboard.controllers.js";

const router = express.Router(); 

router.get("/fetchdashboard", protectRoute, fetchDashboard); //Fetching Dashboard Data
router.post("/addDate", protectRoute, addDate); //Testing Purpose

export default router;
