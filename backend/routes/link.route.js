import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createLink, fetchLinks, redirectShortUrl, editLink, deleteLink } from "../controllers/link.controllers.js";

const router = express.Router(); 

router.post("/createlink", protectRoute, createLink); //Create New Link 
router.get("/fetchlinks", protectRoute, fetchLinks); //Fetch All Links Data
router.post("/editlink", protectRoute, editLink); //Edit A Link
router.delete("/deletelink", protectRoute, deleteLink); //Delete A Link
router.get("/:hash", redirectShortUrl); //Redirect to OriginalUrl


export default router;
