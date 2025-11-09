import { router } from "express";
import { login } from "../controllers/authController";

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

export default router;
