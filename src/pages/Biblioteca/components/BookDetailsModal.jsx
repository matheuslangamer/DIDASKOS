// src/pages/Biblioteca/components/BookDetailsModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { calculateProgress, parseChaptersText, validatePagesRead } from '../utils/bookSchema';
import './BookDetailsModal.css';

export default function BookDetailsModal({ book, isOpen, onClose }) {
  const modalRef = useRef(null);
  
  // Estado para controle de leitura
  const [readingData, setReadingData] = useState({
    chaptersRead: [],
    pagesRead: 0,
    totalPages: 0,
    progress: 0,
    disciplines: [],
    activities: []
  });
  
  const [chaptersInput, setChaptersInput] = useState('');
  const [pagesInput, setPagesInput] = useState('0');
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);

  // Dados mock de disciplinas
  const availableDisciplines = [
    { id: 'teo1', name: 'Teologia Sistemática I' },
    { id: 'teo2', name: 'Teologia Sistemática II' },
    { id: 'hist1', name: 'História da Igreja' },
    { id: 'herm1', name: 'Hermenêutica Bíblica' },
    { id: 'grego1', name: 'Grego Bíblico' },
    { id: 'hebr1', name: 'Hebraico Bíblico' },
    { id: 'apol1', name: 'Apologética' },
    { id: 'hom1', name: 'Homilética' }
  ];

  // Dados mock de atividades
  const availableActivities = [
    { id: 'act1', title: 'Resumo Capítulos 1-3', discipline: 'Teologia Sistemática I', dueDate: '2024-02-15' },
    { id: 'act2', title: 'Análise Teológica', discipline: 'Teologia Sistemática I', dueDate: '2024-03-01' },
    { id: 'act3', title: 'Prova Parcial', discipline: 'História da Igreja', dueDate: '2024-02-20' }
  ];

  // DEBUG: Log das props
  console.log("🔔 BOOK DETAILS MODAL - Props recebidas:", { 
    isOpen, 
    hasBook: !!book,
    bookTitle: book?.title 
  });

  // Inicializar dados quando o livro ou modal abrir
  useEffect(() => {
    console.log("🔄 BOOK DETAILS MODAL - useEffect triggered:", { isOpen, hasBook: !!book });
    
    if (isOpen && book) {
      console.log("✅ BOOK DETAILS MODAL - Inicializando dados do livro:", book.title);
      
      const totalPages = book.physicalDescription?.pages || book.metadata?.pages || 0;
      const pagesRead = book.readingProgress?.pagesRead || 0;
      const chaptersRead = book.readingProgress?.chaptersRead || [];
      
      setReadingData({
        chaptersRead: chaptersRead,
        pagesRead: pagesRead,
        totalPages: totalPages,
        progress: calculateProgress(pagesRead, totalPages),
        disciplines: book.associatedDisciplines || [],
        activities: book.relatedActivities || []
      });
      
      setChaptersInput(chaptersRead.join(', '));
      setPagesInput(pagesRead.toString());
      setSelectedDisciplines(book.associatedDisciplines?.map(d => d.id) || []);
    } else {
      console.log("❌ BOOK DETAILS MODAL - Não inicializando:", { isOpen, hasBook: !!book });
    }
  }, [book, isOpen]);

  // Forçar visibilidade do modal
  useEffect(() => {
    console.log("🎯 BOOK DETAILS MODAL - useEffect visibilidade:", { isOpen, hasBook: !!book });
    
    if (isOpen && modalRef.current) {
      console.log("🚨 BOOK DETAILS MODAL - FORÇANDO VISIBILIDADE");
      const modal = modalRef.current;
      modal.style.display = 'flex';
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
      modal.style.zIndex = '10000';
    } else if (modalRef.current) {
      console.log("🔴 BOOK DETAILS MODAL - Escondendo modal");
      const modal = modalRef.current;
      modal.style.display = 'none';
    }
  }, [isOpen, book]);

  // Calcular progresso atual
  const progress = calculateProgress(readingData.pagesRead, readingData.totalPages);

  console.log("📊 BOOK DETAILS MODAL - Progresso calculado:", progress);

  // Handlers para os controles
  const handlePagesChange = (pages) => {
    const pagesNum = parseInt(pages) || 0;
    const validatedPages = validatePagesRead(pagesNum, readingData.totalPages);
    
    setPagesInput(pages);
    setReadingData(prev => ({
      ...prev,
      pagesRead: validatedPages,
      progress: calculateProgress(validatedPages, prev.totalPages)
    }));
  };

  const handleChaptersChange = (chaptersText) => {
    setChaptersInput(chaptersText);
    const chaptersArray = parseChaptersText(chaptersText);
    
    setReadingData(prev => ({
      ...prev,
      chaptersRead: chaptersArray
    }));
  };

  const handleDisciplineChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setSelectedDisciplines(selectedOptions);
    
    const selectedDisciplinesData = availableDisciplines.filter(discipline => 
      selectedOptions.includes(discipline.id)
    );
    
    setReadingData(prev => ({
      ...prev,
      disciplines: selectedDisciplinesData
    }));
  };

  const handleAddActivity = (activityId) => {
    const activity = availableActivities.find(a => a.id === activityId);
    if (activity && !readingData.activities.some(a => a.id === activityId)) {
      setReadingData(prev => ({
        ...prev,
        activities: [...prev.activities, activity]
      }));
    }
  };

  const handleRemoveActivity = (activityId) => {
    setReadingData(prev => ({
      ...prev,
      activities: prev.activities.filter(a => a.id !== activityId)
    }));
  };

  const handleSaveProgress = () => {
    console.log('💾 BOOK DETAILS MODAL - Salvando progresso:', {
      bookId: book?.id,
      readingData: readingData
    });
    
    alert('Progresso salvo com sucesso!');
  };

  // ✅ CORREÇÃO: Verificação mais rigorosa
  if (!isOpen) {
    console.log("❌ BOOK DETAILS MODAL - Não renderizando porque isOpen é false");
    return null;
  }

  if (!book) {
    console.log("❌ BOOK DETAILS MODAL - Não renderizando porque book é null/undefined");
    return (
      <div 
        ref={modalRef}
        className="details-modal-overlay" 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}
      >
        <div 
          className="details-modal" 
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
        >
          <h2 style={{ color: '#ef4444', marginBottom: '20px' }}>⚠️ Erro</h2>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Livro não encontrado. Por favor, tente novamente.
          </p>
          <button 
            onClick={onClose}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  console.log("✅ BOOK DETAILS MODAL - Renderizando com livro:", book.title);

  return (
    <div 
      ref={modalRef}
      className="details-modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
      }}
    >
      <div 
        className="details-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '95%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 10001
        }}
      >
        {/* Header */}
        <div className="details-modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          background: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1f2937' }}>
            📖 Detalhes do Livro
          </h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '8px',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
          >
            ×
          </button>
        </div>

        {/* Conteúdo Principal - 3 COLUNAS */}
        <div className="details-modal-content" style={{ padding: '24px' }}>
          <div className="book-details-layout" style={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr 320px',
            gap: '24px',
            alignItems: 'start'
          }}>
            
            {/* === COLUNA 1 - CAPA E INFORMAÇÕES BÁSICAS === */}
            <div className="book-details-left">
              {/* Capa do Livro */}
              <div className="book-cover-large" style={{
                width: '100%',
                height: '300px',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '20px',
                border: '1px solid #e5e7eb'
              }}>
                {book?.coverImage ? (
                  <img 
                    src={book.coverImage} 
                    alt={book?.title || 'Livro sem título'} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                ) : (
                  <div className="book-cover-placeholder">
                    <i className="fa-solid fa-book" style={{ 
                      fontSize: '3rem', 
                      color: '#9ca3af' 
                    }}></i>
                  </div>
                )}
              </div>
              
              {/* Informações Básicas */}
              <div className="basic-info" style={{
                background: '#f8fafc',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '1.1rem', 
                  color: '#1e293b' 
                }}>
                  Informações Básicas
                </h3>
                
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.8rem',
                    marginBottom: '4px'
                  }}>
                    Número de Chamada:
                  </label>
                  <span style={{ 
                    color: '#6b7280', 
                    fontSize: '0.9rem',
                    fontFamily: 'monospace'
                  }}>
                    {book?.callNumber || 'Não informado'}
                  </span>
                </div>
                
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.8rem',
                    marginBottom: '4px'
                  }}>
                    Formato:
                  </label>
                  <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    {book?.editions?.some(ed => ed.type === 'physical') ? 'Físico' : ''}
                    {book?.editions?.some(ed => ed.type === 'digital') ? ' Digital' : ''}
                    {!book?.editions?.length && 'Não informado'}
                  </span>
                </div>
                
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.8rem',
                    marginBottom: '4px'
                  }}>
                    Localização:
                  </label>
                  <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    {book?.editions?.map(ed => ed.platform).join(', ') || 'Não informado'}
                  </span>
                </div>

                <div className="info-item">
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.8rem',
                    marginBottom: '4px'
                  }}>
                    Total de Páginas:
                  </label>
                  <span style={{ 
                    color: '#059669', 
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {readingData.totalPages || 'Não informado'}
                  </span>
                </div>
              </div>
            </div>

            {/* === COLUNA 2 - DETALHES COMPLETOS DO LIVRO === */}
            <div className="book-details-right">
              {/* Autoria e Título */}
              <div className="detail-section" style={{ 
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '1.2rem', 
                  color: '#1f2937' 
                }}>
                  Autoria e Título
                </h3>
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.9rem',
                    marginBottom: '4px'
                  }}>
                    Autoria Principal:
                  </label>
                  <span style={{ 
                    color: '#1f2937', 
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}>
                    {book?.author || 'Não informado'}
                  </span>
                </div>
                <div className="info-item">
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.9rem',
                    marginBottom: '4px'
                  }}>
                    Título Principal:
                  </label>
                  <span style={{ 
                    color: '#1f2937', 
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    {book?.title || 'Livro sem título'}
                  </span>
                </div>
              </div>

              {/* Publicação */}
              <div className="detail-section" style={{ 
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '1.2rem', 
                  color: '#1f2937' 
                }}>
                  Publicação
                </h3>
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.9rem',
                    marginBottom: '4px'
                  }}>
                    Editora:
                  </label>
                  <span style={{ color: '#6b7280' }}>
                    {book?.publisher || book?.metadata?.publisher || 'Não informado'}
                  </span>
                </div>
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.9rem',
                    marginBottom: '4px'
                  }}>
                    Ano:
                  </label>
                  <span style={{ color: '#6b7280' }}>
                    {book?.publicationYear || book?.metadata?.publicationYear || 'Não informado'}
                  </span>
                </div>
                <div className="info-item">
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.9rem',
                    marginBottom: '4px'
                  }}>
                    Edição:
                  </label>
                  <span style={{ color: '#6b7280' }}>
                    {book?.edition || 'Primeira'}
                  </span>
                </div>
              </div>

              {/* Descrição */}
              {(book?.description || book?.metadata?.description) && (
                <div className="detail-section" style={{ 
                  marginBottom: '24px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <h3 style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: '1.2rem', 
                    color: '#1f2937' 
                  }}>
                    Descrição
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {book?.description || book?.metadata?.description}
                  </p>
                </div>
              )}

              {/* Informações Adicionais */}
              <div className="detail-section">
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '1.2rem', 
                  color: '#1f2937' 
                }}>
                  Informações Adicionais
                </h3>
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '0.9rem',
                    marginBottom: '4px'
                  }}>
                    ISBN:
                  </label>
                  <span style={{ 
                    color: '#6b7280',
                    fontFamily: 'monospace'
                  }}>
                    {book?.originalIsbn || 'Não informado'}
                  </span>
                </div>
                {book?.metadata?.categories && book.metadata.categories.length > 0 && (
                  <div className="info-item" style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontWeight: '600', 
                      color: '#374151', 
                      fontSize: '0.9rem',
                      marginBottom: '4px'
                    }}>
                      Categorias:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {book.metadata.categories.map((category, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#e0e7ff',
                            color: '#3730a3',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '500'
                          }}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {book?.series && (
                  <div className="info-item">
                    <label style={{ 
                      display: 'block', 
                      fontWeight: '600', 
                      color: '#374151', 
                      fontSize: '0.9rem',
                      marginBottom: '4px'
                    }}>
                      Série:
                    </label>
                    <span style={{ color: '#6b7280' }}>
                      {book.series}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* === COLUNA 3 - CONTROLE DE LEITURA === */}
            <div className="book-reading-control">
              <div className="reading-section" style={{
                background: '#f8fafc',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                position: 'sticky',
                top: '20px'
              }}>
                <h3 style={{ 
                  margin: '0 0 20px 0', 
                  fontSize: '1.1rem', 
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  📖 Controle de Leitura
                </h3>

                {/* CAPÍTULOS LIDOS */}
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.9rem'
                  }}>
                    Capítulos Lidos
                  </label>
                  <input
                    type="text"
                    value={chaptersInput}
                    onChange={(e) => handleChaptersChange(e.target.value)}
                    placeholder="Ex: 1-5, 8, 10-12"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  <small style={{ 
                    color: '#6b7280', 
                    fontSize: '0.8rem',
                    display: 'block',
                    marginTop: '4px'
                  }}>
                    Separe por vírgulas. Ex: 1-5, 8, 10-12
                  </small>
                </div>

                {/* PÁGINAS LIDAS */}
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.9rem'
                  }}>
                    Páginas Lidas
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="number"
                      value={pagesInput}
                      onChange={(e) => handlePagesChange(e.target.value)}
                      placeholder="0"
                      min="0"
                      max={readingData.totalPages}
                      style={{
                        flex: '1',
                        padding: '10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box'
                      }}
                    />
                    <span style={{ 
                      color: '#6b7280', 
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      minWidth: '60px'
                    }}>
                      / {readingData.totalPages || '?'}
                    </span>
                  </div>
                  {readingData.totalPages > 0 && (
                    <div className="progress-bar" style={{
                      width: '100%',
                      height: '6px',
                      background: '#e5e7eb',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div className="progress-fill" style={{
                        height: '100%',
                        background: progress >= 100 ? '#10b981' : '#3b82f6',
                        width: `${progress}%`,
                        transition: 'width 0.3s ease',
                        borderRadius: '3px'
                      }}></div>
                    </div>
                  )}
                </div>

                {/* PROGRESSO VISUAL */}
                <div className="progress-display" style={{ marginBottom: '20px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      color: '#374151',
                      fontWeight: '500'
                    }}>
                      Progresso
                    </span>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: '600', 
                      color: progress >= 100 ? '#059669' : '#3b82f6' 
                    }}>
                      {progress}%
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '2px',
                    marginBottom: '8px'
                  }}>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        style={{
                          flex: '1',
                          height: '8px',
                          background: index < Math.floor(progress / 10) ? 
                            (progress >= 100 ? '#10b981' : '#3b82f6') : '#e5e7eb',
                          borderRadius: '2px',
                          transition: 'background 0.3s ease'
                        }}
                      ></div>
                    ))}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    textAlign: 'center'
                  }}>
                    {readingData.pagesRead} de {readingData.totalPages} páginas
                  </div>
                </div>

                {/* DISCIPLINAS ASSOCIADAS */}
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.9rem'
                  }}>
                    Disciplinas Associadas
                  </label>
                  <select
                    multiple
                    value={selectedDisciplines}
                    onChange={handleDisciplineChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      height: '100px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {availableDisciplines.map(discipline => (
                      <option key={discipline.id} value={discipline.id}>
                        {discipline.name}
                      </option>
                    ))}
                  </select>
                  <small style={{ 
                    color: '#6b7280', 
                    fontSize: '0.8rem',
                    display: 'block',
                    marginTop: '4px'
                  }}>
                    Segure Ctrl para selecionar múltiplas
                  </small>
                </div>

                {/* ATIVIDADES RELACIONADAS */}
                <div className="related-activities" style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <label style={{
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      Atividades Relacionadas
                    </label>
                  </div>
                  
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddActivity(e.target.value);
                        e.target.value = ''; // Reset após seleção
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      background: 'white',
                      marginBottom: '8px'
                    }}
                  >
                    <option value="">+ Adicionar atividade...</option>
                    {availableActivities
                      .filter(activity => !readingData.activities.some(a => a.id === activity.id))
                      .map(activity => (
                        <option key={activity.id} value={activity.id}>
                          {activity.title.length > 25 ? activity.title.substring(0, 25) + '...' : activity.title}
                        </option>
                      ))
                    }
                  </select>
                  
                  <div className="activities-list" style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '8px',
                    maxHeight: '80px',
                    overflowY: 'auto',
                    fontSize: '0.75rem'
                  }}>
                    {readingData.activities.length > 0 ? (
                      readingData.activities.map(activity => (
                        <div
                          key={activity.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '4px 6px',
                            marginBottom: '3px',
                            background: '#f9fafb',
                            borderRadius: '4px'
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ 
                              fontWeight: '500', 
                              color: '#374151',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {activity.title}
                            </div>
                            <div style={{ 
                              color: '#6b7280', 
                              fontSize: '0.7rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {activity.discipline}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveActivity(activity.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '2px 4px',
                              borderRadius: '2px',
                              flexShrink: 0,
                              marginLeft: '4px'
                            }}
                            title="Remover atividade"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <div style={{ 
                        color: '#9ca3af', 
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        padding: '12px'
                      }}>
                        Nenhuma atividade
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginTop: '20px' 
                }}>
                  <button 
                    onClick={handleSaveProgress}
                    style={{
                      flex: '1',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#059669'}
                    onMouseLeave={(e) => e.target.style.background = '#10b981'}
                  >
                    💾 Salvar Progresso
                  </button>
                  <button 
                    onClick={() => console.log('Abrir estatísticas detalhadas')}
                    style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      padding: '12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
                    title="Estatísticas detalhadas"
                  >
                    📊
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="details-modal-footer" style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '20px 24px',
          borderTop: '1px solid #e5e7eb',
          background: '#f9fafb'
        }}>
          <button 
            onClick={onClose}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.9rem',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#4b5563'}
            onMouseLeave={(e) => e.target.style.background = '#6b7280'}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}