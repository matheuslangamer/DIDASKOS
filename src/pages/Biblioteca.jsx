// src/pages/Biblioteca.jsx
import React, { useState, useEffect } from 'react';
import { useBooks } from './Biblioteca/hooks/useBooks';
import { useBookSearch } from './Biblioteca/hooks/useBookSearch';
import BookCard from './Biblioteca/components/BookCard';
import SearchFilters from './Biblioteca/components/SearchFilters';
import BookModal from './Biblioteca/components/BookModal';
import BookSearchResults from './Biblioteca/components/BookSearchResults';
import BookDetailsModal from './Biblioteca/components/BookDetailsModal';
import './Biblioteca.css';

export default function Biblioteca() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // DEBUG: Verificar estado dos modais
  console.log("🔍 ESTADO DOS MODAIS:", { 
    isModalOpen, 
    editingBook: editingBook?.title,
    showDetailsModal,
    selectedBook: selectedBook?.title
  });

  const filteredBooks = useBookSearch(books, searchTerm, platformFilter);

  // DEBUG: Monitorar mudanças no estado do modal de detalhes
  useEffect(() => {
    console.log("🔄 ESTADO ATUALIZADO - Details Modal:", {
      showDetailsModal,
      selectedBook: selectedBook?.title
    });
  }, [showDetailsModal, selectedBook]);

  const handleAddBook = () => {
    console.log("🎯 CLICOU: Adicionar Livro - Abrindo modal");
    console.log("📝 Estado ANTES:", { isModalOpen, editingBook });
    
    setEditingBook(null);
    setIsModalOpen(true);
    
    console.log("📝 Estado DEFINIDO PARA: true");
  };

  const handleEditBook = (book) => {
    console.log("🎯 CLICOU: Editar Livro:", book.title);
    console.log("📝 Estado ANTES:", { isModalOpen, editingBook });
    
    setEditingBook(book);
    setIsModalOpen(true);
    
    console.log("📝 Estado DEFINIDO PARA: true com livro para editar");
  };

  const handleSaveBook = (bookData) => {
    console.log("💾 SALVANDO LIVRO:", bookData);
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      console.log("✅ Livro atualizado:", bookData.title);
    } else {
      addBook(bookData);
      console.log("✅ Novo livro adicionado:", bookData.title);
    }
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleAddToActivity = (book) => {
    console.log("📚 ADICIONAR À ATIVIDADE:", book);
    alert(`Livro "${book.title}" adicionado à atividade!\n\n(Esta funcionalidade será integrada com o sistema de criação de atividades)`);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      deleteBook(bookId);
      console.log("🗑️ Livro excluído:", bookId);
    }
  };

  const handleBookClick = (book) => {
    console.log("📖 CLICOU NO LIVRO:", book.title);
    console.log("📝 Estado ANTES do clique:", { 
      showDetailsModal, 
      selectedBook: selectedBook?.title 
    });
    
    setSelectedBook(book);
    setShowDetailsModal(true);
    
    console.log("📝 Estado DEPOIS do clique:", { 
      showDetailsModal: true, 
      selectedBook: book.title 
    });

    // ✅ FORÇAR: Atualização adicional para garantir
    setTimeout(() => {
      setShowDetailsModal(true);
    }, 50);
  };

  return (
    <div className="biblioteca-container">
      {/* DEBUG: Verificar se os modais estão sendo renderizados */}
      {console.log("🎨 RENDERIZANDO - Main Modal:", isModalOpen ? "VISIBLE" : "HIDDEN")}
      {console.log("🎨 RENDERIZANDO - Details Modal:", showDetailsModal ? "VISIBLE" : "HIDDEN")}
      
      {/* Header */}
      <header className="biblioteca-header">
        <div>
          <h1>Biblioteca Pessoal</h1>
          <p>Gerencie seus livros e materiais de estudo</p>
        </div>
        <button className="btn-primary" onClick={handleAddBook}>
          <i className="fa-solid fa-plus"></i>
          Adicionar Livro
        </button>
      </header>

      {/* Filtros e Busca */}
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        platformFilter={platformFilter}
        onPlatformFilterChange={setPlatformFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Resultados da Pesquisa */}
      <BookSearchResults
        books={filteredBooks}
        viewMode={viewMode}
        onBookClick={handleBookClick}
        searchTerm={searchTerm}
      />

      {/* Modal de Adicionar/Editar Livro */}
      {console.log("🔧 PASSANDO PROPS PARA MAIN MODAL:", { 
        isOpen: isModalOpen, 
        hasBook: !!editingBook 
      })}
      
      <BookModal
        isOpen={isModalOpen}
        onClose={() => {
          console.log("❌ Main Modal fechado via botão");
          setIsModalOpen(false);
          setEditingBook(null);
        }}
        onSave={handleSaveBook}
        book={editingBook}
      />

      {/* Modal de Detalhes do Livro - DEBUG */}
      {console.log("🔧 PASSANDO PROPS PARA DETAILS MODAL:", { 
        isOpen: showDetailsModal, 
        hasBook: !!selectedBook,
        bookTitle: selectedBook?.title
      })}
      
      <BookDetailsModal
        book={selectedBook}
        isOpen={showDetailsModal}
        onClose={() => {
          console.log("❌ Details Modal fechado");
          setShowDetailsModal(false);
          setSelectedBook(null);
        }}
      />
    </div>
  );
}