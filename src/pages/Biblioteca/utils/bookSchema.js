// src/pages/Biblioteca/utils/bookSchema.js

export const BOOK_PLATFORMS = {
  KINDLE: 'kindle',
  PERLEGO: 'perlego', 
  PILGRIM: 'pilgrim',
  PHYSICAL: 'physical',
  PDF: 'pdf',
  OTHER: 'other'
};

export const BOOK_FORMATS = {
  PHYSICAL: 'physical',
  EPUB: 'epub',
  PDF: 'pdf',
  MOBI: 'mobi'
};

export const LIBRARY_LOCATIONS = {
  MAIN: 'biblioteca_principal',
  SP: 'biblioteca_sp', 
  ONLINE: 'online',
  PERSONAL: 'pessoal'
};

export const IMPORTANCE_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium', 
  HIGH: 'high'
};

export const createBookSchema = (overrides = {}) => ({
  // ID e metadados básicos
  id: Date.now().toString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  
  // === INFORMAÇÕES BÁSICAS DO LIVRO ===
  title: '',
  author: '',
  originalIsbn: '',
  
  // === INFORMAÇÕES DE LOCALIZAÇÃO E IDENTIFICAÇÃO ===
  callNumber: '', // Ex: C168i, A123b, etc.
  locations: [], // [biblioteca, kindle, perlego, biblioteca_sp, pilgrim]
  
  // === INFORMAÇÕES DE PUBLICAÇÃO ===
  publisher: '',
  publicationYear: new Date().getFullYear(),
  publicationPlace: '', // Local de publicação
  edition: '1ª', // Edição (1ª, 2ª, etc.)
  
  // === DESCRIÇÃO FÍSICA ===
  physicalDescription: {
    pages: 0,
    dimensions: '', // Ex: "23x16cm"
    illustrations: false,
    color: false,
    volume: '', // Número do volume se for coleção
    condition: 'good' // Estado do livro: new, good, used, poor
  },
  
  // === INFORMAÇÕES ADICIONAIS ===
  series: '', // Nome da série
  mainNote: '', // Nota principal
  secondaryNote: '', // Nota secundária
  dcu: '', // Classificação DCU
  normalizedNumber: '', // ISBN normalizado
  
  // === METADADOS GERAIS ===
  description: '',
  categories: [],
  coverImage: '',
  language: 'pt-BR',
  tags: [], // Tags adicionais para busca
  
  // === EDIÇÕES DISPONÍVEIS ===
  editions: [],
  
  // === INFORMAÇÕES ACADÊMICAS ===
  academicInfo: {
    discipline: '',
    recommendedBy: '', // Quem recomendou
    importanceLevel: IMPORTANCE_LEVELS.MEDIUM,
    semester: '', // Semestre recomendado
    bibliographyType: 'complementary' // basic, complementary, optional
  },
  
  // === NOVO: CONTROLE DE LEITURA ===
  readingProgress: {
    // Capítulos lidos - formato flexível: ["1-5", "8", "10-12"]
    chaptersRead: [],
    
    // Controle de páginas
    pagesRead: 0,
    totalPages: 0, // Será sincronizado com physicalDescription.pages
    
    // Progresso calculado (0-100)
    progress: 0,
    
    // Datas importantes
    startDate: null, // Data que começou a ler
    lastRead: null, // Última data de leitura
    finishDate: null, // Data que terminou
    
    // Histórico de sessões de leitura
    readingSessions: [
      // {
      //   date: '2024-01-15',
      //   pagesRead: 20,
      //   chapters: ['1-2'],
      //   duration: 45, // minutos
      //   notes: 'Leitura inicial'
      // }
    ],
    
    // Metas e planejamento
    readingGoal: null, // Meta de páginas por dia/semana
    deadline: null, // Data limite para terminar
    currentPage: 0, // Página atual (onde parou)
    
    // Anotações pessoais
    personalNotes: '',
    importantQuotes: [] // Citações importantes
  },
  
  // === NOVO: ASSOCIAÇÃO COM DISCIPLINAS ===
  associatedDisciplines: [
    // {
    //   id: 'disciplina-1',
    //   name: 'Teologia Sistemática I',
    //   professor: 'Prof. João Silva',
    //   semester: '2024.1',
    //   isRequired: true // Leitura obrigatória ou complementar
    // }
  ],
  
  // === NOVO: ATIVIDADES RELACIONADAS ===
  relatedActivities: [
    // {
    //   id: 'atividade-1',
    //   title: 'Resumo Capítulos 1-3',
    //   type: 'assignment', // assignment, exam, project, reading
    //   dueDate: '2024-02-15',
    //   status: 'pending', // pending, in_progress, completed, graded
    //   discipline: 'Teologia Sistemática I',
    //   priority: 'high' // low, medium, high
    // }
  ],
  
  // === ESTATÍSTICAS E MÉTRICAS ===
  statistics: {
    timesOpened: 0,
    lastOpened: null,
    totalReadingTime: 0, // em minutos
    averageSessionTime: 0,
    completionRate: 0 // porcentagem de pessoas que terminaram
  },
  
  // === CONFIGURAÇÕES DE VISUALIZAÇÃO ===
  displayPreferences: {
    defaultView: 'grid', // grid, list
    showProgress: true,
    showDisciplines: true,
    showActivities: true
  },
  
  ...overrides
});

export const createEditionSchema = (overrides = {}) => ({
  type: 'digital',
  platform: BOOK_PLATFORMS.OTHER,
  isbn: '',
  format: BOOK_FORMATS.PDF,
  purchaseLink: '',
  accessLink: '',
  price: 0,
  available: true,
  location: '', // Localização física específica
  notes: '', // Observações sobre esta edição
  acquisitionDate: null, // Data de aquisição
  ...overrides
});

export const createReadingSessionSchema = (overrides = {}) => ({
  id: Date.now().toString(),
  date: new Date().toISOString().split('T')[0],
  pagesRead: 0,
  chapters: [],
  duration: 0, // em minutos
  notes: '',
  startPage: 0,
  endPage: 0,
  ...overrides
});

export const createDisciplineAssociationSchema = (overrides = {}) => ({
  id: '',
  name: '',
  professor: '',
  semester: '',
  isRequired: false,
  readingDeadline: null, // Data limite para leitura
  importance: IMPORTANCE_LEVELS.MEDIUM,
  ...overrides
});

export const createActivitySchema = (overrides = {}) => ({
  id: '',
  title: '',
  type: 'assignment', // assignment, exam, project, reading, presentation
  dueDate: null,
  status: 'pending', // pending, in_progress, completed, graded, cancelled
  discipline: '',
  priority: 'medium', // low, medium, high, urgent
  description: '',
  requiredPages: [], // Páginas necessárias para a atividade
  weight: 0, // Peso na nota (0-100)
  grade: null, // Nota recebida
  ...overrides
});

// Funções utilitárias
export const calculateProgress = (pagesRead, totalPages) => {
  if (!totalPages || totalPages === 0) return 0;
  return Math.min(100, Math.round((pagesRead / totalPages) * 100));
};

export const parseChaptersText = (chaptersText) => {
  return chaptersText
    .split(',')
    .map(chap => chap.trim())
    .filter(chap => chap.length > 0);
};

export const formatChaptersDisplay = (chaptersArray) => {
  return chaptersArray.join(', ');
};

export const validatePagesRead = (pagesRead, totalPages) => {
  const pages = parseInt(pagesRead) || 0;
  return Math.max(0, Math.min(pages, totalPages || 0));
};

// Função para inicializar o progresso baseado nas páginas do livro
export const initializeReadingProgress = (book) => {
  return {
    ...book.readingProgress,
    totalPages: book.physicalDescription?.pages || 0,
    progress: calculateProgress(
      book.readingProgress?.pagesRead || 0,
      book.physicalDescription?.pages || 0
    )
  };
};

// Função para atualizar estatísticas
export const updateBookStatistics = (book, newData) => {
  const stats = book.statistics || {};
  
  return {
    timesOpened: (stats.timesOpened || 0) + 1,
    lastOpened: new Date().toISOString(),
    totalReadingTime: stats.totalReadingTime || 0,
    averageSessionTime: stats.averageSessionTime || 0,
    completionRate: stats.completionRate || 0
  };
};