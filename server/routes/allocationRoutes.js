import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createAllocation, listAllocations, updateAllocationStatus, listLedger, markReceivedByDistrict, assignToBlock, assignToSchool, markUtilizedByTeacher } from "../controllers/allocationsController.js";

const router = express.Router();

router.post("/", verifyToken, createAllocation);
router.get("/", verifyToken, listAllocations);
router.patch("/:id/status", verifyToken, updateAllocationStatus);
router.get("/ledger", verifyToken, listLedger);
// simplified role flows
router.patch("/:id/received", verifyToken, markReceivedByDistrict);
router.patch("/:id/assign-block", verifyToken, assignToBlock);
router.patch("/:id/assign-school", verifyToken, assignToSchool);
router.patch("/:id/utilize", verifyToken, markUtilizedByTeacher);

export default router;


