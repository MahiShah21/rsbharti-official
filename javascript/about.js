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

  // Function to calculate visible members dynamically
  function getVisibleCount() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 992) return 3;
    return 5; // desktop
  }

  function updateSlider() {
    const visibleCount = getVisibleCount();
    const memberWidth = members[0].getBoundingClientRect().width;
    const maxIndex = Math.max(0, members.length - visibleCount);
    index = Math.max(0, Math.min(index, maxIndex));
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
/* script.js - static airplanes at destination points
   - positions markers by lat/lon assuming the image/SVG is an equirectangular projection
   - draws static curves from India to each destination
   - places a single airplane icon at each destination (no animation)
*/

/* ----------------- CONFIG: country coordinates -----------------
   Lat/Lon values are approximate (capitals / central points).
*/
const origin = { name: 'India', lat: 16.5937, lon: 71.9629 };

const destinations = [
  { name: 'UAE', lat: 16.4539, lon: 51.3773 },
  { name: 'Ivory Coast', lat: -4.8276, lon: -8.2893 },
  { name: 'Tanzania', lat: -24.1630, lon: 32.7516 },
  { name: 'Togo', lat: -4.1725, lon: -1.2314 },
  { name: 'Congo', lat: -20.2634, lon: 20.2429 }, // Republic of the Congo (Brazzaville)
  { name: 'Benin', lat: -2.2969, lon: 0.2289 },
  { name: 'Burkina Faso', lat: 2.3714, lon: -3.5197 },
  { name: 'Central African Republic', lat: -5.3947, lon: 18.5582 },
  { name: 'Uganda', lat: -12.3476, lon: 30.5825 }
];

/* ----------------- helpers ----------------- */
/* Map lat/lon to SVG coordinates assuming equirectangular:
   x = (lon + 180) / 360 * width
   y = (90 - lat) / 180 * height
*/
function latLonToXY(lat, lon, width, height){
  const x = (lon + 180) / 360 * width;
  const y = (90 - lat) / 180 * height;
  return { x, y };
}

function svgEl(name, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

/* create an airplane element (SVG inside a div) */
function createPlaneElement(name){
  const wrapper = document.createElement('div');
  wrapper.className = 'plane';
  wrapper.setAttribute('role', 'img');
  wrapper.setAttribute('aria-label', `Destination: ${name}`);
  wrapper.innerHTML = `
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M2 12 L22 12 L18 8 L16.5 10 L12 8 L13 12 L12 16 L13.5 14 L16.5 16 L18 14 Z" fill="white"/>
    </svg>
  `;
  return wrapper;
}

/* compute control points for a smooth curve between two points */
function computeCurveControls(x1,y1,x2,y2, width){
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx*dx + dy*dy);
  const curvature = Math.max(0.05, Math.min(0.5, dist / width * 0.1)); // reduced curvature
  const cx1 = x1 + dx * 0.25 - dy * curvature;
  const cy1 = y1 + dy * 0.25 + dx * curvature;
  const cx2 = x1 + dx * 0.75 - dy * curvature;
  const cy2 = y1 + dy * 0.75 + dx * curvature;
  return { cx1, cy1, cx2, cy2 };
}


/* ----------------- Main rendering ----------------- */
document.addEventListener('DOMContentLoaded', () => {
  const mapImg = document.getElementById('world-map');
  const overlay = document.getElementById('map-overlay');
  const originPin = document.getElementById('origin-pin');
  const tooltip = document.getElementById('tooltip');
  const wrapper = document.querySelector('.map-wrapper');

  function renderMap() {
    const imgW = mapImg.naturalWidth || mapImg.clientWidth;
    const imgH = mapImg.naturalHeight || mapImg.clientHeight;
    const width = imgW || mapImg.clientWidth;
    const height = imgH || mapImg.clientHeight;

    overlay.setAttribute('viewBox', `0 0 ${width} ${height}`);
    overlay.style.width = `${mapImg.clientWidth}px`;
    overlay.style.height = `${mapImg.clientHeight}px`;

    // place origin pin (percentage)
    const originXY = latLonToXY(origin.lat, origin.lon, width, height);
    originPin.style.left = `${(originXY.x / width) * 100}%`;
    originPin.style.top  = `${(originXY.y / height) * 100}%`;

    // clear previous overlay children and any existing plane elements
    while (overlay.firstChild) overlay.removeChild(overlay.firstChild);
    // remove old .plane elements
    document.querySelectorAll('.map-wrapper .plane').forEach(el => el.remove());

    // for each destination draw route and create plane (static)
    destinations.forEach((d, i) => {
      const destXY = latLonToXY(d.lat, d.lon, width, height);

      // draw destination dot (circle)
      const destCircle = svgEl('circle', {
        cx: destXY.x,
        cy: destXY.y,
        r: 4
      });
      destCircle.classList.add('dest-dot');
      overlay.appendChild(destCircle);

      // create cubic bezier path from origin to dest
      const { cx1, cy1, cx2, cy2 } = computeCurveControls(originXY.x, originXY.y, destXY.x, destXY.y, width);
      const pathD = `M ${originXY.x} ${originXY.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${destXY.x} ${destXY.y}`;
      const path = svgEl('path', { d: pathD, 'class': 'route route-'+i });
      overlay.appendChild(path);

      // create a single static airplane placed at destination (a little above the dest dot)
      const plane = createPlaneElement(d.name);
      // use percentage relative to image for stable responsiveness
      const percentX = (destXY.x / width) * 100;
      const percentY = (destXY.y / height) * 100;
      plane.style.left = percentX + '%';
      plane.style.top  = percentY + '%';
      wrapper.appendChild(plane);

      // hover interactions: show tooltip with country
      [path, plane].forEach(el => {
        el.addEventListener('mouseenter', (ev) => {
          tooltip.style.display = 'block';
          tooltip.textContent = d.name;
          tooltip.setAttribute('aria-hidden', 'false');
        });
        el.addEventListener('mousemove', (ev) => {
          const wrapperRect = mapImg.getBoundingClientRect();
          tooltip.style.left = (ev.clientX - wrapperRect.left) + 'px';
          tooltip.style.top = (ev.clientY - wrapperRect.top) + 'px';
        });
        el.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
          tooltip.setAttribute('aria-hidden', 'true');
        });
      });
    });
  }

  if (mapImg.complete) {
    setTimeout(renderMap, 50);
  } else {
    mapImg.addEventListener('load', renderMap);
  }

  window.addEventListener('resize', () => {
    clearTimeout(window._mapResizeTimer);
    window._mapResizeTimer = setTimeout(renderMap, 150);
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
