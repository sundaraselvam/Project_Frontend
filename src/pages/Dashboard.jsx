import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (role === "employer") {
      api
        .get("/applications/employer")
        .then((r) => setApplications(r.data))
        .catch(() => {});
      api
        .get("/jobs")
        .then((r) => {
          const userId = null;
          setJobs(r.data || []);
        })
        .catch(() => {});
    } else if (role === "jobseeker") {
      api
        .get("/applications/jobseeker")
        .then((r) => setApplications(r.data))
        .catch(() => {});
    }
  }, [role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 text-lg">
            {role === "employer"
              ? "Manage your job postings and applications"
              : "Track your job applications and opportunities"}
          </p>
        </div>
        {role === "employer" ? (
          <>
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl mb-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <span className="mr-3">📋</span>
                  Applications Received
                </h3>
                <p className="text-green-100">
                  Review and manage job applications from candidates
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center mb-4">
                      {app.applicant?.profilePicture ? (
                        <img
                          src={`http://localhost:5000${app.applicant.profilePicture}`}
                          alt="Profile"
                          className="w-14 h-14 rounded-full mr-4 border-2 border-gradient-to-r from-blue-400 to-purple-400 shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mr-4 shadow-md">
                          <span className="text-white text-xl">👤</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-800 flex items-center">
                          <span className="mr-2">👨‍💼</span>
                          {app.applicant?.name || "Anonymous"}
                        </h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="mr-1">📧</span>
                          {app.applicant?.email}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <span className="mr-1">📍</span>
                          {app.applicant?.location || "Location not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
                      <p className="text-sm mb-2 flex items-center">
                        <span className="mr-2">💼</span>
                        <strong>Job:</strong> {app.job?.title}
                      </p>
                      <div className="flex items-center mb-2">
                        <span className="mr-2">📊</span>
                        <strong>Status:</strong>
                        <span
                          className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                            app.status === "applied"
                              ? "bg-blue-100 text-blue-800"
                              : app.status === "reviewing"
                              ? "bg-yellow-100 text-yellow-800"
                              : app.status === "interview"
                              ? "bg-purple-100 text-purple-800"
                              : app.status === "offered"
                              ? "bg-green-100 text-green-800"
                              : app.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {app.applicant?.bio && (
                      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2 text-green-600">📝</span>
                          <strong className="text-green-800">Bio:</strong>{" "}
                          {app.applicant.bio}
                        </p>
                      </div>
                    )}
                    {app.applicant?.skills?.length > 0 && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2 text-purple-600">🛠️</span>
                          <strong className="text-purple-800">
                            Skills:
                          </strong>{" "}
                          {app.applicant.skills.join(", ")}
                        </p>
                      </div>
                    )}
                    <div className="flex space-x-3">
                      {app.resume && (
                        <Link
                          to={`/resume/${app._id}`}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-center flex items-center justify-center"
                        >
                          <span className="mr-2">📄</span>
                          View Resume
                        </Link>
                      )}
                    </div>
                    <div className="mt-4">
                      <select
                        defaultValue={app.status}
                        onChange={async (e) => {
                          try {
                            await api.put(`/applications/${app._id}/status`, {
                              status: e.target.value,
                            });
                            setApplications(
                              applications.map((a) =>
                                a._id === app._id
                                  ? { ...a, status: e.target.value }
                                  : a
                              )
                            );
                          } catch (err) {
                            alert("Update failed");
                          }
                        }}
                        className="w-full border p-2 rounded"
                      >
                        <option value="applied">Applied</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="interview">Interview</option>
                        <option value="offered">Offered</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl mb-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <span className="mr-3">💼</span>
                  Your Job Postings
                </h3>
                <p className="text-purple-100">
                  Manage and edit your active job listings
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center">
                          <span className="mr-2">🏢</span>
                          {job.title}
                        </h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="mr-2">📍</span>
                          {job.location}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <span className="mr-2">💰</span>
                          {job.salary}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <a
                          href={`/jobs/${job._id}`}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-center text-sm"
                        >
                          👁️ View
                        </a>
                        <a
                          href={`/jobs/${job._id}/edit`}
                          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-center text-sm"
                        >
                          ✏️ Edit
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl mb-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <span className="mr-3">🎯</span>
                My Job Applications
              </h3>
              <p className="text-blue-100">
                Track your application status and discover new opportunities
              </p>
            </div>
            {applications.length === 0 ? (
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg text-center border border-blue-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Applications Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your job search journey by exploring available
                  positions.
                </p>
                <a
                  href="/jobs"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
                >
                  🌟 Browse Jobs
                </a>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className={`p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      app.status === "offered"
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                        : app.status === "rejected"
                        ? "bg-gradient-to-br from-red-50 to-pink-50 border-red-200"
                        : app.status === "interview"
                        ? "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200"
                        : app.status === "reviewing"
                        ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                        : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center">
                          <span className="mr-2">💼</span>
                          {app.job?.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 flex items-center">
                          <span className="mr-2">📍</span> {app.job?.location} •{" "}
                          <span className="ml-2 mr-1">💰</span>{" "}
                          {app.job?.salary}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === "applied"
                            ? "bg-blue-100 text-blue-800"
                            : app.status === "reviewing"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "interview"
                            ? "bg-purple-100 text-purple-800"
                            : app.status === "offered"
                            ? "bg-green-100 text-green-800"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`/jobs/${app.job?._id}`}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-center text-sm"
                      >
                        👁️ View Job
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
