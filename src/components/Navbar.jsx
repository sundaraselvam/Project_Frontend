import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold text-gray-800">
          JobPortal
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/jobs"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Jobs
          </Link>
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Profile
              </Link>
              {role === "employer" && (
                <Link
                  to="/jobs/create"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Create Job
                </Link>
              )}
              <Link
                to="/company"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Company
              </Link>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-40 flex justify-end md:hidden">
            <div className="w-3/4 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col space-y-4 animate-slide-in">
              <button
                className="self-end mb-4 text-gray-600 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link
                to="/jobs"
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Jobs
              </Link>
              {token ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-blue-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {role === "employer" && (
                    <Link
                      to="/jobs/create"
                      className="text-gray-700 hover:text-blue-600 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Create Job
                    </Link>
                  )}
                  <Link
                    to="/company"
                    className="text-gray-700 hover:text-blue-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Company
                  </Link>
                  <button
                    onClick={logout}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Mobile menu slide-in animation */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}
