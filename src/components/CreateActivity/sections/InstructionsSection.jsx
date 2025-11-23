import React from 'react';

const InstructionsSection = ({ instructions, handleInstructionChange, addInstruction, removeInstruction }) => {
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
    input: {
      width: '100%', 
      padding: '10px', 
      borderRadius: '6px', 
      border: '1px solid #ddd',
      fontSize: '1rem', 
      boxSizing: 'border-box'
    },
    instructionRow: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      marginBottom: '10px'
    },
    removeButton: {
      border: 'none',
      background: 'none',
      color: '#dc3545',
      cursor: 'pointer',
      fontSize: '1.2rem',
      padding: '5px',
      flexShrink: 0
    },
    addButton: {
      padding: '8px 16px',
      backgroundColor: 'transparent',
      color: '#007bff',
      border: '1px dashed #007bff',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem'
    },
    addButtonDisabled: {
      color: '#6c757d',
      borderColor: '#6c757d',
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={{marginTop:0, color:'#007bff'}}>Instruções Adicionais</h3>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          Passo a passo para realização da atividade (máx. 5 instruções)
        </label>
        
        {instructions.map((instruction, index) => (
          <div key={index} style={styles.instructionRow}>
            <input 
              type="text" 
              style={{...styles.input, flex: 1}} 
              value={instruction} 
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              placeholder={`Instrução ${index + 1} (Ex: Formatar em A4, Entregar em PDF...)`}
            />
            {index > 0 && (
              <button 
                type="button" 
                style={styles.removeButton}
                onClick={() => removeInstruction(index)}
                title="Remover instrução"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        
        {instructions.length < 5 && (
          <button 
            type="button" 
            style={styles.addButton}
            onClick={addInstruction}
          >
            ➕ Adicionar Nova Instrução
          </button>
        )}
        
        {instructions.length >= 5 && (
          <small style={{color: '#dc3545', display: 'block', marginTop: '5px'}}>
            Limite máximo de 5 instruções atingido
          </small>
        )}
      </div>
    </div>
  );
};

export default InstructionsSection;