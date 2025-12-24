import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success && data.blogs.length > 0) {
        setBlogs(data.blogs);
      } else {
        setBlogs([]);
        console.warn("No blogs found in DB");
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
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
      <Header
        selected={selected}
        setSelected={setSelected}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {/* Render blogs based on selected category or searchInput */}
      <BlogList selected={selected} searchInput={searchInput} />
    </div>
  );
};

      <Footer />
    </div>
  );
};

export default Home;
