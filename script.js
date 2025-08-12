document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");


  getWeatherBtn.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    if (!city) return;
    // server may throw some error
    // server/database is always in some other continent takes time
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    const response = await fetch(url);

    if (!response.ok) showError();

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);

    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;

    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
