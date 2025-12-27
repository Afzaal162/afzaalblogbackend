import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, default: "" },        // optional subtitle
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "" },           // optional, default empty string
  isPublished: { type: Boolean, default: false }, // default to false
}, { timestamps: true });

// Model: store in "Blogwebpage" collection inside "Blogging" database
const Blog = mongoose.model("Blogwebpage", blogSchema, "Blogwebpage");

export default Blog;
