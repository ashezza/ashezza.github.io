// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const rainContainer = document.getElementById('rain-container');
    const numberOfRaindrops = 20; // Number of raindrops

    for (let i = 0; i < numberOfRaindrops; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');

        // Randomize the x position and animation duration
        const randomX = Math.random() * 100; // Random x position as a percentage
        const randomDuration = Math.random() * 2 + 1; // Random duration between 1s and 3s

        raindrop.style.left = `${randomX}vw`; // Set the x position
        raindrop.style.animationDuration = `${randomDuration}s`; // Set the animation duration

        rainContainer.appendChild(raindrop);
    }
});