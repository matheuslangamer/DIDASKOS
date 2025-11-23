import React from 'react';
// --- CORREÇÃO 3: Importa o NavLink junto com o Outlet ---
import { Outlet, NavLink } from 'react-router-dom';

// Importa o CSS (que contém os estilos do dashboard)
import './MainLayout.css';

function MainLayout() {
  return (
    <>
      {/* O header já pega o 'gap: 1.5rem' do global.css que vamos ajustar */}
      <header className="main-header">
        <div className="logo-container">
          <div className="logo"><img src="/images/logo.png" alt="Logo Didasko" /></div>
          <span>Hora do Foco</span>
          <span className="logo-divider">|</span>
          <span>Seminário Teológico</span>
        </div>
        
        {/* --- CORREÇÃO 3: O <nav> foi substituído por NavLinks --- */}
        <nav className="main-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-house"></i> Início
          </NavLink>
          <NavLink to="/disciplinas" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-layer-group"></i> Disciplinas
          </NavLink>
          
          {/* Adicionando links "mortos" por enquanto, mas como NavLink */}
          <NavLink to="/cronograma" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-days"></i> Cronograma
          </NavLink>
          <NavLink to="/biblioteca" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-book-bible"></i> Biblioteca
          </NavLink>
          <NavLink to="/anotacoes" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-clipboard"></i> Anotações
          </NavLink>
          <NavLink to="/secretaria" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-landmark"></i> Secretaria
          </NavLink>
        </nav>
        {/* --- FIM DA CORREÇÃO --- */}

        <div className="user-actions">
          <i className="fa-regular fa-bell"></i>
          <div className="user-profile">
            <img src="/images/avatar.avif" alt="Avatar do usuário" className="avatar" />
            <span>matheus Langåmer</span>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
      </header>
      
      {/* O <Outlet /> renderiza a página filha (Dashboard ou Disciplinas) */}
      <Outlet />
    </>
  );
}

export default MainLayout;