import mongoose from "mongoose";

const ledgerBlockSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true, index: true },
    timestamp: { type: Date, default: Date.now },
    txType: { type: String, enum: [
      "ALLOCATION",
      "STATUS_CHANGE",
      "RECEIVED",
      "ASSIGNED_BLOCK",
      "ASSIGNED_SCHOOL",
      "UTILIZED"
    ], required: true },
    allocationId: { type: mongoose.Schema.Types.ObjectId, ref: "allocation", required: true },
    payload: { type: Object, required: true },
    prevHash: { type: String, required: true },
    hash: { type: String, required: true, index: true },
    signerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "auth", required: true },
  },
  { timestamps: true }
);

const ledgerBlockModel = mongoose.model("ledger_block", ledgerBlockSchema);

export default ledgerBlockModel;


