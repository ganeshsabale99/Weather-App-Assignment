import React, { useState, useEffect } from 'react';

const useFetchWeather = (city) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e86d9bc9d137bd3350bdf1ca2780307&units=metric`);
                const weatherData = await response.json();
                setData(weatherData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    return { data, isLoading, error };
};

export default useFetchWeather;