import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RedirectPage() {
  const { code } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/shorten/${code}`)
      .then((r) => {
        if (!r.ok) throw new Error("Invalid short code");
        return r.json();
      })
      .then((data) => {
        if (data.originalUrl) {
          window.location.href = data.originalUrl;
        } else {
          setError("No destination URL found.");
        }
      })
      .catch((err) => setError(err.message));
  }, [code]);

  return (
    <div className="p-4 text-center">
      {error ? <p className="text-red-500">{error}</p> : <p>Redirecting...</p>}
    </div>
  );
}

export default RedirectPage;
