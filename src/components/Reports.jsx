// src/components/Reports.jsx
import React from 'react';

const Reports = () => {
  const handleDownload = () => {
    // Simply change the browser location to trigger the download
    window.location.href = 'http://localhost:5000/api/reports';
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <p className="mb-4">Download the policies report in CSV format.</p>
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Download Report
      </button>
    </div>
  );
};

export default Reports;
