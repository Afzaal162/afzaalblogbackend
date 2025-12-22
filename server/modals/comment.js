import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogwebpage", // must match Blog model
      required: true,
    },
    name: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ USE commentSchema (NOT blogSchema)
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
