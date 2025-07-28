// scrip.js

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;
const totalSlides = slide.length;
let autoSlideInterval;

// Function to update slide position manually
function updateSlidePosition() {
  slides.style.animation = 'none'; // stop the CSS animation
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Manual Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlidePosition();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
  resetAutoSlide();
});

// Reset auto-slide after manual interaction
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  }, 8000); // 8 seconds delay
}

// Start manual autoplay as fallback
resetAutoSlide();
