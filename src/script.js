function formatDate() {
  let now = new Date();

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

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
  document.querySelector('#temperature').innerHTML = `${Math.round(response.data.main.temp)}`;
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = response.data.wind.speed;
  document.querySelector('.description').innerHTML = response.data.weather[0].description;
  document.querySelector('.current-date').innerHTML = formatDate();
  document.querySelector('#icon').setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celciusTemperature = response.data.main.temp;
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

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector('#temperature');
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector('#temperature');
  temperature.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector('#fahrenheit');
fahrenheitLink.addEventListener('click', showFahrenheitTemperature);

let celciusLink = document.querySelector('#celcius');
celciusLink.addEventListener('click', showCelciusTemperature);

let form = document.querySelector('#searching-form');
form.addEventListener('submit', showCity);

let currentLocationButton = document.querySelector('.location-button');
currentLocationButton.addEventListener('click', getCurrentLocation);

searchCity('London');
