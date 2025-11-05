const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authMiddleware");

router.get("/", authToken, (req, res) => {
  // Only accessible if json web token is valid
  res.json({ message: `Welcome to your dashboard, ${req.user.email}` });
});

module.exports = router;
