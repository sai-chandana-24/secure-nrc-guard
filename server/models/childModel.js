import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, default: 0 },
  muac: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Normal', 'MAM', 'SAM'],
    default: 'Normal'
  },
  teacherId: { // To link child to the specific Anganwadi worker
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true
  },
  lastEntry: { type: Date, default: Date.now },
  referred: { type: Boolean, default: false },
  weeklyChange: { type: Number, default: 0 },
  trend: { type: String, enum: ['improving', 'declining', 'stable'], default: 'stable' },
  assignedDoctor: {
    type: String,
    default: null
  },
}, { timestamps: true });

const childModel = mongoose.model("Child", childSchema);
export default childModel;