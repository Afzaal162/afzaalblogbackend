import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    } else {
      alert("Please enter a valid email!");
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Afzaal<span className="text-blue-500">Blog</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-gray-600 font-medium">
          <a href="/" className="hover:text-blue-500 transition">Home</a>
          <a href="/about" className="hover:text-blue-500 transition">About Us</a>
          <a href="/contact" className="hover:text-blue-500 transition">Contact</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-400 text-sm border-t border-gray-200 py-4 mt-6">
        &copy; {new Date().getFullYear()} AfzaalBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
