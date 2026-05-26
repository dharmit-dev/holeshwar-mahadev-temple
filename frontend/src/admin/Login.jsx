import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaOm } from "react-icons/fa";
import { adminLogin } from "../services/templeService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await adminLogin(form.email, form.password);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-orange-100">
        
        <div className="text-center mb-8">
          <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg mb-4">
            <FaOm className="text-white text-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-stone-900">
            Admin Login
          </h1>

          <p className="text-stone-500 mt-2">
            Holeshwar Mahadev Admin Panel
          </p>
        </div>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter admin email"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;