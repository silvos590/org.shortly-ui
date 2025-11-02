import { useState } from "react";
import { getUrlByCode } from "../api/urls";

export default function UrlLookup() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleLookup = async e => {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
      const data = await getUrlByCode(code.trim());
      // print data to inspect its structure
      console.log("getUrlByCode response:", data);
      setResult(data);
    } catch {
      setError("No URL found for that code");
    }
  };

  return (
    <div className="p-4 border-t">
      <form onSubmit={handleLookup} className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Enter short code (e.g. xyz123)"
          className="flex-1 border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Find
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {result && (
        <div className="mt-4 p-3 bg-gray-50 border rounded">
          <p>
            <strong>Short URL:</strong>{" "}
            <a href={result.shortCode} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {result.shortCode}
            </a>
          </p>
          <p className="mt-1">
            <strong>Original URL:</strong>{" "}
            <a href={result.originalUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {result.originalUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
