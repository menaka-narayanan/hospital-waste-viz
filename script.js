const wasteItems = [
    "mask.png",
    "glove.jpg",
    "napkin.png"
    // Add more items as needed
];

const wasteData = Array.from({ length: 365 }, (_, i) => ({
    day: i + 1,
    wasteCount: Math.floor(Math.random() * 10) + 5 // Random number of waste items per day
}));

const wastePileContainer = document.getElementById('waste-pile-container');

let currentYOffset = 0;

const addWasteItem = (item, delay) => {
    const img = document.createElement('img');
    img.src = `assets/${item}`;

    // Increase the horizontal jitter to allow for a wider pile
    const horizontalJitter = Math.random() * 200 - 50; // Wider range for horizontal jitter
    img.style.bottom = `${currentYOffset}px`;
    img.style.left = `${150 + horizontalJitter}px`; // Centered with wider jitter

    // Delay the addition to create a staggered fall effect
    setTimeout(() => {
        // Add the image to the container and apply the animation
        wastePileContainer.appendChild(img);
        img.style.animation = 'fall 1s ease-out forwards';
    }, delay);

    // Update the current Y offset for the next item
    currentYOffset += 10; // Adjust spacing if needed
};

const updateWastePile = (day) => {
    const dataPoint = wasteData.find(d => d.day === day);

    // Clear previous pile items if needed
    wastePileContainer.innerHTML = '';
    currentYOffset = 0;

    // Add new waste items for the current day with a delay
    for (let i = 0; i < dataPoint.wasteCount; i++) {
        const item = wasteItems[Math.floor(Math.random() * wasteItems.length)];
        addWasteItem(item, i * 200); // 200ms delay between each item
    }
};

d3.select("#timeline").on("input", function () {
    const day = +this.value;
    d3.select("#day-count").text(day);
    updateWastePile(day);
});

// Initialize with day 1
updateWastePile(1);
