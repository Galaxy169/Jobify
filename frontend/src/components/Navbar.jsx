import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (path) =>
    pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-600 hover:text-indigo-600";

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Jobify
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center space-x-6">
          <Link className={linkClass("/dashboard")} to="/dashboard">
            Dashboard
          </Link>

          <Link className={linkClass("/jobs")} to="/jobs">
            Jobs
          </Link>

          <Link className={linkClass("/community")} to="/community">
            Community
          </Link>

          <Link className={linkClass("/resume")} to="/resume">
            Resume
          </Link>
        </div>

        {/* RIGHT SECTION DESKTOP */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center space-x-2 hover:opacity-80 transition"
              >
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="text-sm">
                  <p className="text-gray-700 leading-none">{user.name}</p>

                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      user.subscription_type === "premium"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.subscription_type === "premium" ? "PRO" : "FREE"}
                  </span>
                </div>
              </Link>

              {user.subscription_type === "free" && (
                <Link to="/upgrade" className="btn-outline text-sm">
                  Upgrade
                </Link>
              )}

              <button
                onClick={logout}
                className="text-red-500 text-sm cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-indigo-600 text-sm hover:text-indigo-800"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn text-sm transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4 animate-fadeIn">
          <Link
            to="/dashboard"
            className="block text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/jobs"
            className="block text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Jobs
          </Link>

          <Link
            to="/community"
            className="block text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Community
          </Link>

          <Link
            to="/resume"
            className="block text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </Link>

          <hr />

          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm">{user.name}</p>

                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      user.subscription_type === "premium"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.subscription_type === "premium" ? "PRO" : "FREE"}
                  </span>
                </div>
              </Link>

              {user.subscription_type === "free" && (
                <Link
                  to="/upgrade"
                  className="block text-indigo-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Upgrade
                </Link>
              )}

              <button onClick={logout} className="text-red-500 text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
