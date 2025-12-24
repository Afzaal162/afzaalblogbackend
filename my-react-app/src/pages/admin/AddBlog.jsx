import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !image) {
      alert("Please fill all required fields and select an image.");
      return;
    }

    const token = localStorage.getItem("token"); // JWT token
    if (!token) {
      alert("You must be logged in to add a blog.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append(
      "blog",
      JSON.stringify({ title, subTitle, description, category, isPublished })
    );

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/blog/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.status === 401) {
        alert("Unauthorized! Please login again.");
        setLoading(false);
        return;
      }

      if (data.success) {
        alert("Blog added successfully!");
        navigate("/admin/blogs"); // Redirect to blog list
      } else {
        alert("Failed to add blog: " + data.message);
      }
    } catch (err) {
      console.error("Error adding blog:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded h-40"
          required
        />
        <input
          type="text"
          placeholder="Category *"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Publish Immediately
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
