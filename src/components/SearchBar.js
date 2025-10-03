import React from 'react';

const SearchBar = ({ city, setCity, handleSearch, handleLocation }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Enter city name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
    <button onClick={handleSearch}>Search Location</button>
    <button onClick={handleLocation}>📍 Use My Location</button>
  </div>
);

export default SearchBar;