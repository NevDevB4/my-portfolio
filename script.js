/* ============================
   Particle Background
============================ */
const canvas = document.createElement("canvas");
canvas.id = "particles";
document.body.appendChild(canvas);

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
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8
    });
  }
}
createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 188, 212, 0.7)";

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
   Dark / Light Mode Toggle
============================ */
const modeToggle = document.createElement("button");
modeToggle.innerText = "☀ / 🌙";
modeToggle.style.position = "fixed";
modeToggle.style.left = "20px";
modeToggle.style.bottom = "20px";
modeToggle.style.padding = "10px 14px";
modeToggle.style.borderRadius = "8px";
modeToggle.style.border = "none";
modeToggle.style.background = "#00bcd4";
modeToggle.style.color = "#0f0f0f";
modeToggle.style.cursor = "pointer";
modeToggle.style.fontSize = "1.1em";
modeToggle.style.boxShadow = "0 0 12px rgba(0,188,212,0.4)";
modeToggle.style.zIndex = "999";
document.body.appendChild(modeToggle);

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

/* ============================
   Scroll-to-Top Button
============================ */
const scrollBtn = document.createElement("div");
scrollBtn.id = "scrollTop";
scrollBtn.innerHTML = "↑";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================
   Floating Sidebar
============================ */
const sidebar = document.createElement("div");
sidebar.id = "sidebar";
sidebar.innerHTML = `
  <a href="#summary">Summary</a>
  <a href="#about">About</a>
  <a href="#skills">Skills</a>
  <a href="#tech-stack">Tech Stack</a>
  <a href="#projects">Projects</a>
  <a href="#resume">Resume</a>
  <a href="#contact">Contact</a>
`;
document.body.appendChild(sidebar);

/* ============================
   Section Reveal Animation
============================ */
const sections = document.querySelectorAll("section");

function revealSections() {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add("visible");
  });
}

window.addEventListener("scroll", revealSections);
revealSections();

/* ============================
   Smooth Anchor Scrolling
============================ */
document.querySelectorAll("nav a, #sidebar a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});
