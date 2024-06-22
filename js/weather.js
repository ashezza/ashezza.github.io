/* Time of day */
document.addEventListener('DOMContentLoaded', function() {
    const mainDiv = document.querySelector('body'); // Replace with your main div selector
    const weatherContainer = document.getElementById('weather-container');

    function isDayTimeInUK() {
        const now = new Date(); // Current UTC time
        const ukOffset = 1; // UK timezone offset from UTC in hours (GMT+1)
        const ukTime = new Date(now.getTime() + ukOffset * 60 * 60 * 1000); // Convert to UK local time
        
        const hour = ukTime.getHours(); // Get current hour in UK
        
        // Define day and night hours in UK (adjust as per actual sunrise and sunset times)
        const sunriseHour = 6; // Example: sunrise at 6 AM
        const sunsetHour = 18; // Example: sunset at 6 PM
        
        // Determine if it's day or night
        return (hour >= sunriseHour && hour < sunsetHour);
    }

    function applyDayNightClass() {
        const isDay = isDayTimeInUK();
        mainDiv.classList.toggle('daytime', isDay);
        mainDiv.classList.toggle('nighttime', !isDay);
    }

    // Initial call to apply class based on current time
    applyDayNightClass();

    // Update every minute to adjust for day/night changes
    setInterval(applyDayNightClass, 60000); // Update every minute
});


/* Weather - rain */
document.addEventListener('DOMContentLoaded', function () {
    const rainContainer = document.getElementById('weather-container');
    let numberOfRaindrops = 50; // Default number of raindrops
    let speed = 1; // Default intensity factor for raindrops
    let width = 3; // Default width for raindrops
    let height = 6; // Default height for raindrops

    // Function to generate raindrops based on current class
    function generateRaindrops() {
        // Clear existing raindrops
        rainContainer.innerHTML = '';

        // Check for the class and adjust parameters accordingly
        if (rainContainer.classList.contains('rain-heavy-animation')) {
            numberOfRaindrops = 240;
            speed = 1;
        } else if (rainContainer.classList.contains('rain-moderate-animation')) {
            numberOfRaindrops = 120;
            speed = 1.5;
        } else if (rainContainer.classList.contains('rain-light-animation')) {
            numberOfRaindrops = 60;
            speed = 2;
        } else {
            // If no rain class is present, do not generate raindrops
            return;
        }

        console.log(`Generating ${numberOfRaindrops} raindrops with intensity factor ${speed}`);

        // Generate new raindrops
        for (let i = 0; i < numberOfRaindrops; i++) {
            const raindrop = document.createElement('div');
            raindrop.classList.add('raindrop');

            // Randomize the x position, size, and animation duration
            const randomX = Math.random() * 100; // Random x position as a percentage
            const randomDuration = Math.random() * (2 * speed) + 1; // Random duration scaled by intensity factor

            raindrop.style.left = `${randomX}vw`; // Set the x position
            raindrop.style.animationDuration = `${randomDuration}s`; // Set the animation duration
            raindrop.style.width = `${width}px`; // Set the width
            raindrop.style.height = `${height}px`; // Set the height

            rainContainer.appendChild(raindrop);
        }
    }

    // Initial generation of raindrops
    generateRaindrops();

    // MutationObserver to monitor class changes on weather-container
    const observer = new MutationObserver(mutationsList => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                generateRaindrops();
                break;
            }
        }
    });

    // Start observing changes in attributes (specifically class changes)
    observer.observe(rainContainer, { attributes: true });
});

/* Weather - partly cloudy */
document.addEventListener('DOMContentLoaded', function () {
    const weatherContainer = document.getElementById('weather-container');

    // SVG Cloud definitions
    const svgClouds = {
        small: '<svg width="100" height="100" viewBox="0 0 64 64"><path fill="#fff" d="M50 28c0-5.523-4.477-10-10-10-4.15 0-7.72 2.507-9.15 6.116A8.003 8.003 0 0030 24c-4.418 0-8 3.582-8 8a8 8 0 00.804 3.595A6.5 6.5 0 0024 42h26a6.5 6.5 0 000-13h-1.5z"/></svg>',
        medium: '<svg width="200" height="100" viewBox="0 0 128 128"><path fill="#fff" d="M100 56c0-11.046-8.954-20-20-20-8.3 0-15.44 5.014-18.3 12.232A16.006 16.006 0 0060 48c-8.837 0-16 7.163-16 16a16 16 0 001.608 7.19A13 13 0 0048 84h52a13 13 0 000-26H100z"/></svg>',
        large: '<svg width="300" height="100" viewBox="0 0 192 192"><path fill="#fff" d="M150 84c0-16.569-13.431-30-30-30-12.45 0-23.16 7.521-27.45 18.348A24.009 24.009 0 0090 72c-13.256 0-24 10.744-24 24a24 24 0 002.412 10.785A19.5 19.5 0 0072 126h78a19.5 19.5 0 000-39h-2.25z"/></svg>'
    };

    // Opacity values based on cloud size
    const opacityValues = {
        small: 0.4,
        medium: 0.6,
        large: 0.8
    };

    // Function to generate clouds
    function generateClouds() {
        const numberOfClouds = 10; // Number of clouds to generate

        for (let i = 0; i < numberOfClouds; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');

            // Randomly assign cloud size and SVG
            const sizeClasses = ['cloud-small', 'cloud-medium', 'cloud-large'];
            const sizeClass = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
            cloud.classList.add(sizeClass);
            cloud.innerHTML = svgClouds[sizeClass.split('-')[1]];

            // Randomly position the cloud
            const randomY = Math.random() * 80; // Random y position as a percentage, max 80vh to keep in view
            const randomX = Math.random() * 80; // Random x position as a percentage, max 80vw to keep in view
            cloud.style.top = `${randomY}vh`;
            cloud.style.left = `${randomX}vw`;

            // Randomize animation duration between 20s and 60s, adjusted for viewport width
            const viewportWidth = window.innerWidth;
            const randomDuration = (Math.random() * 240 + 60) * (viewportWidth / 1920); // Adjusted random duration
            cloud.style.animationDuration = `${randomDuration}s`;

            // Randomly flip horizontally
            if (Math.random() < 0.5) {
                cloud.style.transform = 'scaleX(-1)';
            }

            // Set opacity based on cloud size
            cloud.style.opacity = opacityValues[sizeClass.split('-')[1]];

            // Randomize z-index between 1 and 2
            const zIndex = Math.floor(Math.random() * 2) + 1;
            cloud.style.zIndex = zIndex;

            weatherContainer.appendChild(cloud);
        }
    }

    // Function to check for cloudy class and generate clouds
    function checkAndGenerateClouds() {
        if (weatherContainer.classList.contains('partly-cloudy-animation')) {
            generateClouds();
        }
    }

    // Initial generation of clouds if the correct class is present
    checkAndGenerateClouds();

    // MutationObserver to monitor class changes on weather-container
    const observer = new MutationObserver(mutationsList => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                checkAndGenerateClouds();
                break;
            }
        }
    });

    // Start observing changes in attributes (specifically class changes)
    observer.observe(weatherContainer, { attributes: true });
});