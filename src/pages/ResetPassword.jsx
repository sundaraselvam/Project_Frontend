import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/password/reset", { token, password });
      alert("Password reset");
      navigate("/login");
    } catch (err) {
      alert("Reset failed");
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border p-2"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token"
        />
        <input
          className="w-full border p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
        />
        <button className="bg-green-600 text-white p-2 rounded">Reset</button>
      </form>
    </div>
  );
}
