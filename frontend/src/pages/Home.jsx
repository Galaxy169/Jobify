import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  // 🔓 NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        {/* HERO */}
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Track Your <span className="text-indigo-600">Job Journey</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Manage applications, share interview experiences, and build your
            resume all in one place.
          </p>

          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* FEATURES */}
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            <Feature
              title="Track Jobs"
              desc="Organize your job applications and monitor progress easily."
            />

            <Feature
              title="Community"
              desc="Learn from real interview experiences shared by others."
            />

            <Feature
              title="Resume Builder"
              desc="Create and export professional resumes instantly."
            />
          </div>
        </div>
      </div>
    );
  }

  // 🔐 LOGGED IN
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-3">
          Welcome back, <span className="text-indigo-600">{user.name}</span>
        </h1>

        <p className="text-gray-600 mb-6">
          Continue managing your job applications and explore new opportunities.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/jobs"
            className="border px-5 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            My Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

// 🔹 Feature Card Component
function Feature({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
