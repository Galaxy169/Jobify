import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

import communityRoutes from "./routes/communityRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Jobify API running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.use("/api/community", communityRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/payments", paymentRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ message: "Server error" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
