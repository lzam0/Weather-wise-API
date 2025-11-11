const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AuthController = require("../controllers/authController");
const UserModel = require("../models/userModel");


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

router.get("/verify", async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Update user as verified
    await UserModel.verifyUser(decoded.email);

    // Redirect to frontend login page with success message
    res.redirect("http://localhost:5173/login?verified=true");
  } catch (err) {
    console.error(err)
    res.redirect("http://localhost:5173/login?verified=false");
  }
});



module.exports = router;




