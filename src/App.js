import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import StatsCard from "./components/StatsCard";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

 const fetchWeatherByDate = async (city, date) => {
  setLoading(true);

  try {
    const geo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geo.json();

    if (!geoData.results) {
      alert("City not found");
      setLoading(false);
      return;
    }

    const { latitude, longitude } = geoData.results[0];

    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,pressure_msl_mean&timezone=auto`
    );

    const data = await res.json();

    setWeather({
      city: city,
      date: date,
      maxTemp: data.daily.temperature_2m_max[0],
      minTemp: data.daily.temperature_2m_min[0],
      humidity: data.daily.relative_humidity_2m_mean[0],
      pressure: data.daily.pressure_msl_mean[0],
    });

    setStats(null);
  } catch (error) {
    alert("Error fetching data");
  }

  setLoading(false);
};
  const fetchYearlyStats = async (city, year) => {
    setLoading(true);

    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geo.json();

      if (!geoData.results) {
        alert("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      const res = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${year}-01-01&end_date=${year}-12-31&daily=temperature_2m_max&timezone=auto`
      );

      const data = await res.json();
      const temps = data.daily.temperature_2m_max;

      const max = Math.max(...temps);
      const min = Math.min(...temps);

      const sorted = temps.sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];

      setStats({
        year,
        max,
        min,
        median,
      });

      setWeather(null);
    } catch (error) {
      alert("Error fetching stats");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1> Weather App</h1>

      <SearchBar
        onDateSearch={fetchWeatherByDate}
        onYearSearch={fetchYearlyStats}
      />

      {loading && <Loader />}

      {weather && <WeatherCard data={weather} />}

      {stats && <StatsCard data={stats} />}
    </div>
  );
}

export default App;