import jwt from "jsonwebtoken";
import AuthController from "../controllers/authController.js";
import express from "express";
import UserModel from "../models/userModel.js";

const router = express.Router();

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



export default router;




