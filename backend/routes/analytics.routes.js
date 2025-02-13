import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { fetchAnalytics } from "../controllers/analytics.controllers.js";

const router = express.Router();

router.get("/fetchanalytics", protectRoute, fetchAnalytics); //Fetching Analytics Data

export default router;
