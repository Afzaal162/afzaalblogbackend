import express from "express";
import { registerUser, loginUser, adminLogin } from "../controllers/authController.js"; // <-- make sure the path is correct

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin route
router.post("/admin-login", adminLogin); // <-- use the imported adminLogin here

export default router;
