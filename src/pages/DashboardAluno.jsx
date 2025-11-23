import React, { useState, useEffect } from 'react';
import ReadingModal from '../components/ReadingModal';
import './DashboardAluno.css';

function DashboardAluno() {

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const progressCircle = document.querySelector('.progress-circle-container');
    if (progressCircle) {
      const progressValue = progressCircle.dataset.progress;
      progressCircle.style.background = `conic-gradient(var(--primary-blue) ${progressValue}%, #e0e0e0 0%)`;
    }
  }, []);

  const handleOpenModal = (bookData) => setSelectedBook(bookData);
  const handleCloseModal = () => setSelectedBook(null);

  return (
    <main className="dashboard-container">

      {/* =======================
          CABEÇALHO
      ========================= */}
      <section className="page-header">
        <div>
          <h1>Olá, Matheus!</h1>
          <p>Seminário Teológico — Período Atual</p>
        </div>

        <div className="header-actions">
          <a href="#" className="history-progress-card">
            <div className="progress-circle-container" data-progress="75">
              <div className="progress-circle">
                <span className="history-gpa">3.1</span>
              </div>
            </div>
            <span className="history-text">Histórico Parcial</span>
          </a>
        </div>
      </section>

      {/* =======================
          GRID DE STATUS
      ========================= */}
      <section className="stats-grid-home">

        <article className="stat-card-home">
          <span className="stat-title">Média Geral</span>
          <h2>8.8</h2>
          <p>4 disciplinas ativas</p>
        </article>

        <article className="stat-card-home">
          <span className="stat-title">Progresso Geral</span>
          <h2 className="progress-percent">68%</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '68%' }}></div>
          </div>
        </article>

        <article className="stat-card-home">
          <span className="stat-title">Atividades Pendentes</span>
          <h2>2</h2>
          <p>2 em andamento</p>
        </article>

      </section>

      {/* =======================
          GRID PRINCIPAL
      ========================= */}
      <section className="content-grid">
        <div className="main-content-column">

          {/* Próximas Atividades */}
          <article className="card list-card">
            <div className="card-header">
              <h3>Próximas Atividades</h3>
              <a href="#">Ver todas</a>
            </div>

            <ul className="activity-list">
              <li>
                <div className="activity-details">
                  <strong>Prova de Hermenêutica</strong>
                  <span>Hermenêutica Bíblica</span>
                </div>
                <span className="tag tag-red">Atrasada</span>
              </li>

              <li>
                <div className="activity-details">
                  <strong>Trabalho sobre Doutrina da Trindade</strong>
                  <span>Teologia Sistemática I</span>
                </div>
                <span className="tag tag-red">Atrasada</span>
              </li>

              <li>
                <div className="activity-details">
                  <strong>Tradução de João 3:16</strong>
                  <span>Grego Bíblico I</span>
                </div>
                <span className="tag tag-red">Atrasada</span>
              </li>

              <li>
                <div className="activity-details">
                  <strong>Apresentação sobre a Reforma Protestante</strong>
                  <span>História da Igreja</span>
                </div>
                <span className="tag tag-red">Atrasada</span>
              </li>
            </ul>
          </article>

          {/* Leituras */}
          <article className="card list-card">
            <div className="card-header">
              <h3>Leituras em Andamento</h3>
              <a href="#">Ver Biblioteca</a>
            </div>

            <ul className="reading-list">

              <li
                className="reading-item"
                onClick={() =>
                  handleOpenModal({
                    title: "Grego do Novo Testamento para Iniciantes",
                    author: "William D. Mounce",
                    coverSrc: "/images/capa_grego.png",
                    pagesTotal: "450",
                    pagesRead: "445",
                    chaptersTotal: "30",
                    chaptersRead: "1-29"
                  })
                }
              >
                <img src="/images/capa_grego.png" alt="" />
                <div className="reading-details">
                  <strong>Grego do Novo Testamento para Iniciantes</strong>
                  <span>William D. Mounce</span>

                  <div className="reading-progress">
                    <span className="progress-text">445 / 450 páginas</span>
                    <div className="reading-progress-bar-container">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '99%' }}></div>
                      </div>
                      <span className="progress-percent">99%</span>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className="reading-item"
                onClick={() =>
                  handleOpenModal({
                    title: "Teologia Sistemática",
                    author: "Wayne Grudem",
                    coverSrc: "/images/capa_grudem.png",
                    pagesTotal: "1200",
                    pagesRead: "450",
                    chaptersTotal: "57",
                    chaptersRead: "1-20"
                  })
                }
              >
                <img src="/images/capa_grudem.png" alt="" />
                <div className="reading-details">
                  <strong>Teologia Sistemática</strong>
                  <span>Wayne Grudem</span>

                  <div className="reading-progress">
                    <span className="progress-text">450 / 1200 páginas</span>
                    <div className="reading-progress-bar-container">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '38%' }}></div>
                      </div>
                      <span className="progress-percent">38%</span>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className="reading-item"
                onClick={() =>
                  handleOpenModal({
                    title: "Introdução à Hermenêutica Bíblica",
                    author: "E. Lund e P.C. Nelson",
                    coverSrc: "/images/capa_hermeneutica.png",
                    pagesTotal: "280",
                    pagesRead: "180",
                    chaptersTotal: "15",
                    chaptersRead: "1-8"
                  })
                }
              >
                <img src="/images/capa_hermeneutica.png" alt="" />
                <div className="reading-details">
                  <strong>Introdução à Hermenêutica Bíblica</strong>
                  <span>E. Lund e P.C. Nelson</span>

                  <div className="reading-progress">
                    <span className="progress-text">180 / 280 páginas</span>
                    <div className="reading-progress-bar-container">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '64%' }}></div>
                      </div>
                      <span className="progress-percent">64%</span>
                    </div>
                  </div>
                </div>
              </li>

            </ul>
          </article>
        </div>

        {/* =======================
            COLUNA LATERAL
        ========================= */}
        <div className="sidebar-content-column">
          <article className="card list-card">
            <div className="card-header">
              <h3>Avisos Recentes</h3>
              <a href="#">Ver todos</a>
            </div>

            <ul className="notice-list">
              <li>
                <span className="tag tag-academic">acadêmico</span>
                <strong>Período de Provas - 2024.1</strong>
                <p>O período de provas será de 15 a 22 de dezembro...</p>
                <span className="date">31/10/2025</span>
              </li>

              <li>
                <span className="tag tag-event">evento</span>
                <strong>Culto de Ação de Graças</strong>
                <p>Convidamos toda a comunidade acadêmica para o culto especial...</p>
                <span className="date">31/10/2025</span>
              </li>

              <li>
                <span className="tag tag-general">geral</span>
                <strong>Recesso de Final de Ano</strong>
                <p>O recesso acadêmico será iniciado em 20/12/2024...</p>
                <span className="date">31/10/2025</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      {selectedBook && (
        <ReadingModal bookData={selectedBook} onClose={handleCloseModal} />
      )}

    </main>
  );
}

export default DashboardAluno;
