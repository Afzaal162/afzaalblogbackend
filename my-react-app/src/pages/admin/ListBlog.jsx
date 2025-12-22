import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContent";
import { toast } from "react-toastify";

const ListBlog = () => {
  const { axios } = useAppContext();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs (for admin)
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/blog/admin"); // admin route
      if (res.data.success) {
        setBlogs(res.data.blogs);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete a blog
  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await axios.delete("/api/blog/delete", { data: { id } });
      if (res.data.success) {
        toast.success("Blog deleted successfully");
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete blog");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading blogs...</p>;
  if (blogs.length === 0) return <p className="text-center mt-20">No blogs found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-500 mb-2">{blog.subTitle}</p>
            <p className="text-sm text-gray-400 mb-2">Category: {blog.category}</p>
            <p className="text-sm text-gray-400 mb-2">
              Status: {blog.isPublished ? "Published" : "Unpublished"}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBlog;
