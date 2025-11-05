const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middleware
const authToken = require('./middleware/authMiddleware')

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard")

const app = express();

// Allows request from FrontEnd
// Allows request from FrontEnd
app.use(cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
}));

// parse JSON body
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Protected dashboard route
app.get('/api/dashboard', authToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}` });
});

// Start server
app.listen(5000, () => console.log("🛰️ Server running on port 5000 🛰️"));