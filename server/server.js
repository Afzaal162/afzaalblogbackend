import dotenv from "dotenv";
dotenv.config(); // Load env variables first

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import path from "path";

// ✅ Validate required environment variables
const REQUIRED_ENVS = ["FRONTEND_URL", "MONGO_URI"];
REQUIRED_ENVS.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Environment variable ${key} not found!`);
    process.exit(1); // Stop server if env missing
  }
});

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("MONGO_URI:", process.env.MONGO_URI.substring(0, 20) + "..."); // partial for security

const app = express();

// ✅ CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL, // deployed frontend
  "http://localhost:5175"   // local frontend
];

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // allow requests like Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.error("Blocked CORS request from:", origin);
    return callback(new Error("CORS error: origin not allowed"), false);
  },
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

// ✅ API routes
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("MONGO_URI:", process.env.MONGO_URI ? "exists" : "missing");

