const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// catch login post request
router.post("/login", AuthController.login);

// Route for user registration
router.post("/register", AuthController.register);

// catch logout post request
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
