import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastCard from './components/ForecastCard';
import Favorites from './components/Favorites';
import Suggestions from './components/Suggestions';
import cityList from './components/cityList';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeather = async (query) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
      setCity(query);
      localStorage.setItem('lastCity', query); // ✅ Save to localStorage
      fetchForecast(data.coord.lat, data.coord.lon);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    setForecast(daily.slice(0, 5));
  };

  const handleSearch = () => {
    if (city.trim()) fetchWeather(city);
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchForecast(latitude, longitude);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
      setCity(data.name);
      localStorage.setItem('lastCity', data.name); // ✅ Save location-based city
    });
  };

  const addToFavorites = () => {
    if (city && !favorites.includes(city)) {
      const updated = [...favorites, city];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated)); // ✅ Save favorites
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    fetchWeather(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      fetchWeather(savedCity); // ✅ Load last searched city
    }

    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) {
      setFavorites(savedFavorites); // ✅ Load favorites
    }
  }, []);

  useEffect(() => {
    if (city.length > 2) {
      const matches = cityList.filter(c =>
        c.toLowerCase().includes(city.toLowerCase())
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  return (
    <div className="App">
      <h1>🌤️ Weather App</h1>
      <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        handleLocation={handleLocation}
      />
      <Suggestions
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
      />
      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {weather && (
        <WeatherDisplay
          weather={weather}
          city={city}
          addToFavorites={addToFavorites}
        />
      )}
      {forecast.length > 0 && (
        <div className="forecast">
          <h3>5 Day Forecast</h3>
          <div className="forecast-grid">
            {forecast.map((day, i) => (
              <ForecastCard key={i} day={day} />
            ))}
          </div>
        </div>
      )}
      {favorites.length > 0 && (
        <Favorites favorites={favorites} fetchWeather={fetchWeather} />
      )}
    </div>
  );
}

export default App;