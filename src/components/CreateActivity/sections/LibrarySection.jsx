import React from 'react';

const LibrarySection = ({ formData, linkedBook, isSearchingBook, handleChange, handleSearchISBN }) => {
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
      marginBottom: '5px', 
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
    searchContainer: {
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-end'
    },
    searchButton: {
      padding: '10px 16px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      flexShrink: 0
    },
    searchButtonDisabled: {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed'
    },
    bookPreview: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      marginTop: '10px'
    },
    unlinkButton: {
      padding: '6px 12px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      flexShrink: 0
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={{marginTop:0, color:'#007bff'}}>Integração com Biblioteca</h3>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>Vincular Livro (ISBN)</label>
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            name="isbn_livro" 
            style={{...styles.input, flex: 1}} 
            value={formData.isbn_livro} 
            onChange={handleChange} 
            placeholder="Ex: 978-85-... (10 ou 13 dígitos)"
          />
          <button 
            type="button" 
            style={{
              ...styles.searchButton,
              ...(isSearchingBook && styles.searchButtonDisabled)
            }}
            onClick={handleSearchISBN}
            disabled={isSearchingBook}
          >
            {isSearchingBook ? 'Buscando...' : '🔍 Buscar'}
          </button>
        </div>
        <small style={{color: '#6c757d', display: 'block', marginTop: '5px'}}>
          Digite o ISBN para buscar automaticamente na biblioteca
        </small>
      </div>

      {linkedBook && (
        <div style={styles.bookPreview}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px'}}>
            <div style={{flex: 1}}>
              <h4 style={{margin: '0 0 8px 0', color: '#212529', fontSize: '1.1rem'}}>
                📚 {linkedBook.title}
              </h4>
              <p style={{margin: '4px 0', color: '#495057', fontSize: '0.9rem'}}>
                <strong>Autor:</strong> {linkedBook.author}
              </p>
              <p style={{margin: '4px 0', color: '#495057', fontSize: '0.9rem'}}>
                <strong>Capítulos:</strong> {linkedBook.chapters}
              </p>
              <p style={{margin: '4px 0', color: '#6c757d', fontSize: '0.8rem'}}>
                <strong>ISBN:</strong> {linkedBook.isbn}
              </p>
            </div>
            <button 
              type="button" 
              style={styles.unlinkButton}
              onClick={() => setLinkedBook(null)}
            >
              ❌ Desvincular
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibrarySection;