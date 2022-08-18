const apiKey = "85234ef3e426d0b1d7a7547a51851f69";          // api key for requests on the openweathermap.org
const urlWeekWeather = "http://api.openweathermap.org/data/2.5/forecast";
const timestampsNumber = 5;
const urlDailyWeather = "https://api.openweathermap.org/data/2.5/forecast/daily";
const urlBaseGeo = "https://api.openweathermap.org/geo/1.0/direct";

const searchBox = document.querySelector('.search-box');
const searchError = document.querySelector('.search-error');
const cityInput = document.getElementById('city');
const querySubmit = document.getElementById('submit');

const weatherTabsWrap = document.querySelectorAll('.weather__tabs-wrap');
const weatherTabs = document.querySelectorAll('.weather__tab');
const weatherTabsContent = document.querySelectorAll('.weather__tab-content');

const currentDate = document.querySelector('.weather__date');
const currentLocal = document.querySelector('.weather__location');
const currentWeatherImg = document.querySelectorAll('.current__img');
const currentWeatherType = document.querySelectorAll('.current__type');
const currentWeatherTemp = document.querySelectorAll('.current__temp');
const currentWeatherPres = document.querySelectorAll('.current__pres');
const currentWeatherHum = document.querySelectorAll('.current__hum');
const currentWeatherWind = document.querySelectorAll('.current__wind');

const periodlyWeatherTime = document.querySelectorAll('.periodly__time');
const periodlyWeatherTemp = document.querySelectorAll('.periodly__temp-current');
const periodlyWeatherTempFeel = document.querySelectorAll('.periodly__temp-feel');
const periodlyWeatherPres = document.querySelectorAll('.periodly__pres');
const periodlyWeatherWind = document.querySelectorAll('.periodly__wind');

const dailyWeatherDay = document.querySelectorAll('.daily__day');
const dailyWeatherImg = document.querySelectorAll('.daily__img');
const dailyWeatherTemp = document.querySelectorAll('.daily__temp');

const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];
const weekDays = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
];

// document.addEventListener("DOMContentLoaded", function() {
// })

function dateBuilder(day) {
   let today = new Date();
   let anotherDay = new Date(today);
   anotherDay.setDate(anotherDay.getDate() + day);      //setting date for changing all the data automatically

   let currentWeekDay = weekDays[anotherDay.getDay()];  // getting the number of day and this weekDay
   let currentDate = anotherDay.getDate();              // getting date
   let currentMonth = months[anotherDay.getMonth()];    // getting month
   let currentYear = anotherDay.getFullYear();          // getting year

   if (anotherDay.getMonth() == 11 || anotherDay.getMonth() == 0 || anotherDay.getMonth() == 1) {
      document.body.style.backgroundImage = 'url(../img/bg-winter.jpg)';
      document.querySelector('.main').style.backgroundColor = 'rgba(126, 139, 255, 0.7)';
   } else if (anotherDay.getMonth() > 1 && anotherDay.getMonth() < 5) {
      document.body.style.backgroundImage = 'url(../img/bg-spring.jpg)';
      document.querySelector('.main').style.backgroundColor = 'rgba(137, 46, 194, 0.7)';
   } else if (anotherDay.getMonth() > 4 && anotherDay.getMonth() < 8) {
      document.body.style.backgroundImage = 'url(../img/bg-summer.jpg)';
      document.querySelector('.main').style.backgroundColor = 'rgba(96, 187, 57, 0.7)';
   } else if (anotherDay.getMonth() > 7 && anotherDay.getMonth() < 11) {
      document.body.style.backgroundImage = 'url(../img/bg-autumn.jpg)';
      document.querySelector('.main').style.backgroundColor = 'rgba(253, 176, 176, 0.7)';
   }
   return `${currentWeekDay}, ${currentDate} ${currentMonth} ${currentYear}`;
}  // function builds the correct date for each day

function weatherBuilder(cityWeather) {
   currentLocal.textContent = `${cityWeather.week.city.name}, ${cityWeather.week.city.country}`;    // writing location into HTML
   let periodlyWeatherList = Array.from(cityWeather.week.list);                                     // creating the array containing the list of 40 timestamps 
   let arrItem = 0;     // do-while counter for weather list
   let htmlItem = 0;    // do-while counter for html list of elements

   // filling the data into HTML from periodlyWeatherList
   do {
      currentWeatherType[htmlItem].textContent = `${periodlyWeatherList[arrItem].weather['0'].main}`;
      currentWeatherTemp[htmlItem].textContent = `${Math.floor(periodlyWeatherList[arrItem].main.temp)}°C`;    // rounding temperature 
      currentWeatherPres[htmlItem].textContent = `${periodlyWeatherList[arrItem].main.pressure} hpa`;
      currentWeatherHum[htmlItem].textContent = `${periodlyWeatherList[arrItem].main.humidity} %`;
      currentWeatherWind[htmlItem].textContent = `${periodlyWeatherList[arrItem].wind.speed.toFixed(1)} m/s`;  // rounding wind to 0.1

      if (currentWeatherType[htmlItem].textContent === 'Clouds') {
         currentWeatherImg[htmlItem].src = '../img/cloudy-day.png';       // if weather is cloudy - image turns to clouds
         currentWeatherImg[htmlItem].alt = 'Clouds';
         dailyWeatherImg[htmlItem].src = '../img/cloudy-day.png';
         dailyWeatherImg[htmlItem].alt = 'Clouds';
      } else if (currentWeatherType[htmlItem].textContent === 'Rain') {
         currentWeatherImg[htmlItem].src = '../img/rainy-day.png';        // if weather is rainy - image turns to rain
         currentWeatherImg[htmlItem].alt = 'Rain';
         dailyWeatherImg[htmlItem].src = '../img/rainy-day.png';
         dailyWeatherImg[htmlItem].alt = 'Rain';
      } else if (currentWeatherType[htmlItem].textContent === 'Clear') {
         currentWeatherImg[htmlItem].src = '../img/sunny-day.png';        // if weather is clear - image turns to sunny
         currentWeatherImg[htmlItem].alt = 'Clear';
         dailyWeatherImg[htmlItem].src = '../img/sunny-day.png';
         dailyWeatherImg[htmlItem].alt = 'Clear';
      };

      dailyWeatherDay[htmlItem].textContent = dateBuilder(htmlItem).slice(0, 3);
      dailyWeatherTemp[htmlItem].textContent = `${Math.floor(periodlyWeatherList[arrItem].main.temp)}°C`;


      arrItem += 8;
      htmlItem++;
   } while (arrItem < periodlyWeatherList.length);

   currentDate.textContent = dateBuilder(0); // setting current date with bgi and color

   // filling the data into HTML from periodlyWeatherList
   for (let i = 0; i < periodlyWeatherList.length; i++) {
      periodlyWeatherTime[i].textContent = `${periodlyWeatherList[i].dt_txt.slice(11, 16)}`;                // slicing an extra info and getting only time 00:00
      periodlyWeatherTemp[i].textContent = `${Math.round(periodlyWeatherList[i].main.temp)}`;               // rounding temperature 
      periodlyWeatherTempFeel[i].textContent = `${Math.round(periodlyWeatherList[i].main.feels_like)}`;     // rounding temperature 
      periodlyWeatherPres[i].textContent = `${periodlyWeatherList[i].main.pressure}`;
      periodlyWeatherWind[i].textContent = `${periodlyWeatherList[i].wind.speed.toFixed(1)}`;               // rounding wind to 0.1
   }
}  // function filling info into HTML

function animateWeather() {
   searchBox.classList.remove('__active');
   document.querySelector('.main').classList.remove('__active');
   document.querySelector('.body').classList.remove('__active');
   document.querySelector('.weather').style.opacity = '1';

}  // changing colors and bgi with transition

function resetByQuery() {

   for (let i = 0; i < weatherTabs.length; i++) {
      weatherTabs[i].classList.remove("__active");
      weatherTabsContent[i].classList.remove("__active");
   }

   weatherTabs[0].classList.add("__active");
   weatherTabsContent[0].classList.add("__active");
}  // reseting the chosen day

async function getWeather() {
   let responseWeatherObj = new Object();    // making an object for returning info
   let city = cityInput.value;               // getting user's typed city
   const responseGeo = await fetch(
      `${urlBaseGeo}?q=${city}&APPID=${apiKey}`
   );                                                 // making a request for getting user's city location by cityInput.value
   const cityGeo = await responseGeo.json();          // response to json format
   if (cityGeo.length == 0) {
      searchError.style.display = 'block';
      searchError.classList.add('__invalid')
      searchError.textContent = `*City was not found`;
   }

   const responseWeekWeather = await fetch(
      `${urlWeekWeather}?lat=${cityGeo['0'].lat}&lon=${cityGeo['0'].lon}&units=metric&APPID=${apiKey}`
   );                                                             // making a request for getting weather by location
   const cityWeekWeather = await responseWeekWeather.json();      // response to json format
   responseWeatherObj.week = cityWeekWeather;                     // assigning the weather info into object key
   weatherBuilder(responseWeatherObj);                            // calling function and give it object with weather
}  // function getting weather info from openweathermap

function validate() {
   if (cityInput.value !== '') {
      searchError.style.display = 'none';
      getWeather();
      resetByQuery();
      animateWeather();
   } else {
      searchError.textContent = `*Field can't be blank`;
      searchError.style.display = 'block';
   }
}  // checking whether the input is empty

cityInput.addEventListener('keyup', (event) => {
   if (event.key == 'Enter') {
      validate();
   }
});  // starts if "Enter" is pressed

querySubmit.addEventListener('click', () => {
   validate();
});  // starts by click on button

for (let i = 0; i < weatherTabs.length; i++) {
   weatherTabs[i].addEventListener("click", function (e) {
      e.preventDefault();
      let activeTabAttr = this.getAttribute("data-tab");  // using "this." because it is needed to click on the "<a>" tag with dataAttr which is parent element

      for (let j = 0; j < weatherTabs.length; j++) {  // finding the tab-content with correct dataAttr
         let contentAttr = weatherTabsContent[j].getAttribute("data-tab-content");

         if (activeTabAttr === contentAttr) {
            weatherTabs[j].classList.add("__active");
            weatherTabsContent[j].classList.add("__active");
            currentDate.textContent = dateBuilder(j);
         } else {
            weatherTabs[j].classList.remove("__active");
            weatherTabsContent[j].classList.remove("__active");
         }
      };
   });
};  // function for switching tabs

