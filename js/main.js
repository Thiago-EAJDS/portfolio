/* ============================================
   MAIN JS
   Portfólio Thiago Emanuel
   ============================================ */

/* ---- Theme Toggle ---- */
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

/* ---- Navbar scroll + active link ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');

  // Scrolled class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    updateActiveLink();
  }, { passive: true });

  // Active section highlight
  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  // Mobile menu
  const menuBtn = document.getElementById('nav-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
    });
  });
}

/* ---- Background animated circles ---- */
function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let circles = [];
  let animFrame;
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function getAccentColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'light' ? '107, 68, 184' : '124, 92, 191';
  }

  function createCircles() {
    circles = [];
    const count = Math.min(14, Math.floor(W / 120));
    for (let i = 0; i < count; i++) {
      circles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 60 + Math.random() * 180,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        opacity: 0.04 + Math.random() * 0.07,
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.004
      });
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, W, H);
    const color = getAccentColor();

    circles.forEach(c => {
      c.phase += c.speed;
      c.x += c.dx;
      c.y += c.dy;

      // Wrap around edges
      if (c.x < -c.r) c.x = W + c.r;
      if (c.x > W + c.r) c.x = -c.r;
      if (c.y < -c.r) c.y = H + c.r;
      if (c.y > H + c.r) c.y = -c.r;

      const pulsedR = c.r + Math.sin(c.phase) * 12;
      const pulsedOpacity = c.opacity + Math.sin(c.phase * 1.3) * 0.02;

      // Filled circle (very low opacity)
      ctx.beginPath();
      ctx.arc(c.x, c.y, pulsedR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${Math.max(0.02, pulsedOpacity)})`;
      ctx.fill();

      // Ring
      ctx.beginPath();
      ctx.arc(c.x, c.y, pulsedR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color}, ${Math.max(0.05, pulsedOpacity * 1.6)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  createCircles();
  draw(0);

  window.addEventListener('resize', () => {
    resize();
    createCircles();
  }, { passive: true });

  // Re-render on theme change
  const observer = new MutationObserver(() => {});
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

/* ---- Scroll fade-in observer ---- */
function initScrollReveal() {
  const els = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on index within parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.fade-in')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ---- Tech filter tabs ---- */
function initTechFilter() {
  const tabs = document.querySelectorAll('#tecnologias .filter-tab');
  const cards = document.querySelectorAll('.tech-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.setAttribute('data-hidden', !match);
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ---- Projects filter tabs ---- */
function initProjectFilter() {
  const tabs = document.querySelectorAll('#projetos .filter-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ---- Animated counter ---- */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ---- Smooth scroll anchor override ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initBackground();
  initScrollReveal();
  initTechFilter();
  initProjectFilter();
  initCounters();
  initSmoothScroll();

  // Theme toggle button
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
});