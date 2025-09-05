


// Función para buscar el clima
async function fetchWeather(apiKey) {
    const searchInput = document.getElementById("search").value.trim();
    if (!searchInput) {return;}

    // Obtener coordenadas
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`;
    const geoResp = await fetch(geocodeURL);
    if (!geoResp.ok) return null;

    const geoData = await geoResp.json();
    if (geoData.length === 0) {
      return null;
    }

    const { lat, lon } = geoData[0];

    // Obtener datos del clima
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weatherResp = await fetch(weatherURL);
    if (!weatherResp.ok) return null;

    const weatherData = await weatherResp.json();
    return weatherData;
}

// Obtener sugerencias
async function fetchSuggestions(text, apiKey) {
    if (!text) return;
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${apiKey}`;
    const response = await fetch(geocodeURL);
    if (!response.ok) return;
    const cities = await response.json();
    showSuggestions(cities);
}

// Mostrar sugerencias
function showSuggestions(cities) {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = "";
    const ul = document.createElement("ul");
    suggestionsList.appendChild(ul);

    cities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`;
        ul.appendChild(li);

        li.addEventListener("click", () => {
            document.getElementById("search").value = city.name;
            suggestionsList.innerHTML = "";
        });
    });
}

export { fetchWeather, fetchSuggestions };




