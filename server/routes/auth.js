const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// catch login post request
router.post("/login", login);

// catch logout post request
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
