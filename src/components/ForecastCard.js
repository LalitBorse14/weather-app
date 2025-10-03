import React from 'react';

const ForecastCard = ({ day }) => (
  <div className="forecast-card">
    <p>{day.dt_txt.split(' ')[0]}</p>
    <p>{day.weather[0].main}</p>
    <p>{day.main.temp}°C</p>
    <p>Humidity: {day.main.humidity}%</p>
  </div>
);

export default ForecastCard;