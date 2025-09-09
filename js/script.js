const suggestionsList = document.getElementById("suggestions");

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
async function fetchSuggestions(city, onSelect) {
    if (!city) return;
    const response = await fetch(`/api/suggestions?city=${encodeURIComponent(city)}`);
    if (!response.ok) return;

    const cities = await response.json();
    showSuggestions(cities, onSelect);
}

// Mostrar sugerencias
function showSuggestions(cities, onSelect) {
    suggestionsList.innerHTML = "";
    const ul = document.createElement("ul");
    suggestionsList.appendChild(ul);

    cities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = `${city.name}, ${city.country}`;
        ul.appendChild(li);
           li.addEventListener("click", () => {
            document.getElementById("search").value = city.name;
            suggestionsList.innerHTML = "";
            if (onSelect) onSelect(city.name);
        });
       
    });
}

export { fetchWeather, fetchSuggestions };




