import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loadingBlog, setLoadingBlog] = useState(true);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch blog content
  const fetchBlog = async () => {
    try {
      setLoadingBlog(true);
      const res = await fetch(`${API_URL}/api/blog/${id}`);
      const data = await res.json();
      if (data.success) {
        setBlog(data.blog);
      } else {
        toast.error(data.message || "Blog not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blog");
    } finally {
      setLoadingBlog(false);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    if (!id) return;
    try {
      setLoadingComments(true);
      const res = await fetch(`${API_URL}/api/blog/${id}/comments`);
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message || "Failed to fetch comments");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch comments");
    } finally {
      setLoadingComments(false);
    }
  };

  // Submit comment
  const submitComment = async () => {
    if (!commentText.trim()) return toast.warning("Comment cannot be empty");

    try {
      setSubmitting(true);
      const res = await fetch(`${API_URL}/api/blog/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Comment added!");
        setComments((prev) => [...prev, data.comment]);
        setCommentText("");
      } else {
        toast.error(data.message || "Failed to submit comment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  if (loadingBlog) return <p className="text-center mt-20">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-20">Blog not found ❌</p>;

  const imageUrl = blog.image?.startsWith("http")
    ? blog.image
    : `${API_URL}${blog.image}`;

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        {/* Blog Content */}
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">{blog.subTitle}</p>
        {blog.image && (
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full rounded-xl shadow mb-8"
            onError={(e) => (e.target.src = "/no-image.png")}
          />
        )}
        <div
          className="text-lg text-gray-700 leading-8 mb-12"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Comment Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          {/* Comment Input */}
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={submitComment}
              disabled={submitting}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Comments List */}
          {loadingComments ? (
            <p className="text-gray-500">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="border p-3 rounded bg-gray-50 shadow-sm"
                >
                  <p className="text-gray-800 font-medium">
                    {comment.userName || "Anonymous"}
                  </p>
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
