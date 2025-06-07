const apiKey = '3eb228bdf96b668982db76b9c3e62f4b'; // Substitua pelo seu API key
const city = 'Aracaju,BR';
const units = 'metric';

async function fetchWeather() {
    // Current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    // 3-day forecast (OpenWeatherMap's forecast is every 3h, so we filter for 12:00)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

    const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
    ]);
    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    displayWeather(weatherData, forecastData);
}

function displayWeather(current, forecast) {
    const weatherCard = document.getElementById('current-weather-card');
    const weather = current.weather[0];
    const temp = Math.round(current.main.temp);
    const tempMax = Math.round(current.main.temp_max);
    const tempMin = Math.round(current.main.temp_min);
    const humidity = current.main.humidity;
    const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    weatherCard.querySelector('.card-body').innerHTML = `
        <p>
            <strong>${temp}°C</strong>, ${weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
        </p>
        <p>High: ${tempMax}°C</p>
        <p>Low: ${tempMin}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
    `;

    const forecastCard = document.getElementById('forecast-card');
    const forecastList = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    let forecastHtml = '';
    forecastList.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        forecastHtml += `
            <div>
                <strong>${day}:</strong> ${Math.round(item.main.temp)}°C
            </div>
        `;
    });
    forecastCard.querySelector('.card-body').innerHTML = forecastHtml;
}

document.addEventListener('DOMContentLoaded', fetchWeather);
