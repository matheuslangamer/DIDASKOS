import React, { useState } from 'react';
import CreateActivityModal from './CreateActivityModal'; // Importa o modal da mesma pasta

export default function ActivityButton({ onActivityCreated, className = "btn-primary" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (newActivity) => {
    if (onActivityCreated) {
      onActivityCreated(newActivity);
    }
  };

  return (
    <>
      <button 
        className={className} 
        onClick={() => {
            console.log("Botão clicado! Tentando abrir modal..."); // Debug
            setIsModalOpen(true);
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Criar Atividade
      </button>

      {/* Renderização Condicional do Modal */}
      {isModalOpen && (
        <CreateActivityModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
        />
      )}
    </>
  );
}