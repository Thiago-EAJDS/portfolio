import { el } from './dom.js';
import { openVideo, showToast } from './feedback.js';
import { LEVELS, TECHNOLOGIES, TECH_CATEGORIES, getTechnology } from './data/technologies.js';
import { PROJECTS, PROJECT_CATEGORIES } from './data/projects.js';
import { CERTIFICATIONS, EXPERIENCES } from './data/experience.js';

const PRIVATE_MESSAGE = 'O código não pode ser acessado: repositório privado.';

const techList = (ids, extra = []) =>
  el(
    'ul',
    { class: 'tags', 'aria-label': 'Tecnologias' },
    [...ids.map((id) => getTechnology(id).name), ...extra].map((name) => el('li', {}, name)),
  );

const bullets = (items) => el('ul', { class: 'bullets' }, items.map((item) => el('li', {}, item)));

function codeAction({ title, repository }) {
  const props = { class: 'button', 'aria-label': `Código de ${title}` };
  if (repository.visibility === 'private') {
    return el('button', { ...props, type: 'button', onclick: () => showToast(PRIVATE_MESSAGE) }, 'Código');
  }
  return el('a', { ...props, href: repository.url, target: '_blank', rel: 'noopener noreferrer' }, 'Código');
}

function videoAction(project) {
  if (!project.youtubeId) return null;
  return el(
    'button',
    {
      type: 'button',
      class: 'button button-primary',
      'aria-label': `Ver vídeo de ${project.title}`,
      onclick: () => openVideo(project),
    },
    'Ver vídeo',
  );
}

function projectRow(project) {
  return el(
    'article',
    { class: 'project' },
    el('header', {}, el('h3', {}, project.title), el('p', { class: 'muted' }, project.status)),
    el(
      'div',
      { class: 'project-body' },
      el('p', {}, project.description),
      bullets(project.highlights),
      techList(project.technologies),
    ),
    el('div', { class: 'project-actions' }, videoAction(project), codeAction(project)),
  );
}

// Filtro genérico, usado por projetos e por tecnologias.
// Devolve uma função que seleciona uma opção; null desmarca todas.
function buildFilter(container, options, onChange) {
  const values = Object.keys(options);
  const buttons = values.map((value) =>
    el('button', { type: 'button', class: 'filter', onclick: () => select(value) }, options[value]),
  );
  function select(value) {
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(values[i] === value)));
    if (value !== null) onChange(value);
  }
  container.replaceChildren(...buttons);
  return select;
}

export function renderProjects() {
  const list = document.getElementById('project-list');
  const notice = document.getElementById('project-notice');
  const heading = document.getElementById('projetos-titulo');
  const show = (projects) => list.replaceChildren(...projects.map(projectRow));
  const used = Object.entries(PROJECT_CATEGORIES).filter(([id]) => PROJECTS.some((p) => p.category === id));

  const select = buildFilter(
    document.getElementById('project-filters'),
    { all: 'Todos', ...Object.fromEntries(used) },
    (category) => {
      notice.replaceChildren();
      show(PROJECTS.filter((p) => category === 'all' || p.category === category));
    },
  );
  select('all');

  return function showByTechnology(id) {
    select(null);
    show(PROJECTS.filter((p) => p.technologies.includes(id)));
    const clear = () => {
      select('all');
      heading.focus({ preventScroll: true });
    };
    notice.replaceChildren(
      el('span', {}, `Projetos com ${getTechnology(id).name}`),
      el('button', { type: 'button', class: 'text-button', onclick: clear }, 'Limpar seleção'),
    );
    heading.scrollIntoView();
    heading.focus({ preventScroll: true });
  };
}

function projectCount(id, onSelect) {
  const count = PROJECTS.filter((p) => p.technologies.includes(id)).length;
  if (!count) return null;
  const label = count === 1 ? '1 projeto' : `${count} projetos`;
  return el(
    'button',
    {
      type: 'button',
      class: 'text-button',
      'aria-label': `${label} com ${getTechnology(id).name}`,
      onclick: () => onSelect(id),
    },
    label,
  );
}

function techRow([id, tech], onSelect) {
  const steps = [1, 2, 3, 4, 5].map((step) => el('i', { class: step <= tech.level ? 'on' : '' }));
  return el(
    'li',
    { class: 'tech' },
    el('span', { class: 'tech-name' }, tech.name),
    el('span', { class: 'meter', 'aria-hidden': 'true' }, steps),
    el('span', { class: 'muted tech-level' }, LEVELS[tech.level]),
    projectCount(id, onSelect),
  );
}

export function renderTechnologies(onSelect) {
  const entries = Object.entries(TECHNOLOGIES);
  document.getElementById('tech-count').textContent = entries.length;

  const groups = Object.entries(TECH_CATEGORIES).map(([category, label]) => {
    const rows = entries.filter(([, tech]) => tech.category === category).map((entry) => techRow(entry, onSelect));
    return [category, el('section', { class: 'tech-group' }, el('h3', {}, label), el('ul', {}, rows))];
  });
  document.getElementById('tech-groups').replaceChildren(...groups.map(([, group]) => group));

  const select = buildFilter(
    document.getElementById('tech-filters'),
    { all: 'Todas', ...TECH_CATEGORIES },
    (selected) => {
      groups.forEach(([category, group]) => {
        group.hidden = selected !== 'all' && selected !== category;
      });
    },
  );
  select('all');
}

export function renderExperience() {
  const jobs = EXPERIENCES.map((job) =>
    el(
      'li',
      { class: 'job' },
      el('div', { class: 'job-when' }, el('p', {}, job.period), el('p', { class: 'muted' }, job.place)),
      el(
        'div',
        {},
        el('h3', {}, job.role),
        el('p', { class: 'job-company' }, job.company),
        el('p', {}, job.description),
        bullets(job.duties),
        techList(job.technologies, job.skills),
      ),
    ),
  );
  document.getElementById('experience-list').replaceChildren(...jobs);

  const certifications = CERTIFICATIONS.map(({ name, year }) =>
    el('li', {}, el('span', {}, name), el('span', { class: 'muted' }, String(year))),
  );
  document.getElementById('certification-list').replaceChildren(...certifications);
}
