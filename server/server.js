import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import path from "path";

dotenv.config();

const app = express();

// ✅ Allow both local + production frontend
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5175"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
