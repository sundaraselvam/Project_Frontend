import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold text-gray-800">
          JobPortal
        </Link>
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
        <div className="md:hidden flex space-x-2">
          {token ? (
            <button onClick={logout} className="text-red-600 text-sm">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-blue-600 text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
