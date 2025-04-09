// pages/api/weather.ts
export default async function handler(req, res) {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ message: "Location is required." });
  }

  const apiKey = "c7faf9531b3cf51e7ccf87cdc466d501";

  try {
    // Current weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();

    if (!currentRes.ok) {
      return res.status(currentRes.status).json({ message: currentData.message });
    }

    // 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    if (!forecastRes.ok) {
      return res.status(forecastRes.status).json({ message: forecastData.message });
    }

    // Filter 1 forecast per day (e.g. at noon)
    const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

    return res.status(200).json({
      current: currentData,
      forecast: dailyForecasts,
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
    return res.status(500).json({ message: "Error fetching weather data." });
  }
}
