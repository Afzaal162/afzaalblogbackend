// server.js (Vercel-ready)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import authRoute from "./routes/authRoute.js";

const app = express();

/* ================================
   ENV CHECK
================================ */
console.log("FRONTEND_URL:", process.env.FRONTEND_URL || "❌ missing");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ exists" : "❌ missing");

/* ================================
   CORS MIDDLEWARE (Vercel-friendly)
================================ */
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://afzaalblogfrontend.vercel.app",
  "http://localhost:5175",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization"
  );

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* ================================
   MIDDLEWARE
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   ROUTES
================================ */
app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRoute);

/* ================================
   MONGODB CONNECTION
================================ */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    isConnected = true;
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
  }
}

connectDB();

/* ================================
   EXPORT APP FOR VERCEL
================================ */
export default app;
