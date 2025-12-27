// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Correct route imports matching your file names
import authRoutes from "./routes/authRoute.js";
import blogRoutes from "./routes/blogRouter.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "https://afzaalblogfrontend.vercel.app", // your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", authRoutes);  // registration/login
app.use("/api/blog", blogRoutes);  // blog CRUD

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Health check endpoint
app.get("/", (req, res) => {
  res.send({ success: true, message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
