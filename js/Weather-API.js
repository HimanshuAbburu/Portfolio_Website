const API_KEY = `36c723e0df7396aa47e5641ac1ab99f1`;

let cityname = "";

const timer = document.querySelector(".time");
const iconImg = document.querySelector(".iconimg");
const temp = document.querySelector(".temp");
const descript = document.querySelector(".description");
const windSpeed = document.querySelector(".wind");
let citynameInput = document.querySelector("input");
const findButton = document.getElementById('finder');

async function loadAPI(cityname) {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`;
  const response = await fetch(URL);
  return response.json();
}

async function getData(cityname) {
  const obj = await loadAPI(cityname);
  const desc = obj.weather[0].description;
  const temperature = obj.main.temp - 273.15;
  const tempInCelsius = Math.round(temperature);
  const wind = obj.wind.speed;
  const time = convertToTime(obj.dt);
  const icon = obj.weather[0].icon;

  addWeatherCard(time, cityname, `http://openweathermap.org/img/wn/${icon}.png`, `${tempInCelsius}\xB0C`, desc, Math.round(wind * 3.6));
}

function convertToTime(totalSeconds) {
  const seconds = Math.floor(totalSeconds % 60);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const days = Math.floor(totalSeconds / (3600 * 24));

  minutes = Number(minutes) < 10 ? `0${minutes}` : `${minutes}`;

  return `${hours} : ${minutes}`;
}

async function addWeatherCard(time, city, src, temp, desc, wind) {
  const cards = document.getElementsByClassName("weatherlist");

  const { dateTom, tomTemp, dateTomPlus1, tomPlus1Temp } = await forTommorrow(city);

  const card = document.createElement("div");
  card.className = "weather";
  card.innerHTML = ` 
  <p class="time">${time}</p>
  <p class="city">${city}</p>
  <img class="iconimg" src="${src}" alt="icon" />
  <p class="temp">${temp}</p>
  <p class="description">${desc}</p>
  <p class="wind">${wind} Km/h</p>
  <div class="next">
    <div class="nexttable">
      <h6>${dateTom}</h6>
      <p>${tomTemp}\xB0C</p>
    </div>
    <div class="nexttable">
      <h6>${dateTomPlus1}</h6>
      <p>${tomPlus1Temp}\xB0C</p>
    </div>
  </div>`;
  cards[0].appendChild(card);
}

findButton.addEventListener("click", () => {
  cityname = citynameInput.value;
  getData(cityname);
});

async function getForTommorrow(cityname) {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${API_KEY}`;
  const response = await fetch(URL);
  return response.json();
}

async function forTommorrow(cityname) {
  const res = await getForTommorrow(cityname);

  let dttxtTom = res.list[1].dt_txt;
  let dttxtTomPlus1 = res.list[2].dt_txt;

  let dateTom = dttxtTom.split(" ")[1].substring(dttxtTom.split(" ")[1].indexOf("-") + 1, dttxtTom.split(" ")[1].length - 3);
  let dateTomPlus1 = dttxtTomPlus1.split(" ")[1].substring(dttxtTomPlus1.split(" ")[1].indexOf("-") + 1, dttxtTom.split(" ")[1].length - 3);

  let tomTemp = Math.ceil(Number(res.list[0].main.temp) - 273.15);
  let tomPlus1Temp = Math.ceil(res.list[1].main.temp - 273.15);

  return { dateTom, tomTemp, dateTomPlus1, tomPlus1Temp };
}