import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => setError(err.message)
      );
    }
  }, []);

  return { coords, error };
};

export default useCurrentLocation;