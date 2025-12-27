import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogAdmin, 
    getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js"; // your auth middleware

const adminRouter = express.Router();

// Public route
adminRouter.post("/login", adminLogin);

// Protected routes
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.get("/blogs", auth, getAllBlogAdmin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.post("/comments/delete", auth, deleteCommentById);
adminRouter.post("/comments/approve", auth, approveCommentById);

export default adminRouter;
