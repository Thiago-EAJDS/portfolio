import { el } from './dom.js';
import { openVideo, showToast } from './feedback.js';
import { LEVELS, TECHNOLOGIES, TECH_CATEGORIES, getTechnology } from './data/technologies.js';
import { PROJECTS } from './data/projects.js';

const PRIVATE_MESSAGE = 'O código não pode ser acessado: repositório privado.';

const byId = (id) => document.getElementById(id);
const tag = (name) => el('span', { class: 'tag' }, name);

/* ---- Tecnologias ---- */
function techCard({ name, icon, category, level }) {
  const label = LEVELS[level];
  const dots = [1, 2, 3, 4, 5].map((step) => {
    const filled = step <= level ? ' filled' : '';
    const high = level === 5 ? ' high' : '';
    return el('span', { class: `tech-level-dot${filled}${high}` });
  });
  return el(
    'article',
    { class: 'tech-card fade-in', 'data-category': category, role: 'listitem', 'aria-label': `${name} — ${label}` },
    el('span', { class: 'tech-icon', 'aria-hidden': 'true' }, icon),
    el('span', { class: 'tech-name' }, name),
    el('div', { class: 'tech-level', 'aria-label': `Nível: ${label}` }, dots),
    el('span', { class: 'tech-level-label' }, label),
  );
}

export function renderTechnologies() {
  const technologies = Object.values(TECHNOLOGIES);
  byId('tech-grid').replaceChildren(...technologies.map(techCard));
  byId('tech-count').dataset.counter = technologies.length;

  const groups = Object.entries(TECH_CATEGORIES).map(([category, label]) => {
    const names = technologies.filter((t) => t.category === category).map((t) => t.name);
    return el(
      'div',
      { class: 'tech-summary-group' },
      el('h4', {}, label),
      el('div', { class: 'tech-summary-tags' }, names.map(tag)),
    );
  });
  byId('tech-summary-grid').replaceChildren(...groups);
}

/* ---- Projetos ---- */
function arrowIcon() {
  const template = document.createElement('template');
  template.innerHTML =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 10L10 2M4 2h6v6"/></svg>';
  return template.content.firstChild;
}

function codeAction({ title, repository }) {
  const props = { class: 'btn btn-primary', 'aria-label': `Ver código fonte de ${title}` };
  if (repository.visibility === 'private') {
    return el('button', { ...props, type: 'button', onclick: () => showToast(PRIVATE_MESSAGE) }, 'Código', arrowIcon());
  }
  return el(
    'a',
    { ...props, href: repository.url, target: '_blank', rel: 'noopener noreferrer' },
    'Código',
    arrowIcon(),
  );
}

function videoAction(project) {
  if (!project.youtubeId) return null;
  return el(
    'button',
    {
      type: 'button',
      class: 'btn btn-outline',
      'aria-label': `Ver vídeo de ${project.title}`,
      onclick: () => openVideo(project),
    },
    'Vídeo',
  );
}

function projectCard(project) {
  const names = project.technologies.map((id) => getTechnology(id).name);
  return el(
    'article',
    { class: 'project-card fade-in', 'data-category': project.category, role: 'listitem', 'aria-label': project.title },
    el(
      'div',
      { class: 'project-card-header' },
      el('h3', { class: 'project-title' }, project.title),
      el('span', { class: 'project-status' }, project.status),
    ),
    el('p', { class: 'project-desc' }, project.description),
    el(
      'ul',
      { class: 'project-highlights', 'aria-label': 'Destaques' },
      project.highlights.map((text) => el('li', { class: 'project-highlight' }, text)),
    ),
    el('div', { class: 'project-tags', 'aria-label': 'Tecnologias usadas' }, names.map(tag)),
    el('div', { class: 'project-footer' }, codeAction(project), videoAction(project)),
  );
}

export function renderProjects() {
  byId('projects-grid').replaceChildren(...PROJECTS.map(projectCard));
  byId('project-count').dataset.counter = PROJECTS.filter((p) => p.status === 'Concluído').length;

  const used = [...new Set(PROJECTS.flatMap((p) => p.technologies))];
  byId('projects-summary-techs').replaceChildren(...used.map((id) => tag(getTechnology(id).name)));
}
