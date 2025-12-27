import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import {
  addBlog,
  getAllPublishedBlogs,
  getAllBlogsForAdmin,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments,
  getAllComments,
  updateCommentStatus,
  updateBlogById
} from "../controllers/blogController.js";

const router = express.Router();

/* ======================
   ADMIN BLOG ROUTES
====================== */
router.get("/admin", auth, getAllBlogsForAdmin);
router.post("/add", auth, upload.single("image"), addBlog);
router.put("/admin/update/:id", auth, upload.single("image"), updateBlogById);
router.delete("/admin/:id", auth, deleteBlogById);
router.post("/admin/toggle-publish", auth, togglePublish);

/* ======================
   COMMENT ROUTES
====================== */
router.get("/admin/comments", auth, getAllComments);
router.post("/admin/comments/update", auth, updateCommentStatus);

// Public comments
router.post("/:blogId/comment", addComment);
router.get("/:blogId/comments", getBlogComments);

/* ======================
   PUBLIC BLOG ROUTES
====================== */
router.get("/", getAllPublishedBlogs);
router.get("/:id", getBlogById); // must be last

export default router;
