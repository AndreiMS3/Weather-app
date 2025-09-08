export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;
  
    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

  try {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&limit=5`
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al consultar la API del clima" });
    }
    const suggestionsData = await response.json();
    res.status(200).json(suggestionsData);
  }catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
   }
}   