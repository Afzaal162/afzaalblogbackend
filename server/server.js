import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const app = express();

// ======================
// Middleware
// ======================
app.use(cors({ origin: 'https://afzaalblogfrontend.vercel.app', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Routes
// ======================
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

// ======================
// 404 Handler
// ======================
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ======================
// Global Error Handler
// ======================
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
});

// ======================
// Connect to MongoDB
// ======================
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
