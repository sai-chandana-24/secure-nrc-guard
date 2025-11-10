import authModel from "../models/authModel.js";

const VALID_ROLES = [
  "admin",
  "district",
  "block",
  "supervisor",
  "teacher",
  "nrc",
  "public",
];

export const listUsers = async (req, res) => {
  try {
    const users = await authModel
      .find({}, { password: 0 })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ users });
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const updated = await authModel.findByIdAndUpdate(
      id,
      { role },
      { new: true, projection: { password: 0 } }
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: updated });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Server error" });
  }
};


