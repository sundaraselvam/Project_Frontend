import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function JobEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api
      .get(`/jobs/${id}`)
      .then((r) => setJob(r.data))
      .catch(() => {});
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/jobs/${id}`, job);
      alert("Saved");
      navigate("/dashboard");
    } catch (err) {
      alert("Save failed");
    }
  };

  if (!job) return <div>Loading...</div>;
  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Job</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border p-2"
          value={job.title || ""}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          placeholder="Title"
        />
        <input
          className="w-full border p-2"
          value={job.location || ""}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
          placeholder="Location"
        />
        <input
          className="w-full border p-2"
          value={job.salary || ""}
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
          placeholder="Salary"
        />
        <textarea
          className="w-full border p-2"
          value={job.description || ""}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          placeholder="Description"
        />
        <button className="bg-blue-600 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
}
