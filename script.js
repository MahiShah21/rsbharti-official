const images = [
  "images/slider1.jpg",
  "images/slider2.jpg"
];

let current = 0;
const slider = document.getElementById("slider");
let autoSlideInterval;

// Smooth fade effect
function changeSlide() {
  slider.classList.add("fade-out");
  setTimeout(() => {
    slider.style.backgroundImage = `url(${images[current]})`;
    slider.classList.remove("fade-out");
  }, 300);
}

// Reset auto slider when manually clicked
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    current = (current + 1) % images.length;
    changeSlide();
  }, 5000);
}

// Event listeners
document.querySelector(".next").addEventListener("click", () => {
  current = (current + 1) % images.length;
  changeSlide();
  resetAutoSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  changeSlide();
  resetAutoSlide();
});

// Initial load
changeSlide();
resetAutoSlide();
