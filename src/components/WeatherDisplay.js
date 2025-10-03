import React from 'react';

const WeatherDisplay = ({ weather, city, addToFavorites }) => (
  <div className="weather-display">
    <h2>{weather.name}</h2>
    <p>Temperature: {weather.main.temp}°C</p>
    <p>Condition: {weather.weather[0].main}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Last searched: {city}</p>
    <button onClick={addToFavorites}>Add to Favorites</button>
  </div>
);

export default WeatherDisplay;