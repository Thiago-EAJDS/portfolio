// Cadastro único de tecnologias. Para adicionar uma, inclua uma linha aqui e
// use o ID em projects.js ou experience.js.
export const LEVELS = {
  1: 'Básico',
  2: 'Iniciante',
  3: 'Intermediário',
  4: 'Intermediário forte',
  5: 'Avançado',
};

export const TECH_CATEGORIES = {
  frontend: 'Frontend',
  mobile: 'Mobile e desktop',
  backend: 'Backend e linguagens',
  database: 'Dados',
  ai: 'Visão computacional e IA',
  quality: 'Testes e CI/CD',
  tools: 'Ferramentas',
  cloud: 'Cloud e sistemas',
};

export const TECHNOLOGIES = {
  html: { name: 'HTML5', category: 'frontend', level: 5 },
  css: { name: 'CSS3', category: 'frontend', level: 5 },
  javascript: { name: 'JavaScript', category: 'frontend', level: 3 },
  typescript: { name: 'TypeScript', category: 'frontend', level: 3 },
  react: { name: 'React', category: 'frontend', level: 2 },
  nextjs: { name: 'Next.js', category: 'frontend', level: 2 },
  tailwind: { name: 'Tailwind CSS', category: 'frontend', level: 2 },
  radix: { name: 'Radix UI', category: 'frontend', level: 2 },
  reactHookForm: { name: 'React Hook Form', category: 'frontend', level: 2 },
  zod: { name: 'Zod', category: 'frontend', level: 2 },
  zustand: { name: 'Zustand', category: 'frontend', level: 2 },

  reactNative: { name: 'React Native / Expo', category: 'mobile', level: 4 },
  flutter: { name: 'Flutter', category: 'mobile', level: 3 },
  javafx: { name: 'JavaFX', category: 'mobile', level: 3 },
  pyside: { name: 'PySide6', category: 'mobile', level: 3 },

  python: { name: 'Python', category: 'backend', level: 4 },
  cpp: { name: 'C / C++', category: 'backend', level: 4 },
  java: { name: 'Java', category: 'backend', level: 3 },
  csharp: { name: 'C#', category: 'backend', level: 3 },
  dart: { name: 'Dart', category: 'backend', level: 3 },
  nodejs: { name: 'Node.js', category: 'backend', level: 2 },
  nestjs: { name: 'NestJS', category: 'backend', level: 2 },
  flask: { name: 'Flask', category: 'backend', level: 2 },

  sqlite: { name: 'SQLite', category: 'database', level: 5 },
  postgresql: { name: 'PostgreSQL', category: 'database', level: 3 },
  supabase: { name: 'Supabase', category: 'database', level: 3 },
  mysql: { name: 'MySQL', category: 'database', level: 3 },
  prisma: { name: 'Prisma', category: 'database', level: 2 },
  firebase: { name: 'Firebase', category: 'database', level: 2 },

  pytorch: { name: 'PyTorch / YOLO', category: 'ai', level: 3 },
  opencv: { name: 'OpenCV', category: 'ai', level: 2 },

  githubActions: { name: 'GitHub Actions', category: 'quality', level: 5 },
  pytest: { name: 'Pytest', category: 'quality', level: 4 },
  vitest: { name: 'Vitest', category: 'quality', level: 3 },
  selenium: { name: 'Selenium', category: 'quality', level: 2 },

  git: { name: 'Git', category: 'tools', level: 5 },
  github: { name: 'GitHub', category: 'tools', level: 5 },
  postman: { name: 'Postman', category: 'tools', level: 3 },
  unity: { name: 'Unity', category: 'tools', level: 3 },
  figma: { name: 'Figma', category: 'tools', level: 2 },
  blender: { name: 'Blender', category: 'tools', level: 2 },

  vercel: { name: 'Vercel', category: 'cloud', level: 5 },
  aws: { name: 'AWS', category: 'cloud', level: 3 },
  linux: { name: 'Linux', category: 'cloud', level: 3 },
  eas: { name: 'EAS', category: 'cloud', level: 3 },
};

// Um ID digitado errado falha com uma mensagem clara, em vez de sumir da página.
export function getTechnology(id) {
  const technology = TECHNOLOGIES[id];
  if (!technology) throw new Error(`Tecnologia não cadastrada: "${id}"`);
  return technology;
}
