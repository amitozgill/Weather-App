async function fetchWeather() {
  const city = document.getElementById('city').value;
  const weatherDiv = document.getElementById('weather');
  
  if (!city) {
    weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'aff3f287d2mshe08736dd161fbe9p1de4b1jsn38d7990fa24e',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  weatherDiv.innerHTML = '<p class="loading">Fetching weather data...</p>';

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Check if valid data is returned
    if (data.current) {
      const weatherHTML = `
        <h2>Current Weather in ${data.location.name}, ${data.location.country}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        <p><img src="${data.current.condition.icon}" alt="Weather icon"></p>
      `;
      weatherDiv.innerHTML = weatherHTML;
    } else {
      weatherDiv.innerHTML = `<p>No weather data found for "${city}".</p>`;
    }
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    console.error(error);
  }
}
