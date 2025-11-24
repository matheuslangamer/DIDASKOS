import React, { useState, useRef } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch, placeholder }) {
  const [termo, setTermo] = useState("");
  const containerRef = useRef(null);

  const handleChange = (e) => {
    const valor = e.target.value;
    setTermo(valor);
    // ✅ CHAMADA DIRETA SEM COMPLICAÇÕES
    onSearch(valor);
  };

  const handleClear = () => {
    setTermo("");
    onSearch("");
  };

  return (
    <div className="search-bar-wrapper" ref={containerRef}>
      <div className="search-bar">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          placeholder={placeholder || "Buscar..."}
          value={termo}
          onChange={handleChange}
          className="search-input"
        />
        {termo && (
          <button className="btn-clear" onClick={handleClear}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
    </div>
  );
}