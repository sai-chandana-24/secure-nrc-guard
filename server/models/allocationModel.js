import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
  {
    fromRole: { type: String, enum: ["admin", "district", "block", "supervisor"], required: true },
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "auth", required: true },
    toRole: { type: String, enum: ["district", "block"], required: true },
    // simple model: store district name directly
    districtName: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    purpose: { type: String },
    status: { type: String, enum: ["approved", "transferred", "utilized", "audited"], default: "approved" },
    // simple progression fields
    received: { type: Boolean, default: false },
    blockName: { type: String },
    schoolName: { type: String },
    utilized: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const allocationModel = mongoose.model("allocation", allocationSchema);

export default allocationModel;


