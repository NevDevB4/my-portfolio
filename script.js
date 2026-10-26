/* ============================
   Soft Particle Background
============================ */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticles() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4
    });
  }
}

createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 188, 212, 0.5)";

  particles.forEach(p => {

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) {
      p.dx *= -1;
    }

    if (p.y < 0 || p.y > canvas.height) {
      p.dy *= -1;
    }

  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

/* ============================
   Dark / Light Theme
============================ */

const modeToggle = document.getElementById("modeToggle");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

modeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light")
      ? "light"
      : "dark"
  );

});

/* ============================
   Scroll To Top Button
============================ */

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

  scrollBtn.style.display =
    window.scrollY > 300
      ? "block"
      : "none";

});

scrollBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

/* ============================
   Smooth Navigation Scrolling
============================ */

document.querySelectorAll(
  "nav a, #sidebar a"
).forEach(link => {

  link.addEventListener("click", e => {

    e.preventDefault();

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (target) {

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});

/* ============================
   Section Reveal Animation
============================ */

const sections = document.querySelectorAll("section");

sections.forEach(section => {
  section.classList.add("reveal");
});

function revealSections() {

  const trigger =
    window.innerHeight * 0.85;

  sections.forEach(section => {

    const top =
      section.getBoundingClientRect().top;

    if (top < trigger) {
      section.classList.add("visible");
    }

  });

}

window.addEventListener(
  "scroll",
  revealSections
);

revealSections();

/* ============================
   Dynamic Footer Year
============================ */

const yearElement =
  document.getElementById("year");

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}
