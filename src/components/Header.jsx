import React, { useEffect, useState } from 'react';
import { connectWallet } from '../ethereum';

const Header = () => {
  const [account, setAccount] = useState(null);

  const fetchAccount = async () => {
    const signer = await connectWallet();
    if (signer) {
      try {
        const address = await signer.getAddress();
        console.log("Connected address:", address);
        setAccount(address);
      } catch (error) {
        console.error("Error fetching address:", error);
        alert("Unable to retrieve account address. Please try again.");
      }
    } else {
      console.log("No signer returned.");
    }
  };

  useEffect(() => {
    fetchAccount();

    // Listen for account changes and update accordingly
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        fetchAccount();
      });
    }
  }, []);

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Heritage Insurance dApp</h1>
      <div>
        {account ? (
          <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
        ) : (
          <button 
            onClick={fetchAccount} 
            className="bg-white text-blue-600 px-3 py-1 rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
