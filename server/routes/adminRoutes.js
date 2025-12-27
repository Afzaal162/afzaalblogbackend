import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogAdmin, 
    getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// Handle OPTIONS preflight for all routes in this router
adminRouter.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// Public route
adminRouter.post("/login", adminLogin);

// Protected routes
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.get("/blogs", auth, getAllBlogAdmin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.post("/comments/delete", auth, deleteCommentById);
adminRouter.post("/comments/approve", auth, approveCommentById);

export default adminRouter;
