const images = [
  "images/library.jpg",
  "images/library2.jpg"
];

let current = 0;
const slider = document.getElementById("slider");

function changeSlide() {
  slider.style.backgroundImage = `url(${images[current]})`;
}

document.querySelector(".next").addEventListener("click", () => {
  current = (current + 1) % images.length;
  changeSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  changeSlide();
});

// Auto-slide
setInterval(() => {
  current = (current + 1) % images.length;
  changeSlide();
}, 5000);

// Initial load
changeSlide();
