import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/community");

      console.log("COMMUNITY:", res.data);
      // console.log(user.data);

      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load community");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Community</h1>

      {posts.length === 0 && <p>No posts yet</p>}

      <div className="space-y-5">
        {posts.map((post, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white/90 backdrop-blur shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500"></div>

            <div className="p-6">
              {/* HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {post.company}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">{post.role}</p>
                </div>

                <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold whitespace-nowrap">
                  Community
                </div>
              </div>

              {/* CONTENT */}
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-2">
                    Interview Question
                  </p>

                  <p className="text-gray-700 leading-relaxed text-sm">
                    {post.question || "No question shared"}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-pink-500 mb-2">
                    Experience
                  </p>

                  <p className="text-gray-700 leading-relaxed text-sm">
                    {post.experience || "No experience shared"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade Banner */}
      {posts.length === 5 && (
        <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              🔒 Premium Content
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              Unlock full community access
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              View unlimited interview experiences and premium insights.
            </p>
          </div>

          {/* BUTTON */}
          {user ? (
            <Link
              to="/upgrade"
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-5 py-3 rounded-xl font-semibold shadow hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
            >
              Upgrade ₹500
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition-all duration-300 whitespace-nowrap"
            >
              Login to Continue
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
