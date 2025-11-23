// src/components/CreateActivity/utils/constants.js
export const DISCIPLINAS_POR_DEPARTAMENTO = {
  'teologia-sistematica': [
    { codigo: 'TS101', nome: 'Teologia Sistemática I' },
    { codigo: 'TS102', nome: 'Teologia Sistemática II' },
    { codigo: 'TS301', nome: 'Escatologia' }
  ],
  'teologia-historica': [
    { codigo: 'TH01', nome: 'História da Igreja 1' },
    { codigo: 'TH02', nome: 'História da Igreja 2' }
  ],
  'bibliologia': [
    { codigo: 'HB101', nome: 'Hermenêutica Bíblica I' },
    { codigo: 'HB201', nome: 'Introdução ao Antigo Testamento' }
  ],
  'ministerio-pastoral': [
    { codigo: 'MP101', nome: 'Homilética I' },
    { codigo: 'MP301', nome: 'Liturgia e Culto' }
  ],
  'linguas-biblicas': [
    { codigo: 'GR101', nome: 'Grego Bíblico I' },
    { codigo: 'HE101', nome: 'Hebraico Bíblico I' }
  ],
  'missiologia': [
    { codigo: 'MS101', nome: 'Introdução à Missiologia' }
  ]
};

export const TURMAS_DISPONIVEIS = [
  { codigo: '2025A-1S-D', descricao: '2025 A - 1º Semestre - Diurno' },
  { codigo: '2025A-1S-N', descricao: '2025 A - 1º Semestre - Noturno' },
  { codigo: '2024A-1S-D', descricao: '2024 A - 1º Semestre - Diurno' }
];

export const PRIORIDADES = [
  { valor: 'alta', label: 'Alta Prioridade' },
  { valor: 'media', label: 'Média Prioridade' },
  { valor: 'baixa', label: 'Baixa Prioridade' }
];

export const SEMESTRES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];