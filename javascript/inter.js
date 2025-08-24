document.querySelectorAll(".distributor").forEach(distributor => {
  const circle = distributor.querySelector(".progress-ring__circle");

  distributor.addEventListener("mouseenter", () => {
    circle.style.strokeDashoffset = "0";
    setTimeout(() => {
      distributor.classList.add("animated");
    }, 2000); // show text after circle completes
  });
});