import React, { useState, useEffect } from 'react';

const AtividadesCadastradasSection = ({ atividades = [], onEdit, onDelete, onCopy }) => {
  // ✅ GARANTE QUE atividades SEMPRE É UM ARRAY
  const safeAtividades = Array.isArray(atividades) ? atividades : [];
  
  const [filtros, setFiltros] = useState({
    departamento: '',
    disciplina: '',
    ano: ''
  });

  const [atividadesFiltradas, setAtividadesFiltradas] = useState([]);
  const [disciplinasFiltro, setDisciplinasFiltro] = useState([]);

  // Dados mockados para os filtros
  const departamentos = [
    { value: 'teologia-sistematica', label: 'Teologia Sistemática' },
    { value: 'teologia-historica', label: 'Teologia Histórica' },
    { value: 'bibliologia', label: 'Bibliologia' },
    { value: 'ministerio-pastoral', label: 'Ministério Pastoral' },
    { value: 'linguas-biblicas', label: 'Línguas Bíblicas' },
    { value: 'missiologia', label: 'Missiologia' }
  ];

  const anos = [2024, 2023, 2022];

  const DISCIPLINAS_POR_DEPARTAMENTO = {
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

  // Filtra atividades quando mudam os filtros ou a lista de atividades
  useEffect(() => {
    filtrarAtividades();
  }, [filtros, safeAtividades]);

  // Atualiza disciplinas quando muda o departamento
  useEffect(() => {
    if (filtros.departamento) {
      const disciplinas = DISCIPLINAS_POR_DEPARTAMENTO[filtros.departamento] || [];
      setDisciplinasFiltro(disciplinas);
    } else {
      setDisciplinasFiltro([]);
    }
  }, [filtros.departamento]);

  const filtrarAtividades = () => {
    let filtradas = [...safeAtividades];

    // Filtro por departamento
    if (filtros.departamento) {
      filtradas = filtradas.filter(atividade => 
        atividade.departamento === filtros.departamento
      );
    }

    // Filtro por disciplina
    if (filtros.disciplina) {
      filtradas = filtradas.filter(atividade => 
        atividade.disciplina === filtros.disciplina
      );
    }

    // Filtro por ano
    if (filtros.ano) {
      filtradas = filtradas.filter(atividade => 
        atividade.ano && atividade.ano.toString() === filtros.ano
      );
    }

    setAtividadesFiltradas(filtradas);
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => {
      const novosFiltros = { ...prev, [campo]: valor };
      
      // Se mudou o departamento, limpa a disciplina
      if (campo === 'departamento') {
        novosFiltros.disciplina = '';
      }
      
      return novosFiltros;
    });
  };

  const formatarData = (dataString) => {
    try {
      if (!dataString) return 'Data não definida';
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  const getPrioridadeClass = (prioridade) => {
    if (!prioridade) return 'media';
    
    switch (prioridade) {
      case 'alta': return 'alta';
      case 'media': return 'media';
      case 'baixa': return 'baixa';
      default: return 'media';
    }
  };

  const handleEdit = (atividade) => {
    if (onEdit && typeof onEdit === 'function') {
      onEdit(atividade);
    }
  };

  const handleDelete = (id) => {
    if (onDelete && typeof onDelete === 'function') {
      onDelete(id);
    }
  };

  const handleCopy = (atividade) => {
    if (onCopy && typeof onCopy === 'function') {
      onCopy(atividade);
    }
  };

  const styles = {
    section: {
      marginBottom: '25px', 
      paddingBottom: '20px', 
      borderBottom: '1px dashed #eee'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: 0,
      color: '#007bff',
      fontSize: '1.2rem',
      fontWeight: '600'
    },
    countBadge: {
      background: '#007bff',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    filtrosContainer: {
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #e9ecef'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '15px',
      marginBottom: '0'
    },
    formGroup: {
      marginBottom: '0'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      fontSize: '0.9rem',
      color: '#555'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '0.9rem',
      backgroundColor: 'white'
    },
    listaAtividades: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    atividadeItem: {
      background: 'white',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      padding: '20px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    atividadeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px',
      gap: '15px'
    },
    atividadeInfo: {
      flex: 1
    },
    codigoTurma: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '5px'
    },
    codigo: {
      background: '#495057',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: '600',
      fontFamily: 'monospace'
    },
    turma: {
      background: '#e9ecef',
      color: '#495057',
      padding: '2px 6px',
      borderRadius: '10px',
      fontSize: '0.7rem',
      fontWeight: '500',
      border: '1px solid #dee2e6',
      fontFamily: 'monospace'
    },
    criador: {
      color: '#6c757d',
      fontSize: '0.8rem',
      fontStyle: 'italic'
    },
    acoes: {
      display: 'flex',
      gap: '5px',
      flexShrink: 0
    },
    btnAcao: {
      background: 'none',
      border: 'none',
      padding: '6px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    btnEditar: {
      color: '#007bff',
      border: '1px solid #007bff'
    },
    btnExcluir: {
      color: '#dc3545',
      border: '1px solid #dc3545'
    },
    btnCopiar: {
      color: '#28a745',
      border: '1px solid #28a745'
    },
    titulo: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#212529',
      marginBottom: '12px',
      lineHeight: '1.4'
    },
    meta: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '12px'
    },
    metaItem: {
      padding: '3px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    disciplina: {
      background: '#e3f2fd',
      color: '#007bff',
      border: '1px solid #007bff'
    },
    ano: {
      background: '#fff3cd',
      color: '#856404',
      border: '1px solid #ffc107'
    },
    prioridade: {
      background: '#f8d7da',
      color: '#721c24',
      border: '1px solid #dc3545'
    },
    prioridadeMedia: {
      background: '#fff3cd',
      color: '#856404',
      border: '1px solid #ffc107'
    },
    prioridadeBaixa: {
      background: '#d1ecf1',
      color: '#0c5460',
      border: '1px solid #17a2b8'
    },
    valor: {
      background: '#d4edda',
      color: '#155724',
      border: '1px solid #28a745'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '12px',
      borderTop: '1px solid #e9ecef'
    },
    data: {
      color: '#6c757d',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    status: {
      padding: '2px 8px',
      borderRadius: '10px',
      fontSize: '0.7rem',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    statusAtiva: {
      background: '#d4edda',
      color: '#155724',
      border: '1px solid #28a745'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#6c757d'
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '10px',
      opacity: '0.5'
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>
        <i className="fa-solid fa-list-check"></i>
        Atividades Cadastradas
        <span style={styles.countBadge}>{atividadesFiltradas.length}</span>
      </h3>

      {/* Filtros */}
      <div style={styles.filtrosContainer}>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Filtrar por Departamento</label>
            <select 
              style={styles.select}
              value={filtros.departamento}
              onChange={(e) => handleFiltroChange('departamento', e.target.value)}
            >
              <option value="">Todos os departamentos</option>
              {departamentos.map(depto => (
                <option key={depto.value} value={depto.value}>
                  {depto.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Filtrar por Disciplina</label>
            <select 
              style={styles.select}
              value={filtros.disciplina}
              onChange={(e) => handleFiltroChange('disciplina', e.target.value)}
              disabled={!filtros.departamento}
            >
              <option value="">Todas as disciplinas</option>
              {disciplinasFiltro.map(disc => (
                <option key={disc.codigo} value={disc.codigo}>
                  {disc.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Filtrar por Ano</label>
            <select 
              style={styles.select}
              value={filtros.ano}
              onChange={(e) => handleFiltroChange('ano', e.target.value)}
            >
              <option value="">Todos os anos</option>
              {anos.map(ano => (
                <option key={ano} value={ano.toString()}>
                  {ano}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Atividades */}
      <div style={styles.listaAtividades}>
        {atividadesFiltradas.length === 0 ? (
          <div style={styles.emptyState}>
            <i className="fa-solid fa-clipboard-list" style={styles.emptyIcon}></i>
            <h4 style={{margin: '10px 0 5px 0', color: '#495057'}}>
              {safeAtividades.length === 0 ? 'Nenhuma atividade cadastrada' : 'Nenhuma atividade encontrada'}
            </h4>
            <p style={{margin: 0, color: '#6c757d'}}>
              {safeAtividades.length === 0 
                ? 'As atividades aparecerão aqui após serem criadas' 
                : 'Utilize os filtros acima para refinar sua busca'
              }
            </p>
          </div>
        ) : (
          atividadesFiltradas.map((atividade) => (
            <div 
              key={atividade.id || Math.random()} 
              style={styles.atividadeItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#007bff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#e9ecef';
              }}
            >
              {/* Cabeçalho com código, turma e ações */}
              <div style={styles.atividadeHeader}>
                <div style={styles.atividadeInfo}>
                  <div style={styles.codigoTurma}>
                    <span style={styles.codigo}>{atividade.codigo || 'Sem código'}</span>
                    <span style={styles.turma}>{atividade.turma || 'Sem turma'}</span>
                  </div>
                  <div style={styles.criador}>
                    <i className="fa-solid fa-user"></i>
                    Criado por: {atividade.criado_por_nome || 'Sistema'}
                  </div>
                </div>
                
                <div style={styles.acoes}>
                  <button 
                    style={{...styles.btnAcao, ...styles.btnCopiar}}
                    onClick={() => handleCopy(atividade)}
                    title="Copiar atividade"
                  >
                    <i className="fa-solid fa-copy"></i>
                  </button>
                  <button 
                    style={{...styles.btnAcao, ...styles.btnEditar}}
                    onClick={() => handleEdit(atividade)}
                    title="Editar atividade"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button 
                    style={{...styles.btnAcao, ...styles.btnExcluir}}
                    onClick={() => handleDelete(atividade.id)}
                    title="Excluir atividade"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>

              {/* Título */}
              <div style={styles.titulo}>{atividade.titulo || 'Sem título'}</div>

              {/* Metadados */}
              <div style={styles.meta}>
                <span style={{...styles.metaItem, ...styles.disciplina}}>
                  {atividade.disciplina || 'Sem disciplina'}
                </span>
                <span style={{...styles.metaItem, ...styles.ano}}>
                  {atividade.ano || '?'}/{atividade.semestre || '?'}º
                </span>
                <span style={{
                  ...styles.metaItem, 
                  ...styles[getPrioridadeClass(atividade.prioridade) === 'alta' ? 'prioridade' : 
                           getPrioridadeClass(atividade.prioridade) === 'media' ? 'prioridadeMedia' : 'prioridadeBaixa']
                }}>
                  {atividade.prioridade || 'media'}
                </span>
                <span style={{...styles.metaItem, ...styles.valor}}>
                  {atividade.valor || '0'} pts
                </span>
              </div>

              {/* Rodapé com data e status */}
              <div style={styles.footer}>
                <span style={styles.data}>
                  Entrega: {formatarData(atividade.dataEntrega)}
                </span>
                <span style={{...styles.status, ...styles.statusAtiva}}>
                  {atividade.status || 'ativa'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AtividadesCadastradasSection;