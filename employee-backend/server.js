import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/auth.js";
import hrRoutes from "./routes/hrRoutes.js";

dotenv.config();

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/employees", employeeRoutes);

// 🔹 404 Handler (NEW - professional touch)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
