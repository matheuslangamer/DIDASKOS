// src/pages/Biblioteca/hooks/useBookSearch.js
import { useMemo } from 'react';

// ✅ CORREÇÃO: Exportação nomeada
export function useBookSearch(books, searchTerm, platformFilter) {
  const filteredBooks = useMemo(() => {
    if (!books || books.length === 0) return [];
    
    return books.filter(book => {
      // Filtro por texto (título, autor, ISBN)
      const matchesSearch = !searchTerm || 
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.originalIsbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.editions?.some(edition => 
          edition.isbn?.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Filtro por plataforma
      const matchesPlatform = platformFilter === 'all' || 
        book.editions?.some(edition => edition.platform === platformFilter);

      return matchesSearch && matchesPlatform;
    });
  }, [books, searchTerm, platformFilter]);

  return filteredBooks;
}