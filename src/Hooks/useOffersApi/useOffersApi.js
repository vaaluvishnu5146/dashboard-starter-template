import { useEffect, useState } from "react";

export default function useOffers() {
  const [offers, setOffers] = useState(null);
  const [error, setError] = useState(null);

  function fetchOffers() {
    fetch("http://localhost:5000/api/offers/")
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setOffers(result.data);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(() => {
    fetchOffers();
  }, []);

  return [offers, error];
}
