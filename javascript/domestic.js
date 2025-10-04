const data = [
  {
    img: "images/britannia.png",
    title: "BRITANNIA",
    text: "For over 130 years, Britannia has been a cherished part of life for millions of families across India and the world. Since our humble beginnings in 1892, we've grown into one of India's leading and most trusted food companies, committed to the promise of 'Eat Healthy, Think Better.' Our journey is one built on a legacy of quality, innovation, and an unwavering commitment to bringing delicious and wholesome food to your table. From the iconic crunch of Marie Gold to the melt-in-your-mouth goodness of Good Day cookies and our trusted range of breads and dairy products, we craft every product with care, ensuring that every bite is a moment of delight and nutrition."  },
  {
    img: "images/unilever.png",
    title: "UNILEVER",
    text: "Every day, you interact with a Unilever brand. Our expansive and iconic portfolio covers four main business groups: Beauty & Wellbeing, Personal Care, Home Care, and Nutrition. We aim to meet your everyday needs and help you feel good, look good, and get more out of life. Wake up with the freshness of a Dove or Lux soap, enjoy a delicious meal made with Knorr, or clean your home with trusted names like Domestos. From the irresistible pleasure of Magnum to the vital hydration of Liquid I.V., Unilever's brands are committed to quality, innovation, and enriching your daily routine. " },
  {
    img: "images/pynk.png",
    title: "PYNK",
    text: "Pynk is the dynamic women's wear brand from the trusted house of Lux Industries, crafted for the modern Indian woman. Drawing on a legacy of quality and comfort, Pynk is not just clothing; it is a mindset of fluid femininity that celebrates a woman's journey, resilience, and pride. Our collection seamlessly blends comfort, contemporary design, and confidence across a wide range of apparel. We are committed to making fashionable and high-quality women's wear accessible across the country, ensuring that every woman can move freely and express herself unapologetically, feeling both comfortable and confident, every single day"  },
  {
    img: "images/onn.png",
    title: "ONN",
    text: "ONN is a consumer electronics brand focused on delivering thoughtfully designed tech and accessories that offer great value. Primarily known for its availability through a major US retailer, ONN's mission is to make modern technology accessible for everyday life. Their product line includes a wide array of items, such as 4K streaming devices with Google TV, high-quality HDMI cables, TV wall mounts, and affordable tablets for both adults and kids. ONN provides essential tech solutions that are simple to use and easy on the wallet, ensuring you stay connected and entertained. " }
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
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
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