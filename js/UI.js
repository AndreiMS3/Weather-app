
function safeGet(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`Elemento con id="${id}" no encontrado.`);
  return el;
}

export async function displayWeather(weatherData) {
  const weatherWrapper = safeGet("weather-wrapper");
  const weatherDataSection = safeGet("weather-data");
  const searchInput = safeGet("search");
  if (!weatherWrapper || !weatherDataSection) return;

  // Listener antes de iniciar la transición
  let handled = false;
  function onTransitionEnd(e) {
    // Acepta transform/opacity o el fallback call
    if (handled) return;
    if (e && e.propertyName && !["opacity", "transform"].includes(e.propertyName)) return;
    handled = true;

    // Rellenar contenido
    weatherDataSection.innerHTML = `
      <div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" 
             alt="${weatherData.weather[0].description}" width="100" />
        <div style="flex:1; min-width:200px;">
          <h2>📍 ${weatherData.name}</h2>
          <p>🌡️ <strong>Temperature:</strong> ${Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>🌥️ <strong>Description:</strong> ${weatherData.weather[0].description}</p>
          <p>💧 <strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
          <p>💨 <strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
          <p>⚖️ <strong>Pressure:</strong> ${weatherData.main.pressure} hPa</p>
          <p>🌅 <strong>Sunrise:</strong> ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>🌇 <strong>Sunset:</strong> ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
    `;

    // Mostrar (fade in)
    weatherWrapper.classList.remove("fade");
    weatherDataSection.classList.remove("fade");

    if (searchInput) searchInput.value = "";

    weatherWrapper.removeEventListener("transitionend", onTransitionEnd);
  }

  weatherWrapper.addEventListener("transitionend", onTransitionEnd);

  // Preparar para la transición: mostrar el contenedor y desencadenar la clase .fade
  weatherDataSection.style.display = "block";

  // Forzar reflow para garantizar transición
  void weatherWrapper.offsetWidth;

  // Iniciar fade-out (se llamará transitionend -> onTransitionEnd rellenará contenido y quitará fade)
  weatherWrapper.classList.add("fade");
  weatherDataSection.classList.add("fade");

  // Fallback por si transitionend no se dispara
  setTimeout(() => {
    if (!handled) onTransitionEnd({ propertyName: "opacity" });
  }, 900);

  // Cambiar tema del body inmediatamente (suavemente gracias al transition en CSS)
  setWeatherTheme(weatherData.weather[0].main);
}

export function setWeatherTheme(weatherMain) {
  const body = document.body;
  const classes = ["clear", "clouds", "rain", "thunderstorm", "snow", "mist", "default"];
  body.classList.remove(...classes);

  const w = String(weatherMain || "").toLowerCase();

  if (w.includes("clear")) body.classList.add("clear");
  else if (w.includes("cloud")) body.classList.add("clouds");
  else if (w.includes("rain") || w.includes("drizzle")) body.classList.add("rain");
  else if (w.includes("thunder")) body.classList.add("thunderstorm");
  else if (w.includes("snow")) body.classList.add("snow");
  else if (["mist", "fog", "haze"].some(x => w.includes(x))) body.classList.add("mist");
  else body.classList.add("default");
}

export function showError(message) {
  const weatherDataSection = document.getElementById("weather-data");
  if (!weatherDataSection) {
    console.error("showError: #weather-data no encontrado");
    return;
  }
  weatherDataSection.innerHTML = `
    <div>
      <h2>⚠️ Error</h2>
      <p>${message}</p>
    </div>
  `;
  weatherDataSection.style.display = "block";
  weatherDataSection.classList.remove("fade");
}
