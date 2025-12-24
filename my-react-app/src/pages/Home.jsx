import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

// Import fallback image
import fallbackImage from "../assets/blog1.png";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loadingBlog, setLoadingBlog] = useState(true);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // ... (fetchBlog, fetchComments, submitComment functions)

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
        {blog.image && (
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full rounded-xl shadow mb-8"
            onError={(e) => (e.target.src = fallbackImage)} // fallback image
          />
        )}
        {!blog.image && (
          <img
            src={fallbackImage}
            alt="Fallback Blog"
            className="w-full rounded-xl shadow mb-8"
          />
        )}

        <div
          className="text-lg text-gray-700 leading-8 mb-12"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Comment Section */}
        {/* ... your comment section code remains the same */}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
