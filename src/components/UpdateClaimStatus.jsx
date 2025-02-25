// src/components/UpdateClaimStatus.jsx
import React, { useState } from 'react';
import { getContract } from '../ethereum';

const UpdateClaimStatus = () => {
  const [claimId, setClaimId] = useState('');
  const [status, setStatus] = useState('Approved');

  const handleUpdateClaimStatus = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.updateClaimStatus(claimId, status);
      await tx.wait();
      alert("Claim status updated successfully!");
    } catch (error) {
      console.error("Error updating claim status:", error);
      alert("Error updating claim status.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Claim Status</h2>
      <input
        type="number"
        placeholder="Claim ID"
        value={claimId}
        onChange={(e) => setClaimId(e.target.value)}
        className="border p-2 mb-2"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 mb-2">
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button onClick={handleUpdateClaimStatus} className="bg-yellow-500 text-white px-4 py-2">
        Update Status
      </button>
    </div>
  );
};

export default UpdateClaimStatus;
