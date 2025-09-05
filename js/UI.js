
async function displayWeather(weatherData) {
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block"; 
    weatherDataSection.classList.add("fade");

    weatherWrapper.classList.add("fade");
    
    weatherWrapper.addEventListener("transitionend", function handler() {
        weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" 
         alt="${weatherData.weather[0].description}" width="100" />
    <div>
      <h2> 📍 ${weatherData.name}</h2>
      <p>🌡️ <strong> Temperature:</strong>  ${Math.round(weatherData.main.temp - 273.15)}°C</p>
      <p>🌥️ <strong> Description:</strong>  ${weatherData.weather[0].description}</p>
      <p>💧 <strong>Humidity:</strong>  ${weatherData.main.humidity}%</p>
      <p>💨 <strong>Wind Speed:</strong>  ${weatherData.wind.speed} m/s</p>
      <p>⚖️ <strong>Pressure:</strong>  [${weatherData.main.pressure} hPa]</p>
      <p>🌅 <strong>Sunrise:</strong>  ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>🌇 <strong>Sunset:</strong>  ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>
    `;
    weatherWrapper.classList.remove("fade");

    document.getElementById("search").value = "";
    weatherWrapper.removeEventListener("transitionend", handler); 
   });
}

function setWeatherTheme (weatherData){ 
   const body = document.body;
   body.className = ""; // Reset previous classes

    if (weatherData.includes("Clear")) {    
        body.classList.add("clear");
    } else if (weatherData.includes("Clouds")) {
        body.classList.add("clouds");
    } else if (weatherData.includes("Rain") || weatherData.includes("Drizzle")) {
        body.classList.add("rain");
    } else if (weatherData.includes("Thunderstorm")) {
        body.classList.add("thunderstorm");
    } else if (weatherData.includes("Snow")) {
        body.classList.add("snow");
    } else if (weatherData.includes("Mist") || weatherData.includes("Fog") || weatherData.includes("Haze")) {
        body.classList.add("mist");
    } else {
        body.classList.add("default");
    }
}

async function showError(message) {
    weatherDataSection.innerHTML = `
        <div>
            <h2>⚠️ Error</h2>
            <p>${message}</p>
        </div>`;
    weatherDataSection.style.display = "block";
}
export { displayWeather, setWeatherTheme, showError };
