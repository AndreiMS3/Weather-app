export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_API_KEY; //from  Vercel
  if (!apiKey) {
  return res.status(500).json({ error: "API key not found in environment variables" });
  }

  try {
    const geoResp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`);
    if (!geoResp.ok) {
        return res.status(geoResp.status).json({ error: "Error al consultar la API de geocodificación" });
    }

    const geoData = await geoResp.json();
    if (geoData.length === 0) {
        return res.status(404).json({ error: "Ciudad no encontrada" });
    }

    const { lat, lon } = geoData[0];

    const weatherResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`);
    if (!weatherResp.ok) {
        return res.status(weatherResp.status).json({ error: "Error al consultar la API del clima" });
    }
    const weatherData = await weatherResp.json();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
   }
}
