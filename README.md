🌦️ Weather App · JS / HTML / CSS

A simple weather app built as a learning project using the OpenWeather API.
Features city search with autocomplete, dynamic themes based on weather, and smooth transitions.

🚀 Features

🔎 City autocomplete with delay (debounce) to avoid spamming the API.

🌡️ Weather details: temperature, description, humidity, wind, pressure, sunrise & sunset.

🎨 Dynamic themes: background gradients change depending on the weather (Clear, Rain, Snow, etc.).

✨ Smooth transitions: fade-out/in when switching between cities.

⌨️ Keyboard support: press Enter to search.

📱 Responsive design: flexbox.


🌍 Live Demo

👉 [View on Vercel](https://weather-app-five-xi-26.vercel.app/)



🛠️ What I learned


⚡ Asynchronous functions with async/await.

🌍 Using API endpoints (geocoding & weather).

📦 Parsing and using JSON data from a provider.

⏱️ Debounce with setTimeout and clearTimeout.

🎬 Coordinating CSS transitions with JS (transitionend).

🧩 Code modularization with ES Modules (UI.js, script.js, main.js).

🛡️ Error handling and input validation.

🔑 First used .gitignore to hide API keys locally, then switched to Vercel environment variables.

🚀 Deploying a project with **Vercel** (live hosting, environment setup, easy sharing). 




 🔮 Future Improvements
 
- Compare weather between two cities.  
- Add **Air Quality (Air Pollution API)** and **feels like / visibility** data.  
- Save last searched city in `localStorage`.  
- Add a loading spinner during API calls.  
- Rebuild with **React + Tailwind** for reusable components and state management.  

