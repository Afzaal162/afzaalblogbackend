import React, { useEffect, useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import BlogtableItem from "../../components/BlogtableItem";
import { useAppContext } from "../../context/AppContent";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { axios } = useAppContext(); // Axios instance with baseURL = VITE_API_URL
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch blogs
      const blogRes = await axios.get("/api/blog/admin");
      // Fetch comments
      const commentRes = await axios.get("/api/blog/admin/comments");

      if (blogRes.data.success && commentRes.data.success) {
        const blogs = blogRes.data.blogs;
        const comments = commentRes.data.comments;

        setDashboardData({
          blogs: blogs.length,
          drafts: blogs.filter((b) => !b.isPublished).length,
          comments: comments.length,
          recentBlogs: blogs.slice(0, 5), // latest 5 blogs
        });
      } else {
        toast.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return <p className="text-center mt-20">Loading dashboard data...</p>;

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50 min-h-screen">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-2xl font-bold">{dashboardData.blogs}</p>
          <p className="text-gray-500">Blogs</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-2xl font-bold">{dashboardData.comments}</p>
          <p className="text-gray-500">Comments</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-2xl font-bold">{dashboardData.drafts}</p>
          <p className="text-gray-500">Drafts</p>
        </div>
      </div>

      {/* Latest Blogs */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-4 text-gray-600">
          <HiOutlineDocumentText className="text-xl text-blue-500" />
          <p className="font-medium">Latest Blogs</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          {dashboardData.recentBlogs.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No blogs available</p>
          ) : (
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogtableItem
                    key={blog._id}
                    blog={blog}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
