import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import UrlForm from "./components/UrlForm";
// import UrlLookup from "./components/UrlLookup";
import RedirectPage from "./components/UrlRedirect";
import UrlShortener from "./components/UrlShortener";
import './App.css';

export default function App() {
  const [refresh, setRefresh] = useState(0);

  const handleNewUrl = () => setRefresh(r => r + 1);

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded shadow">
      <h1 className="text-2xl font-bold text-center p-4">
        Shortly - URL Shortener
      </h1>
      {/* <UrlForm onNewUrl={handleNewUrl} />
      <UrlLookup /> */}
      <Routes>
        {/* Home: form to create a short link */}
        <Route path="/" element={<UrlShortener />} />

        {/* Redirect route: matches anything like /abc123 */}
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </div>
  );
}

