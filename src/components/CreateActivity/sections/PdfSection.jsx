import React, { useRef } from 'react';

const PdfSection = ({ files, handleFileChange, removeFile }) => {
  const fileInputRef = useRef(null);
  
  // --- CONFIGURAÇÕES ATUALIZADAS ---
  const MAX_FILES = 5; // Máximo de 5 PDFs
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 🔥 50MB por arquivo (aumentado!)

  const styles = {
    section: {
      marginBottom: '25px', 
      paddingBottom: '20px', 
      borderBottom: '1px dashed #eee'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block', 
      marginBottom: '10px', 
      fontWeight: 'bold', 
      fontSize: '0.9rem', 
      color: '#555'
    },
    uploadArea: {
      border: '2px dashed #dee2e6',
      borderRadius: '8px',
      padding: '30px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8f9fa'
    },
    uploadAreaHover: {
      borderColor: '#007bff',
      backgroundColor: '#e7f3ff'
    },
    uploadAreaDisabled: {
      backgroundColor: '#f8f9fa', 
      cursor: 'not-allowed',
      borderColor: '#dc3545'
    },
    fileList: {
      marginTop: '15px'
    },
    fileItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 12px',
      backgroundColor: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '6px',
      marginBottom: '8px'
    },
    removeButton: {
      border: 'none',
      background: 'none',
      color: '#dc3545',
      cursor: 'pointer',
      fontSize: '1.1rem',
      padding: '4px 8px'
    },
    fileIcon: {
      color: '#dc3545',
      marginRight: '8px'
    }
  };

  const handleAreaClick = () => {
    if (files.length >= MAX_FILES) {
      alert(`Limite de ${MAX_FILES} arquivos atingido! Remova alguns para adicionar novos.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileSelection = (e) => {
    if (!e.target.files) return;
    
    const selected = Array.from(e.target.files);
    
    // Verifica limite de quantidade
    if (files.length + selected.length > MAX_FILES) {
      alert(`Você pode adicionar no máximo ${MAX_FILES} arquivos. \nJá tem ${files.length} arquivo(s) selecionado(s).`);
      return;
    }

    // Verifica tamanho dos arquivos (50MB)
    const oversizedFiles = selected.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      const oversizedNames = oversizedFiles.map(f => `• ${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB)`).join('\n');
      alert(`❌ Alguns arquivos excedem 50MB:\n\n${oversizedNames}\n\nPor favor, selecione arquivos menores.`);
      return;
    }

    // Filtra apenas PDFs
    const pdfFiles = selected.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== selected.length) {
      const nonPdfFiles = selected.filter(file => file.type !== 'application/pdf');
      alert(`⚠️ Apenas arquivos PDF são permitidos.\n\nArquivos ignorados: ${nonPdfFiles.map(f => f.name).join(', ')}`);
    }

    if (pdfFiles.length > 0) {
      handleFileChange({ target: { files: pdfFiles } });
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={styles.section}>
      <h3 style={{marginTop:0, color:'#007bff'}}>Materiais de Apoio</h3>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          📁 Anexar Arquivos PDF 
          <small style={{color: '#6c757d', marginLeft: '8px', fontWeight: 'normal'}}>
            (Máx. {MAX_FILES} arquivos, <strong>50MB cada</strong>)
          </small>
        </label>
        
        <div 
          style={{
            ...styles.uploadArea,
            ...(isHovered && files.length < MAX_FILES && styles.uploadAreaHover),
            ...(files.length >= MAX_FILES && styles.uploadAreaDisabled)
          }}
          onClick={handleAreaClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{
            fontSize: '2rem', 
            color: files.length >= MAX_FILES ? '#dc3545' : '#6c757d', 
            marginBottom: '10px'
          }}>
            {files.length >= MAX_FILES ? '🚫' : '📎'}
          </div>
          <p style={{
            margin: '0 0 5px 0', 
            color: files.length >= MAX_FILES ? '#dc3545' : '#495057', 
            fontWeight: 'bold'
          }}>
            {files.length >= MAX_FILES 
              ? `Limite de ${MAX_FILES} arquivos atingido` 
              : 'Clique para selecionar arquivos PDF'
            }
          </p>
          <p style={{margin: 0, color: '#6c757d', fontSize: '0.8rem'}}>
            {files.length} de {MAX_FILES} arquivos • <strong>Máx. 50MB cada</strong>
          </p>
          <input 
            ref={fileInputRef}
            type="file" 
            accept=".pdf" 
            multiple 
            onChange={handleFileSelection}
            style={{display: 'none'}} 
          />
        </div>

        {files.length > 0 && (
          <div style={styles.fileList}>
            <p style={{margin: '15px 0 8px 0', fontSize: '0.9rem', color: '#495057'}}>
              <strong>📋 Arquivos selecionados ({files.length}/{MAX_FILES}):</strong>
            </p>
            {files.map((file, index) => (
              <div key={index} style={styles.fileItem}>
                <span style={{fontSize: '0.9rem'}}>
                  <span style={styles.fileIcon}>📄</span>
                  {file.name} 
                  <small style={{color: '#6c757d', marginLeft: '8px'}}>
                    ({(file.size / 1024 / 1024).toFixed(1)} MB)
                  </small>
                </span>
                <button 
                  type="button" 
                  style={styles.removeButton}
                  onClick={() => removeFile(index)}
                  title="Remover arquivo"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Barra de progresso visual */}
        {files.length > 0 && (
          <div style={{
            marginTop: '15px',
            backgroundColor: '#e9ecef',
            borderRadius: '10px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(files.length / MAX_FILES) * 100}%`,
              backgroundColor: files.length >= MAX_FILES ? '#dc3545' : '#28a745',
              height: '100%',
              transition: 'all 0.3s ease'
            }} />
          </div>
        )}

        {/* Dica de uso */}
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#e7f3ff',
          borderRadius: '6px',
          border: '1px solid #b3d9ff'
        }}>
          <small style={{color: '#0066cc', display: 'block'}}>
            💡 <strong>Dica:</strong> Agora suporta arquivos de até <strong>50MB</strong> - ideal para apostilas completas, 
            livros digitalizados e materiais extensos!
          </small>
        </div>
      </div>
    </div>
  );
};

export default PdfSection;