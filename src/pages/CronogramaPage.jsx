import React, { useState } from "react";
import "./CronogramaPage.css";

// Importando os componentes filhos
import GanttChart from "./Cronograma/GanttChart";
import AgendaSemanal from "./Cronograma/AgendaSemanal";
import Atividades from "./Cronograma/Atividades";

// Importando os dados iniciais
// (O "cronogramaData" deve estar com letra minúscula ou maiúscula dependendo de como está o arquivo na pasta)
import { atividadesData as initialAtividades } from "./Cronograma/cronogramaData.js";

export default function CronogramaPage() {
  // Estado da Agenda
  const [turno, setTurno] = useState("manha");
  const [ano, setAno] = useState("2025");
  const [semestre, setSemestre] = useState("1");

  // Estado das Atividades (Lista Dinâmica)
  const [listaAtividades, setListaAtividades] = useState(initialAtividades);

  // Função que adiciona a nova atividade na lista
  const adicionarAtividade = (novaAtividade) => {
    const atividadeComId = {
      ...novaAtividade,
      id: Date.now(), // Gera ID único
      // Garante campos padrão se faltarem
      codAtividade: novaAtividade.codAtividade || "NOV-01",
      codDisciplina: novaAtividade.codDisciplina || "GEN-00",
      objetivos: novaAtividade.objetivos || "Criada manualmente",
      bibliografia: novaAtividade.bibliografia || "-",
    };

    // Adiciona no topo da lista
    setListaAtividades((prev) => [atividadeComId, ...prev]);
  };

  return (
    <div className="cronograma-page-container">
      <div className="main-content">
        <AgendaSemanal
          turno={turno}
          setTurno={setTurno}
          ano={ano}
          setAno={setAno}
          semestre={semestre}
          setSemestre={setSemestre}
        />
        <GanttChart />
      </div>

      <div className="right-sidebar">
        {/* Passa a lista e a função para o filho */}
        <Atividades
          atividades={listaAtividades}
          onAddActivity={adicionarAtividade}
        />
      </div>
    </div>
  );
}
