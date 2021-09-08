const form = document.querySelector("#search-weather");
const recentSearches = document.querySelector("#recent-searches");
const weatherLocation = document.querySelector("#weather-location");
const apiKey = "8a1171e41042abbcdc90a6804e77b204";
const history = document.querySelector("#recent-searches");
const searchHistory = JSON.parse(localStorage.getItem("search")) || [];


// one call endpoint
const onecallEndpoint =
  "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&";
// =lat={lat}&lon={lon}&units=imperial&appid={API key}

// geocode endpoint
const geoEndpoint =
  "http://api.openweathermap.org/geo/1.0/direct?&units=imperial&";
// q={city name},{state code},{country code}&limit={limit}&appid={API key}
// current forecast variables
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const currentHumidity = document.querySelector("#current-humidity");
const currentUV = document.querySelector("#current-uv");

function getWeatherbyCityName(city) {
  // request our lat and long from the geo endpoint
  const params = new URLSearchParams({ q: city, appid: apiKey });
  fetch(geoEndpoint + params)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      const cityName = data[0].name;
      const params = new URLSearchParams({
        lat: lat,
        lon: lon,
        appid: apiKey,
      });
      // get weather data from the onecall endpoint using our lat and lon values
      console.log(lat, lon, cityName);
      weatherLocation.textContent = cityName + " " + today;

      return fetch(onecallEndpoint + params);
    })
      .then((response) => response.json())
      .then(function (weatherData) {
        console.log(weatherData)
        const temp = weatherData.current.temp;
        const humidity = weatherData.current.humidity;
        const wind = weatherData.current.wind_speed;
        const uv = weatherData.current.uvi;
        currentTemp.textContent = "Temp: " + temp + "℉";
        currentHumidity.textContent = "Humidity: " + humidity + "%";
        currentWind.textContent = "Wind: " + wind + "MPH";
        currentUV.textContent = "UV: " + uv;

        //display uv data
        if (uv <= 2) {
          document.getElementById("current-uv").style.backgroundColor = "green"
        }
        else if (uv <= 5) {
          document.getElementById("current-uv").style.backgroundColor = "yellow"
        }
        else {
          document.getElementById("current-uv").style.backgroundColor = "darkred";
        }
      })
        
      //function getCurrentWeather (weather)
  
    // .catch(function (error) {
    //   alert("Invalid city");
    // });
}
//city submit button
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Retrieve the city name from the input #city-name
  // and we trim off extra white space
  const city = document.querySelector("input#city-name").value.trim();
  localStorage.setItem("city", city);
  //if city name is empty send a message
  if (city === "") {
    sendAlert();
  //otherwise create a button and append it to recent search history
  } else var button = document.createElement("button");
  button.textContent = city;
  history.appendChild(button);

  function sendAlert() {
    alert("Your city name is invalid");
  }

  // Fetch weather data
  getWeatherbyCityName(city);
  // Populate our weather results
  fetch(onecallEndpoint + params).then(function (response) {
    console.log(response);
    
    //const temp = data.current.temp;
    //currentTemp.innerHTML = "Temp :" + data.current.temp;
  });
  var displayWeather = function (data, city) {
   
  };
});

recentSearches.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.matches("button")) return;
});

// recentSearches.addEventListener("click", function (e) {
//     cont target = e.target;
//     if (!target.matches("button")) return;
//Retrieve the city name name from the button.textContent
//     //Fetch weather data
//     //Populate our weather details

// })

//Getting the date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
