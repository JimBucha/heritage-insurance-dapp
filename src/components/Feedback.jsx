// src/components/Feedback.jsx
import React, { useState } from 'react';

const Feedback = () => {
  const [userId, setUserId] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !feedbackText) {
      setMessage("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, feedback: feedbackText })
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      const data = await response.json();
      setMessage(data.message);
      setUserId('');
      setFeedbackText('');
    } catch (err) {
      console.error(err);
      setMessage("Error submitting feedback. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border p-2 mt-1"
            placeholder="Enter your user ID"
            required
          />
        </label>
        <label className="block mb-2">
          Feedback:
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full border p-2 mt-1"
            placeholder="Enter your feedback here"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
