import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

// ✅ correct fallback image path
import fallbackImage from "../assets/blogs/blog1.png";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loadingBlog, setLoadingBlog] = useState(true);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ fetch blog
  const fetchBlog = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog/${id}`);
      const data = await res.json();
      if (data.success) {
        setBlog(data.blog);
      } else {
        setBlog(null);
      }
    } catch (err) {
      console.error(err);
      setBlog(null);
    } finally {
      setLoadingBlog(false);
    }
  };

  // ✅ fetch comments
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await fetch(`${API_URL}/api/blog/${id}/comments`);
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComments(false);
    }
  };

  // ✅ submit comment
  const submitComment = async () => {
    if (!commentText.trim()) {
      return toast.warning("Comment cannot be empty");
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_URL}/api/blog/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText }),
      });

      const data = await res.json();
      if (data.success) {
        setComments((prev) => [...prev, data.comment]);
        setCommentText("");
        toast.success("Comment added");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
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
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">{blog.subTitle}</p>

        <img
          src={blog.image ? imageUrl : fallbackImage}
          alt={blog.title}
          className="w-full rounded-xl shadow mb-8"
          onError={(e) => (e.target.src = fallbackImage)}
        />

        <div
          className="text-lg text-gray-700 leading-8 mb-12"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* COMMENTS */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          <div className="flex gap-2 mb-4">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              onClick={submitComment}
              disabled={submitting}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>

          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="border p-3 rounded mb-2 bg-white">
                <p className="font-medium">{c.userName || "Anonymous"}</p>
                <p>{c.text}</p>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
