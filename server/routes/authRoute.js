import express from "express";
// Correct
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin-login", adminLogin);

export default router;
