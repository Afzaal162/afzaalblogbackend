import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContent";
import { toast } from "react-toastify";

const Blog = ({ blog }) => {
  const { axios } = useAppContext(); // Axios instance
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments for this blog
  const fetchComments = async () => {
    if (!blog?._id) return; // guard against undefined
    try {
      setLoadingComments(true);
      const res = await axios.get(`/api/blog/${blog._id}/comments`);
      if (res.data.success) {
        setComments(res.data.comments);
      } else {
        toast.error(res.data.message || "Failed to load comments");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch comments");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blog]);

  // Submit new comment
  const submitComment = async () => {
    if (!commentText.trim()) return toast.warning("Comment cannot be empty");
    if (!blog?._id) return;

    try {
      setSubmitting(true);
      const res = await axios.post(`/api/blog/${blog._id}/comment`, {
        text: commentText,
      });
      if (res.data.success) {
        toast.success("Comment added!");
        // Show new comment immediately
        setComments((prev) => [...prev, res.data.comment]);
        setCommentText("");
      } else {
        toast.error(res.data.message || "Failed to add comment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
      <p className="text-gray-600 mb-2">{blog?.subTitle}</p>
      <div className="text-gray-700 mb-6">{blog?.content}</div>

      {/* Comment Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {/* Comment Input */}
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

        {/* Comments List */}
        {loadingComments ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment?._id}
                className="border p-3 rounded bg-gray-50 shadow-sm"
              >
                <p className="text-gray-800 font-medium">{comment?.userName || "Anonymous"}</p>
                <p className="text-gray-700">{comment?.text}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(comment?.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Blog;
