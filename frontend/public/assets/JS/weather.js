function displayLoadingMessage() {
  let weatherDiv = $('#weather-div');
  weatherDiv.html('Loading Weather...');
  getLocation(weatherDiv);
  // alert('Loading Weather...');
}

async function displayWeatherData(latitude, longitude, weatherDiv) {
  // first version:
  const apiKey = 'd639e889ca39c6005b3a6cb8833ff9a3';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  $.ajax({
      url: apiUrl,
      dataType: 'json',
    success: function (data) {
      alert(1)
      const temperature = (data.main.temp / 10).toFixed(1);
      const description = data.weather[0].description;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;
      alert(windSpeed)
      weatherDiv.html(`Temperature: ${temperature}°C<br>Description: ${description}<br>Sunset Time: ${sunsetTime}<br>Wind Speed: ${windSpeed} m/s<br>Wind Direction: ${windDirection}°`);
    },
    error: function () {
      console.log('Failed to fetch weather data.');
      weatherDiv.html('Failed to fetch weather data.(2)');
    }
  });

  //second version:
  // const apiKey = 'd639e889ca39c6005b3a6cb8833ff9a3';
  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  //
  // $.getJSON(apiUrl)
  //     .done(function(data) {
  //       const temperature = (data.main.temp / 10).toFixed(1);
  //       const description = data.weather[0].description;
  //       const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  //       const windSpeed = data.wind.speed;
  //       const windDirection = data.wind.deg;
  //       weatherDiv.html(`Temperature: ${temperature}°C<br>Description: ${description}<br>Sunset Time: ${sunsetTime}<br>Wind Speed: ${windSpeed} m/s<br>Wind Direction: ${windDirection}°`);
  //     })
  //     .fail(function() {
  //       console.log('Failed to fetch weather data.');
  //       weatherDiv.html('Failed to fetch weather data.(2)');
  //     });

}

function getLocation(weatherDiv) {

  $.ajax({
    url: '/frontend/DB/BeachInfo.json',
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
          <div class="container-fluid" style="height: 230px; margin-top: 20px; width: 1050px;">
            <div class="photo-card" style="height: 240px; margin-left: 2px; margin-right: 2px; width: 1000px;">
              <div class="photo-background" style="width: 424px;">
                <div>
                  <iframe width="400" height="238" src=${videoUrl} frameborder="0" allowfullscreen></iframe>
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
        // alert(spotName+':  '+element.lat+' , '+element.long)


        $('#beach-container').append(htmlCode);
        let weatherDiv = $('.weather-div').last();
        displayWeatherData(element.lat, element.long, weatherDiv);
      });
    },
    error: function () {
      console.log('Failed to fetch location data from the database.');
      alert('Failed to fetch location data.(1)');
    }
  })
}
  // photoDetails.each(function () {
  //   const beachCard = $(this);
  //
  //   $.ajax({
  //     url: './DB/BeachInfo.json',
  //     dataType: 'json',
  //     success: function (data) {
  //       const spotName = beachCard.find('h1').text();
  //
  //         // alert(spotName);
  //       const beachLocation = data.find(item => item.spot === spotName);
  //       if (beachLocation) {
  //         const latitude = beachLocation.lat;
  //         const longitude = beachLocation.long;
  //           getWeatherData(latitude, longitude, weatherDiv);
  //       }
  //       else {
  //         alert('error with beachlocation.');
  //         console.log('Location not found in the database.');
  //         weatherDiv.html('Location not found.');
  //       }
  //     },
  //     error: function () {
  //         alert('error with function.');
  //       console.log('Failed to fetch location data from the database.');
  //       weatherDiv.html('Failed to fetch location data.');
  //     }
  //   });
  // });


// getLocation()
displayLoadingMessage();
