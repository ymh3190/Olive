const weather = document.querySelector(".screen-header__column:last-child"),
  weatherStatus = weather.querySelector(".js-weather__status"),
  weatherLocation = weather.querySelector(".js-weather__location");

const API_KEY = "004a6dd3cb6cd21189299f3a3e86d45e";
const COORDS_LS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      weatherStatus.innerText = `${json.weather[0].description} : ${json.main.temp}℃`;
      weatherLocation.innerText = `${json.name}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function coordsSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function coordsError() {
  console.log("coords error");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(coordsSuccess, coordsError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (loadedCoords) {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  } else {
    askForCoords();
  }
}

function init() {
  loadCoords();
}

init();
