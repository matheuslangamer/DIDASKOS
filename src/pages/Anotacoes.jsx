import React, { useState, useEffect } from "react";
import { useNotas } from "./Anotacoes/hooks/useNotas";
import AnotacaoCard from "./Anotacoes/components/AnotacaoCard";
import AnotacaoModal from "./Anotacoes/components/AnotacaoModal";
import SearchBar from "./Anotacoes/components/SearchBar";

// Importa o arquivo de estilos separadamente
import "./Anotacoes.css";

export default function Anotacoes() {
  const { notas, adicionarNota, editarNota, excluirNota } = useNotas();
  const [modalAberto, setModalAberto] = useState(false);
  const [notaEditando, setNotaEditando] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [notasFiltradas, setNotasFiltradas] = useState([]);

  // Filtra notas fixadas e comuns
  const notasFixadas = notasFiltradas.filter((nota) => nota.fixada);
  const outrasNotas = notasFiltradas.filter((nota) => !nota.fixada);

  // Efeito de busca
  useEffect(() => {
    if (filtro) {
      const filtrado = notas.filter((nota) =>
          nota.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
          nota.conteudo.toLowerCase().includes(filtro.toLowerCase()) ||
          nota.tags?.some((tag) => tag.toLowerCase().includes(filtro.toLowerCase())) ||
          nota.disciplina?.toLowerCase().includes(filtro.toLowerCase())
      );
      setNotasFiltradas(filtrado);
    } else {
      setNotasFiltradas(notas);
    }
  }, [filtro, notas]);

  // Handlers (Funções de ação)
  const handleCriarNota = () => { setNotaEditando(null); setModalAberto(true); };
  
  const handleEditarNota = (nota) => { setNotaEditando(nota); setModalAberto(true); };
  
  const handleSalvarNota = (dadosNota) => {
    if (notaEditando) { editarNota(notaEditando.id, dadosNota); } 
    else { adicionarNota(dadosNota); }
    setModalAberto(false);
    setNotaEditando(null);
  };

  const handleToggleFixar = (nota) => {
    editarNota(nota.id, { fixada: !nota.fixada });
  };

  return (
    <div className="anotacoes-container">
      
      {/* 1. HEADER: Título na esquerda, Botão na direita */}
      <header className="anotacoes-header">
        <div>
          <h1>Anotações</h1>
          <p>Organize suas ideias e estudos</p>
        </div>

        <div className="anotacoes-actions">
          <button className="btn-primary" onClick={handleCriarNota}>
            + Nova Anotação
          </button>
        </div>
      </header>

      {/* 2. BARRA DE PESQUISA: Faixa exclusiva abaixo do header */}
      <div className="search-container-full">
        <SearchBar onSearch={setFiltro} placeholder="Buscar anotações..." />
      </div>

      {/* 3. ÁREA DOS CARDS */}
      <div className="anotacoes-content">
        {/* Seção de Notas Fixadas */}
        {notasFixadas.length > 0 && (
          <section className="secao-notas">
            <h2>Fixadas</h2>
            <div className="grid-notas">
              {notasFixadas.map((nota) => (
                <AnotacaoCard
                  key={nota.id}
                  nota={nota}
                  onEdit={handleEditarNota}
                  onDelete={excluirNota}
                  onFixar={handleToggleFixar}
                />
              ))}
            </div>
          </section>
        )}

        {/* Seção de Outras Notas */}
        <section className="secao-notas">
          <h2>Outras Anotações</h2>
          {outrasNotas.length > 0 ? (
            <div className="grid-notas">
              {outrasNotas.map((nota) => (
                <AnotacaoCard
                  key={nota.id}
                  nota={nota}
                  onEdit={handleEditarNota}
                  onDelete={excluirNota}
                  onFixar={handleToggleFixar}
                />
              ))}
            </div>
          ) : (
            /* Estado Vazio (só aparece se não tiver notas e nem filtro) */
            notasFixadas.length === 0 && (
              <div className="empty-state">
                <p>Nenhuma anotação encontrada. Clique em "Nova Anotação" para começar.</p>
              </div>
            )
          )}
        </section>
      </div>

      {/* MODAL (Popup) */}
      <AnotacaoModal
        aberto={modalAberto}
        onClose={() => { setModalAberto(false); setNotaEditando(null); }}
        nota={notaEditando}
        onSave={handleSalvarNota}
      />
    </div>
  );
}