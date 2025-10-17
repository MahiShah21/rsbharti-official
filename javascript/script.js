
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const href = link.getAttribute("href").toLowerCase();

    // Match direct pages like home/about/contact
    if (href === currentPage ||
       (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }

    // Match subpages under Offerings
    if (currentPage === "domestic.html" || currentPage === "international.html") {
      const offeringsLink = document.querySelector('.nav-links a[href="#"]');
      offeringsLink.classList.add("active");
    }
  });

const items = [
  "images/warehouse.jpg",
  "images/imp-exp.jpg",
  "images/banner3.jpg"
];

let current = 0;
const slider = document.getElementById("slider");
let autoSlideInterval;

function changeSlide() {
  // Remove old background
  slider.querySelectorAll("video, .slider-bg").forEach(el => el.remove());

  const currentFile = items[current];

  if (currentFile.endsWith(".mp4")) {
    const video = document.createElement("video");
    video.src = currentFile;
    video.autoplay = true;
    video.loop = false;
    video.muted = true;
    slider.insertBefore(video, slider.firstChild);

    video.addEventListener("ended", () => {
      current = (current + 1) % items.length;
      changeSlide();
    });

    clearInterval(autoSlideInterval); // stop any running interval

  } else {
    const bg = document.createElement("div");
    bg.className = "slider-bg";
    bg.style.backgroundImage = `url(${currentFile})`; // ✅ fixed
    slider.insertBefore(bg, slider.firstChild);

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

changeSlide();

// Nav bar toggle
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});