// src/components/URLForm.js
import React, { useState } from 'react';

function URLForm({ onCreate }) {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [customCode, setCustomCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) {
      alert('URL is required');
      return;
    }
    onCreate(longUrl.trim(), parseInt(validity) || null, customCode.trim() || null);
    setLongUrl('');
    setValidity('');
    setCustomCode('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Validity in minutes (optional)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Shorten
      </button>
    </form>
  );
}

export default URLForm;
