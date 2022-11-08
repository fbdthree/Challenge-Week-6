const api = "c90b5488ed6ad2675575883e578f5209";

function getLatLong(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=imperial`)
    .then(data =>{
        return data.json()
    }).then(function(apiResults) { // Arrow function Es6 syntax 
        console.log(apiResults)
        let lat = apiResults.coord.lat
        let lon = apiResults.coord.lon
        var html = 
        `<div class="card" style="width:10rem">
          <div class="card-body">
            <h5 class="card-title">${city}
              <img src="http://openweathermap.org/img/wn/${apiResults.weather[0].icon}@2x.png" class="card-img-top" alt="...">
            </h5>
              <p class="card-text">Temp: ${apiResults.main.temp}</p>
              <p class="card-text">Humidity: ${apiResults.main.humidity}</p>
              <p class="card-text">Windspeed: ${apiResults.wind.speed}</p>
              <p class="card-text">Description: ${apiResults.weather[0].description}</p>
          </div>
        </div>`
      document.getElementById("current-weather").innerHTML = html
      getFiveDayForcast(lat,lon,city)
      
    })
}
var cityList = localStorage.getItem('searchHistory') || [];
function saveSearch(city) {
  console.log(cityList)
  cityList.unshift(city);
  // if cityList length is greater then number .pop()
  localStorage.setItem('searchHistory', cityList);
  console.log(cityList);
}

function getFiveDayForcast(lat, lon, city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}&units=imperial`)
    .then(data =>{
        return data.json()
    }).then(function(apiResults) { // Arrow function Es6 syntax 
        console.log(apiResults)
        let html = ""
        for(let  i=0;i<apiResults.list.length;i=i+8){
            html += `<div class="card" style="width: 10rem;">
        <div class="card-body">
        <h5 class="card-title">${city}
        <img src="http://openweathermap.org/img/wn/${apiResults.list[i].weather[0].icon}@2x.png" class="card-img-top" alt="...">
         
          </h5>
          <p class="card-text">Temp: ${apiResults.list[i].main.temp}</p>
          <p class="card-text">Humidity: ${apiResults.list[i].main.humidity}</p>
          <p class="card-text">Windspeed: ${apiResults.list[i].wind.speed}</p>
          <p class="card-text">Description: ${apiResults.list[i].weather[0].description}</p>
        </div>
      </div>`
        }
        
        
        // var storage = localStorage.getItem("city");
        // console.log("City: " + storage);
        document.getElementById("five-day-forcast").innerHTML = html
    })
    
}


document.getElementById("btn").addEventListener("click",function(event){
    event.preventDefault()
    var city = document.getElementById("city").value
    console.log("btn clicked",city)
    getLatLong(city)
})
console.log("JS loaded")


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
