import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    try {
      const res = await fetch(`/api/weather?location=${location}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error fetching weather");
        return;
      }

      setWeatherData(data.current);
      setForecastData(data.forecast);
    } catch (err) {
      setError("An error occurred while fetching the weather data.");
    }
  };

  return (
    <div className="min-h-screen bg-[#00072D] p-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">🌦️ Weather App</h1>
      <div className="flex justify-center mb-10">
        <input
          type="text"
          className="bg-white text-black px-4 py-2 rounded w-64"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter zip code or city"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 ml-4 rounded"
          onClick={fetchWeather}
        >
          Get Weather
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {weatherData && (
        <div className="text-center">
          <h2 className="text-xl">📍 {weatherData.name}, {weatherData.sys.country}</h2>
          <h3 className="text-3xl">{Math.round(weatherData.main.temp)}°C — {weatherData.weather[0].description}</h3>
          <p>🌡️ Humidity: {weatherData.main.humidity}%</p>
          <p>💨 Wind: {weatherData.wind.speed} m/s</p>

          <h3 className="mt-8 text-xl">5-Day Forecast:</h3>
          <div className="mt-4 space-y-4">
            {forecastData.map((item, index) => (
              <div key={index} className="bg-[#1e2a47] p-4 rounded text-left">
                <p className="font-semibold">
                  {new Date(item.dt * 1000).toLocaleDateString(undefined, {
                    weekday: 'long', month: 'short', day: 'numeric'
                  })}
                </p>
                <p>{Math.round(item.main.temp)}°C — {item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
