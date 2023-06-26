function displayLoadingMessage(weatherDiv) {
  weatherDiv.html('Loading Weather...');
}

function getWeatherData(latitude, longitude, weatherDiv) {
  displayLoadingMessage(weatherDiv);

  try {
    const apiKey = 'd639e889ca39c6005b3a6cb8833ff9a3';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    $.ajax({
      url: apiUrl,
      success: function (data) {
        const temperature = (data.main.temp / 10).toFixed(1);
        const description = data.weather[0].description;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const windSpeed = data.wind.speed;
        const windDirection = data.wind.deg;

        weatherDiv.html(`Temperature: ${temperature}°C<br>Description: ${description}<br>Sunset Time: ${sunsetTime}<br>Wind Speed: ${windSpeed} m/s<br>Wind Direction: ${windDirection}°`);
      },
      error: function () {
        console.log('Failed to fetch weather data.');
        weatherDiv.html('Failed to fetch weather data.');
      }
    });
  } catch (error) {
    console.log('Error:', error);
    weatherDiv.html('Failed to fetch weather data.');
  }
}

function getLocation() {
  const photoCards = $('.photo-card');

  photoCards.each(function () {
    const latitude = $(this).data('latitude');
    const longitude = $(this).data('longitude');
    const weatherDiv = $(this).find('.weather-div');

    if (latitude && longitude) {
      getWeatherData(latitude, longitude, weatherDiv);
    } else {
      console.log('Latitude and longitude not found.');
      weatherDiv.html('Failed to get location.');
    }
  });
}

// Call the getLocation function when the page loads
window.addEventListener('load', getLocation);
