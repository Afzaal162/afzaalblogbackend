import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContent";
import { toast } from "react-toastify";

const Blog = ({ blog }) => {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Fetch comments for this blog
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await axios.get(`/api/blog/${blog._id}/comments`);
      if (res.data.success) {
        setComments(res.data.comments);
      } else {
        toast.error(res.data.message || "Failed to fetch comments");
      }
    } catch (error) {
      toast.error("Failed to fetch comments");
      console.error(error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blog._id]);

  // Submit a new comment
  const submitComment = async () => {
    if (!commentText.trim()) return toast.error("Comment cannot be empty");

    try {
      setSubmittingComment(true);
      const res = await axios.post(`/api/blog/${blog._id}/comment`, {
        text: commentText,
      });

      if (res.data.success) {
        setComments((prev) => [...prev, res.data.comment]);
        setCommentText("");
        toast.success("Comment added!");
      } else {
        toast.error(res.data.message || "Failed to add comment");
      }
    } catch (error) {
      toast.error("Failed to add comment");
      console.error(error);
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Existing Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 mb-6">{blog.content}</p>

      {/* Comment Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">
          Comments ({comments.length})
        </h3>

        {/* Comment Input */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="flex-1 p-3 border rounded-md resize-none focus:outline-blue-500"
            rows={3}
          />
          <button
            onClick={submitComment}
            disabled={submittingComment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md disabled:opacity-50 transition"
          >
            {submittingComment ? "Posting..." : "Post Comment"}
          </button>
        </div>

        {/* Comments List */}
        {loadingComments ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-400">No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="border p-4 rounded-md shadow-sm bg-white"
              >
                <p className="text-gray-800">{comment.text}</p>
                <p className="text-sm text-gray-500 mt-1">
                  By {comment.userName || "Anonymous"} •{" "}
                  {new Date(comment.createdAt).toLocaleString()}
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
