import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({
  selected = "All",
  setSelected = () => {},
  searchInput = "",
  setSearchInput = () => {},
}) => {
  const [localInput, setLocalInput] = useState(searchInput);
  const navigate = useNavigate();
  const categories = ["All", "Web Dev", "Android Dev", "iOS Dev", "AI & ML"];

  // Sync with parent searchInput
  useEffect(() => {
    setLocalInput(searchInput);
  }, [searchInput]);

  const handleSearch = () => {
    setSearchInput(localInput);

    if (localInput.trim() === "") {
      navigate("/");
    } else {
      navigate(`/search?query=${encodeURIComponent(localInput.trim())}`);
    }
  };

  useEffect(() => {
    if (selected && selected !== "All") {
      navigate(`/category/${encodeURIComponent(selected)}`);
    } else {
      navigate("/");
    }
  }, [selected, navigate]);

  return (
    <div className="relative w-full overflow-hidden py-8 bg-gray-50">
      {/* Tagline */}
      <div className="text-center mb-4">
        <p className="text-sm sm:text-base text-blue-500 font-medium">
          🌟 Generate AI Enhanced Content
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center gap-4 w-full max-w-lg mx-auto my-4">
        <input
          type="text"
          placeholder="Search for blog..."
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-4 flex-wrap mt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${selected === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
