import Blog from "../modals/blog.js";
import Comment from "../modals/comment.js";
import fs from "fs";
import path from "path";

/* =======================
   ADD BLOG (ADMIN)
======================= */
export const addBlog = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.blog);
    const { title, subTitle, description, category, isPublished } = blogData;

    if (!title || !description || !category || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Use Cloudinary URL directly
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: req.file.path, // Cloudinary URL
      isPublished: isPublished ?? false,
    });

    res.status(201).json({ success: true, message: "Blog created", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   PUBLIC BLOGS
======================= */
export const getAllPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 });

    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   ADMIN BLOG LIST
======================= */
export const getAllBlogsForAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   SINGLE BLOG
======================= */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   DELETE BLOG (ADMIN)
======================= */
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // delete image
    if (blog.image) {
      const imgPath = path.join(process.cwd(), blog.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   TOGGLE PUBLISH
======================= */
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: "Publish status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   COMMENTS
======================= */

// Add comment (user side)
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    if (!blog || !name || !content) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

   const comment = await Comment.create({
  blog,
  name,
  content,
  isApproved: true, // auto-approved, visible immediately
});


    res.json({ success: true, message: "Comment submitted for review", comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get comments for a specific blog (only approved)
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("blog", "title") // get blog title
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Approve or reject comment
export const updateCommentStatus = async (req, res) => {
  try {
    const { id, action } = req.body; // action = "approve" or "reject"
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (action === "approve") {
      comment.isApproved = true;
      await comment.save();
      res.json({ success: true, message: "Comment approved" });
    } else if (action === "reject") {
      await comment.deleteOne();
      res.json({ success: true, message: "Comment rejected and deleted" });
    } else {
      res.status(400).json({ success: false, message: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
