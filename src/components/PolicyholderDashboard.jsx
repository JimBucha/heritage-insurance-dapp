// src/components/PolicyholderDashboard.jsx
import React, { useEffect, useState } from 'react';

const PolicyholderDashboard = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // For demonstration purposes, we'll fetch all policies from the backend
  // and simulate filtering for a policyholder with user_id = 2.
  // In a real system, you'd either pass the logged-in user's id (from login)
  // or have an endpoint that returns policies for the current user.
  useEffect(() => {
    fetch('http://localhost:5000/api/policies')
      .then((res) => res.json())
      .then((data) => {
        // Simulate filtering policies for a specific user (e.g., user_id === 2)
        const filtered = data.filter(policy => policy.user_id === 2);
        setPolicies(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching policies:", err);
        setError("Error fetching policies");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Policyholder Dashboard</h2>
      {loading ? (
        <p>Loading your policies...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : policies.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Your Policies</h3>
          <ul className="list-disc pl-5">
            {policies.map((policy) => (
              <li key={policy.id}>
                <span className="font-medium">Policy Number:</span> {policy.policy_number} | 
                <span className="font-medium"> Premium:</span> ${policy.premium}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You do not have any policies yet.</p>
      )}
    </div>
  );
};

export default PolicyholderDashboard;
