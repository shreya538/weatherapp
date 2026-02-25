import React, { useState } from "react";

function SearchBar({ onDateSearch, onYearSearch }) {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Enter City"
        onChange={(e) => setCity(e.target.value)}
      />

      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <button onClick={() => onDateSearch(city, date)}>
        Search by Date
      </button>

      <input
        type="number"
        placeholder="Enter Year"
        onChange={(e) => setYear(e.target.value)}
      />

      <button onClick={() => onYearSearch(city, year)}>
        Get Yearly Stats
      </button>

    </div>
  );
}

export default SearchBar;