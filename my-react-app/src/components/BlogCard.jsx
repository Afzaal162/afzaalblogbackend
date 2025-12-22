import React from "react";
import { useNavigate, Link } from "react-router-dom";
const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={`http://localhost:3000${blog.image}`}
        alt={blog.title}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = "/no-image.png")}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{blog.subTitle}</p>

        <Link
          to={`/blog/${blog._id}`}
          className="text-blue-600 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
