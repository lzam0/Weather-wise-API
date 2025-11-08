import express from 'express';
import weatherRoutes from "./routes/weatherRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5432;
const NODE_ENV = process.env.NODE_ENV || 'development';



const authRoutes = require("./routes/auth");

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