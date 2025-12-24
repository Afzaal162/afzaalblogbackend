import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Import your local image
import noImage from "../assets/blogs/blog1.png"; // adjust path if needed

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/${id}`);
      const data = await res.json();
      if (data.success) {
        setBlog(data.blog);
      } else {
        console.error("Blog not found:", data.message);
        setBlog(null);
      }
    } catch (err) {
      console.error(err);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-20">Blog not found ❌</p>;

  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `${import.meta.env.VITE_API_URL}${blog.image}`
    : noImage; // fallback if blog.image is missing

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
          onError={(e) => (e.target.src = noImage)} // fallback to local image
        />
        <div
          className="text-lg text-gray-700 leading-8 mb-8"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
