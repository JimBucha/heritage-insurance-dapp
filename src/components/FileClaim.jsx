// src/components/FileClaim.jsx
import React, { useState } from 'react';
import { getContract } from '../ethereum';

const FileClaim = () => {
  const [policyId, setPolicyId] = useState('');
  const [claimDetails, setClaimDetails] = useState('');

  const handleFileClaim = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.fileClaim(policyId, claimDetails);
      await tx.wait();
      alert("Claim filed successfully!");
    } catch (error) {
      console.error("Error filing claim:", error);
      alert("Error filing claim.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">File Claim</h2>
      <input
        type="number"
        placeholder="Policy ID"
        value={policyId}
        onChange={(e) => setPolicyId(e.target.value)}
        className="border p-2 mb-2"
      />
      <textarea
        placeholder="Claim Details"
        value={claimDetails}
        onChange={(e) => setClaimDetails(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handleFileClaim} className="bg-green-500 text-white px-4 py-2">
        File Claim
      </button>
    </div>
  );
};

export default FileClaim;
