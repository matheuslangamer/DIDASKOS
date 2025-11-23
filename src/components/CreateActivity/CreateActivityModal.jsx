import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useFormData from './hooks/useFormData';
import BasicInfoSection from './sections/BasicInfoSection';
import ActivityDetailsSection from './sections/ActivityDetailsSection';
import InstructionsSection from './sections/InstructionsSection';
import PdfSection from './sections/PdfSection';
import LibrarySection from './sections/LibrarySection';
import AtividadesCadastradasSection from './sections/AtividadesCadastradasSection';

export default function CreateActivityModal({ isOpen, onClose, onSave }) {
  const {
    formData,
    files,
    instructions,
    linkedBook,
    isSearchingBook,
    disciplinasDisponiveis,
    handleChange,
    handleFileChange,
    handleInstructionChange,
    addInstruction,
    removeInstruction,
    removeFile,
    handleSearchISBN,
    handleSubmit: handleSubmitForm
  } = useFormData({ onSave, onClose });

  // ESTADO PARA ATIVIDADES CADASTRADAS - INICIALIZADO COM ARRAY VAZIO
  const [atividades, setAtividades] = useState([]);

  // Simula carregamento do banco de dados
  useEffect(() => {
    try {
      // Em produção, isso viria de uma API/banco de dados
      const atividadesDoBanco = [
        {
          id: 'TS101-2024-1',
          codigo: 'TS101-2024-1',
          titulo: 'Prova Parcial - Teologia Sistemática',
          turma: '2024A-1S-D',
          departamento: 'teologia-sistematica',
          disciplina: 'TS101',
          ano: '2024',
          semestre: '1',
          prioridade: 'alta',
          valor: 10.0,
          dataEntrega: '2024-03-15T23:59',
          descricao: 'Prova sobre os capítulos 1 a 5 do livro de Teologia Sistemática.',
          status: 'ativa',
          criado_por_nome: 'Dr. João Silva',
          data_criacao: '2024-01-15T10:00:00'
        },
        {
          id: 'TH01-2024-1',
          codigo: 'TH01-2024-1',
          titulo: 'Trabalho de Pesquisa - História da Igreja',
          turma: '2024A-1S-D',
          departamento: 'teologia-historica',
          disciplina: 'TH01',
          ano: '2024',
          semestre: '1',
          prioridade: 'media',
          valor: 5.0,
          dataEntrega: '2024-03-20T23:59',
          descricao: 'Pesquisa sobre a Reforma Protestante e seus impactos.',
          status: 'ativa',
          criado_por_nome: 'Dr. João Silva',
          data_criacao: '2024-01-10T14:30:00'
        }
      ];
      
      setAtividades(atividadesDoBanco || []);
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
      setAtividades([]);
    }
  }, []);

  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  // FUNÇÕES PARA MANIPULAR ATIVIDADES
  const handleEditAtividade = (atividade) => {
    if (!atividade) return;
    
    try {
      // Preenche o formulário com os dados da atividade para edição
      setFormData({
        turma: atividade.turma || '',
        departamento: atividade.departamento || '',
        disciplina: atividade.disciplina || '',
        semestre: atividade.semestre || '1',
        ano: atividade.ano || new Date().getFullYear(),
        codigo: atividade.codigo || '',
        titulo: atividade.titulo || '',
        prioridade: atividade.prioridade || 'media',
        valor: atividade.valor || '',
        dataEntrega: atividade.dataEntrega ? atividade.dataEntrega.slice(0, 16) : '',
        descricao: atividade.descricao || '',
        isbn_livro: atividade.isbn_livro || ''
      });
      
      // Rola até o topo do formulário
      const scrollArea = document.querySelector('.modal-scroll-area');
      if (scrollArea) {
        scrollArea.scrollTop = 0;
      }
    } catch (error) {
      console.error('Erro ao editar atividade:', error);
    }
  };

  const handleDeleteAtividade = (id) => {
    if (!id) return;
    
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      try {
        // Em produção, faria DELETE na API
        setAtividades(prev => {
          if (!Array.isArray(prev)) return [];
          return prev.filter(a => a.id !== id);
        });
      } catch (error) {
        console.error('Erro ao excluir atividade:', error);
      }
    }
  };

  const handleCopyAtividade = (atividade) => {
    if (!atividade) return;
    
    try {
      // Cria uma cópia da atividade com novo ID
      const novaAtividade = {
        ...atividade,
        id: Date.now(),
        codigo: `${atividade.disciplina}-${atividade.ano}-${Math.floor(Math.random() * 100)}`,
        titulo: `${atividade.titulo} (Cópia)`,
        dataEntrega: '', // Limpa a data
        status: 'ativa'
      };
      
      // Em produção, faria POST na API
      setAtividades(prev => {
        if (!Array.isArray(prev)) return [novaAtividade];
        return [...prev, novaAtividade];
      });
    } catch (error) {
      console.error('Erro ao copiar atividade:', error);
    }
  };

  // SUBMIT ATUALIZADO
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Validação básica
      if (!formData?.titulo || !formData?.dataEntrega || !formData?.disciplina) {
        alert('Preencha os campos obrigatórios: Título, Data de Entrega e Disciplina');
        return;
      }

      // Encontra nome da disciplina
      const discObj = Array.isArray(disciplinasDisponiveis) 
        ? disciplinasDisponiveis.find(d => d.codigo === formData.disciplina)
        : null;
      
      const nomeDisciplina = discObj ? discObj.nome : formData.disciplina;

      // Cria objeto final
      const newActivity = {
        id: Date.now(),
        // Campos do formulário
        ...formData,
        // Campos para a lista
        disciplina_nome: nomeDisciplina,
        status: 'ativa',
        criado_por_nome: 'Professor', // Em produção viria do usuário logado
        data_criacao: new Date().toISOString()
      };

      console.log("Salvando:", newActivity);
      
      // SALVA NO BANCO (via API/onSave)
      if (onSave && typeof onSave === 'function') {
        onSave(newActivity);
      }
      
      // ATUALIZA A LISTA LOCAL (em produção viria do banco)
      setAtividades(prev => {
        if (!Array.isArray(prev)) return [newActivity];
        return [...prev, newActivity];
      });
      
      // Fecha o modal
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
      alert('Erro ao salvar atividade. Tente novamente.');
    }
  };

  // --- ESTILOS CSS INLINE ---
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(5px)'
    },
    modal: {
      backgroundColor: 'white',
      width: '95%',
      maxWidth: '900px',
      maxHeight: '90vh',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      overflow: 'hidden'
    },
    header: {
      padding: '20px 30px',
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f8f9fa'
    },
    scrollArea: {
      padding: '30px',
      overflowY: 'auto',
      flex: 1
    },
    closeButton: {
      border: 'none',
      background: 'transparent',
      fontSize: '28px',
      cursor: 'pointer',
      color: '#6c757d',
      padding: '0',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.2s ease'
    }
  };

  return createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        
        {/* Cabeçalho */}
        <div style={styles.header}>
          <h2 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
            📝 Nova Atividade
          </h2>
          <button 
            onClick={onClose} 
            style={styles.closeButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e9ecef'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            &times;
          </button>
        </div>

        {/* Área de Conteúdo com Scroll */}
        <div style={styles.scrollArea}>
          <form onSubmit={handleSubmit}>
            
            <BasicInfoSection 
              formData={formData || {}}
              disciplinasDisponiveis={disciplinasDisponiveis || []}
              handleChange={handleChange}
            />

            <ActivityDetailsSection 
              formData={formData || {}}
              handleChange={handleChange}
            />

            <LibrarySection
              formData={formData || {}}
              linkedBook={linkedBook}
              isSearchingBook={isSearchingBook}
              handleChange={handleChange}
              handleSearchISBN={handleSearchISBN}
            />

            <InstructionsSection
              instructions={instructions || []}
              handleInstructionChange={handleInstructionChange}
              addInstruction={addInstruction}
              removeInstruction={removeInstruction}
            />

            <PdfSection
              files={files || []}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
            />

            {/* ✅ BOTÕES ACIMA DAS ATIVIDADES CADASTRADAS */}
            <div style={{
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '15px', 
              paddingTop: '25px',
              paddingBottom: '25px',
              borderTop: '1px solid #eee',
              borderBottom: '1px solid #eee',
              marginTop: '20px',
              marginBottom: '20px'
            }}>
              <button 
                type="button" 
                onClick={onClose}
                style={{
                  padding: '12px 28px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                ❌ Cancelar
              </button>
              <button 
                type="submit" 
                style={{
                  padding: '12px 28px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                💾 Salvar Atividade
              </button>
            </div>

            {/* ✅ SEÇÃO DE ATIVIDADES CADASTRADAS */}
            <AtividadesCadastradasSection
              atividades={atividades}
              onEdit={handleEditAtividade}
              onDelete={handleDeleteAtividade}
              onCopy={handleCopyAtividade}
            />

          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}