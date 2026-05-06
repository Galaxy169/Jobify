import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";

    if (!form.password) e.password = "Password required";
    else if (form.password.length < 6) e.password = "Min 6 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {

      if (!validate()) {
        toast.error("Fix form errors");
        return;
      }

    const loadingToast = toast.loading("Logging in...");
    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      console.log("LOGIN RESPONSE:", res.data); // DEBUG

      const { token, user } = res.data.data;

      login({ token, user });

      toast.dismiss(loadingToast);
      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-2xl shadow-mist-600 hover:shadow-mist-950 p-6 rounded-2xl w-80 transition duration-300 ease-in-out">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className={`w-full border rounded-lg p-2 mb-3 ${errors.email && "input-error"}`}
          value={form.email}
          placeholder="Enter your email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          value={form.password}
          className={`w-full border rounded-lg p-2 mb-3 ${errors.password && "input-error"}`}
          placeholder="Enter your password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-2xl hover:bg-indigo-800 transition-all duration-200 ease-in"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-sm">
          Don't have an account? {" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
