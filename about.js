
document.addEventListener("scroll", () => {
            const storySection = document.querySelector(".our-story");
            const sectionTop = storySection.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;

            if (sectionTop < triggerPoint) {
            storySection.classList.add("show");
            }
        });

const items = document.querySelectorAll('.goal-item');

function checkScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  items.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      item.classList.add('show');
    }
  });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

