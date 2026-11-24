// Cadastro único de tecnologias. Para adicionar uma, inclua uma linha aqui e
// use o ID em projects.js. category: frontend, backend, database, tools ou cloud.
export const LEVELS = {
  1: 'Iniciante',
  2: 'Iniciante',
  3: 'Intermediário',
  4: 'Intermediário',
  5: 'Avançado',
};

export const TECH_CATEGORIES = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Ferramentas',
  cloud: 'Cloud',
};

export const TECHNOLOGIES = {
  html: { name: 'HTML5', icon: '🌐', category: 'frontend', level: 5 },
  css: { name: 'CSS3', icon: '🎨', category: 'frontend', level: 5 },
  javascript: { name: 'JavaScript', icon: '🟨', category: 'frontend', level: 3 },
  typescript: { name: 'TypeScript', icon: '🟦', category: 'frontend', level: 3 },
  react: { name: 'React', icon: '⚛️', category: 'frontend', level: 2 },
  nextjs: { name: 'Next.js', icon: '▲', category: 'frontend', level: 2 },
  reactNative: { name: 'React Native', icon: '📱', category: 'frontend', level: 4 },
  javafx: { name: 'JavaFX', icon: '🖥️', category: 'frontend', level: 3 },
  flutter: { name: 'Flutter', icon: '💙', category: 'frontend', level: 3 },
  pyside: { name: 'PySide6', icon: '🪟', category: 'frontend', level: 3 },
  tailwind: { name: 'Tailwind CSS', icon: '🌊', category: 'frontend', level: 2 },
  radix: { name: 'Radix UI', icon: '🧩', category: 'frontend', level: 2 },
  reactHookForm: { name: 'React Hook Form', icon: '📝', category: 'frontend', level: 2 },
  zod: { name: 'Zod', icon: '🛡️', category: 'frontend', level: 2 },
  zustand: { name: 'Zustand', icon: '🐻', category: 'frontend', level: 2 },

  nodejs: { name: 'Node.js', icon: '🟢', category: 'backend', level: 2 },
  nestjs: { name: 'NestJS', icon: '🐈', category: 'backend', level: 2 },
  python: { name: 'Python', icon: '🐍', category: 'backend', level: 4 },
  java: { name: 'Java', icon: '☕', category: 'backend', level: 3 },
  csharp: { name: 'C#', icon: '💜', category: 'backend', level: 3 },
  cpp: { name: 'C / C++', icon: '⚙️', category: 'backend', level: 4 },
  flask: { name: 'Flask', icon: '🌶️', category: 'backend', level: 2 },
  dart: { name: 'Dart', icon: '🎯', category: 'backend', level: 3 },

  sqlite: { name: 'SQLite', icon: '🗃️', category: 'database', level: 5 },
  firebase: { name: 'Firebase', icon: '🔥', category: 'database', level: 2 },
  mysql: { name: 'MySQL', icon: '🗄️', category: 'database', level: 3 },
  postgresql: { name: 'PostgreSQL', icon: '🐘', category: 'database', level: 3 },
  supabase: { name: 'Supabase', icon: '⚡', category: 'database', level: 3 },
  prisma: { name: 'Prisma', icon: '🔺', category: 'database', level: 2 },

  git: { name: 'Git', icon: '🔀', category: 'tools', level: 5 },
  github: { name: 'GitHub', icon: '🐙', category: 'tools', level: 5 },
  githubActions: { name: 'GitHub Actions', icon: '🔁', category: 'tools', level: 5 },
  pytest: { name: 'Pytest', icon: '🧪', category: 'tools', level: 4 },
  vitest: { name: 'Vitest', icon: '✅', category: 'tools', level: 3 },
  figma: { name: 'Figma', icon: '🎭', category: 'tools', level: 2 },
  selenium: { name: 'Selenium', icon: '🤖', category: 'tools', level: 2 },
  postman: { name: 'Postman', icon: '📮', category: 'tools', level: 3 },
  opencv: { name: 'OpenCV', icon: '👁️', category: 'tools', level: 2 },
  pytorch: { name: 'PyTorch / YOLO', icon: '🧠', category: 'tools', level: 3 },
  unity: { name: 'Unity', icon: '🎮', category: 'tools', level: 3 },
  blender: { name: 'Blender', icon: '🧊', category: 'tools', level: 2 },

  aws: { name: 'AWS', icon: '☁️', category: 'cloud', level: 3 },
  linux: { name: 'Linux', icon: '🐧', category: 'cloud', level: 3 },
  vercel: { name: 'Vercel', icon: '🚀', category: 'cloud', level: 5 },
  eas: { name: 'EAS', icon: '📦', category: 'cloud', level: 3 },
};

// Um ID digitado errado falha com uma mensagem clara, em vez de sumir da página.
export function getTechnology(id) {
  const technology = TECHNOLOGIES[id];
  if (!technology) throw new Error(`Tecnologia não cadastrada: "${id}"`);
  return technology;
}
