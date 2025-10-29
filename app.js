var searchBox = document.querySelector("#search-box");
var weatherOutput = document.querySelector("#weather-output");
var title = document.querySelector("#title");
var searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener(
    "click",
    async function () {
        var city_name = searchBox.value;
        var api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=21805bff7224936fa25d6cec016a0a4b&units=metric`;
        weatherOutput.innerHTML = "";
        title.innerHTML = "<h2 class='loading'> Loading... </h2>";

        var response = await fetch(api);
        if (response.status == 404) {
            title.innerHTML = `<h2> City does not exists in our database </h2>`
            return;
        }
        var data = await response.json();

        searchBox.value = "";
        title.innerHTML = `<h2> ${city_name} </h2>`;

        weatherOutput.innerHTML = `
             <div class="weather-status">
                <p class="condition">
                    ${data.weather[0].main}
                    <br>
                     <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                </p>
                <h1>${data.main.temp}°</h1>
                <p class="minmax">Min: ${data.main.temp_min}° | Max: ${data.main.temp_max}°</p>
            </div>

            <div class="weather-details">
                <div class="box">
                    <i class="fas fa-temperature-low"></i>
                    <div>
                        <p>Real Feel</p>
                        <h3>${data.main.feels_like}°</h3>
                    </div>
                </div>

                <div class="box">
                    <i class="fas fa-tint"></i>
                    <div>
                        <p>Humidity</p>
                        <h3>${data.main.humidity}%</h3>
                    </div>
                </div>

                <div class="box">
                    <i class="fas fa-wind"></i>
                    <div>
                        <p>Wind</p>
                        <h3>${data.wind.speed} m/s</h3>
                    </div>
                </div>

                <div class="box">
                    <i class="fas fa-gauge-high"></i>
                    <div>
                        <p>Pressure</p>
                        <h3>${data.main.pressure} hPa</h3>
                    </div>
                </div>
            </div> 
        `

    }
)