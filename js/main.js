import { displayWeather, showError } from "./UI.js";
import { fetchWeather, fetchSuggestions } from "./script.js";

function handleSubmitClick(){
  searchWeather();
  clearSuggestions();
}
function clearSuggestions(){
  const suggestionsList = document.getElementById("suggestions");
  if(suggestionsList) suggestionsList.innerHTML = "";
}

let timeoutId;

async function searchWeather() {
  try {
    // Comprueba que el input tenga algo (evita llamar a fetch si está vacío)
    const searchInput = document.getElementById("search");
    const text = searchInput ? searchInput.value.trim() : "";
    if (!text) {
      showError("Please enter a city name.");
      return;
    }

    const weatherData = await fetchWeather();
    if (!weatherData) {
      showError("Could not fetch weather data. Please try again later.");
      return;
    }

    await displayWeather(weatherData);
    
  } catch (err) {
    console.error(err);
    showError(err.message || "Unexpected error");
  }
}
//Search by click or Enter key
const submitBtn = document.getElementById("submit");
if (submitBtn) submitBtn.addEventListener("click", handleSubmitClick);

const searchEl = document.getElementById("search");
if (searchEl) {
  searchEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitClick();
    }
  });

  searchEl.addEventListener("input", function (event) {
    clearTimeout(timeoutId);
    const text = event.target.value.trim();
    if (!text) {
      document.getElementById("suggestions").innerHTML = "";
      return;
    }
    timeoutId = setTimeout(() => {
      fetchSuggestions(text, handleSubmitClick);
    }, 650);
  });
}


