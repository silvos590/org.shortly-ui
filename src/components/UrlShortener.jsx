import { useState } from "react";
import { shortenUrl, getUrlByCode } from "../api/urls";
import { baseURL } from "../api/client";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lookup states
  const [lookupCode, setLookupCode] = useState("");
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState("");

  const handleShorten = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await shortenUrl(originalUrl.trim());
      const shortCode = data.shortCode;

      if (!shortCode) {
        throw new Error("shortCode not found in response");
      }

      setOriginalUrl("");
      setShortCode(shortCode);
    } catch (err) {
      setError("Failed to shorten URL" + (err.message ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async e => {
    e.preventDefault();
    setLookupError("");
    setLookupResult(null);
    try {
      const data = await getUrlByCode(lookupCode.trim());
      setLookupResult(data);
    } catch {
      setLookupError("No URL found for that code");
    }
  };

  return (
    <div className="app">
      {/* Shorten URL Form */}
      <section className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Shorten URL</h2>
        <form onSubmit={handleShorten} className="form-row">
          <input
            type="url"
            value={originalUrl}
            onChange={e => setOriginalUrl(e.target.value)}
            placeholder="Enter a long URL..."
            className="input"
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Make it Shorter"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}

        {shortCode && (
          <div className="short-panel">
            <a
              href={`${baseURL}/${shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="short-link"
            >
              {`${baseURL}/${shortCode}`}
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(`${baseURL}/${shortCode}`);
              }}
              className="copy-btn"
            >
              Copy
            </button>
          </div>
        )}
      </section>

      {/* Lookup URL Form */}
      <section className="card">
        <h2 className="text-xl font-bold mb-4">Lookup URL</h2>
        <form onSubmit={handleLookup} className="form-row">
          <input
            type="text"
            value={lookupCode}
            onChange={e => setLookupCode(e.target.value)}
            placeholder="Enter short code (e.g. xyz123)"
            className="input"
            required
          />
          <button type="submit" className="btn btn-primary">
            Find Original URL
          </button>
        </form>

        {lookupError && <p className="error">{lookupError}</p>}

        {lookupResult && (
          <div className="short-panel">
            <div className="flex flex-col gap-2 w-full">
              <p>
                <span className="muted">Original URL: </span>
                <a
                  href={lookupResult.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="short-link"
                >
                  {lookupResult.originalUrl}
                </a>
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}