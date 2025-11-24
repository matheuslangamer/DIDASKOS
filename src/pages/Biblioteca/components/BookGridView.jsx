// src/pages/Biblioteca/components/BookGridView.jsx
import React from 'react';
import './BookGridView.css';

export default function BookGridView({ books, onBookClick }) {
  return (
    <div className="book-grid-view">
      {books.map(book => (
        <div 
          key={book.id} 
          className="book-grid-item"
          onClick={() => onBookClick(book)}
        >
          <div className="book-grid-image">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} />
            ) : (
              <div className="book-placeholder">
                <i className="fa-solid fa-book"></i>
              </div>
            )}
            <div className="book-grid-overlay">
              <span className="view-details-text">Ver detalhes</span>
            </div>
          </div>
          
          <div className="book-grid-info">
            <h3 className="book-grid-title">{book.title}</h3>
            <p className="book-grid-author">{book.author}</p>
            <div className="book-grid-meta">
              <span className="call-number">{book.callNumber || 'Sem número'}</span>
              {book.publicationYear && (
                <span className="year">{book.publicationYear}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
