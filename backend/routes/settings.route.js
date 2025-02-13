import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteUser, updateUser } from "../controllers/settings.controllers.js";

const router = express.Router(); 

router.post("/updateuser", protectRoute, updateUser); //Update User Details 
router.delete("/deleteuser", protectRoute, deleteUser);  //Delete User Account

export default router;