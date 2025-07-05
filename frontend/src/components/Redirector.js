import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Redirector = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const links = JSON.parse(localStorage.getItem("links") || "[]");
    const match = links.find(u => u.shortcode === shortcode);

    if (!match) {
      alert("URL not found");
      return navigate("/");
    }

    // Calculate expiry
    const createdTime = new Date(match.createdAt).getTime();
    const expiryTime = createdTime + (match.validity * 60 * 1000);

    if (Date.now() > expiryTime) {
      alert("This URL has expired");
      return navigate("/");
    }

    // Increment clicks
    match.clicks += 1;

    // Save updated links
    const updatedLinks = links.map(l => l.shortcode === shortcode ? match : l);
    localStorage.setItem("links", JSON.stringify(updatedLinks));

    // Redirect
    window.location.href = match.longUrl;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default Redirector;
