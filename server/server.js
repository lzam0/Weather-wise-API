require("dotenv").config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Page Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard")
const profileRoutes = require("./routes/profile")

// Initialize express app
const app = express();

// Allows request from FrontEnd
app.use(cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true, // allow cookies
}));

// parse JSON body
app.use(express.json());

// parse cookies
app.use(cookieParser()); 

// Routes
app.use("/api", authRoutes);

// Protected routes
app.use("/api/dashboard", dashboardRoutes);
app.use(profileRoutes);

// Start server
app.listen(5000, () => console.log("🛰️ Server running on port 5000 🛰️"));