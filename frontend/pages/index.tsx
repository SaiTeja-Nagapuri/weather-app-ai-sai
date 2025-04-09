// pages/index.tsx

import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleGetWeather = async () => {
    setWeatherData(null); // Clear previous data
    setError("");

    if (!location) {
      setError("Please enter a location");
      return;
    }

    try {
      const res = await fetch(`/api/weather?location=${location}`);
      const data = await res.json();

      if (res.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || "Location not found.");
      }
    } catch (err) {
      setError("Error fetching weather data.");
    }
  };

  return (
    <div className="bg-[#00072D] min-h-screen flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl mb-6">🌦️ Weather App</h1>
      
      {/* Input field for location */}
      <input
        type="text"
        placeholder="Enter ZIP code or city name"
        className="mb-4 p-2 text-white bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      
      {/* Button for getting weather */}
      <button
        onClick={handleGetWeather}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Get Weather
      </button>

      {/* Error message */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* Weather information display */}
      {weatherData && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">📍 {weatherData.name}, {weatherData.sys.country}</h2>
          <h3 className="text-3xl">{Math.round(weatherData.main.temp)}°C — {weatherData.weather[0].description}</h3>
          <div className="mt-4">
            <p>🌡️ Humidity: {weatherData.main.humidity}%</p>
            <p>💨 Wind: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
