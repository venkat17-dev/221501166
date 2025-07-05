import React, { useState, useEffect } from 'react';
import URLForm from './components/URLForm';
import ShortenedLinkList from './components/ShortenedLinkList';
import { logMiddleware } from './middleware/LoggerMiddleware';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from 'react-router-dom';

import Redirector from './components/Redirector';
import StatsPage from './components/StatsPage';



// 🧱 Home Page Component
function HomePage({ links, setLinks, handleCreateLink, handleClick }) {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React URL Shortener</h1>
      <URLForm onCreate={handleCreateLink} />
      <ShortenedLinkList links={links} onClick={handleClick} />
      <div className="mt-6">
        <h2 className="font-bold">Log Output</h2>
        <pre id="log-store" className="bg-gray-100 p-2 mt-2 h-48 overflow-y-auto text-sm border rounded"></pre>
      </div>
    </div>
  );
}

// 🧠 Main App Component
function App() {
  // ✅ Load from localStorage on start
  const [links, setLinks] = useState(() => {
    const stored = localStorage.getItem('links');
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Save to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  // 🔧 Generate 6-char random shortcode
  const generateShortcode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
      code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (links.find(link => link.shortcode === code));
    return code;
  };

  // ➕ Handle new shortened URL creation
  const handleCreateLink = (longUrl, validity, customCode) => {
    let shortcode = customCode || generateShortcode();

    if (!/^[a-zA-Z0-9]{4,20}$/.test(shortcode)) {
      logMiddleware('Invalid shortcode format', 'error');
      alert('Shortcode must be alphanumeric and 4-20 characters.');
      return;
    }

    if (links.find(link => link.shortcode === shortcode)) {
      logMiddleware('Shortcode already in use', 'error');
      alert('Shortcode already exists!');
      return;
    }

    const newLink = {
      longUrl,
      shortcode,
      validity: validity || 30,
      clicks: 0,
      createdAt: new Date(),
    };

    setLinks([...links, newLink]);
    logMiddleware(`Shortened URL created: ${shortcode}`, 'info');
  };

  // ➕ Handle short link click
  const handleClick = (shortcode) => {
    setLinks(prevLinks =>
      prevLinks.map(link =>
        link.shortcode === shortcode ? { ...link, clicks: link.clicks + 1 } : link
      )
    );
    logMiddleware(`Shortened URL clicked: ${shortcode}`, 'info');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <HomePage
            links={links}
            setLinks={setLinks}
            handleCreateLink={handleCreateLink}
            handleClick={handleClick}
          />
        } />
        <Route path="/:shortcode" element={<Redirector />} />
        <Route path="/stats" element={<StatsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
