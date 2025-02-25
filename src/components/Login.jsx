import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectWallet } from '../ethereum';

const Login = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleConnect = async () => {
    setError('');
    const signer = await connectWallet();
    if (signer) {
      const address = await signer.getAddress();
      setAccount(address);
    } else {
      setError('Wallet connection failed');
    }
  };

  const handleLogin = async () => {
    if (!account) {
      setError('Connect your wallet first.');
      return;
    }
    setLoading(true);
    try {
      // Call backend API for login
      const response = await fetch(`http://localhost:5000/api/login?wallet_address=${account}`);
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const userData = await response.json();
      // Navigate based on user role
      if (userData.role === 'Administrator') {
        navigate('/admin');
      } else if (userData.role === 'Policyholder') {
        navigate('/policyholder'); // Create this dashboard later
      } else if (userData.role === 'ClaimsManager') {
        navigate('/claims-manager'); // Create this dashboard later
      } else {
        navigate('/'); // Default route if needed
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {account ? (
        <p className="mb-4">
          Connected Wallet: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      ) : (
        <button onClick={handleConnect} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Connect Wallet
        </button>
      )}
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
