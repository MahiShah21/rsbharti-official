// Scroll reveal effect for dist-box content
const boxes = document.querySelectorAll(".dist-box");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.3 });

boxes.forEach(box => observer.observe(box));
