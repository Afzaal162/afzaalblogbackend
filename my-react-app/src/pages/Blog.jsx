import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContent";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // Fetch blog details
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blog/${id}`);
      if (res.data.success) setBlog(res.data.blog);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch approved comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blog/comments/${id}`);
      if (res.data.success) setComments(res.data.comments);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch comments");
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  // Submit comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!name || !content) return toast.error("Please fill all fields");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/blog/add-comment`, {
        blog: id,
        name,
        content,
      });
      if (res.data.success) {
        toast.success("Comment added");
        setName("");
        setContent("");
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-20">Blog not found ❌</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">{blog.subTitle}</p>
        <img
          src={`${import.meta.env.VITE_BASE_URL}${blog.image}`}
          alt={blog.title}
          className="w-full rounded-xl shadow mb-8"
          onError={(e) => (e.target.src = "/no-image.png")}
        />
        <div
          className="text-lg text-gray-700 leading-8 mb-8"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Comment form */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Your Comment"
              className="p-2 border rounded"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Comment
            </button>
          </form>

          {/* Display approved comments */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            {comments.length === 0 && <p>No comments yet.</p>}
            {comments.map((c) => (
              <div key={c._id} className="border-b py-2">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-gray-600">{c.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
