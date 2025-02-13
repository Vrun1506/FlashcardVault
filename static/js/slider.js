const slider = document.querySelector('.image-slider');
const images = document.querySelectorAll('.image-slider img');
const totalImages = images.length;
let index = 0;

// Function to update the slider
function updateSlider() {
    const translateX = -index * 100;  
    slider.style.transform = `translateX(${translateX}%)`;
}

// Right arrow click event
document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % totalImages;
    updateSlider();
});

// Left arrow click event - FIXED
document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + totalImages) % totalImages;
    updateSlider();
});

// Auto-slide every 3 seconds
setInterval(() => {
    index = (index + 1) % totalImages;
    updateSlider();
}, 3000);
