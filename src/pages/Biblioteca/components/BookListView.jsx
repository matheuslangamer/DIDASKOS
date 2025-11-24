// src/pages/Biblioteca/components/BookListView.jsx
import React from 'react';
import './BookListView.css';

export default function BookListView({ books, onBookClick }) {
  return (
    <div className="book-list-view">
      {books.map(book => (
        <div 
          key={book.id} 
          className="book-list-item"
          onClick={() => onBookClick(book)}
        >
          <div className="book-list-image">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} />
            ) : (
              <div className="book-placeholder">
                <i className="fa-solid fa-book"></i>
              </div>
            )}
          </div>
          
          <div className="book-list-content">
            <div className="book-list-header">
              <h3 className="book-title">{book.title}</h3>
              <span className="book-call-number">{book.callNumber || 'Sem número'}</span>
            </div>
            
            <p className="book-author">{book.author}</p>
            
            <p className="book-description">
              {book.description || book.metadata?.description || 'Sem descrição disponível'}
            </p>
            
            <div className="book-meta">
              <span className="publication-year">{book.publicationYear || book.metadata?.publicationYear}</span>
              <span className="publisher">{book.publisher || book.metadata?.publisher}</span>
              {book.editions && book.editions.length > 0 && (
                <span className="locations">
                  {book.editions.slice(0, 2).map(ed => ed.platform).join(', ')}
                  {book.editions.length > 2 && ` +${book.editions.length - 2}`}
                </span>
              )}
            </div>
          </div>
          
          <div className="book-list-actions">
            <button className="btn-view-details">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
