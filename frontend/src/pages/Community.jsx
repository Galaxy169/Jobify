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

      <div className="space-y-4">
        {posts.map((post, i) => (
          <div key={i} className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold">{post.company}</h3>
            <p className="text-sm text-gray-600">{post.role}</p>

            <div className="mt-2">
              <p className="text-sm">
                <b>Question:</b> {post.question || "—"}
              </p>
              <p className="text-sm">
                <b>Experience:</b> {post.experience || "—"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔒 Upgrade Banner */}
      {posts.length === 5 && (
        <div className="mt-6 p-4 bg-yellow-100 border rounded text-center">
          <p className="mb-2">🔒 Unlock full community</p>

          {user ? (
            <Link
              to="/upgrade"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Upgrade Now
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Login to Continue
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
