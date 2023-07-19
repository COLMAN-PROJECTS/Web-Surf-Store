function displayLoadingMessage() {
  let weatherDiv = $('#weather-div');
  weatherDiv.html('Loading Weather...');
  getLocation(weatherDiv);
}

async function displayWeatherData(latitude, longitude, weatherDiv) {
  const apiKey = 'd639e889ca39c6005b3a6cb8833ff9a3';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    weatherDiv.html('Loading Weather...');
  $.ajax({
      url: apiUrl,
      dataType: 'json',
    success: function (data) {
      let temperature = (data.main.temp / 10).toFixed(1);
      let description = data.weather[0].description;
      let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      let windSpeed = data.wind.speed;
      let windDirection = data.wind.deg;
      weatherDiv.html(`Temperature: ${temperature}°C<br>Description: ${description}<br>Sunset Time: ${sunsetTime}<br>Wind Speed: ${windSpeed} m/s<br>Wind Direction: ${windDirection}°`);
    },
    error: function () {
      console.log('Failed to fetch weather data.');
      weatherDiv.html('Failed to fetch weather data.(2)');
    }
  });
}

function getLocation(weatherDiv) {
  $.ajax({
    url: 'http://localhost:3000/beachInfo',
    type: 'GET',
    application: 'json',
    dataType: 'json',
    success: function (data) {
      data.forEach(function (element) {
        let spotName = element.spot;
        let videoUrl = element.video;
        let beachDescription = element.description;
        let htmlCode = `
    <div class="row">
      <div class="col">
        <section>
          <div class="container-fluid card-beach" style="height: 300px; margin-top: 20px; width: 1050px;">
            <div class="photo-card" style="height: 300px; margin-left: 2px; margin-right: 2px; width: 1000px;">
              <div class="photo-background" style=" width: 424px;">
                <div>
                  <iframe class="iframe-card" width="400" height="300" src=${videoUrl} frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
              <div class="photo-details">
                <h1>${spotName}</h1>
                <p>${beachDescription} </p>
                <div class="weather-div" style="color: white"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

        $('#beach-container').append(htmlCode);
        let weatherDiv = $('.weather-div').last();
        displayWeatherData(element.lat, element.long, weatherDiv);
      });
    },
    error: function () {
      console.log('Failed to fetch location data from the database.');
    }
  })
}

displayLoadingMessage();
