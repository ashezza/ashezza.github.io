// Replace with latitude and longitude for your location
const latitude = 51.5378;
const longitude = 0.7143;

// Function to fetch current weather data
async function getCurrentWeather() {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code`;

    console.log(apiUrl);

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Current weather data not available');
        }
    } catch (error) {
        console.error('Error fetching current weather:', error);
        return null;
    }
}

// Mapping of weather codes to weather animations and descriptions
const weatherMapping = {
    0: { animationClass: 'clear-sky-animation', description: 'clear sky' },
    1: { animationClass: 'partly-cloudy-animation', description: 'mainly clear' },
    2: { animationClass: 'partly-cloudy-animation', description: 'partly cloudy' },
    3: { animationClass: 'overcast-animation', description: 'overcast' },
    45: { animationClass: 'fog-animation', description: 'fog' },
    48: { animationClass: 'fog-animation', description: 'depositing rime fog' },
    51: { animationClass: 'rain-light-animation', description: 'drizzle' },
    53: { animationClass: 'rain-moderate-animation', description: 'drizzle' },
    55: { animationClass: 'rain-heavy-animation', description: 'drizzle' },
    56: { animationClass: 'rain-light-animation', description: 'freezing drizzle' },
    57: { animationClass: 'rain-heavy-animation', description: 'freezing drizzle' },
    61: { animationClass: 'rain-light-animation', description: 'rain' },
    63: { animationClass: 'rain-moderate-animation', description: 'rain' },
    65: { animationClass: 'rain-heavy-animation', description: 'rain' },
    66: { animationClass: 'rain-light-animation', description: 'freezing rain' },
    67: { animationClass: 'rain-heavy-animation', description: 'freezing rain' },
    71: { animationClass: 'snow-light-animation', description: 'snow fall' },
    73: { animationClass: 'snow-moderate-animation', description: 'snow fall' },
    75: { animationClass: 'snow-heavy-animation', description: 'snow fall' },
    77: { animationClass: 'snow-animation', description: 'snow grains' },
    80: { animationClass: 'rain-light-animation', description: 'rain showers' },
    81: { animationClass: 'rain-moderate-animation', description: 'rain showers' },
    82: { animationClass: 'rain-heavy-animation', description: 'rain showers' },
    85: { animationClass: 'snow-light-animation', description: 'snow showers' },
    86: { animationClass: 'snow-heavy-animation', description: 'snow showers' },
    95: { animationClass: 'thunderstorm-light-animation', description: 'thunderstorm' },
    96: { animationClass: 'thunderstorm-heavy-animation', description: 'thunderstorm' },
    99: { animationClass: 'thunderstorm-heavy-animation', description: 'thunderstorm' },
};

// Example usage
getCurrentWeather().then(data => {
    if (data && data.current && data.current.weather_code) {
        const weatherCode = data.current.weather_code;
        const weatherInfo = weatherMapping[weatherCode] || { animationClass: 'default-animation', description: 'unknown' };

        console.log(`Weather Code: ${weatherCode}, Animation Class: ${weatherInfo.animationClass}, Description: ${weatherInfo.description}`);

        // Apply animation class and update description in UI
        updateWeatherUI(weatherInfo);
    } else {
        console.error('Error: Unable to fetch weather data.');
    }
}).catch(error => {
    console.error('Error getting current weather data:', error);
});

// Function to update UI with weather animation and description
function updateWeatherUI(weatherInfo) {
    const mainContainer = document.getElementById('main-container');
    // Remove all existing animation classes
    mainContainer.className = 'main-container';

    // Add the new animation class
    mainContainer.classList.add(weatherInfo.animationClass);

    // Update description element
    const weatherDescriptionElement = document.getElementById('weather-description');
    const location = "Southend on Sea, Essex"; // Your location
    weatherDescriptionElement.textContent = `${weatherInfo.description}`;
}