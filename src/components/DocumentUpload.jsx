// src/components/DocumentUpload.jsx
import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

// Create an IPFS client using Infura's API (you can also run your own IPFS node)
const client = create('https://ipfs.infura.io:5001/api/v0');

const DocumentUpload = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      setError('');
      // Add the file to IPFS
      const added = await client.add(file);
      // Construct the URL (using Infura gateway)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
      setUploading(false);
    } catch (err) {
      console.error('Error uploading file: ', err);
      setError('Error uploading file to IPFS.');
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Document Upload</h2>
      <input type="file" onChange={onChange} className="mb-4" />
      {uploading && <p>Uploading file to IPFS...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {fileUrl && (
        <div className="mt-4">
          <p className="font-semibold">File uploaded successfully!</p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
