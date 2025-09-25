const data = [
  {
    img: "images/britannia.png",
    title: "BRITANNIA",
    text: "The mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that sparkles in the morning sun. As you climb higher, the crisp air fills your lungs, refreshing your soul. The valleys are covered with lush greenery, rivers carving their way through rocks, and small villages that still preserve their age-old traditions."
  },
  {
    img: "images/unilever.png",
    title: "UNILEVER",
    text: "The mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe forest comes alive with sounds—the rustling of leaves, the distant call of exotic birds, and the sudden movement of deer leaping through the thicket. Tigers, elephants, and colorful birds paint the jungle with life."
  },
  {
    img: "images/pynk.png",
    title: "PYNK",
    text: "The mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe city never sleeps. Skyscrapers touch the sky, streets buzz with people chasing their dreams, and neon signs add color to the night. Behind the busy streets lie stories of ambition, struggle, and achievement."
  },
  {
    img: "images/onn.png",
    title: "ONN",
    text: "The mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spThe mountain ranges stand tall and mighty, covered with snow that spImagine golden sands stretching endlessly, waves gently kissing the shore, and the soothing sound of the ocean filling the air. The sunsets here are magical—the sky painted in hues of orange, pink, and purple."
  }
];

let currentIndex = 0;
let autoSlideInterval;

function changeSlide(index) {
  currentIndex = index;
  document.getElementById("carouselImage").style.backgroundImage = `url(${data[index].img})`;
  document.getElementById("carouselTitle").innerText = data[index].title;
  document.getElementById("carouselText").innerText = data[index].text;
  
  // reset auto-slide timer whenever user manually changes slide
  resetAutoSlide();
}

// Auto Slide Function
function autoSlide() {
  currentIndex = (currentIndex + 1) % data.length;
  changeSlide(currentIndex);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoSlide, 5000);
}

// Initialize first slide & auto-slide
changeSlide(0);
resetAutoSlide();


// =================== HERO SLIDER PARTICLES ===================

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = "rgba(0, 247, 255, 0.8)";
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.update();

    // Draw connections between close particles
    for (let j = index; j < particles.length; j++) {
      let dx = particle.x - particles[j].x;
      let dy = particle.y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 247, 255, 0.2)";
        ctx.lineWidth = 0.5;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  });
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
