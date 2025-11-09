import { Router } from "express";
import { authenticateToken} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticateToken, (req, res) => {
  // Only accessible if json web token is valid
  res.json({ message: `Welcome to your dashboard, ${req.user.email}` });
});

export default router;
