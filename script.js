/* ==========================================
   DYNAMIC CYBER-TECH ENGINE
   File: script.js
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initParticleGrid();
  initScrollAnimations();
  initThemeToggle();
  initTerminal();
  initSmoothNav();
  initFooterYear();
});

/* ------------------------------------------
   1. CANVAS INTERACTIVE NODE-PARTICLE NETWORK
   ------------------------------------------ */
function initParticleGrid() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];
  const particleCount = 65;
  const maxDistance = 120;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 1.8 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / maxDistance) * 0.35;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ------------------------------------------
   2. SCROLL REVEAL & TOP BUTTON
   ------------------------------------------ */
function initScrollAnimations() {
  const sections = document.querySelectorAll("section");
  const scrollTopBtn = document.getElementById("scrollTop");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add("reveal");
    observer.observe(section);
  });

  window.addEventListener("scroll", () => {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
        scrollTopBtn.style.display = "flex";
      } else {
        scrollTopBtn.classList.remove("visible");
        scrollTopBtn.style.display = "none";
      }
    }
  });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ------------------------------------------
   3. LIGHT / DARK THEME TOGGLE
   ------------------------------------------ */
function initThemeToggle() {
  const toggleBtn = document.getElementById("modeToggle");
  if (!toggleBtn) return;

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    document.body.setAttribute("data-theme", "light");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    if (isLight) {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "☀️";
    } else {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "🌙";
    }
  });
}

/* ------------------------------------------
   4. INTERACTIVE TERMINAL ENGINE
   ------------------------------------------ */
function initTerminal() {
  const input = document.querySelector(".term-input");
  const body = document.querySelector(".terminal-body");
  if (!input || !body) return;

  const commands = {
    help: "Available commands: bio, stack, projects, clear",
    bio: "Travis Baker: AI Data Specialist & IT student at FTCC.",
    stack: "Linux (Debian), Python, JavaScript, Devvit, React, Virtualization.",
    projects: "Click Syndicate, Streak Rush, GitHub Portfolio.",
    clear: "CLEAR"
  };

  input.removeAttribute("readonly");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value.trim().toLowerCase();
      if (val === "clear") {
        body.innerHTML = `<p><span class="term-prompt">visitor@travis-baker:~$</span> <input type="text" class="term-input" placeholder="type 'help'..."><span class="cursor"></span></p>`;
        initTerminal();
        return;
      }

      const response = commands[val] || `Command not recognized: '${val}'. Type 'help' for options.`;
      const output = document.createElement("p");
      output.style.color = "#f8fafc";
      output.style.margin = "4px 0 10px 0";
      output.textContent = response;

      body.insertBefore(output, input.parentElement);
      input.value = "";
    }
  });
}

/* ------------------------------------------
   5. NAVIGATION & FOOTER UTILITIES
   ------------------------------------------ */
function initSmoothNav() {
  document.querySelectorAll("nav a, #sidebar a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

function initFooterYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
