import { useState, useEffect } from 'react';

const useFetchWeather = (cityOrCoords) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityOrCoords) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        let url = '';
        const apiKey = '7e86d9bc9d137bd3350bdf1ca2780307';

        if (typeof cityOrCoords === 'string') {
          // Search by city name
          url = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrCoords}&appid=${apiKey}&units=metric`;
        } else if (typeof cityOrCoords === 'object') {
          // Search by lat/lon
          const { lat, lon } = cityOrCoords;
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const weatherData = await response.json();
        setData(weatherData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [cityOrCoords]);

  return { data, isLoading, error };
};

export default useFetchWeather;
