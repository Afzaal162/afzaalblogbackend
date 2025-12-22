// src/context/AppContent.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blog, setBlog] = useState([]);
  const [input, setInput] = useState("");

  // Fetch published blogs
  const fetchBlog = async () => {
    try {
      const { data } = await axios.get("/api/blog");
      if (data.success) setBlog(data.blogs);
      else toast.error(data.message);
    } catch (error) {
      console.error("Fetch blog error:", error);
      toast.error(error.message);
    }
  };

  // Load token on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      fetchBlog();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <AppContext.Provider
      value={{
        axios,
        navigate,
        token,
        setToken,
        blog,
        setBlog,
        input,
        setInput,
        logout,
        fetchBlog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Correctly export useAppContext
export const useAppContext = () => useContext(AppContext);
