import React from "react";

function StatsCard({ data }) {
  return (
    <div className="card">
      <h2>Year: {data.year}</h2>
      <p>Highest Temp: {data.max} °C</p>
      <p>Lowest Temp: {data.min} °C</p>
      <p>Median Temp: {data.median} °C</p>
    </div>
  );
}

export default StatsCard;