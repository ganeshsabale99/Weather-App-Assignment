import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';
import Loading from './Loading';
import Error from './Error';
import Favourites from './Favourites';
import useFetchWeather from '../hooks/useFetchWeather';

const WeatherApp = () => {
  const [cityOrCoords, setCityOrCoords] = useState('');
  const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem('favourites')) || []);
  const { data, isLoading, error } = useFetchWeather(cityOrCoords);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const handleCityChange = (newCity) => {
    setCityOrCoords(newCity);
  };

  const handleAddFavourite = () => {
    if (typeof cityOrCoords === 'string' && !favourites.includes(cityOrCoords)) {
      setFavourites([...favourites, cityOrCoords]);
    }
  };

  const handleDeleteFavourite = (favCity) => {
    setFavourites(favourites.filter((city) => city !== favCity));
  };

  const handleSelectFavourite = (favCity) => {
    setCityOrCoords(favCity);
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCityOrCoords({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  return (
    <div>
      <h1>Weather App</h1>
      <button onClick={handleUseCurrentLocation}>Use My Location</button>
      <SearchBar onCityChange={handleCityChange} />
      <button onClick={handleAddFavourite}>Add to Favourites</button>
      <Favourites favourites={favourites} onSelect={handleSelectFavourite} onDelete={handleDeleteFavourite} />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
      {data && <WeatherInfo data={data} />}
    </div>
  );
};

export default WeatherApp;
