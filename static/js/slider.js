const slider = document.querySelector('.image-slider');
const images = document.querySelectorAll('.image-slider img');
const totalImages = images.length;
let index = 0;

document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % totalImages;
    updateSlider();
});

document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + totalImages) % totalImages;
    updateSlider();
});

function updateSlider() {
    const translateX = -index * 100;  // Adjust to match the image width (100% in this case)
    slider.style.transform = `translateX(${translateX}%)`;
}

// Auto-slide every 3 seconds
setInterval(() => {
    index = (index + 1) % totalImages;
    updateSlider();
}, 3000);
