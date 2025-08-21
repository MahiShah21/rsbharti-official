// Animate paragraphs after circle border completes
document.querySelectorAll(".dist-box").forEach((box, i) => {
  setTimeout(() => {
    box.classList.add("active");
  }, (i + 1) * 2000); // stagger animations
});
