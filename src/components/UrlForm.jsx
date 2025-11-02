import { useState } from "react";
import { shortenUrl } from "../api/urls";
import { baseURL } from "../api/client";

export default function UrlForm({ onNewUrl }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState(""); // added
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await shortenUrl(originalUrl.trim());
      console.log("shortenUrl response:", data); // inspect shape

      // Extract relevant fields if necessary
      const shortCode = data.shortCode;

      if (!shortCode) {
        throw new Error("shortCode not found in shortenUrl response");
      }

      onNewUrl(data, shortCode);
      setOriginalUrl("");
      setShortCode(shortCode);
    } catch (err) {
      setError("Failed to shorten URL" + (err.message ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 flex gap-2">
        <input
          type="url"
          value={originalUrl}
          onChange={e => setOriginalUrl(e.target.value)}
          placeholder="Enter a long URL..."
          className="flex-1 border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Shortening..." : "make it Shorter"}
        </button>
        {error && <p className="text-red-500 ml-2">{error}</p>}
      </form>

      {/* show the generated short code / short url */}
      {shortCode && (
        <div className="p-4 bg-gray-100 rounded flex items-center gap-2 mt-2">
          <a
            href={`${baseURL}/${shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 break-all"
          >
            {`${baseURL}/${shortCode}`}
          </a>
          <button
            type="button"
            onClick={() => {
              const text = `${baseURL}/${shortCode}`;
              navigator.clipboard?.writeText(text);
            }}
            className="ml-auto bg-gray-200 px-2 py-1 rounded"
          >
            Copy
          </button>
        </div>
      )}
    </>
  );
}
