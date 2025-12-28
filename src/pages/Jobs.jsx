import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api
      .get("/jobs")
      .then((r) => setJobs(r.data))
      .catch(() => {});
  }, []);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Jobs
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition"
            >
              <h3 className="font-bold text-xl text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 flex items-center">
                <span className="mr-2">📍</span> {job.location} • 💰{" "}
                {job.salary}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {job.description?.slice(0, 200)}...
              </p>
              <div className="flex items-center justify-between">
                <Link
                  to={`/jobs/${job._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
                {role === "employer" && token && (
                  <div className="flex space-x-2">
                    <Link
                      to={`/jobs/${job._id}/edit`}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        if (!confirm("Delete job?")) return;
                        try {
                          console.log("Deleting job:", job._id);
                          const response = await api.delete(`/jobs/${job._id}`);
                          console.log("Delete response:", response);
                          setJobs(jobs.filter((j) => j._id !== job._id));
                          alert("Job deleted successfully");
                        } catch (err) {
                          console.error("Delete error:", err);
                          alert(
                            `Delete failed: ${
                              err.response?.data?.message || err.message
                            }`
                          );
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
