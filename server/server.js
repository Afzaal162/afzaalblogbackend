import dotenv from "dotenv";
dotenv.config();

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import path from "path";

dotenv.config();

const app = express();
// ✅ CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL, // deployed frontend
  "http://localhost:5175"   // local frontend
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow requests like Postman
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});
// ✅ API routes
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
