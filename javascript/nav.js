document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      toggle.setAttribute(
        "aria-expanded",
        nav.classList.contains("active") ? "true" : "false"
      );
    });
  } else {
    console.warn("Menu toggle or nav-links element not found on this page.");
  }
});
