import express from "express";
import { adminLogin, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", adminLogin);

// Protected admin dashboard
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;
