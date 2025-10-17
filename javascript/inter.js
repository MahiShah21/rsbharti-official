document.querySelectorAll(".distributor").forEach(distributor => {
  const circle = distributor.querySelector(".progress-ring__circle");
  const textElement = distributor.querySelector("p");

  // Use a data attribute to track if this distributor has already animated
  distributor.dataset.animated = "false";

  distributor.addEventListener("mouseenter", () => {
    if (distributor.dataset.animated === "true") return; // do nothing if already animated
    distributor.dataset.animated = "true"; // mark as animated

    // Animate circle
    circle.style.strokeDashoffset = "0";

    // Animate text word by word
    const fullText = textElement.innerText.trim();
    const words = fullText.split(" ");
    textElement.innerHTML = ""; // clear text
    textElement.style.opacity = 1; // fade in

    let wordIndex = 0;
    const totalTime = 2000; // same as circle animation duration
    const intervalTime = totalTime / words.length;

    const wordInterval = setInterval(() => {
      textElement.innerHTML += words[wordIndex] + " ";
      wordIndex++;
      if (wordIndex >= words.length) {
        clearInterval(wordInterval);
      }
    }, intervalTime);
  });
});
/* ===== FLAG STRIP INFINITE LOOP ===== */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("flagTrack");
  if (!track) return;

  // Duplicate all flags once for seamless loop
  const clone = track.innerHTML;
  track.innerHTML += clone;
});
