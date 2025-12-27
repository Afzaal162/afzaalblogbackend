import React, { useState } from "react"
import { useAppContext } from "../../context/AppContent"
import toast from "react-hot-toast"

const Login = () => {
  const { axios, setToken, navigate } = useAppContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Please enter email and password")
      return
    }

    setLoading(true)

    try {
      // ✅ CORRECT BACKEND ROUTE
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/admin-login`,
        { email, password }
      )

      if (data.success) {
        localStorage.setItem("token", data.token)
        setToken(data.token)

        // Attach token for future requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`

        toast.success("Admin login successful")
        navigate("/admin")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
      console.error("Admin login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-sm p-8 border rounded-2xl shadow-xl bg-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          <span className="text-blue-500">Admin</span> Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col text-gray-600">
          <label className="mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            className="border-b-2 border-gray-300 p-2 mb-4 outline-none"
            required
          />

          <label className="mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="border-b-2 border-gray-300 p-2 mb-6 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
