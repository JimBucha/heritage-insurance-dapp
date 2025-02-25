// src/components/PayPremium.jsx
import React, { useState } from 'react';
import { getContract } from '../ethereum';
import { ethers } from 'ethers';

const PayPremium = () => {
  const [policyId, setPolicyId] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayPremium = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.payPremium(policyId, { value: ethers.utils.parseEther(amount) });
      await tx.wait();
      alert("Premium paid successfully!");
    } catch (error) {
      console.error("Error paying premium:", error);
      alert("Error paying premium.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pay Premium</h2>
      <input
        type="number"
        placeholder="Policy ID"
        value={policyId}
        onChange={(e) => setPolicyId(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handlePayPremium} className="bg-purple-500 text-white px-4 py-2">
        Pay Premium
      </button>
    </div>
  );
};

export default PayPremium;
