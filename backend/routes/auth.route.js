import express from "express";
import {signup, login, logout, authCheck} from "../controllers/auth.controllers.js";
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router(); 

router.post("/signup", signup); //Signup
router.post("/login", login); //Login
router.post("/logout", logout); //Logout
router.get("/authCheck", protectRoute, authCheck); //Checks user

export default router;
