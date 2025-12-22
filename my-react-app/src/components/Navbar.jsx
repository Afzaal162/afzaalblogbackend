import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContent";

const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl sm:text-3xl font-bold cursor-pointer"
      >
        Afzaal<span className="text-blue-500">Blog</span>
      </h1>

      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm 
  cursor-pointer bg-blue-500 text-black px-10 py-2.5 hover:bg-blue-600 transition"
      >
        {token ? 'Dashboard' : "Login"}
        <span className="text-black text-lg">➜</span>
      </button>
    </div>
  );
};

export default Navbar;
