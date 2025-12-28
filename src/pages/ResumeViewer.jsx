import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ResumeViewer() {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        console.log("Fetching application with ID:", applicationId);
        const response = await api.get(`/applications/${applicationId}`);
        console.log("Application data:", response.data);
        setApplication(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching application:", error);
        console.error("Error response:", error.response);
        console.error("Error status:", error.response?.status);
        console.error("Error message:", error.response?.data?.message);
        setError({
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
        });
        setLoading(false);
      }
    };

    if (applicationId) {
      fetchApplication();
    } else {
      console.error("No applicationId provided in URL params");
      setError({ status: 400, message: "No application ID provided" });
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    if (application && application.applicant) {
      document.title = `${application.applicant.name}'s Resume - ${
        application.job?.title || "Job Application"
      }`;
    }
  }, [application]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">
            {error.status === 404 ? "🔍" : error.status === 403 ? "🚫" : "❌"}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error.status === 404
              ? "Application Not Found"
              : error.status === 403
              ? "Access Denied"
              : "Error Loading Resume"}
          </h2>
          <p className="text-gray-600 mb-4">
            {error.status === 404
              ? "The application you're looking for doesn't exist or may have been deleted."
              : error.status === 403
              ? "You don't have permission to view this application."
              : `An error occurred: ${error.message}`}
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
            <p className="text-sm text-gray-700">
              <strong>Application ID:</strong> {applicationId || "Not provided"}
              <br />
              <strong>Error Code:</strong> {error.status || "Unknown"}
              <br />
              <strong>Details:</strong> {error.message}
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!application.resume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Resume Attached
          </h2>
          <p className="text-gray-600 mb-4">
            {application.applicant?.name || "The applicant"} hasn't uploaded a
            resume for this application.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="font-semibold text-gray-800 mb-2">
              Application Details:
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Applicant:</strong>{" "}
              {application.applicant?.name || "Unknown"}
              <br />
              <strong>Job:</strong>{" "}
              {application.job?.title || "Unknown Position"}
              <br />
              <strong>Status:</strong> {application.status || "Unknown"}
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {application.applicant?.profilePicture ? (
                <img
                  src={`https://project-backend-6blt.onrender.com${application.applicant.profilePicture}`}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                  👤
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {application.applicant?.name || "Applicant"}'s Resume
                </h1>
                <p className="text-gray-600">
                  Applied for:{" "}
                  <span className="font-semibold">
                    {application.job?.title || "Position"}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Application Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      application.status === "applied"
                        ? "bg-blue-100 text-blue-800"
                        : application.status === "reviewing"
                        ? "bg-yellow-100 text-yellow-800"
                        : application.status === "interview"
                        ? "bg-purple-100 text-purple-800"
                        : application.status === "offered"
                        ? "bg-green-100 text-green-800"
                        : application.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => window.history.back()}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Back to Applications
              </button>
              <a
                href={`https://project-backend-6blt.onrender.com${application.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                📥 Download Resume
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Resume Document
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Click the download button above to view the resume, or use the
              embedded viewer below.
            </p>
          </div>
          <div className="p-6">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-2xl mr-3">📄</div>
                <div>
                  <h3 className="font-semibold text-blue-800">
                    Resume Ready for Viewing
                  </h3>
                  <p className="text-sm text-blue-600">
                    The resume has been uploaded and is available for download
                    and viewing.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <iframe
                src={`https://project-backend-6blt.onrender.com${application.resume}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[800px]"
                title={`${application.applicant?.name || "Applicant"}'s Resume`}
                style={{ border: "none" }}
              />
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                If the resume doesn't display above, please use the download
                button to view it in your PDF reader.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
