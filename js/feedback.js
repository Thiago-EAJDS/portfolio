import { el } from './dom.js';

const TOAST_DURATION = 5000;
let toastTimer;

export function showToast(message) {
  const region = document.getElementById('toast-region');
  const pause = () => clearTimeout(toastTimer);
  const close = () => {
    pause();
    region.replaceChildren();
  };
  const start = () => {
    pause();
    toastTimer = setTimeout(close, TOAST_DURATION);
  };
  region.replaceChildren(
    el(
      'div',
      { class: 'toast', onmouseenter: pause, onmouseleave: start, onfocusin: pause, onfocusout: start },
      el('p', {}, message),
      el('button', { type: 'button', class: 'icon-button', 'aria-label': 'Fechar aviso', onclick: close }, '×'),
    ),
  );
  start();
}

export function initVideoDialog() {
  const dialog = document.getElementById('video-dialog');
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  // Remover o iframe interrompe o vídeo.
  dialog.addEventListener('close', () => dialog.querySelector('.video-frame').replaceChildren());
}

export function openVideo({ title, youtubeId }) {
  const dialog = document.getElementById('video-dialog');
  dialog.querySelector('h2').textContent = title;
  dialog.querySelector('.video-frame').replaceChildren(
    el('iframe', {
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?rel=0`,
      title: `Demonstração do projeto ${title}`,
      allow: 'encrypted-media; picture-in-picture; fullscreen',
      referrerpolicy: 'strict-origin-when-cross-origin',
    }),
  );
  dialog.showModal();
}
