import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const e = {};

    if (!form.name) e.name = "Name required";

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

    const loadingToast = toast.loading("Creating account...");
    try {
      setLoading(true);

      const res = await api.post("/auth/register", form);

      console.log("REGISTER RESPONSE:", res.data); // DEBUG

      toast.dismiss(loadingToast);
      toast.success("Account created!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-2xl shadow-mist-600 hover:shadow-mist-950 p-6 rounded-2xl w-80 transition duration-300 ease-in-out">
        <h2 className="text-xl font-bold mb-4 mt-4 text-center">
          Create an Account
        </h2>

        <input
          className={`w-full border rounded-lg p-2 mb-3 ${errors.name && "input-error"}`}
          value={form.name}
          name="email"
          placeholder="Enter your name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          name="email"
          value={form.email}
          className={`w-full rounded-lg border p-2 mb-3 ${errors.email && "input-error"}`}
          placeholder="Enter your email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          className={`w-full border p-2 mb-3 rounded-lg ${errors.password && "input-error"}`}
          placeholder="Enter a password (Min 6 Character)"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-2xl hover:bg-indigo-800 transition-all duration-200 ease-in"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
