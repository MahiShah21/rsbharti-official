document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".distributor-box");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // run only once
        }
      });
    },
    { threshold: 0.4 } // trigger when 40% visible
  );

  boxes.forEach((box) => observer.observe(box));
});
