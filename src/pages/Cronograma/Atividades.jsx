import React, { useState } from 'react';
import './Atividades.css'; 
import { formatarData, getClasseData, getStatus } from './dateUtils';
import DetailedActivitiesModal from './DetailedActivitiesModal'; 
import ActivityButton from '../../components/CreateActivity/ActivityButton';

export default function Atividades({ atividades, onAddActivity }) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  console.log("🎯 Atividades carregadas!");

  return (
    <>
      <div className="atividades-widget widget">
        <div className="atividades-header-actions">
          <h3>Atividades</h3>
          <div className="header-buttons">
            <button 
              className="btn-secondary" 
              onClick={() => {
                console.log("📋 Botão Detalhes clicado!");
                setIsDetailModalOpen(true);
              }}
            >
              Detalhes
            </button>
            
            <ActivityButton onActivityCreated={onAddActivity} />
          </div>
        </div>

        {(!atividades || atividades.length === 0) ? (
          <div className="empty-state">
            <p>Nenhuma atividade encontrada</p>
          </div>
        ) : (
          <table className="atividades-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Disciplina</th>
                <th>Atividade</th>
              </tr>
            </thead>
            <tbody>
              {atividades.slice(0, 5).map((atividade) => {
                const textoDisciplina = atividade.disciplina || atividade.subject || "Sem Disciplina";
                const textoNome = atividade.nome || atividade.title || "Sem Título";
                const dataFinal = atividade.dataEntrega || atividade.end || new Date().toISOString();

                return (
                  <tr key={atividade.id}>
                    <td>
                      <div className={`data-entrega ${getClasseData(dataFinal)}`}>
                        {formatarData(dataFinal)}
                      </div>
                      <div className={`status-badge status-${getStatus(dataFinal)}`}>
                        {getStatus(dataFinal)}
                      </div>
                    </td>
                    <td>
                      <div className="disciplina-nome">{textoDisciplina}</div>
                    </td>
                    <td>
                      <div className="atividade-nome">{textoNome}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <DetailedActivitiesModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        atividades={atividades} 
      />
    </>
  );
}