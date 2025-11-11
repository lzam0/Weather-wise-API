const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard")
const profileRoutes = require("./routes/profile")

dotenv.config();

const app = express();

// Allows request from FrontEnd
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// parse JSON body
app.use(express.json());

// parse cookies
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);
app.use("/api/weather", weatherRoutes);

// Protected routes
app.use("/api/dashboard", dashboardRoutes);
app.use(profileRoutes);

// Start server
app.listen(5000, () => console.log("🛰️ Server running on port 5000 🛰️"));