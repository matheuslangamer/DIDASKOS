import React from 'react';
// Não precisamos importar CSS, pois os estilos do modal
// já estão no 'MainLayout.css' que importamos antes.

// 1. O componente recebe "props" (propriedades) do componente "pai".
//    - 'bookData': Um objeto com os dados do livro.
//    - 'onClose': A *função* que ele deve chamar quando o usuário quiser fechar.
function ReadingModal({ bookData, onClose }) {

  // 2. Se não houver dados, não renderiza nada.
  if (!bookData) {
    return null;
  }

  // 3. Esta função impede que o clique *dentro* do modal feche ele.
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // 4. Aqui está o seu HTML do modal, traduzido para JSX.
  //    Note que o 'onClick' no 'modal-overlay' chama a função 'onClose'.
  return (
    <div className="modal-overlay active" id="reading-modal" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h2>Atualizar Progresso de Leitura</h2>
          {/* O 'onClick' no "X" também chama a função 'onClose' */}
          <button className="modal-close" id="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          {/* 5. Os dados são preenchidos dinamicamente a partir do 'bookData' */}
          <img src={bookData.coverSrc} alt="Capa do livro" id="modal-book-cover" />
          <div className="modal-book-info">
            <h3 id="modal-book-title">{bookData.title}</h3>
            <span id="modal-book-author">{bookData.author}</span>
            
            <div className="modal-stats">
              <span id="modal-book-pages">Total: {bookData.pagesTotal} páginas</span>
              <span id="modal-book-chapters">Capítulos: {bookData.chaptersTotal}</span>
            </div>

            <div className="modal-form">
              <div className="form-group">
                {/* 6. 'for' do HTML vira 'htmlFor' no JSX */}
                <label htmlFor="modal-pages-read">Página Atual</label>
                <div className="number-input-container">
                  <button className="number-btn" id="btn-page-down" aria-label="Diminuir página">-</button>
                  {/* 7. Usamos 'defaultValue' para preencher o valor inicial */}
                  <input 
                    type="number" 
                    id="modal-pages-read" 
                    defaultValue={bookData.pagesRead} 
                    min="0" 
                    max={bookData.pagesTotal} 
                  />
                  <button className="number-btn" id="btn-page-up" aria-label="Aumentar página">+</button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="modal-chapters-read">Capítulos Lidos (ex: 1-5, 8)</label>
                <input 
                  type="text" 
                  id="modal-chapters-read" 
                  defaultValue={bookData.chaptersRead} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" id="modal-cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" id="modal-save-btn">Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default ReadingModal;