import express from "express"; // Express module import
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors middleware
import path from "path"
import { ENV_VARS } from "./config/envVars.js"; // Constant variable import
import { connectDB } from "./config/db.js"; // MongoDB connection import

import authRoutes from "./routes/auth.route.js";
import linkRoutes from "./routes/link.route.js";
import settingRoutes from "./routes/settings.route.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { changeStatus } from "./utils/changeStatus.js";

const app = express(); // Creating Express instance
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/link", linkRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

//Scheduler
changeStatus();

// Start server and connect to DB
app.listen(PORT,() => {
  console.log("Server started at " + PORT);
  connectDB();
  
});



