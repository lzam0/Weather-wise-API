const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/auth");

const app = express();

// Allows request from FrontEnd
app.use(cors());

// parse JSON body
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Start server
app.listen(5000, () => console.log("🛰️ Server running on port 5000 🛰️"));