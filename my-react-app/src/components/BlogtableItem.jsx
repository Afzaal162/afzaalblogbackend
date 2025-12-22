import React from "react";

const BlogtableItem = ({ blog, fetchBlogs, index }) => {
  const { title, date, isPublished } = blog; // changed createdAt -> date
  const blogDate = new Date(date); // now it will parse correctly

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">
        {blogDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={`${isPublished ? "text-green-600" : "text-orange-700"}`}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer">
          {isPublished ? "Unpublish" : "Publish"}
        </button>
      </td>
    </tr>
  );
};

export default BlogtableItem;
