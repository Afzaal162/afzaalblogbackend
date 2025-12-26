import React from "react";
import { useNavigate } from "react-router-dom";

const BlogtableItem = ({ blog, index }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="px-4 py-3">{index}</td>
      <td className="px-4 py-3">{blog.title}</td>
      <td className="px-4 py-3">
        {new Date(blog.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        {blog.isPublished ? "Published" : "Draft"}
      </td>

      {/* ✅ EDIT ACTION */}
      <td className="px-4 py-3">
        <button
          onClick={() => navigate(`/admin/editBlog/${blog._id}`)}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default BlogtableItem;
