import express from "express";
import { getChildren, registerChild, assignDoctor } from "../controllers/childController.js";
import { verifyToken } from "../middlewares/verifyToken.js"; // Ensure you have this middleware

const router = express.Router();

// Protect these routes so we know which teacher is acting
router.use(verifyToken);

router.get("/", getChildren);
router.patch("/:id/assign-doctor", assignDoctor);
router.post("/", registerChild);

export default router;