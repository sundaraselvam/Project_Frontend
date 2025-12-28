import React, { useEffect, useState } from "react";
import api from "../api";

export default function CompanyProfile() {
  const [company, setCompany] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    api
      .get("/companies")
      .then((r) => {
        if (r.data.length) setCompany(r.data[0]);
      })
      .catch(() => {});
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (company._id) await api.put(`/companies/${company._id}`, company);
      else await api.post("/companies", company);
      alert("Saved");
    } catch (err) {
      alert("Save failed");
    }
  };

  const uploadLogo = async () => {
    if (!file) return alert("Select a file");
    const form = new FormData();
    form.append("logo", file);
    try {
      const res = await api.post(`/companies/${company._id}/logo`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCompany({ ...company, logo: res.data.path });
      alert("Uploaded");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Company Profile
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="mb-4 md:mb-0 md:mr-8">
            {company.logo ? (
              <img
                src={`http://localhost:5000${company.logo}`}
                alt="Company Logo"
                className="w-32 h-32 rounded-lg object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg bg-gray-300 flex items-center justify-center text-4xl text-gray-600">
                🏢
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                accept="image/*"
              />
              <button
                onClick={uploadLogo}
                className="mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Upload Logo
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={save} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={company.name || ""}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              placeholder="Enter company name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={company.location || ""}
              onChange={(e) =>
                setCompany({ ...company, location: e.target.value })
              }
              placeholder="Enter company location"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40 resize-none"
              value={company.description || ""}
              onChange={(e) =>
                setCompany({ ...company, description: e.target.value })
              }
              placeholder="Describe your company, mission, and values..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium w-full md:w-auto"
          >
            Save Company Profile
          </button>
        </form>
      </div>
    </div>
  );
}
