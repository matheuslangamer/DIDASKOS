import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Importe seu layout principal
import MainLayout from './components/MainLayout';

// 2. Importe suas páginas
import DashboardAluno from './pages/DashboardAluno';
import Disciplinas from './pages/Disciplinas';
import CronogramaPage from './pages/CronogramaPage';
// (Vamos deixar o login.jsx para depois)

import './App.css';

function App() {
  return (
    <Routes>
      {/* 3. Crie um "grupo" de rotas que usa o MainLayout */}
      <Route element={<MainLayout />}>
        
        {/* A rota "pai" (home) */}
        <Route path="/" element={<DashboardAluno />} /> 
        
        {/* As outras rotas */}
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/cronograma" element={<CronogramaPage />} />

      </Route>

      {/* Aqui fora podemos adicionar rotas que NÃO usam o menu, 
        como a página de Login 
      */}
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;