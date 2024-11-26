const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search");
const weatherData = document.getElementById("weather-data");
const errorMessage = document.getElementById("error-message");
const loader = document.getElementById("loader");

const cityName = document.getElementById("city");
const countryFlag = document.getElementById("country");
const temperature = document.getElementById("temperature").querySelector("span");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const umidity = document.getElementById("umidity").querySelector("span");
const windSpeed = document.getElementById("wind").querySelector("span");

const API_KEY = "91145a3a7dabe68ba0006a7cf976b908"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city) {
  try {

    loader.classList.remove("hide");
    errorMessage.classList.add("hide");
    weatherData.classList.add("hide");

    const response = await fetch(
      `${API_URL}?q=${city}&units=metric&appid=${API_KEY}&lang=pt`
    );

    if (!response.ok) {
      throw new Error("Cidade não encontrada!");
    }

    const data = await response.json();

    updateWeatherData(data);
  } catch (error) {
    showError(error.message);
  } finally {
    loader.classList.add("hide");
  }
}
function updateWeatherData(data) {
  const { name, sys, main, weather, wind } = data;

  cityName.textContent = name;
  temperature.textContent = Math.round(main.temp);
  description.textContent = weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  umidity.textContent = `${main.humidity}%`;
  windSpeed.textContent = `${Math.round(wind.speed)} km/h`;

  weatherData.classList.remove("hide");
}
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hide");
}
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});
