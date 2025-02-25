// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  // State for overview metrics
  const [metrics, setMetrics] = useState(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  // State for user management data
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // State for financial/transaction data
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const [error, setError] = useState(null);

  // Fetch overview metrics
  useEffect(() => {
    fetch('http://localhost:5000/api/metrics')
      .then((response) => response.json())
      .then((data) => {
        setMetrics(data);
        setLoadingMetrics(false);
      })
      .catch((err) => {
        console.error('Error fetching metrics:', err);
        setError('Error fetching metrics');
        setLoadingMetrics(false);
      });
  }, []);

  // Fetch user management data
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Error fetching users');
        setLoadingUsers(false);
      });
  }, []);

  // Fetch transaction data for the financial dashboard
  useEffect(() => {
    fetch('http://localhost:5000/api/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setLoadingTransactions(false);
      })
      .catch((err) => {
        console.error('Error fetching transactions:', err);
        setError('Error fetching transactions');
        setLoadingTransactions(false);
      });
  }, []);

  // Handlers for user approval actions (dummy functions for now)
  const handleApprove = (userId) => {
    // TODO: Make API call to approve user
    alert(`User ${userId} approved!`);
  };

  const handleDecline = (userId) => {
    // TODO: Make API call to decline user
    alert(`User ${userId} declined!`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Overview Metrics Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Overview Metrics</h3>
        {loadingMetrics ? (
          <p>Loading metrics...</p>
        ) : metrics ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow rounded">
              <p className="text-lg">Total Policies</p>
              <p className="text-2xl font-bold">{metrics.totalPolicies}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <p className="text-lg">Total Claims</p>
              <p className="text-2xl font-bold">{metrics.totalClaims}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <p className="text-lg">Total Revenue</p>
              <p className="text-2xl font-bold">${metrics.totalRevenue}</p>
            </div>
          </div>
        ) : (
          <p>No metrics data available.</p>
        )}
      </section>

      {/* User Management Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">User Management</h3>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <table className="min-w-full border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2">User ID</th>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Approval Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.full_name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.approval_status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Financial Dashboard / Transaction Logs Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Financial Dashboard</h3>
        {loadingTransactions ? (
          <p>Loading transactions...</p>
        ) : transactions.length > 0 ? (
          <table className="min-w-full border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Transaction ID</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Policy ID</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="border px-4 py-2">{tx.id}</td>
                  <td className="border px-4 py-2">{tx.transaction_type}</td>
                  <td className="border px-4 py-2">{tx.policy_id}</td>
                  <td className="border px-4 py-2">${tx.amount}</td>
                  <td className="border px-4 py-2">{tx.transaction_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transaction data available.</p>
        )}
      </section>

      {/* Reports & Analytics Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Reports & Analytics</h3>
        <p className="mb-2">
          Generate detailed reports for policies, claims, revenue, and user activity.
        </p>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Download Report (CSV)
        </button>
      </section>

      {/* Additional Features Section */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Additional Features</h3>
        <p>
          Integration with charts, calendars, IPFS document management, and audit logs can be added here.
        </p>
      </section>
    </div>
  );
};

export default AdminDashboard;
