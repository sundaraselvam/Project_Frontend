import React, { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((r) => setUser(r.data))
      .catch(() => {});
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await api.put("/auth/profile", {
        name: user.name,
        bio: user.bio,
        location: user.location,
      });
      alert("Saved");
    } catch (err) {
      alert("Save failed");
    }
  };

  const upload = async () => {
    if (!file) return alert("Select a file");
    const form = new FormData();
    form.append("profilePicture", file);
    try {
      const res = await api.post("/auth/profile/picture", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser({ ...user, profilePicture: res.data.path });
      alert("Uploaded");
    } catch (err) {
      alert("Upload failed");
    }
  };

  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>

        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="mb-4 md:mb-0 md:mr-8">
            {user.profilePicture ? (
              <img
                src={`http://localhost:5000${user.profilePicture}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-gray-600">
                👤
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                accept="image/*"
              />
              <button
                onClick={upload}
                className="mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Upload Picture
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={save} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={user.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={user.location || ""}
              onChange={(e) => setUser({ ...user, location: e.target.value })}
              placeholder="Enter your location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
              value={user.bio || ""}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              placeholder="Tell us about yourself..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Save Profile
          </button>
        </form>
        <div className="mt-6">
          <a
            href="/change-password"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Change Password
          </a>
        </div>
      </div>
    </div>
  );
}
