import { useState } from 'react';
import { LIVROS_MOCK } from '../utils/constants';

export function useBookSearch() {
    const [linkedBook, setLinkedBook] = useState(null);
    const [isSearchingBook, setIsSearchingBook] = useState(false);

    const handleSearchISBN = (isbn) => {
        if (!isbn) {
            alert('Por favor, digite um ISBN.');
            return;
        }
        
        setIsSearchingBook(true);

        // Simula delay de rede (1.5s)
        setTimeout(() => {
            const book = LIVROS_MOCK[isbn];
            
            if (book) {
                setLinkedBook(book);
            } else {
                alert('Livro não encontrado na biblioteca. Tente: 978-85-7742-123-4');
                setLinkedBook(null);
            }
            
            setIsSearchingBook(false);
        }, 1500);
    };

    return {
        linkedBook,
        setLinkedBook,
        isSearchingBook,
        handleSearchISBN
    };
}