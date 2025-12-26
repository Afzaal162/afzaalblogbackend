import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  // 1️⃣ Fetch blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://afzaal-blogging-website.vercel.app/api/blog/${id}`
        );
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  // 2️⃣ Update blog
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://afzaal-blogging-website.vercel.app/api/blog/${id}`,
        { title, content, category }
      );
      navigate("/admin");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          placeholder="Content"
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
