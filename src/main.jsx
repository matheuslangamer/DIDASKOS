import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

// 1. Importa o layout principal
import MainLayout from './components/MainLayout';

// 2. Importa todas as páginas
import Login from './pages/Login';
import DashboardAluno from './pages/DashboardAluno';
import Disciplinas from './pages/Disciplinas';
import CronogramaPage from './pages/CronogramaPage';
import Anotacoes from './pages/Anotacoes';
import Biblioteca from './pages/Biblioteca';
import Secretaria from './pages/Secretaria';

// 3. Configura as rotas
const router = createBrowserRouter([
  // Rota de Login (fora do layout principal)
  {
    path: "/login",
    element: <Login />,
  },
  
  // Rotas principais (dentro do layout com menu)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // Rota / (página inicial)
        element: <DashboardAluno />,
      },
      {
        path: "dashboard", // Rota /dashboard
        element: <DashboardAluno />,
      },
      {
        path: "disciplinas", // Rota /disciplinas
        element: <Disciplinas />,
      },
      {
        path: "cronograma", // Rota /cronograma
        element: <CronogramaPage />,
      },
      {
        path: "anotacoes", // Rota /anotacoes
        element: <Anotacoes />,
      },
      {
        path: "biblioteca", // Rota /biblioteca
        element: <Biblioteca />,
      },
      {
        path: "secretaria", // Rota /secretaria
        element: <Secretaria />,
      },
    ]
  },
]);

// 4. Renderiza a aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)