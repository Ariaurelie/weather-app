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

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();

let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;

  let forecastElement = document.querySelector('#forecast');

    let forecastHTML = `<div class="row">`;
  let days = ['Fri', 'Sat', 'Sun', 'Mon'];
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
     forecastHTML =
       forecastHTML +
       `
    <div class="col-2">
              ${formatDay(forecastDay.dt)} <br />
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42">
              <br />
              <strong>${Math.round(forecastDay.temp.max)}°</strong> ${Math.round(forecastDay.temp.min)}°
            </div>
            `;}
            
  })
            forecastHTML = forecastHTML + `</div>`;
            forecastElement.innerHTML = forecastHTML;
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

function getForecast(coordinates) {
let apiKey = '76a24252f5d2d956e723e94ad0977c83';
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
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
