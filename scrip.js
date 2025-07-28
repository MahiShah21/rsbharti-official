const slides = document.querySelectorAll('.slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${(idx - i) * 100}%)`;
  });
}

next.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

prev.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

// Initialize on page load
showSlide(index);
