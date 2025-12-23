import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import path from "path";

const app = express();

/* ================================
   ENV CHECK (DO NOT EXIT)
================================ */
console.log("FRONTEND_URL:", process.env.FRONTEND_URL || "❌ missing");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ exists" : "❌ missing");

/* ================================
   CORS CONFIG (VERCEL SAFE)
================================ */
const allowedOrigins = [
  "https://afzaalblogfrontend.vercel.app",
  "http://localhost:5175",
];

app.use(cors({
  origin: (origin, callback) => {
    console.log("Incoming origin:", origin);

    if (!origin) return callback(null, true); // Postman / server calls

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn("Blocked by CORS:", origin);
    return callback(null, false); // ❗ DO NOT THROW ERROR
  },
  credentials: true,
}));

/* ================================
   MIDDLEWARE
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ================================
   ROUTES
================================ */
app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);

/* ================================
   MONGODB (NO EXIT)
================================ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err.message));

/* ================================
   SERVER
================================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
