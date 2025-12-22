import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContent";
import { toast } from "react-toastify";

const Comments = () => {
  const { axios } = useAppContext(); // Axios instance with baseURL = VITE_API_URL
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all comments
  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/blog/admin/comments"); // admin route
      if (res.data.success) {
        setComments(res.data.comments);
      } else {
        setComments([]);
        toast.error(res.data.message || "Failed to fetch comments");
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      toast.error("Failed to fetch comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading)
    return <p className="text-center mt-20">Loading comments...</p>;

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">All Comments</h1>
      <div className="max-w-3xl bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th className="px-6 py-3">Blog Title & Comment</th>
              <th className="px-6 py-3 max-sm:hidden">Date</th>
              <th className="px-6 py-3">Name</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id} className="border-b">
                <td className="px-6 py-4">
                  <b className="font-medium text-gray-600">Blog:</b>{" "}
                  {comment.blog?.title || "N/A"}
                  <br />
                  <b className="font-medium text-gray-600">Comment:</b>{" "}
                  {comment.content}
                </td>
                <td className="px-6 py-4 max-sm:hidden">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4">{comment.name || "Anonymous"}</td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
