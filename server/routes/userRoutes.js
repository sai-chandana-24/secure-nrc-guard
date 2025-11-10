import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { listUsers, updateUserRole } from "../controllers/usersController.js";

const router = express.Router();

// Simple admin-only gate
function adminOnly(req, res, next) {
  if (req?.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

router.get("/", verifyToken, adminOnly, listUsers);
router.patch("/:id/role", verifyToken, adminOnly, updateUserRole);

export default router;


