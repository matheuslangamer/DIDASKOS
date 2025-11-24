// src/pages/Biblioteca/hooks/useISBNLookup.js
import { useState } from 'react';

export function useISBNLookup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookupByISBN = async (isbn) => {
    if (!isbn) return null;
    
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Integrar com API de busca de ISBN
      // Por enquanto, retorna dados mockados
      const mockData = {
        title: `Livro com ISBN ${isbn}`,
        author: 'Autor Desconhecido',
        publisher: 'Editora Exemplo',
        publicationYear: new Date().getFullYear(),
        pages: 200,
        coverImage: ''
      };

      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return mockData;
    } catch (err) {
      setError('Erro ao buscar informações do ISBN');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    lookupByISBN,
    isLoading,
    error
  };
}