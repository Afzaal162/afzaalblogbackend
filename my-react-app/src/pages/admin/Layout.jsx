import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/sideBar";
import { useAppContext } from "../../context/AppContent";

const Layout = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center py-5 px-8 sm:px-20 xl:px-32 bg-white shadow">
        {/* Logo → go home, NOT logout */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-bold cursor-pointer"
        >
          Afzaal<span className="text-blue-500">Blog</span>
        </h1>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-500 text-black px-10 py-2.5 hover:bg-blue-600 transition"
        >
          Logout
          <span className="text-black text-lg">➜</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 p-6 bg-blue-50/50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
