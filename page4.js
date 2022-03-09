const menu = document.querySelector(".menuToggler");
const drop = document.querySelector(".dropdown");
let menuopen = false;
menu.addEventListener("click", () => {
  console.log("click");
  if (!menuopen) {
    menu.classList.add("open");
    drop.classList.add("open");
    menuopen = true;
  } else {
    menu.classList.remove("open");
    drop.classList.remove("open");
    menuopen = false;
  }
});

const API_KEY = `36c723e0df7396aa47e5641ac1ab99f1`;

const lat = "52.6369";
const lon = "1.1398";

async function loadAPI(lattitude, longitude) {
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${API_KEY}`;
  const response = await fetch(URL);
  return response.json();
}

async function getTemperatureInCelsius() {
  const obj = await loadAPI(lat, lon);
  const desc = obj.weather[0].description;
  const temperature = obj.main.temp - 273.15;
  const tempInCelsius = Math.round(temperature);
  const wind = obj.wind.speed;
  const time = convertToTime(obj.dt);
  const icon = obj.weather.icon;
  console.log(desc, tempInCelsius, wind, time, icon);
}

function convertToTime(totalSeconds) {
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const days = Math.floor(totalSeconds / (3600 * 24));

  const secondsStr = readable(seconds, "second");
  const minutesStr = readable(minutes, "minute");
  const hoursStr = readable(hours, "hour");

  return `${hoursStr} : ${minutesStr} : ${secondsStr}`;
}

function readable(num, singular) {
  if (num > 0) {
    if (num === 1) {
      return `${num} ${singular}`;
    } else {
      return `${num} ${singular}s`;
    }
  } else {
    return "";
  }
}
