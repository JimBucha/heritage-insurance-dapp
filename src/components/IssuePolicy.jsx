// src/components/IssuePolicy.jsx
import React, { useState } from 'react';
import { getContract } from '../ethereum';

const IssuePolicy = () => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [premium, setPremium] = useState('');

  const handleIssuePolicy = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.issuePolicy(policyNumber, premium);
      await tx.wait();
      alert("Policy issued successfully!");
    } catch (error) {
      console.error("Error issuing policy:", error);
      alert("Error issuing policy.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Issue Policy</h2>
      <input
        type="text"
        placeholder="Policy Number"
        value={policyNumber}
        onChange={(e) => setPolicyNumber(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="number"
        placeholder="Premium"
        value={premium}
        onChange={(e) => setPremium(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handleIssuePolicy} className="bg-blue-500 text-white px-4 py-2">
        Issue Policy
      </button>
    </div>
  );
};

export default IssuePolicy;
