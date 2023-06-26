
const apiKey = 'd639e889ca39c6005b3a6cb8833ff9a3';

function displayLoadingMessage() {
  const weatherDiv = document.getElementById('weatherDiv');
  weatherDiv.innerHTML = 'Loading Weather...';
}

async function getWeatherData() {
  const weatherDiv = document.getElementById('weatherDiv');

  // Display loading message
  displayLoadingMessage();


  // Get the user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Construct the API URL
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      try {
        // Fetch the weather data
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extract the relevant weather information
        const temperature = (data.main.temp/10).toFixed(1);
        const description = data.weather[0].description;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const windSpeed = data.wind.speed;
        const windDirection = data.wind.deg;

        // Update the weatherDiv with the weather information
        weatherDiv.innerHTML = `Temperature: ${temperature}°C<br>Sunset Time: ${sunsetTime}<br>Wind Direction: ${windDirection}°<br>Wind Speed: ${windSpeed} m/s<br>Description: ${description}
`;
      } catch (error) {
        console.log('Error:', error);
        weatherDiv.innerHTML = 'Failed to fetch weather data.';
      }
    });
  } else {
    weatherDiv.innerHTML = 'Geolocation is not supported by this browser.';
  }
}

// Call the getWeatherData function when the page loads
window.addEventListener('load', getWeatherData);
