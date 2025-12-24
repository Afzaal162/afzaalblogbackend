import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import fallbackImage from "../assets/blogs/blog1.png"; // fallback image
import { useAppContext } from "../context/AppContent";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext(); // Axios instance with backend URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/blog/${id}`);
      if (res.data.success) {
        setBlog(res.data.blog);
      } else {
        toast.error(res.data.message || "Blog not found");
        setBlog(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blog");
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!id) return;
    try {
      setLoadingComments(true);
      const res = await axios.get(`/api/blog/${id}/comments`);
      if (res.data.success) {
        setComments(res.data.comments);
      } else {
        toast.error(res.data.message || "Failed to load comments");
        setComments([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load comments");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  const submitComment = async () => {
    if (!commentText.trim()) return toast.warning("Comment cannot be empty");
    try {
      setSubmitting(true);
      const res = await axios.post(`/api/blog/${id}/comment`, {
        text: commentText,
      });
      if (res.data.success) {
        toast.success("Comment added!");
        setComments((prev) => [...prev, res.data.comment]);
        setCommentText("");
      } else {
        toast.error(res.data.message || "Failed to submit comment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-20">Blog not found ❌</p>;

  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `${import.meta.env.VITE_API_URL}${blog.image}`
    : fallbackImage;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">{blog.subTitle}</p>
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full rounded-xl shadow mb-8"
          onError={(e) => (e.target.src = fallbackImage)}
        />
        <div
          className="text-lg text-gray-700 leading-8 mb-8"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Comment Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          <div className="flex flex-col md:flex-row gap-2 mb-4">
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
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
