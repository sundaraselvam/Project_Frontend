import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    api
      .get(`/jobs/${id}`)
      .then((r) => setJob(r.data))
      .catch(() => {});
  }, [id]);

  const apply = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to apply");
    const form = new FormData();
    if (resume) form.append("resume", resume);
    form.append("coverLetter", "");
    try {
      await api.post(`/applications/apply/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Applied");
    } catch (err) {
      alert(err?.response?.data?.message || "Apply failed");
    }
  };

  if (!job)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <p className="text-lg text-gray-600 flex items-center mb-2 md:mb-0">
            <span className="mr-2">📍</span> {job.location} • 💰 {job.salary}
          </p>
          <p className="text-sm text-gray-500">
            Posted by: {job.company?.name || "Company"}
          </p>
        </div>
        <div className="prose max-w-none mb-8">
          <h3 className="text-xl font-semibold mb-3">Job Description</h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        <form onSubmit={apply} className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Apply for this Job</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF/DOC/DOCX)
            </label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              accept=".pdf,.doc,.docx"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
