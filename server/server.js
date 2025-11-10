import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import allocationRoutes from "./routes/allocationRoutes.js";
import childRoutes from "./routes/childRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/children", childRoutes);

const distPath = path.join(__dirname, "../client/dist");
app.use(express.static(distPath));

// ✅ Handle all other routes by serving index.html (for SPA routing)
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});