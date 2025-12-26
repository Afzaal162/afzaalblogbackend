import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAppContext } from "./context/AppContent"

import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Login from "./components/admin/Login"
import Layout from "./pages/admin/Layout"
import Dashboard from "./pages/admin/Dashboard"
import AddBlog from "./pages/admin/AddBlog"
import ListBlog from "./pages/admin/ListBlog"
import Comments from "./pages/admin/Comments"
import { ToastContainer } from "react-toastify";
import EditBlog from "./pages/admin/EditBlog"

const App = () => {
  const { token } = useAppContext()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<Blog />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={token ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Dashboard />} />
        <Route path="addBlog" element={<AddBlog />} />
        <Route path="listBlog" element={<ListBlog />} />
          <Route path="editBlog/:id" element={<EditBlog />} />   {/* ✅ ADD THIS */}
        <Route path="comments" element={<Comments />} />
      </Route>

      {/* Login route */}
      <Route
        path="/login"
        element={token ? <Navigate to="/admin" replace /> : <Login />}
      />
    </Routes>
  )
}

export default App
