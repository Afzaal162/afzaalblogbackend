import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { useAppContext } from "../context/AppContent";

const Home = () => {
  const { axios } = useAppContext();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch published blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blog`);
      if (res.data.success) setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/blog/${id}`);
      if (res.data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        alert("Blog deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <Header />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {loading && <p>Loading blogs...</p>}
        {!loading && blogs.length === 0 && <p>No blogs found</p>}

        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={{ ...blog, image: `${import.meta.env.VITE_BASE_URL}${blog.image}` }} // fix image path
            onDelete={() => handleDelete(blog._id)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
