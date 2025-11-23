import React from 'react';
import { createPortal } from 'react-dom';
import { formatarData, getStatus } from './dateUtils';

// Nota: Não precisamos importar o CSS aqui para este teste, 
// pois vamos usar estilos diretos para garantir que apareça.

export default function DetailedActivitiesModal({ isOpen, onClose, atividades }) {
  console.log("Modal Detalhes Chamado. Aberto?", isOpen); // Olhe o console (F12)

  if (!isOpen) return null;

  return createPortal(
    // 1. Overlay (Fundo Preto) com estilo direto
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo escuro
        zIndex: 99999, // Altíssimo para ficar por cima de tudo
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(2px)'
      }}
    >
      {/* 2. Conteúdo (Caixa Branca) com estilo direto */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          width: '90%',
          maxWidth: '1200px',
          height: '80vh',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          overflow: 'hidden'
        }}
      >
        
        {/* Cabeçalho */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <h2 style={{margin: 0, color: '#333'}}>Detalhamento de Atividades</h2>
          <button 
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            &times;
          </button>
        </div>
        
        {/* Tabela com Scroll */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Entrega</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Atividade</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Disciplina</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Objetivos</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Bibliografia</th>
              </tr>
            </thead>
            <tbody>
              {atividades.map((item) => {
                // Fallbacks de segurança
                const dataFinal = item.dataEntrega || item.end || new Date().toISOString();
                const nomeAtiv = item.nome || item.title || "Sem Nome";
                const nomeDisc = item.disciplina || item.subject || "Geral";
                const objetivos = item.objetivos || "—";
                const biblio = item.bibliografia || "—";

                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 15px' }}>{getStatus(dataFinal)}</td>
                    <td style={{ padding: '12px 15px' }}>{formatarData(dataFinal)}</td>
                    <td style={{ padding: '12px 15px', fontWeight: 'bold' }}>{nomeAtiv}</td>
                    <td style={{ padding: '12px 15px' }}>{nomeDisc}</td>
                    <td style={{ padding: '12px 15px', fontSize: '0.9rem', color: '#666' }}>{objetivos}</td>
                    <td style={{ padding: '12px 15px', fontSize: '0.9rem', color: '#666' }}>{biblio}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Rodapé */}
        <div style={{ padding: '15px', borderTop: '1px solid #eee', textAlign: 'right' }}>
            <button 
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Fechar
            </button>
        </div>

      </div>
    </div>,
    document.body
  );
}