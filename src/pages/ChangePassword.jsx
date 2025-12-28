import React, { useState } from "react";
import api from "../api";

export default function ChangePassword() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/password/change", { currentPassword, newPassword });
      alert("Password changed");
    } catch (err) {
      alert("Change failed");
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border p-2"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="Current password"
        />
        <input
          className="w-full border p-2"
          type="password"
          value={newPassword}
          onChange={(e) => setNew(e.target.value)}
          placeholder="New password"
        />
        <button className="bg-blue-600 text-white p-2 rounded">Change</button>
      </form>
    </div>
  );
}
