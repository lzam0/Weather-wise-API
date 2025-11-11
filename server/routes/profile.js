const express = require('express');
const router = express.Router();
const authenticateToken = require ("../middleware/authMiddleware.js");
const UserModel = require( "../models/userModel.js");



// GET /api/profile (protected)
router.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    // find user by email from decoded JWT
    const user = await UserModel.findByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  return safe data
    res.json({
      email: user.email,
      fname: user.first_name,
      lname: user.last_name,
      joined_at: user.joined_at,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

module.exports = router;
