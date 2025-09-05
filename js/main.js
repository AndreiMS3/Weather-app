import { displayWeather, showError, setWeatherTheme } from "./UI.js";
import { fetchWeather, fetchSuggestions } from "./script.js";
import { apiKey } from "./config.js";  

let timeoutId;

// Función principal de búsqueda
async function searchWeather() {
    weatherDataSection.classList.add("fade-out");
    try {
        const weatherData = await fetchWeather(apiKey);
        if (!weatherData) {
            showError("Could not fetch weather data. Please try again later.");
            return;
        }
       
        displayWeather(weatherData);
        setWeatherTheme(weatherData.weather[0].main); 
    } catch (err) {
        showError(err.message);
    }
}

// Click en el botón de búsqueda
document.getElementById("submit").addEventListener("click", searchWeather);

// Enter en input
document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchWeather();
    }
});

// Input con delay/autocomplete
document.getElementById("search").addEventListener("input", function(event) {
    clearTimeout(timeoutId);
    const text = event.target.value.trim();
    if (!text) return; // Evita búsquedas vacías
    timeoutId = setTimeout(() => {
        fetchSuggestions(text, apiKey);
    }, 750);
});



