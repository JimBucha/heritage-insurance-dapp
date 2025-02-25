// src/components/UnderwritingManagerDashboard.jsx
import React, { useEffect, useState } from 'react';

const UnderwritingManagerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/underwriting')
      .then(response => response.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching underwriting data:", err);
        setError("Error fetching underwriting data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Dummy handler for updating underwriting status
  const updateApplicationStatus = async (id, newStatus) => {
    // Here, you would call a backend endpoint to update the status.
    // For now, we simulate the update with an alert.
    alert(`Application ${id} updated to ${newStatus}`);
    // Refresh the list (in a real app, update state accordingly)
    fetchApplications();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Underwriting Manager Dashboard</h2>
      {loading ? (
        <p>Loading policy applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length > 0 ? (
        <table className="min-w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Application ID</th>
              <th className="border px-4 py-2">Policy Number</th>
              <th className="border px-4 py-2">Applicant</th>
              <th className="border px-4 py-2">Risk</th>
              <th className="border px-4 py-2">Premium</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td className="border px-4 py-2">{app.id}</td>
                <td className="border px-4 py-2">{app.policy_number}</td>
                <td className="border px-4 py-2">{app.applicant}</td>
                <td className="border px-4 py-2">{app.risk}</td>
                <td className="border px-4 py-2">${app.premium}</td>
                <td className="border px-4 py-2">{app.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => updateApplicationStatus(app.id, 'Approved')}
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending applications to review.</p>
      )}
    </div>
  );
};

export default UnderwritingManagerDashboard;
