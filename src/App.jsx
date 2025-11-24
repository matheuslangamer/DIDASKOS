import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout'; 
import DashboardAluno from './pages/DashboardAluno';
import Disciplinas from './pages/Disciplinas';
import CronogramaPage from './pages/CronogramaPage';
import Anotacoes from './pages/Anotacoes';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* MUDEI: de "/" para "/dashboard" para combinar com o MainLayout */}
        <Route path="/dashboard" element={<DashboardAluno />} />
        
        {/* Adicione um redirect da raiz para o dashboard */}
        <Route path="/" element={<DashboardAluno />} />
        
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/cronograma" element={<CronogramaPage />} />
        <Route path="/anotacoes" element={<Anotacoes />} />
        
        {/* Adicione estas rotas também se os componentes existirem */}
        {/* <Route path="/biblioteca" element={<Biblioteca />} /> */}
        {/* <Route path="/secretaria" element={<Secretaria />} /> */}
      </Route>
    </Routes>
  );
}

export default App;