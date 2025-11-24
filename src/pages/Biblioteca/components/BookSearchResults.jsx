// src/pages/Biblioteca/components/BookSearchResults.jsx
import React from 'react';
import BookListView from './BookListView';
import BookGridView from './BookGridView';
import './BookSearchResults.css';

export default function BookSearchResults({ 
  books, 
  viewMode, 
  onBookClick,
  searchTerm 
}) {
  if (!books || books.length === 0) {
    return (
      <div className="no-results">
        <i className="fa-solid fa-book-open"></i>
        <h3>Nenhum livro encontrado</h3>
        <p>
          {searchTerm 
            ? `Nenhum resultado para "${searchTerm}"`
            : 'Comece pesquisando por título, autor ou ISBN'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="results-header">
        <h3>
          {searchTerm 
            ? `${books.length} resultado(s) para "${searchTerm}"`
            : `${books.length} livro(s) na biblioteca`
          }
        </h3>
      </div>

      {viewMode === 'list' ? (
        <BookListView 
          books={books} 
          onBookClick={onBookClick}
        />
      ) : (
        <BookGridView 
          books={books} 
          onBookClick={onBookClick}
        />
      )}
    </div>
  );
}