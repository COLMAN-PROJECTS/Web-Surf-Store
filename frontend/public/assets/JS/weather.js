function displayLoadingMessage(weatherDiv) {
  weatherDiv.innerHTML = 'Loading Weather...';
}

async function getWeatherData(latitude, longitude, weatherDiv) {
  // Display loading message
  displayLoadingMessage(weatherDiv);

  try {
    const apiKey = 'd639e889ca39c6005b3a6cb8833ff9a3';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    // Fetch the weather data
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract the relevant weather information
    const temperature = (data.main.temp / 10).toFixed(1);
    const description = data.weather[0].description;
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;

    // Update the weatherDiv with the weather information
    weatherDiv.innerHTML = `Temperature: ${temperature}°C<br>Description: ${description}<br>Sunset Time: ${sunsetTime}<br>Wind Speed: ${windSpeed} m/s<br>Wind Direction: ${windDirection}°`;
  } catch (error) {
    console.log('Error:', error);
    weatherDiv.innerHTML = 'Failed to fetch weather data.';
  }
}

function getLocation() {
  const photoCards = document.querySelectorAll('.photo-card');

  photoCards.forEach(photoCard => {
    const latitude = photoCard.dataset.latitude;
    const longitude = photoCard.dataset.longitude;
    const weatherDiv = photoCard.querySelector('.weather-div');

    if (latitude && longitude) {
      getWeatherData(latitude, longitude, weatherDiv);
    } else {
      console.log('Latitude and longitude not found.');
      weatherDiv.innerHTML = 'Failed to get location.';
    }
  });
}

// Call the getLocation function when the page loads
window.addEventListener('load', getLocation);
