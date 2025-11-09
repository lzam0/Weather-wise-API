import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Allows request from FrontEnd
app.use(cors());

// parse JSON body
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/weather", weatherRoutes);

// Start server
app.listen(5000, () => console.log("🛰️ Server running on port 5000 🛰️"));