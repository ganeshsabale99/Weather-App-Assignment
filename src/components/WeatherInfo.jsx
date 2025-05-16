import React from 'react';

const WeatherInfo = ({ data }) => {
    if (!data) return null;

    const weatherIcon = data?.weather?.[0]?.icon || 'Unknown';
    const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

    return (
        <div className="weather-card">
            <h2>Weather in {data?.name}</h2>
            <p>Temperature: {data?.main?.temp}°C</p>
            <p>Feels Like: {data?.main?.feels_like}°C</p>
            <p>Humidity: {data?.main?.humidity}%</p>
            <p>Wind Speed: {data?.wind?.speed} m/s</p>
            <p>
                Description:
                <img src={iconUrl} alt="Weather Icon" />
                {data?.weather?.[0]?.description || 'Unknown'}
            </p>
        </div>
    );
};

export default WeatherInfo;
