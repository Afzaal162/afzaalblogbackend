import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiHome,
  HiPlusCircle,
  HiDocumentText,
  HiChatAlt2,
} from "react-icons/hi";

const SideBar = () => {
  const linkClasses =
    "flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg";

  const activeClasses = "bg-primary/10 border-r-4 border-primary";

  return (
    <div className="flex flex-col border-r border-gray-100 min-h-full pt-6">
      {/* Dashboard */}
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        <HiHome className="text-xl" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      {/* Add Blog */}
      <NavLink
        to= "/admin/addBlog"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        <HiPlusCircle className="text-xl" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>

      {/* Blog List */}
      {/* <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        <HiDocumentText className="text-xl" />
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>

      {/* Comments */}
      {/* <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        <HiChatAlt2 className="text-xl" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink> */} 
    </div>
  );
};

export default SideBar;
