// src/pages/Biblioteca/components/BookCard.jsx
import React from 'react';
import PlatformTags from './PlatformTags';
import './BookCard.css';

export default function BookCard({ book, onEdit, onDelete, onAddToActivity }) {
  return (
    <div className="book-card">
      <div className="book-cover">
        {book.metadata.coverImage ? (
          <img src={book.metadata.coverImage} alt={book.title} />
        ) : (
          <div className="book-cover-placeholder">
            <i className="fa-solid fa-book"></i>
          </div>
        )}
      </div>
      
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        
        <PlatformTags editions={book.editions} />
        
        <div className="book-actions">
          <button 
            className="btn-small btn-primary"
            onClick={() => onAddToActivity(book)}
          >
            Usar em Atividade
          </button>
          <button 
            className="btn-small btn-secondary"
            onClick={() => onEdit(book)}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}