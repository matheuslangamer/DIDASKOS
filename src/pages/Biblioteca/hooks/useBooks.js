// src/pages/Biblioteca/hooks/useBooks.js
import { useState, useEffect } from 'react';

// ✅ CORREÇÃO: Exportação nomeada correta
export function useBooks() {
  const [books, setBooks] = useState([]);

  // Carregar livros do localStorage
  useEffect(() => {
    const savedBooks = localStorage.getItem('didaskos-biblioteca');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      // Dados iniciais de exemplo
      const initialBooks = [
        {
          id: "1",
          title: "Teologia Sistemática",
          author: "Louis Berkhof",
          originalIsbn: "978-85-275-0991-4",
          editions: [
            {
              type: "physical",
              platform: "physical",
              isbn: "978-85-275-0991-4",
              format: "physical",
              price: 89.90,
              available: true
            }
          ],
          metadata: {
            publisher: "Cultura Cristã",
            publicationYear: 2012,
            pages: 784,
            language: "pt-BR",
            coverImage: "",
            description: "Uma das obras mais importantes da teologia reformada",
            categories: ["Teologia", "Sistemática"]
          },
          academicInfo: {
            discipline: "Teologia Sistemática I",
            recommendedBy: "Prof. João Silva",
            importanceLevel: "high"
          },
          createdAt: new Date().toISOString()
        },
        {
          id: "2", 
          title: "Institutas da Religião Cristã",
          author: "João Calvino",
          originalIsbn: "978-85-7742-012-3",
          editions: [
            {
              type: "digital",
              platform: "kindle",
              isbn: "978-85-7742-012-3-kindle",
              format: "mobi",
              price: 29.90,
              available: true
            },
            {
              type: "physical",
              platform: "physical", 
              isbn: "978-85-7742-012-3",
              format: "physical",
              price: 120.00,
              available: true
            }
          ],
          metadata: {
            publisher: "Editora Fiel",
            publicationYear: 2017,
            pages: 1504,
            language: "pt-BR",
            coverImage: "",
            description: "Obra clássica da Reforma Protestante",
            categories: ["Teologia", "Reforma", "Clássicos"]
          },
          academicInfo: {
            discipline: "História da Igreja",
            recommendedBy: "Prof. Maria Santos",
            importanceLevel: "high"
          },
          createdAt: new Date().toISOString()
        }
      ];
      setBooks(initialBooks);
      localStorage.setItem('didaskos-biblioteca', JSON.stringify(initialBooks));
    }
  }, []);

  // Salvar livros no localStorage
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('didaskos-biblioteca', JSON.stringify(books));
    }
  }, [books]);

  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBooks(prev => [newBook, ...prev]);
  };

  const updateBook = (id, bookData) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...bookData, updatedAt: new Date().toISOString() } : book
    ));
  };

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  return {
    books,
    addBook,
    updateBook,
    deleteBook
  };
}