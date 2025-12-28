import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/password/forgot", { email });
      if (res.data.token) {
        await navigator.clipboard.writeText(res.data.token);
        alert("Password Reset\nToken copied to clipboard!");
      } else {
        alert(res.data.message);
      }
      if (res.data.token) {
        navigate("/reset");
      }
    } catch (err) {
      alert("Request failed");
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button className="bg-blue-600 text-white p-2 rounded">
          Request Reset
        </button>
      </form>
    </div>
  );
}
