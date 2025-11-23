// Datas principais do Gráfico
export const CHART_START_DATE = '2025-11-01';
export const CHART_END_DATE = '2025-12-10';

// ==========================================================
// DADOS DO GRÁFICO DE GANTT (17 Tarefas)
// ==========================================================
export const tasksData = [
  // Hermenêutica 2
  { id: 1, subject: "Hermenêutica 2", title: "Resumo Crítico", start: "2025-11-05", end: "2025-11-18", color: "#8e44ad" },
  { id: 13, subject: "Hermenêutica 2", title: "Lista de Exercícios", start: "2025-11-07", end: "2025-11-12", color: "#8e44ad" },
  { id: 14, subject: "Hermenêutica 2", title: "Seminário", start: "2025-11-20", end: "2025-11-25", color: "#8e44ad" },
  
  // Português 2
  { id: 2, subject: "Português 2", title: "Redação Final", start: "2025-11-02", end: "2025-11-08", color: "#1a73e8" },
  { id: 15, subject: "Português 2", title: "Análise Textual", start: "2025-11-10", end: "2025-11-15", color: "#1a73e8" },
  
  // Outras
  { id: 3, subject: "História da Filosofia 1", title: "Trabalho H.F.", start: "2025-11-10", end: "2025-11-20", color: "#43a047" },
  { id: 4, subject: "Antropologia Geral", title: "Apresentação", start: "2025-11-12", end: "2025-11-22", color: "#fb8c00" },
  
  // Inglês 2
  { id: 5, subject: "Inglês 2", title: "Prova Oral", start: "2025-11-18", end: "2025-11-25", color: "#90caf9" },
  { id: 16, subject: "Inglês 2", title: "Tradução", start: "2025-11-05", end: "2025-11-10", color: "#90caf9" },
  
  // Diversas
  { id: 6, subject: "Lógica", title: "Exercícios", start: "2025-11-01", end: "2025-11-06", color: "#6d4c41" },
  { id: 7, subject: "Psicopatologia", title: "Estudo Caso", start: "2025-11-07", end: "2025-11-16", color: "#5e35b1" },
  { id: 8, subject: "Introdução ao AT", title: "Leitura Inicial", start: "2025-11-03", end: "2025-11-09", color: "#e74c3c" },
  
  // Hebraico 2
  { id: 9, subject: "Hebraico 2", title: "Vocabulário", start: "2025-11-21", end: "2025-11-30", color: "#00897b" },
  { id: 17, subject: "Hebraico 2", title: "Gramática", start: "2025-11-25", end: "2025-12-02", color: "#00897b" },
  
  // Finais
  { id: 10, subject: "Grego 2", title: "Prova", start: "2025-12-01", end: "2025-12-05", color: "#337ab7" },
  { id: 11, subject: "Homilética/Culto", title: "Roteiro de Culto", start: "2025-11-14", end: "2025-11-26", color: "#c62828" },
  { id: 12, subject: "Teologia Sistemática 1", title: "Ensaio TS1", start: "2025-11-08", end: "2025-11-15", color: "#f39c12" }
];

// ==========================================================
// DADOS DA LISTA (Sincronizados com o Gráfico + Detalhes)
// ==========================================================
export const atividadesData = [
  { 
    id: 1, 
    dataEntrega: '2025-11-18', 
    disciplina: 'Hermenêutica 2', 
    nome: 'Resumo Crítico',
    codAtividade: 'HERM-01', codDisciplina: 'HB-102',
    objetivos: 'Analisar a obra de Schaeffer sob a ótica reformada.',
    bibliografia: 'Francis Schaeffer - A Morte da Razão.'
  },
  { 
    id: 13, 
    dataEntrega: '2025-11-12', 
    disciplina: 'Hermenêutica 2', 
    nome: 'Lista de Exercícios',
    codAtividade: 'HERM-02', codDisciplina: 'HB-102',
    objetivos: 'Fixar conceitos de exegese bíblica.',
    bibliografia: 'Osborne - A Espiral Hermenêutica.'
  },
  { 
    id: 14, 
    dataEntrega: '2025-11-25', 
    disciplina: 'Hermenêutica 2', 
    nome: 'Seminário',
    codAtividade: 'HERM-03', codDisciplina: 'HB-102',
    objetivos: 'Apresentação em grupo sobre Tipologia.',
    bibliografia: 'Berkhof - Princípios de Interpretação Bíblica.'
  },
  { 
    id: 2, 
    dataEntrega: '2025-11-08', 
    disciplina: 'Português 2', 
    nome: 'Redação Final',
    codAtividade: 'PORT-05', codDisciplina: 'LET-201',
    objetivos: 'Desenvolver argumentação dissertativa.',
    bibliografia: 'Othon Garcia - Comunicação em Prosa Moderna.'
  },
  { 
    id: 15, 
    dataEntrega: '2025-11-15', 
    disciplina: 'Português 2', 
    nome: 'Análise Textual',
    codAtividade: 'PORT-06', codDisciplina: 'LET-201',
    objetivos: 'Identificar figuras de linguagem em textos clássicos.',
    bibliografia: 'Bechara - Moderna Gramática Portuguesa.'
  },
  { 
    id: 3, 
    dataEntrega: '2025-11-20', 
    disciplina: 'História da Filosofia 1', 
    nome: 'Trabalho H.F.',
    codAtividade: 'FIL-03', codDisciplina: 'FIL-101',
    objetivos: 'Comparar Platão e Aristóteles.',
    bibliografia: 'Marilena Chaui - Convite à Filosofia.'
  },
  { 
    id: 4, 
    dataEntrega: '2025-11-22', 
    disciplina: 'Antropologia Geral', 
    nome: 'Apresentação',
    codAtividade: 'ANT-02', codDisciplina: 'SOC-202',
    objetivos: 'Discutir cultura e cosmovisão.',
    bibliografia: 'Hiebert - O Evangelho e a Diversidade das Culturas.'
  },
  { 
    id: 5, 
    dataEntrega: '2025-11-25', 
    disciplina: 'Inglês 2', 
    nome: 'Prova Oral',
    codAtividade: 'ING-10', codDisciplina: 'LET-302',
    objetivos: 'Avaliação de fluência e vocabulário teológico.',
    bibliografia: 'English for Theology Students.'
  },
  { 
    id: 16, 
    dataEntrega: '2025-11-10', 
    disciplina: 'Inglês 2', 
    nome: 'Tradução',
    codAtividade: 'ING-09', codDisciplina: 'LET-302',
    objetivos: 'Traduzir artigo de J.I. Packer.',
    bibliografia: 'Dicionário Oxford.'
  },
  { 
    id: 6, 
    dataEntrega: '2025-11-06', 
    disciplina: 'Lógica', 
    nome: 'Exercícios',
    codAtividade: 'LOG-01', codDisciplina: 'FIL-105',
    objetivos: 'Exercícios sobre falácias lógicas.',
    bibliografia: 'Copi - Introdução à Lógica.'
  },
  { 
    id: 7, 
    dataEntrega: '2025-11-16', 
    disciplina: 'Psicopatologia', 
    nome: 'Estudo Caso',
    codAtividade: 'PSI-04', codDisciplina: 'PSI-301',
    objetivos: 'Análise de caso clínico sob perspectiva cristã.',
    bibliografia: 'Dalgalarrondo - Psicopatologia e Semiologia.'
  },
  { 
    id: 8, 
    dataEntrega: '2025-11-09', 
    disciplina: 'Introdução ao AT', 
    nome: 'Leitura Inicial',
    codAtividade: 'BIB-01', codDisciplina: 'HB-201',
    objetivos: 'Leitura do Pentateuco.',
    bibliografia: 'Lasor, Hubbard & Bush - Introdução ao AT.'
  },
  { 
    id: 9, 
    dataEntrega: '2025-11-30', 
    disciplina: 'Hebraico 2', 
    nome: 'Vocabulário',
    codAtividade: 'HEB-15', codDisciplina: 'HE-102',
    objetivos: 'Memorização de 50 palavras frequentes.',
    bibliografia: 'Ross - Gramática do Hebraico Bíblico.'
  },
  { 
    id: 17, 
    dataEntrega: '2025-12-02', 
    disciplina: 'Hebraico 2', 
    nome: 'Gramática',
    codAtividade: 'HEB-16', codDisciplina: 'HE-102',
    objetivos: 'Exercícios sobre verbos fortes.',
    bibliografia: 'Mendes - Noções de Gramática Hebraica.'
  },
  { 
    id: 10, 
    dataEntrega: '2025-12-05', 
    disciplina: 'Grego 2', 
    nome: 'Prova',
    codAtividade: 'GRE-12', codDisciplina: 'GR-102',
    objetivos: 'Avaliação final do semestre.',
    bibliografia: 'Mounce - Grego Bíblico.'
  },
  { 
    id: 11, 
    dataEntrega: '2025-11-26', 
    disciplina: 'Homilética', 
    nome: 'Roteiro de Culto',
    codAtividade: 'HOM-05', codDisciplina: 'MP-101',
    objetivos: 'Elaborar uma liturgia completa.',
    bibliografia: 'Chapell - Pregação Cristocêntrica.'
  },
  { 
    id: 12, 
    dataEntrega: '2025-11-15', 
    disciplina: 'Teologia Sistemática', 
    nome: 'Ensaio TS1',
    codAtividade: 'SIS-08', codDisciplina: 'TS-101',
    objetivos: ' Escrever sobre a Inerrância Bíblica.',
    bibliografia: 'Grudem - Teologia Sistemática.'
  }
];
