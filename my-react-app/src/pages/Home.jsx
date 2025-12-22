import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog`);
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
      <Header/>

      {loading ? (
        <p className="text-center mt-20">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center mt-20">No blogs found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
