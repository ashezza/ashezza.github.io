// Replace with latitude and longitude for your location
const latitude = 51.5378;
const longitude = 0.7143;

// Function to fetch current weather data
async function getCurrentWeather() {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

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
    0: { animationClass: 'clear-sky-animation', description: 'clear skies!', avatar: 'avatar-sunny.svg' },
    1: { animationClass: 'mainly-clear-animation', description: 'mainly clear.', avatar: 'avatar-happy.svg' },
    2: { animationClass: 'partly-cloudy-animation', description: 'partly cloudy.', avatar: 'avatar-neutral.svg' },
    3: { animationClass: 'overcast-animation', description: 'overcast.', avatar: 'avatar-neutral.svg' },
    45: { animationClass: 'fog-animation', description: 'foggy.', avatar: 'avatar-neutral.svg' },
    48: { animationClass: 'fog-animation', description: 'foggy.', avatar: 'avatar-neutral.svg' },
    51: { animationClass: 'rain-light-animation', description: 'raining lightly.', avatar: 'avatar-neutral.svg' },
    53: { animationClass: 'rain-moderate-animation', description: 'raining.', avatar: 'avatar-unhappy.svg' },
    55: { animationClass: 'rain-heavy-animation', description: 'raining heavily!', avatar: 'avatar-angry.svg' },
    56: { animationClass: 'rain-light-animation', description: 'cold and raining.', avatar: 'avatar-unhappy.svg' },
    57: { animationClass: 'rain-heavy-animation', description: 'cold and raining heavily!', avatar: 'avatar-unhappy.svg' },
    61: { animationClass: 'rain-light-animation', description: 'raining lightly.', avatar: 'avatar-neutral.svg' },
    63: { animationClass: 'rain-moderate-animation', description: 'raining.', avatar: 'avatar-unhappy.svg' },
    65: { animationClass: 'rain-heavy-animation', description: 'raining heavily!', avatar: 'avatar-angry.svg' },
    66: { animationClass: 'rain-light-animation', description: 'freezing and raining lightly.', avatar: 'avatar-unhappy.svg' },
    67: { animationClass: 'rain-heavy-animation', description: 'freezing and raining heavily!', avatar: 'avatar-angry.svg' },
    71: { animationClass: 'snow-light-animation', description: 'lightly snowing.', avatar: 'avatar-happy.svg' },
    73: { animationClass: 'snow-moderate-animation', description: 'snowing.', avatar: 'avatar-vhappy.svg' },
    75: { animationClass: 'snow-heavy-animation', description: 'a snow day!', avatar: 'avatar-vhappy.svg' },
    77: { animationClass: 'hail-animation', description: 'hailing.', avatar: 'avatar-neutral.svg' },
    80: { animationClass: 'rain-light-animation', description: 'raining lightly.', avatar: 'avatar-neutral.svg' },
    81: { animationClass: 'rain-moderate-animation', description: 'raining.', avatar: 'avatar-unhappy.svg' },
    82: { animationClass: 'rain-heavy-animation', description: 'raining violently!', avatar: 'avatar-angry.svg' },
    85: { animationClass: 'snow-light-animation', description: 'snowing lightly.', avatar: 'avatar-happy.svg' },
    86: { animationClass: 'snow-heavy-animation', description: 'snowing heavily!', avatar: 'avatar-vhappy.svg' },
    95: { animationClass: 'thunderstorm-light-animation', description: 'a bit stormy.', avatar: 'avatar-neutral.svg' },
    96: { animationClass: 'thunderstorm-moderate-animation', description: 'stormy.', avatar: 'avatar-unhappy.svg' },
    99: { animationClass: 'thunderstorm-heavy-animation', description: 'very stormy!', avatar: 'avatar-angry.svg' },
};

// Example usage
getCurrentWeather().then(data => {
    if (data && data.current_weather && data.current_weather.weathercode !== undefined) {
        const weatherCode = data.current_weather.weathercode;
        const weatherInfo = weatherMapping[80] || { animationClass: 'default-animation', description: 'unknown', avatar: 'avatar-neutral.svg' };

        console.log(`Weather Code: ${weatherCode}, Animation Class: ${weatherInfo.animationClass}, Description: ${weatherInfo.description}, Avatar: ${weatherInfo.avatar}`);

        // Apply animation class and update description in UI
        updateWeatherUI(weatherInfo);
    } else {
        console.error('Error: Unable to fetch weather data.');
    }
}).catch(error => {
    console.error('Error getting current weather data:', error);
});

// Function to update UI with weather animation, description, and avatar
function updateWeatherUI(weatherInfo) {
    const weatherContainer = document.getElementById('weather-container');
    // Remove all existing animation classes
    weatherContainer.className = '';

    // Add the new animation class
    weatherContainer.classList.add(weatherInfo.animationClass);

    // Update description element
    const weatherDescriptionElement = document.getElementById('weather-description');
    weatherDescriptionElement.textContent = `${weatherInfo.description}`;

    // Update avatar
    const avatarElement = document.querySelector('.avatar img');
    avatarElement.src = `assets/${weatherInfo.avatar}`;
    avatarElement.alt = weatherInfo.description;
}
