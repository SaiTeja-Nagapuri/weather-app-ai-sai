// pages/api/weather.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { location } = req.query;

  if (!location || typeof location !== 'string') {
    return res.status(400).json({ message: 'Location is required.' });
  }

  try {
    const apiKey = 'c7faf9531b3cf51e7ccf87cdc466d501';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(data.cod || 404).json({
        message: data.message || 'Location not found.',
      });
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ message: 'Error fetching weather data.' });
  }
}
