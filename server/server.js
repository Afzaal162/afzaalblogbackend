// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

/* ================================
   CORS (Universal)
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
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );

  if (req.method === "OPTIONS") return res.sendStatus(204);

  next();
});

/* ================================
   Middleware
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   Routes
================================ */
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => res.send("✅ Backend is working!"));

// Catch-all for errors to ensure CORS headers
app.use((err, req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(err.status || 500).json({ error: err.message });
});

/* ================================
   MongoDB connection
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
   Export App
================================ */
export default app;
