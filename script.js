let now = new Date();

let currentDate = document.querySelector('.current-date');

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(city) {
  console.log(city);
  let apiKey = '76a24252f5d2d956e723e94ad0977c83';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector('.city').innerHTML = response.data.name;
  document.querySelector('#temperature-value').innerHTML = `${Math.round(response.data.main.temp)} °C`;
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = response.data.wind.speed;
}

function searchLocation(position) {
  let apiKey = '76a24252f5d2d956e723e94ad0977c83';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector('#search-bar').value;
  searchCity(city);
}

let form = document.querySelector('#searching-form');
form.addEventListener('submit', showCity);

let currentLocationButton = document.querySelector('.location-button');
currentLocationButton.addEventListener('click', getCurrentLocation);

searchCity('London');
