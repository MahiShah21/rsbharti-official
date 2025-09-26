const items = [
  "images/RS1.mp4",
  "images/homebanner.jpg"
];

let current = 0;
const slider = document.getElementById("slider");
let autoSlideInterval;

function changeSlide() {
  // Remove old background
  slider.querySelectorAll("video, .slider-bg").forEach(el => el.remove());

  const currentFile = items[current];

  if (currentFile.endsWith(".mp4")) {
    // Add video background
    const video = document.createElement("video");
    video.src = currentFile;
    video.autoplay = true;
    video.loop = false; // important → so it ends once
    video.muted = true;
    slider.insertBefore(video, slider.firstChild);

    // When video ends → go to next slide
    video.addEventListener("ended", () => {
      current = (current + 1) % items.length;
      changeSlide();
    });

  } else {
    // Add image background
    const bg = document.createElement("div");
    bg.className = "slider-bg";
    bg.style.backgroundImage = url(${currentFile});
    slider.insertBefore(bg, slider.firstChild);

    // For images → use timer (5 sec)
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      current = (current + 1) % items.length;
      changeSlide();
    }, 5000);
  }
}

document.querySelector(".next").addEventListener("click", () => {
  current = (current + 1) % items.length;
  changeSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + items.length) % items.length;
  changeSlide();
});

// Initial load
changeSlide();