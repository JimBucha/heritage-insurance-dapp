import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectWallet } from '../ethereum';

const Register = () => {
  const navigate = useNavigate();
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Policyholder');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Connect wallet and set wallet address
  const handleConnectWallet = async () => {
    const signer = await connectWallet();
    if (signer) {
      try {
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (err) {
        console.error("Error fetching address:", err);
        setError("Failed to retrieve wallet address.");
      }
    }
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletAddress) {
      setError("Please connect your wallet first.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          wallet_address: walletAddress,
          role
        })
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      console.log("Registered user:", data);
      // Navigate to login (or directly to a dashboard) after successful registration
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-2 mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 mt-1"
          >
            <option value="Administrator">Administrator</option>
            <option value="ClaimsManager">Claims Manager</option>
            <option value="UnderwritingManager">Underwriting Manager</option>
            <option value="PolicyManager">Policy Manager</option>
            <option value="FinanceOfficer">Finance Officer</option>
            <option value="Intermediary">Intermediary</option>
            <option value="Policyholder">Policy Holder</option>
          </select>
        </label>
        <label className="block mb-2">
          Wallet Address:
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full border p-2 mt-1"
            readOnly={!walletAddress ? false : true} // Allow manual change if not set
            placeholder="Connect your wallet"
            required
          />
          {!walletAddress && (
            <button
              type="button"
              onClick={handleConnectWallet}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Connect Wallet
            </button>
          )}
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
