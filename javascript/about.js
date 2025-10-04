/* ===== Story Section Scroll Reveal ===== */
document.addEventListener("scroll", () => {
  const storySection = document.querySelector(".our-story");
  if (!storySection) return;
  const sectionTop = storySection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.8;
  if (sectionTop < triggerPoint) storySection.classList.add("show");
});

/* ===== Goal Items Intersection Observer ===== */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".goal-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach(item => observer.observe(item));
});

/* ===== Partners Toggle ===== */
document.querySelectorAll(".read-more").forEach(btn => {
  btn.addEventListener("click", function () {
    const cardContent = this.parentElement;
    const moreText = cardContent.querySelector(".more-text");
    if (cardContent.classList.contains("expanded")) {
      cardContent.classList.remove("expanded");
      this.textContent = "Read More";
    } else {
      cardContent.classList.add("expanded");
      this.textContent = "Read Less";
    }
  });
});

/* ===== Cards Scroll Reveal ===== */
const cards = document.querySelectorAll(".card");
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  cards.forEach(card => {
    const boxTop = card.getBoundingClientRect().top;
    if (boxTop < triggerBottom) card.classList.add("visible");
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ===== TEAM SLIDER ===== */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".team-container");
  const members = document.querySelectorAll(".team-member");
  const prevBtn = document.querySelector(".team-btn.prev");
  const nextBtn = document.querySelector(".team-btn.next");

  if (!container || !members.length) return;

  let index = 0;
  const visibleCount = 4; // number of members visible at once

  function updateSlider() {
    const memberWidth = members[0].getBoundingClientRect().width;
    index = Math.max(0, Math.min(index, members.length - visibleCount)); // clamp
    container.style.transform = `translateX(${-index * memberWidth}px)`;
  }

  nextBtn?.addEventListener("click", () => {
    index++;
    updateSlider();
  });

  prevBtn?.addEventListener("click", () => {
    index--;
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
});

/* ===== NETWORK MAP HOVER + LINES ===== */
document.addEventListener("DOMContentLoaded", () => {
  const pins = document.querySelectorAll(".pin:not(.origin)");
  const origin = document.querySelector(".pin.origin");
  const tooltip = document.getElementById("tooltip");
  const tooltipFlag = document.getElementById("tooltip-flag");
  const tooltipText = document.getElementById("tooltip-text");
  const svg = document.querySelector(".map-lines");

  if (!origin || !pins.length) return;

  const originRect = origin.getBoundingClientRect();
  const mapRect = origin.closest(".map-container").getBoundingClientRect();
  const originX = originRect.left + originRect.width / 2 - mapRect.left;
  const originY = originRect.top + originRect.height / 2 - mapRect.top;

  pins.forEach(pin => {
    const pinRect = pin.getBoundingClientRect();
    const pinX = pinRect.left + pinRect.width / 2 - mapRect.left;
    const pinY = pinRect.top + pinRect.height / 2 - mapRect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", originX);
    line.setAttribute("y1", originY);
    line.setAttribute("x2", pinX);
    line.setAttribute("y2", pinY);
    svg.appendChild(line);

    pin.addEventListener("mouseenter", e => {
      tooltip.style.display = "flex";
      tooltipFlag.src = pin.dataset.flag;
      tooltipText.textContent = pin.dataset.country;
      const rect = e.target.getBoundingClientRect();
      tooltip.style.top = rect.top + window.scrollY - 40 + "px";
      tooltip.style.left = rect.left + window.scrollX + "px";
    });

    pin.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
});

/* ===== MEMORIES HEX SLIDER ===== */
const sources = [
  "images/mem1.jpg",
  "images/mem2.jpg",
  "images/mem3.jpg",
  "images/mem4.jpg",
  "images/mem5.jpg",
  "images/mem6.jpg",
  "images/mem7.jpg",
];

const track = document.getElementById("hexTrack");
let centerIdx = 1;
let sliding = false;

function mod(n, m) {
  return ((n % m) + m) % m;
}

function createHex(src, sizeClass) {
  const li = document.createElement("li");
  li.className = `hex ${sizeClass}`;
  li.innerHTML = `
    <div class="background-hex"></div>
    <div class="media-hex">
        <img src="${src}" alt="">
    </div>
  `;
  return li;
}

function initHex() {
  if (!track) return;
  track.innerHTML = "";
  const sizes = ["small", "medium", "large", "medium"];
  const rel = [-2, -1, 0, +1];
  for (let i = 0; i < 4; i++) {
    const idx = mod(centerIdx + rel[i], sources.length);
    track.appendChild(createHex(sources[idx], sizes[i]));
  }
}
initHex();

function slideNext() {
  if (!track || sliding) return;
  sliding = true;

  const first = track.firstElementChild;
  if (!first) {
    sliding = false;
    return;
  }

  const firstWidth = first.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const offset = firstWidth + gap;

  track.style.transition = "transform 0.6s ease";
  track.style.transform = `translateX(-${offset}px)`;

  track.addEventListener(
    "transitionend",
    () => {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      track.appendChild(first);

      centerIdx = mod(centerIdx + 1, sources.length);
      const kids = track.children;

      if (kids.length >= 4) {
        kids[0].className = "hex small";
        kids[1].className = "hex medium";
        kids[2].className = "hex large";
        kids[3].className = "hex medium";

        kids[0].querySelector("img").src = sources[mod(centerIdx - 2, sources.length)];
        kids[1].querySelector("img").src = sources[mod(centerIdx - 1, sources.length)];
        kids[2].querySelector("img").src = sources[mod(centerIdx, sources.length)];
        kids[3].querySelector("img").src = sources[mod(centerIdx + 1, sources.length)];
      }

      void track.offsetWidth; // force reflow
      sliding = false;
    },
    { once: true }
  );
}

// Auto slide every 5s
const AUTO_DELAY = 5000;
let timer = setInterval(slideNext, AUTO_DELAY);

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(slideNext, AUTO_DELAY);
}

document.getElementById("nextBtn")?.addEventListener("click", () => {
  slideNext();
  resetTimer();
});

track?.addEventListener("mouseenter", () => clearInterval(timer));
track?.addEventListener("mouseleave", resetTimer);

/* ===== NAVBAR TOGGLE ===== */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!menuToggle || !navLinks) return;

  const toggleNav = (show) => {
    if (typeof show === "boolean") navLinks.classList.toggle("active", show);
    else navLinks.classList.toggle("active");
  };

  // click toggle (mobile)
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleNav();
  });

  // hover open (desktop)
  menuToggle.addEventListener("mouseenter", () => toggleNav(true));

  // hide when mouse leaves
  navLinks.addEventListener("mouseleave", () => toggleNav(false));

  // close when clicking a link
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("active"))
  );

  // close when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });
});
