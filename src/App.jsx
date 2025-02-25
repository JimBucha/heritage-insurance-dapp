// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IssuePolicy from './components/IssuePolicy';
import FileClaim from './components/FileClaim';
import UpdateClaimStatus from './components/UpdateClaimStatus';
import PayPremium from './components/PayPremium';

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-200">
        <h1 className="text-3xl font-bold">Heritage Insurance dApp</h1>
        <nav className="mt-4">
          <Link className="mr-4 text-blue-600 hover:underline" to="/issue-policy">Issue Policy</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/file-claim">File Claim</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/update-claim">Update Claim Status</Link>
          <Link className="mr-4 text-blue-600 hover:underline" to="/pay-premium">Pay Premium</Link>
        </nav>
      </div>
      <div className="p-4">
        <Routes>
          <Route path="/issue-policy" element={<IssuePolicy />} />
          <Route path="/file-claim" element={<FileClaim />} />
          <Route path="/update-claim" element={<UpdateClaimStatus />} />
          <Route path="/pay-premium" element={<PayPremium />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
