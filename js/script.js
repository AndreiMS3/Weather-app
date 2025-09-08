


// Función para buscar el clima
async function fetchWeather() {
    const searchInput = document.getElementById("search").value.trim();
    if (!searchInput) {return;}

    const weatherResp = await fetch(`/api/weather?city=${encodeURIComponent(searchInput)}`);
    if (!weatherResp.ok) {
       return null;
    } 
    return await weatherResp.json(); //weatherData.
    
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




