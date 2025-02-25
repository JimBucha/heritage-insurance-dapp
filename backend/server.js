// backend/server.js

// Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

// Initialize the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Leave blank if no password
  database: process.env.DB_NAME || 'heritage_insurance_dapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Endpoint: Login - Query the users table by wallet address
app.get('/api/login', (req, res) => {
  const { wallet_address } = req.query;
  if (!wallet_address) {
    return res.status(400).json({ error: "Wallet address missing" });
  }

  // Query the users table (case-insensitive)
  pool.query(
    'SELECT * FROM users WHERE LOWER(wallet_address) = LOWER(?)',
    [wallet_address],
    (err, results) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      // Return the first found user
      return res.json(results[0]);
    }
  );
});

// Dummy endpoint: Metrics
app.get('/api/metrics', (req, res) => {
  res.json({ totalPolicies: 15, totalClaims: 5, totalRevenue: 12000 });
});

// Dummy endpoint: Users list (for admin dashboard)
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, full_name: 'Admin User', email: 'admin@example.com', approval_status: 'Approved', wallet_address: '0x90e08bee1A3c72DAce1E9b36C6b56F8c68B11F20' },
    { id: 2, full_name: 'Claims Manager', email: 'claims@example.com', approval_status: 'Approved', wallet_address: '0x6950ba0e7c627eBF0F13D9a50Cc699B7eB9C58f2' },
    { id: 3, full_name: 'Underwriting Manager', email: 'underwriting@example.com', approval_status: 'Approved', wallet_address: '0x8df5CD9c7cb86C0A0AF725A51f1C229A093829e1' },
    { id: 4, full_name: 'Policy Manager', email: 'policy@example.com', approval_status: 'Approved', wallet_address: '0x14094a490C5630737cF4cC2dd65ca1EB739377e5' },
    { id: 5, full_name: 'Finance Officer', email: 'finance@example.com', approval_status: 'Approved', wallet_address: '0x0cF1ADb56b6b7C693033380dD549822bFF47Eb1A' },
    { id: 6, full_name: 'Intermediary', email: 'intermediary@example.com', approval_status: 'Approved', wallet_address: '0x331044710248349Df9117ebF30Ab3daFE4282B96' },
    { id: 7, full_name: 'Policy Holder 1', email: 'holder1@example.com', approval_status: 'Approved', wallet_address: '0x331044710248349Df9117ebF30Ab3daFE4282B96' },
    { id: 8, full_name: 'Policy Holder 2', email: 'holder2@example.com', approval_status: 'Approved', wallet_address: '0x331044710248349Df9117ebF30Ab3daFE4282B96' }
  ]);
});

// Dummy endpoint: Transactions (for financial dashboard)
app.get('/api/transactions', (req, res) => {
  res.json([
    { id: 1, transaction_type: 'PremiumPayment', policy_id: 1, amount: 100.00, transaction_date: '2023-01-01' },
    { id: 2, transaction_type: 'ClaimPayout', policy_id: 1, amount: 50.00, transaction_date: '2023-02-01' }
  ]);
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

// Registration endpoint: Create a new user
app.post('/api/register', (req, res) => {
  const { full_name, email, wallet_address, role } = req.body;
  if (!full_name || !email || !wallet_address || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  // Insert the new user into the users table
  pool.query(
    'INSERT INTO users (full_name, email, wallet_address, role) VALUES (?, ?, ?, ?)',
    [full_name, email, wallet_address, role],
    (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ error: "Database error" });
      }
      // Return the inserted user details including the generated ID
      res.json({ 
        id: results.insertId,
        full_name,
        email,
        wallet_address,
        role
      });
    }
  );
});

// Update Claim Status endpoint (simulated)
app.post('/api/claims/update', (req, res) => {
  const { claimId, status } = req.body;
  if (!claimId || !status) {
    return res.status(400).json({ error: "Missing claimId or status" });
  }
  // For demonstration, we'll simply return a success message.
  // In a real application, you'd perform a SQL UPDATE query here.
  console.log(`Claim ${claimId} updated to status: ${status}`);
  res.json({ message: `Claim ${claimId} updated to ${status}` });
});

const { Parser } = require('json2csv');

// Reports endpoint: Generate a CSV report from policies data
app.get('/api/reports', (req, res) => {
  pool.query('SELECT * FROM policies', (err, results) => {
    if (err) {
      console.error('Error fetching policies for report:', err);
      return res.status(500).json({ error: 'Error generating report' });
    }
    try {
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(results);
      res.header('Content-Type', 'text/csv');
      res.attachment('policies_report.csv');
      return res.send(csv);
    } catch (err) {
      console.error('Error parsing CSV:', err);
      return res.status(500).json({ error: 'Error generating report' });
    }
  });
});

// Dummy endpoint: Underwriting Manager data
app.get('/api/underwriting', (req, res) => {
  // Dummy data: List of pending policy applications for underwriting review
  res.json([
    {
      id: 1,
      policy_number: 'POL123',
      applicant: 'Alice Johnson',
      risk: 'Medium',
      premium: 150.00,
      status: 'Pending'
    },
    {
      id: 2,
      policy_number: 'POL124',
      applicant: 'Bob Smith',
      risk: 'High',
      premium: 200.00,
      status: 'Pending'
    }
  ]);
});

// Feedback endpoint: Accept user feedback
app.post('/api/feedback', (req, res) => {
  const { user_id, feedback } = req.body;
  if (!user_id || !feedback) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  // For now, we'll simulate inserting feedback into a database.
  // In a real implementation, you would execute an INSERT query to store feedback.
  console.log(`Feedback received from user ${user_id}: ${feedback}`);
  
  // Simulate a successful insertion response
  res.json({ message: "Feedback submitted successfully" });
});
