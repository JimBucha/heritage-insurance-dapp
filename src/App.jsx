// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import IssuePolicy from './components/IssuePolicy';
import FileClaim from './components/FileClaim';
import UpdateClaimStatus from './components/UpdateClaimStatus';
import PayPremium from './components/PayPremium';
import AdminDashboard from './components/AdminDashboard';
import PolicyholderDashboard from './components/PolicyholderDashboard';
import ClaimsManagerDashboard from './components/ClaimsManagerDashboard';
import UnderwritingManagerDashboard from './components/UnderwritingManagerDashboard'; // New component
import DocumentUpload from './components/DocumentUpload';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <nav className="mb-4">
          <Link className="mr-4 text-blue-600 hover:underline" to="/login">Login</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/register">Register</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/issue-policy">Issue Policy</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/file-claim">File Claim</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/update-claim">Update Claim</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/pay-premium">Pay Premium</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/admin">Admin Dashboard</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/policyholder">Policyholder Dashboard</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/claims-manager">Claims Manager Dashboard</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/underwriting">Underwriting Manager Dashboard</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/upload">Document Upload</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/reports">Reports</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/issue-policy" element={<IssuePolicy />} />
          <Route path="/file-claim" element={<FileClaim />} />
          <Route path="/update-claim" element={<UpdateClaimStatus />} />
          <Route path="/pay-premium" element={<PayPremium />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/policyholder" element={<PolicyholderDashboard />} />
          <Route path="/claims-manager" element={<ClaimsManagerDashboard />} />
          <Route path="/underwriting" element={<UnderwritingManagerDashboard />} />
          <Route path="/upload" element={<DocumentUpload />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
