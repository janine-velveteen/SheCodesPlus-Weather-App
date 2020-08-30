function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityValue = document.querySelector("#city-value");
  cityValue.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}
function searchCity(city) {
  let apiKey = "7e7e5efa2f72ec4fd3d79d3ec63162cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
searchCity("Toronto");

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

function currentLocation(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  let apiKey = "7e7e5efa2f72ec4fd3d79d3ec63162cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayTemperature(response) {
  let location = response.data.name;
  let locationName = document.querySelector("#city-value");
  locationName.innerHTML = `${location}`;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temp");
  currentTemperature.innerHTML = `${temperature}°`;

  let highTemp = Math.round(response.data.main.temp_max);
  let currentHigh = document.querySelector("#high");
  currentHigh.innerHTML = `${highTemp}°`;

  let lowTemp = Math.round(response.data.main.temp_min);
  let currentLow = document.querySelector("#low");
  currentLow.innerHTML = `${lowTemp}°`;

  let windSpeed = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind-speed");
  currentWind.innerHTML = `${windSpeed}kmh`;

  let humidityPercent = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidityPercent}%`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector(".five-hours");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-2">
              <h3>
              ${formatHours(forecast.dt * 1000)}
              </h3>
              <img
							src ="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
							alt=""
              />
              <div class="hour-temps">
              <strong>
              ${Math.round(forecast.main.temp_max)}°
              </strong>
              ${Math.round(forecast.main.temp_min)}°
              </div>
              </div>
  
  `;
  }
}

let currentDateTime = new Date();
let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDateTime.getDay()];

let hours = currentDateTime.getHours();
let minutes = currentDateTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day} ${hours}:${minutes}`;

function covertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

function covertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", covertToFahrenheit);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", covertToCelsius);
