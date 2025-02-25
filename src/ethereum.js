// src/ethereum.js
import { ethers } from 'ethers';

const contractAddress = "0x80685cC8d7e75f1cDDFe9E8ddd770953d0C8Aa91";

const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_policyNumber", "type": "string" },
      { "internalType": "uint256", "name": "_premium", "type": "uint256" }
    ],
    "name": "issuePolicy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_policyId", "type": "uint256" },
      { "internalType": "string", "name": "_details", "type": "string" }
    ],
    "name": "fileClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_claimId", "type": "uint256" },
      { "internalType": "string", "name": "_status", "type": "string" }
    ],
    "name": "updateClaimStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_policyId", "type": "uint256" }
    ],
    "name": "payPremium",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

export async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return signer;
    } catch (error) {
      console.error("User denied account access");
      return null;
    }
  } else {
    alert("Please install MetaMask to interact with this dApp");
    return null;
  }
}

export async function getContract() {
  const signer = await connectWallet();
  if (!signer) return null;
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
}
