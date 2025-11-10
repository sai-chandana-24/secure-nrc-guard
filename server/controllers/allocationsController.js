import crypto from "crypto";
import allocationModel from "../models/allocationModel.js";
import ledgerBlockModel from "../models/ledgerBlockModel.js";

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function appendLedgerBlock({ txType, allocation, payload, signerUserId }) {
  const last = await ledgerBlockModel.findOne({}).sort({ index: -1 }).lean();
  const index = last ? last.index + 1 : 0;
  const prevHash = last ? last.hash : "GENESIS";
  const timestamp = new Date();
  const body = JSON.stringify({ index, timestamp, txType, allocationId: allocation._id, payload, prevHash, signerUserId: String(signerUserId) });
  const hash = sha256(body);
  const block = await ledgerBlockModel.create({ index, timestamp, txType, allocationId: allocation._id, payload, prevHash, hash, signerUserId });
  return block;
}

export const createAllocation = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    const { districtName, amount, purpose } = req.body;
    if (!districtName || typeof amount !== "number") {
      return res.status(400).json({ error: "districtName and amount are required" });
    }
    const allocation = await allocationModel.create({
      fromRole: "admin",
      fromUserId: req.user.id,
      toRole: "district",
      districtName,
      amount,
      purpose,
      status: "approved",
    });

    await appendLedgerBlock({
      txType: "ALLOCATION",
      allocation,
      payload: { districtName, amount, purpose, status: allocation.status },
      signerUserId: req.user.id,
    });

    res.status(201).json({ allocation });
  } catch (error) {
    console.error("Error creating allocation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const listAllocations = async (req, res) => {
  try {
    const role = req.user?.role;
    const qDistrict = (req.query?.districtName || "").trim();
    let filter = {};
    // Visibility: allow filtering by districtName via query; for district role, enforce provided filter if present
    if (qDistrict) {
      filter = { ...filter, districtName: qDistrict };
    }
    const allocations = await allocationModel.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ allocations });
  } catch (error) {
    console.error("Error listing allocations:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateAllocationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const valid = ["approved", "transferred", "utilized", "audited"];
    if (!valid.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    // Simple role gate: admin and district can update
    if (!['admin', 'district'].includes(req.user?.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    const allocation = await allocationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!allocation) return res.status(404).json({ error: "Allocation not found" });

    await appendLedgerBlock({
      txType: "STATUS_CHANGE",
      allocation,
      payload: { status },
      signerUserId: req.user.id,
    });

    res.json({ allocation });
  } catch (error) {
    console.error("Error updating allocation status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const listLedger = async (req, res) => {
  try {
    const { allocationId, page = 1, pageSize = 20 } = req.query;
    const q = allocationId ? { allocationId } : {};
    const skip = (Number(page) - 1) * Number(pageSize);
    const [rows, total] = await Promise.all([
      ledgerBlockModel.find(q).sort({ index: -1 }).skip(skip).limit(Number(pageSize)).lean(),
      ledgerBlockModel.countDocuments(q),
    ]);
    res.json({ rows, total });
  } catch (error) {
    console.error("Error listing ledger:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Simple role-specific progression endpoints
export const markReceivedByDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const allocation = await allocationModel.findByIdAndUpdate(id, { received: true }, { new: true });
    if (!allocation) return res.status(404).json({ error: 'Allocation not found' });
    await appendLedgerBlock({ txType: 'RECEIVED', allocation, payload: { received: true }, signerUserId: req.user.id });
    res.json({ allocation });
  } catch (e) {
    console.error('Error markReceivedByDistrict:', e);
    res.status(500).json({ error: 'Server error' });
  }
};

export const assignToBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { blockName } = req.body;
    const allocation = await allocationModel.findByIdAndUpdate(id, { blockName }, { new: true });
    if (!allocation) return res.status(404).json({ error: 'Allocation not found' });
    await appendLedgerBlock({ txType: 'ASSIGNED_BLOCK', allocation, payload: { blockName }, signerUserId: req.user.id });
    res.json({ allocation });
  } catch (e) {
    console.error('Error assignToBlock:', e);
    res.status(500).json({ error: 'Server error' });
  }
};

export const assignToSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const { schoolName } = req.body;
    const allocation = await allocationModel.findByIdAndUpdate(id, { schoolName }, { new: true });
    if (!allocation) return res.status(404).json({ error: 'Allocation not found' });
    await appendLedgerBlock({ txType: 'ASSIGNED_SCHOOL', allocation, payload: { schoolName }, signerUserId: req.user.id });
    res.json({ allocation });
  } catch (e) {
    console.error('Error assignToSchool:', e);
    res.status(500).json({ error: 'Server error' });
  }
};

export const markUtilizedByTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const allocation = await allocationModel.findByIdAndUpdate(id, { utilized: true, status: 'utilized' }, { new: true });
    if (!allocation) return res.status(404).json({ error: 'Allocation not found' });
    await appendLedgerBlock({ txType: 'UTILIZED', allocation, payload: { utilized: true }, signerUserId: req.user.id });
    res.json({ allocation });
  } catch (e) {
    console.error('Error markUtilizedByTeacher:', e);
    res.status(500).json({ error: 'Server error' });
  }
};


