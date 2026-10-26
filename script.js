/* ============================
   Soft Particle Background
============================ */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles(); // Re-initialize particles on resize to prevent boundary issues
}

function createParticles() {
  particles = [];
  const count = Math.min(window.innerWidth > 768 ? 50 : 25, 50); // Scale down on mobile for performance

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4
    });
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 188, 212, 0.5)";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

/* ============================
   Dark / Light Theme Toggle
============================ */

const modeToggle = document.getElementById("modeToggle");

// Check saved theme preference
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* ============================
   Scroll To Top Button
============================ */

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (scrollBtn) {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ============================
   Smooth Navigation Scrolling
============================ */

document.querySelectorAll("nav a, #sidebar a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});

/* ============================
   Section Reveal Animation (Observer)
============================ */

const sections = document.querySelectorAll("section");

sections.forEach(section => {
  section.classList.add("reveal");
});

const observerOptions = {
  root: null,
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Optional: stop observing once revealed
      observerInstance.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

/* ============================
   Dynamic Footer Year
============================ */

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
