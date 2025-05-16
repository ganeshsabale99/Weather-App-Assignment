import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';
import Loading from './Loading';
import Error from './Error';
import useFetchWeather from './useFetchWeather';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleCityChange = (newCity) => {
        setCity(newCity);
    };  

    const { data, isLoading, error } = useFetchWeather(city);

    useEffect(() => {
        if (data) {
            setWeatherData(data);
        }
    }, [data]);



    return (
        <div>
            <h1>Weather App</h1>
            <SearchBar onCityChange={handleCityChange} />
            {isLoading && <Loading />}
            {error && <Error message={error} />}
            {weatherData && <WeatherInfo data={weatherData} />}
        </div>      
    )
}

export default WeatherApp