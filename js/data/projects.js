// category: web, backend, fullstack, mobile ou desktop (os filtros do index.html).
// repository: { visibility: 'public', url } ou { visibility: 'private' }
// youtubeId: ID do vídeo não listado (o trecho após "v="). Sem ID, o botão não aparece.
export const PROJECTS = [
  {
    title: 'Chá e Encantos',
    category: 'fullstack',
    status: 'Concluído',
    description:
      'Site desenvolvido para uma loja de chás como trabalho de faculdade. Inclui catálogo de produtos, carrinho de compras, sistema de pagamento integrado e área administrativa para gerenciamento.',
    highlights: [
      'Navegação interativa',
      'Gerenciamento administrativo',
      'Responsivo e otimizado',
    ],
    technologies: ['firebase', 'html', 'css', 'javascript'],
    repository: { visibility: 'public', url: 'https://github.com/vinicius-fonseca-dev/site-cha-e-encantos' },
  },
  {
    title: 'Simulador de Trânsito',
    category: 'desktop',
    status: 'Concluído',
    description:
      'Simulador de trânsito desenvolvido para trabalho de faculdade utilizando Java e JavaFX. O usuário simula um cenário completo com veículos, semáforos e regras de tráfego.',
    highlights: [
      'Interface interativa',
      'Visualmente intuitivo',
      'Simulação controlável',
    ],
    technologies: ['java', 'javafx'],
    repository: { visibility: 'public', url: 'https://github.com/Thiago-EAJDS/Projeto-Transito' },
  },
  {
    title: 'PetStore & SauceDemo',
    category: 'backend',
    status: 'Concluído',
    description:
      'Projeto de automação de testes desenvolvido como avaliação técnica. Cobre testes de API REST na Petstore e testes E2E no SauceDemo, com relatórios HTML e pipeline de CI/CD integrada.',
    highlights: [
      '22 testes automatizados (API + Web)',
      'Pipeline CI/CD com GitHub Actions',
      'Padrões Page Object Model e Service Layer',
    ],
    technologies: ['python', 'pytest', 'selenium', 'githubActions'],
    repository: { visibility: 'public', url: 'https://github.com/Thiago-EAJDS/PetStore-SauceDemo' },
  },
  {
    title: 'Gestão de Estoque',
    category: 'fullstack',
    status: 'Concluído',
    description:
      'Sistema web completo para gerenciamento de supermercado com dois perfis de acesso. Inclui controle de estoque, catálogo de produtos, carrinho de compras e dashboard administrativo com relatórios.',
    highlights: [
      'Dashboard com alertas de estoque crítico',
      'CRUD completo de produtos e categorias',
      'Fluxo de compra para clientes',
    ],
    technologies: ['python', 'flask', 'sqlite', 'javascript'],
    repository: { visibility: 'public', url: 'https://github.com/Thiago-EAJDS/ProjetoBD_GestaoEstoque' },
  },
  {
    title: 'SoundSearch',
    category: 'mobile',
    status: 'Concluído',
    description:
      'Aplicativo de descoberta musical para a rádio comunitária universitária do ICEV. Os ouvintes buscam músicas, escutam prévias e montam uma lista de sugestões.',
    highlights: [
      'Busca por músicas, álbuns e artistas',
      'Prévia de 30 segundos e lista salva no aparelho',
      'Organização em camadas com Clean Architecture',
    ],
    technologies: ['flutter', 'dart', 'sqlite'],
    repository: { visibility: 'public', url: 'https://github.com/lguimorais/sound_search' },
  },
  {
    title: 'pogo-bot',
    category: 'desktop',
    status: 'Em desenvolvimento',
    description:
      'Automação de um jogo mobile em emulador Android usando apenas a imagem da tela. O sistema captura, reconhece e decide, com painel de controle no Windows.',
    highlights: [
      'Reconhecimento de telas com OpenCV, OCR e rede neural',
      'Modo somente observar, calibração visual e recuperação de erros',
      'Histórico em SQLite com painel de estatísticas',
    ],
    technologies: ['python', 'opencv', 'pytorch', 'pyside', 'sqlite'],
    repository: { visibility: 'private' },
    youtubeId: null,
  },
];
