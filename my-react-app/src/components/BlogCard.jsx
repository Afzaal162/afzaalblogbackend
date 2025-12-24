import React from "react";
import { Link } from "react-router-dom";
// Import your fallback image
import noImage from "../assets/blogs/blog1.png"; // adjust path if necessary

const BlogCard = ({ blog }) => {
  // Handle image URL safely
  const imageUrl = blog.image.startsWith("http")
    ? blog.image
    : `${import.meta.env.VITE_API_URL}${blog.image}`;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={imageUrl} // ✅ backend URL
        alt={blog.title}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = noImage)} // use imported local image as fallback
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
