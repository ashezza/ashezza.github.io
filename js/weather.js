document.addEventListener('DOMContentLoaded', function () {
    const rainContainer = document.getElementById('weather-container');
    let numberOfRaindrops = 50; // Default number of raindrops
    let speed = 1; // Default intensity factor for raindrops
    let width = 3; // Default height for raindrops
    let height = 6; // Default width for raindrops

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
            raindrop.style.width = width+`px`; // Set the width
            raindrop.style.height = height+`px`; // Set the height

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