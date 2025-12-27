// authRoute.js
import express from "express";
import { registerUser, loginUser } from "../controllers/adminController.js";
const router = express.Router();

/* ======================
   USER AUTH ROUTES
====================== */

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

export default router;
