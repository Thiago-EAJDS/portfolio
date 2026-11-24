import { initVideoDialog } from './feedback.js';
import { renderExperience, renderProjects, renderTechnologies } from './render.js';

function initTheme() {
  const button = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const updateLabel = () => {
    button.textContent = root.dataset.theme === 'dark' ? 'Tema claro' : 'Tema escuro';
  };
  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch {
      // Sem armazenamento, o tema vale só para esta visita.
    }
    updateLabel();
  });
  updateLabel();
}

function initNavigation() {
  const menu = document.getElementById('nav-links');
  const button = document.getElementById('menu-toggle');
  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      setOpen(false);
      button.focus();
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (!current) return;
      menu.querySelectorAll('a').forEach((link) => {
        if (link.hash === `#${current.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-40% 0px -55%' },
  );
  document.querySelectorAll('main > section[id], footer[id]').forEach((section) => observer.observe(section));
}

initTheme();
initNavigation();
initVideoDialog();
renderTechnologies(renderProjects());
renderExperience();

// O conteúdo acima é inserido por JS: reposiciona quem chegou por um link com âncora.
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
