import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch, placeholder, dados = [] }) {
  const [termo, setTermo] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const containerRef = useRef(null);

  // Lógica para gerar sugestões baseada no texto
  useEffect(() => {
    if (!termo.trim() || !dados.length) {
      setSugestoes([]);
      return;
    }

    const termoBaixo = termo.toLowerCase();

    // 1. Buscar Tags que batem
    const todasTags = [...new Set(dados.flatMap(n => n.tags || []))];
    const tagsMatch = todasTags.filter(tag => tag.toLowerCase().includes(termoBaixo));

    // 2. Buscar Títulos que batem
    const titulosMatch = dados
      .filter(n => n.titulo && n.titulo.toLowerCase().includes(termoBaixo))
      .map(n => n.titulo);

    // Junta tudo (Tags primeiro, depois títulos) e limita a 6 resultados
    const resultados = [
      ...tagsMatch.map(t => ({ tipo: 'tag', valor: t })),
      ...titulosMatch.map(t => ({ tipo: 'titulo', valor: t }))
    ].slice(0, 6);

    setSugestoes(resultados);
  }, [termo, dados]);

  // Fecha sugestões se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMostrarSugestoes(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const valor = e.target.value;
    setTermo(valor);
    onSearch(valor); // Filtra em tempo real
    setMostrarSugestoes(true);
  };

  const handleSelecionarSugestao = (valor) => {
    setTermo(valor);
    onSearch(valor);
    setMostrarSugestoes(false);
  };

  return (
    <div className="search-bar-wrapper" ref={containerRef}>
      <div className={`search-bar ${mostrarSugestoes && sugestoes.length > 0 ? 'active' : ''}`}>
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          placeholder={placeholder || "Buscar..."}
          value={termo}
          onChange={handleChange}
          onFocus={() => setMostrarSugestoes(true)}
          className="search-input"
        />
        {termo && (
          <button 
            className="btn-clear" 
            onClick={() => { setTermo(""); onSearch(""); setSugestoes([]); }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {/* DROPDOWN DE SUGESTÕES */}
      {mostrarSugestoes && sugestoes.length > 0 && (
        <ul className="search-suggestions">
          {sugestoes.map((item, index) => (
            <li key={index} onClick={() => handleSelecionarSugestao(item.valor)}>
              <span className={`icon-box ${item.tipo}`}>
                {item.tipo === 'tag' ? '#' : <i className="fa-regular fa-file-lines"></i>}
              </span>
              <span className="suggestion-text">
                {item.valor}
                <small>{item.tipo === 'tag' ? 'Tag' : 'Nota'}</small>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}