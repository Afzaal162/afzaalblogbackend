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
} from "../controllers/blogController.js";

const router = express.Router();

/* ======================
   ADMIN BLOG ROUTES
====================== */
router.get("/admin", auth, getAllBlogsForAdmin);
router.post("/add", auth, upload.single("image"), addBlog);
router.delete("/admin/:id", auth, deleteBlogById);
router.post("/admin/toggle-publish", auth, togglePublish);

/* ======================
   COMMENT ROUTES
====================== */
router.get("/admin/comments", auth, getAllComments);
router.post("/admin/comments/update", auth, updateCommentStatus);

router.post("/add-comment", addComment);
router.get("/comments/:blogId", getBlogComments);

/* ======================
   PUBLIC BLOG ROUTES
====================== */
router.get("/", getAllPublishedBlogs);

// ❗ ALWAYS KEEP THIS LAST
router.get("/:id", getBlogById);

export default router;
