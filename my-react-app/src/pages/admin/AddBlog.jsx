import React, { useEffect, useState, useRef } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { useAppContext } from "../../context/AppContent";

const AddBlog = () => {
  const { axios } = useAppContext();

  const blogCategories = ["Startup", "Web Dev", "Android Dev", "iOS Dev", "AI & ML"];
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  // Example AI content generation
  const generateContent = async () => {
    try {
      setLoading(true);
      const aiContent = `<p>This is a sample AI-generated content for <strong>${title}</strong></p>`;
      quillRef.current.root.innerHTML = aiContent;
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI content");
    } finally {
      setLoading(false);
    }
  };

  // Submit blog
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!title || !category || !image) {
      alert("Please fill all required fields and select an image");
      return;
    }

    try {
      const description = quillRef.current.root.innerHTML;

      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "blog",
        JSON.stringify({ title, subTitle, description, category, isPublished })
      );

      // ✅ Use axios with baseURL from AppContext
      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        alert("Blog added successfully!");
        setTitle("");
        setSubtitle("");
        setCategory("Startup");
        setIsPublished(false);
        setImage(null);
        quillRef.current.root.innerHTML = "";
        window.location.href = "/"; // Redirect to home page
      } else {
        alert(data.message || "Failed to add blog");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label
          htmlFor="image"
          className="mt-2 h-24 w-24 flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-100 transition"
        >
          {!image ? (
            <MdOutlineAddPhotoAlternate className="text-4xl text-gray-500" />
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt="thumbnail"
              className="h-full w-full object-cover rounded"
            />
          )}
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubtitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
            type="button"
            onClick={generateContent}
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-40 h-10 bg-blue-500 text-white rounded cursor-pointer text-sm"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
