import React from 'react';

const Favorites = ({ favorites, fetchWeather }) => (
  <div className="favorites">
    <h3>Favorite Cities</h3>
    <ul>
      {favorites.map((fav, i) => (
        <li key={i}>
          <button onClick={() => fetchWeather(fav)}>{fav}</button>
        </li>
      ))}
    </ul>
  </div>
);

export default Favorites;