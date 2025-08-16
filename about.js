
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

