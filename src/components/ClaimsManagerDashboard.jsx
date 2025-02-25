// src/components/ClaimsManagerDashboard.jsx
import React, { useEffect, useState } from 'react';

const ClaimsManagerDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all claims and filter those that need review ("Submitted")
  const fetchClaims = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/claims')
      .then(response => response.json())
      .then(data => {
        // Filter to include only claims with status "Submitted"
        const pendingClaims = data.filter(claim => claim.status === "Submitted");
        setClaims(pendingClaims);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching claims:", err);
        setError("Error fetching claims");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  // Handler to update claim status
  const updateClaimStatus = async (claimId, newStatus) => {
    try {
      const response = await fetch('http://localhost:5000/api/claims/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId, status: newStatus })
      });
      if (!response.ok) {
        throw new Error('Failed to update claim');
      }
      const result = await response.json();
      alert(result.message);
      // Refresh the claims list after update
      fetchClaims();
    } catch (err) {
      console.error("Error updating claim:", err);
      alert("Error updating claim. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Claims Manager Dashboard</h2>
      {loading ? (
        <p>Loading pending claims...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : claims.length > 0 ? (
        <table className="min-w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Claim ID</th>
              <th className="border px-4 py-2">Policy ID</th>
              <th className="border px-4 py-2">Claimant</th>
              <th className="border px-4 py-2">Details</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td className="border px-4 py-2">{claim.id}</td>
                <td className="border px-4 py-2">{claim.policy_id}</td>
                <td className="border px-4 py-2">{claim.claimant}</td>
                <td className="border px-4 py-2">{claim.details}</td>
                <td className="border px-4 py-2">{claim.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => updateClaimStatus(claim.id, 'Approved')}
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateClaimStatus(claim.id, 'Rejected')}
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
        <p>No pending claims to review.</p>
      )}
    </div>
  );
};

export default ClaimsManagerDashboard;
