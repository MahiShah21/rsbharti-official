
document.addEventListener("scroll", () => {
            const storySection = document.querySelector(".our-story");
            const sectionTop = storySection.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;

            if (sectionTop < triggerPoint) {
            storySection.classList.add("show");
            }
        });
/* icon */
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".goal-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
});

// partners
// Partners toggle
document.querySelectorAll(".read-more").forEach(btn => {
  btn.addEventListener("click", function() {
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

// Scroll reveal effect
const cards = document.querySelectorAll(".card");
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  cards.forEach(card => {
    const boxTop = card.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      card.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();



// Team Slider
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".team-container");
  const members = document.querySelectorAll(".team-member");
  const prevBtn = document.querySelector(".team-btn.prev");
  const nextBtn = document.querySelector(".team-btn.next");

  let index = 0;
  const visibleCount = 4; // how many visible at once

  function updateSlider() {
    const memberWidth = members[0].offsetWidth;
    container.style.transform = `translateX(${-index * memberWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (index < members.length - visibleCount) {
      index++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
});


/* -------- Network Map Hover + Lines -------- */
document.addEventListener("DOMContentLoaded", () => {
  const pins = document.querySelectorAll(".pin:not(.origin)");
  const origin = document.querySelector(".pin.origin");
  const tooltip = document.getElementById("tooltip");
  const tooltipFlag = document.getElementById("tooltip-flag");
  const tooltipText = document.getElementById("tooltip-text");
  const svg = document.querySelector(".map-lines");

  // Draw lines from India to each pin
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

    // Tooltip events
    pin.addEventListener("mouseenter", (e) => {
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
