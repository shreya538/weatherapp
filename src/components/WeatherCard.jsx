import React from "react";

function WeatherCard({ data }) {
  return (
    <div className="card">
      <h2>{data.city}</h2>

      <p>
        Date: {new Date(data.date).toLocaleDateString("en-GB")}
      </p>

      <p>Max Temp: {data.maxTemp} °C</p>
      <p>Min Temp: {data.minTemp} °C</p>

      <p>Humidity: {data.humidity} %</p>
      <p>Pressure: {data.pressure} hPa</p>
    </div>
  );
}

export default WeatherCard;