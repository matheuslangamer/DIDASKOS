// src/pages/Biblioteca/components/SearchFilters.jsx
import React from 'react';
import { BOOK_PLATFORMS } from '../utils/bookSchema';
import './SearchFilters.css';

export default function SearchFilters({ 
  searchTerm, 
  onSearchChange, 
  platformFilter, 
  onPlatformFilterChange,
  viewMode,
  onViewModeChange 
}) {
  return (
    <div className="search-filters">
      <div className="search-bar">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Buscar livros por título, autor ou ISBN..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="filters-right">
        <select 
          value={platformFilter} 
          onChange={(e) => onPlatformFilterChange(e.target.value)}
          className="platform-filter"
        >
          <option value="all">Todas as plataformas</option>
          {Object.entries(BOOK_PLATFORMS).map(([key, value]) => (
            <option key={value} value={value}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </option>
          ))}
        </select>
        
        {/* ✅ CORREÇÃO: View Toggle com ícones e labels */}
        <div className="view-toggle">
          <button 
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => onViewModeChange('grid')}
            title="Visualização em grade"
          >
            <i className="fa-solid fa-grid"></i>
            <span>Grid</span>
          </button>
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => onViewModeChange('list')}
            title="Visualização em lista"
          >
            <i className="fa-solid fa-list"></i>
            <span>Lista</span>
          </button>
        </div>
      </div>
    </div>
  );
}