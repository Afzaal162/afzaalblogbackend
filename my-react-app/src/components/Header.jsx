import React, { useState, useEffect } from "react";

const Header = ({
  selected = "All",
  setSelected,
  searchInput = "",
  setSearchInput,
}) => {
  const [localInput, setLocalInput] = useState(searchInput);

  const categories = ["All", "Web Dev", "Android Dev", "iOS Dev", "AI & ML"];

  // keep input synced with parent
  useEffect(() => {
    setLocalInput(searchInput);
  }, [searchInput]);

  // handle search
  const handleSearch = () => {
    setSearchInput(localInput.trim());
  };

  // when input is cleared → return all blogs
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalInput(value);

    if (value.trim() === "") {
      setSearchInput("");
    }
  };

  return (
    <div className="relative w-full py-8 bg-gray-50">
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
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
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
              ${
                selected === category
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
