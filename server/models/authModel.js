import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    // Add all possible roles to the enum for data integrity
    enum: ['admin', 'district', 'block', 'supervisor', 'teacher', 'nrc', 'public'],
    default: 'public', // Set the default role to 'public'
  },
});

const authModel = mongoose.model("auth", authSchema);

export default authModel;
