// src/components/ShortenedLinkList.js
import React from 'react';

function ShortenedLinkList({ links, onClick }) {
  if (links.length === 0) return <p className="mt-4 text-gray-500">No shortened links yet.</p>;

  return (
    <div className="mt-6 space-y-4">
      {links.map((link, idx) => (
        <div key={idx} className="border p-4 rounded shadow">
          <p>
            <strong>Shortcode:</strong>{' '}
            <a
  href={`/${link.shortcode}`}
  onClick={() => onClick(link.shortcode)}
  className="text-blue-600"
  target="_blank"
  rel="noopener noreferrer"
>
  {link.shortcode}
</a>

          </p>
          
        </div>
      ))}
    </div>
  );
}

export default ShortenedLinkList;
