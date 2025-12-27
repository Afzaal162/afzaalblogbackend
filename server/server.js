import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import authRoute from "./routes/authRoute.js";

const app = express();

// ================================
// CORS CONFIG
// ================================
const allowedOrigins = [
  "https://afzaalblogfrontend.vercel.app",
  "http://localhost:5175",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

// ================================
// MIDDLEWARE
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// ROUTES
// ================================
app.get("/", (req, res) => res.send("✅ Backend is working!"));

app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRoute);

// ================================
// MONGODB CONNECTION
// ================================
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

export default app;
