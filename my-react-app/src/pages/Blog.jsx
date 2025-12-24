import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Blog = () => {
  const { id } = useParams(); // blog ID from URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState(""); // user name
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch blog details
  const fetchBlog = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog/${id}`);
      const data = await res.json();
      if (data.success) setBlog(data.blog);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch comments for this blog
  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog/${id}/comments`);
      const data = await res.json();
      if (data.success) setComments(data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Submit comment
  const submitComment = async () => {
    if (!name.trim() || !commentText.trim()) {
      return toast.warning("Name and comment cannot be empty");
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_URL}/api/blog/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          content: commentText.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setComments((prev) => [...prev, data.comment]);
        setCommentText("");
        setName("");
        toast.success("Comment added successfully!");
      } else {
        toast.error(data.message || "Failed to add comment");
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

  if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      {blog.subTitle && <h2 className="text-xl mb-4">{blog.subTitle}</h2>}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto rounded mb-4"
        />
      )}
      <p className="mb-8">{blog.description}</p>

      {/* Comments Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>

        {/* Comment Form */}
        <div className="flex flex-col gap-2 mb-6">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border p-2 rounded h-24"
          />
          <button
            onClick={submitComment}
            disabled={submitting}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {submitting ? "Adding..." : "Add Comment"}
          </button>
        </div>

        {/* Comments List */}
        <div className="flex flex-col gap-4">
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="border p-3 rounded">
                <p className="font-semibold">{c.name}</p>
                <p>{c.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
