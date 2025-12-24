import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

// Fallback image
import fallbackImage from "../assets/blogs/blog1.png";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog`);
      const data = await res.json();

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        console.error("Failed to fetch blogs:", data.message);
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <Header />

      {loading ? (
        <p className="text-center mt-20">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center mt-20">No blogs found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
          {blogs.map((blog) => {
            // Determine image URL
            const imageUrl = blog.image?.startsWith("http")
              ? blog.image
              : blog.image
              ? `${API_URL}${blog.image}`
              : fallbackImage;

            return (
              <BlogCard
                key={blog._id}
                blog={{ ...blog, image: imageUrl }}
                fallbackImage={fallbackImage} // in case image fails to load
              />
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
