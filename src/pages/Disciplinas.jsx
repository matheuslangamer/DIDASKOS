import React, { useState, useEffect } from 'react';
import './Disciplinas.css';
import '../components/MainLayout.css'
// Helper functions
function calculateCountdown(dueDateString) {
  const dueDate = new Date(dueDateString);
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();

  if (diff < 0) return { text: "ATRASADO", late: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 1) return { text: `Faltam ${days} dias`, late: false };
  if (days === 1) return { text: `Falta 1 dia`, late: false };

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (hours > 1) return { text: `Faltam ${hours} horas`, late: false };
  if (hours === 1) return { text: `Falta 1 hora`, late: false };

  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes > 0) return { text: `Faltam ${minutes} min`, late: false };
  
  return { text: "Prazo encerrando", late: false };
}

function formatDueDate(dueDateString) {
  const date = new Date(dueDateString);
  const options = {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  };
  return date.toLocaleString('pt-BR', options).replace(',', ' às');
}

function Disciplinas() {
  // Estados
  const [activeFilter, setActiveFilter] = useState('todas');
  const [selectedTask, setSelectedTask] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [countdownTimers, setCountdownTimers] = useState({});

  // Effect para calcular cronômetros
  useEffect(() => {
    const timers = {};
    document.querySelectorAll('.pending-task-item').forEach((item, index) => {
      const dueDate = item.dataset.dueDate;
      if (dueDate) {
        timers[index] = calculateCountdown(dueDate);
      }
    });
    setCountdownTimers(timers);
  }, []);

  // Funções do modal
  const handleOpenTaskModal = (taskData) => {
    setSelectedTask(taskData);
  };

  const handleCloseTaskModal = () => {
    setSelectedTask(null);
    setAttachedFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    document.getElementById('task-file-input').value = null;
  };

  return (
    <main className="dashboard-container">
      
      {/* Cabeçalho da Página */}
      <section className="page-header">
        <div>
          <h1>Minhas Disciplinas</h1>
          <p>Acompanhe seu progresso e desempenho acadêmico</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" id="create-activity-btn">
            <i className="fa-solid fa-plus"></i>
            Criar Atividade
          </button>
        </div>
      </section>

      {/* Grade de Estatísticas - 4 COLUNAS */}
      <section className="stats-grid">
        <article className="card stat-card">
          <div className="stat-icon"><i className="fa-solid fa-book"></i></div>
          <h2>5</h2>
          <p>Total</p>
        </article>
        
        <article className="card stat-card">
          <div className="stat-icon"><i className="fa-solid fa-person-running"></i></div>
          <h2>4</h2>
          <p>Em Andamento</p>
        </article>
        
        <article className="card stat-card">
          <div className="stat-icon"><i className="fa-solid fa-graduation-cap"></i></div>
          <h2>1</h2>
          <p>Concluídas</p>
        </article>
        
        <article className="card stat-card">
          <div className="stat-icon"><i className="fa-solid fa-star"></i></div>
          <h2>9.2</h2>
          <p>Média Parcial</p>
        </article>
      </section>

      {/* Abas de Filtro */}
      <section className="tabs-container">
        <a href="#" 
           className={activeFilter === 'todas' ? 'tab-link active' : 'tab-link'} 
           onClick={(e) => { e.preventDefault(); setActiveFilter('todas'); }}>
           Todas
        </a>
        <a href="#" 
           className={activeFilter === 'ativa' ? 'tab-link active' : 'tab-link'} 
           onClick={(e) => { e.preventDefault(); setActiveFilter('ativa'); }}>
           Ativas
        </a>
        <a href="#" 
           className={activeFilter === 'concluida' ? 'tab-link active' : 'tab-link'} 
           onClick={(e) => { e.preventDefault(); setActiveFilter('concluida'); }}>
           Concluídas
        </a>
        <a href="#" 
           className={activeFilter === 'pendente' ? 'tab-link active' : 'tab-link'} 
           onClick={(e) => { e.preventDefault(); setActiveFilter('pendente'); }}>
           Pendentes
        </a>
      </section>

      {/* Grade de Disciplinas */}
      <section className="disciplines-grid">
        {/* Card 1 - Teologia Sistemática I */}
        <article className={`card discipline-card ${activeFilter !== 'todas' && activeFilter !== 'pendente' ? 'hidden' : ''}`} data-status="pendente">
          <div className="discipline-grade g-green">9.2</div>
          <div className="discipline-code">TS-101</div>
          <h3>Teologia Sistemática I</h3>
          <div className="discipline-professor">
            <i className="fa-solid fa-user-tie"></i>
            <span>Dr. João Silva</span>
          </div>
          <div className="discipline-progress">
            <div className="progress-header">
              <span>Progresso</span>
              <strong>75%</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '75%'}}></div>
            </div>
          </div>
          <div className="discipline-footer">
            <div className="discipline-hours">
              <i className="fa-regular fa-clock"></i>
              <span>60h</span>
            </div>
            <span className="discipline-status-tag pendente">Pendente</span>
          </div>
        </article>

        {/* Card 2 - Homilética */}
        <article className={`card discipline-card ${activeFilter !== 'todas' && activeFilter !== 'concluida' ? 'hidden' : ''}`} data-status="concluida">
          <div className="discipline-grade g-green">9.0</div>
          <div className="discipline-code">HM-301</div>
          <h3>Homilética</h3>
          <div className="discipline-professor">
            <i className="fa-solid fa-user-tie"></i>
            <span>Rev. Carlos Costa</span>
          </div>
          <div className="discipline-progress">
            <div className="progress-header">
              <span>Progresso</span>
              <strong>100%</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '100%'}}></div>
            </div>
          </div>
          <div className="discipline-footer">
            <div className="discipline-hours">
              <i className="fa-regular fa-clock"></i>
              <span>45h</span>
            </div>
            <span className="discipline-status-tag concluida">Concluída</span>
          </div>
        </article>

        {/* Card 3 - História da Igreja */}
        <article className={`card discipline-card ${activeFilter !== 'todas' && activeFilter !== 'ativa' ? 'hidden' : ''}`} data-status="ativa">
          <div className="discipline-grade g-green">9.5</div>
          <div className="discipline-code">HI-201</div>
          <h3>História da Igreja</h3>
          <div className="discipline-professor">
            <i className="fa-solid fa-user-tie"></i>
            <span>Dr. Pedro Oliveira</span>
          </div>
          <div className="discipline-progress">
            <div className="progress-header">
              <span>Progresso</span>
              <strong>90%</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '90%'}}></div>
            </div>
          </div>
          <div className="discipline-footer">
            <div className="discipline-hours">
              <i className="fa-regular fa-clock"></i>
              <span>40h</span>
            </div>
            <span className="discipline-status-tag ativa">Ativa</span>
          </div>
        </article>

        {/* Card 4 - Grego Bíblico I */}
        <article className={`card discipline-card ${activeFilter !== 'todas' && activeFilter !== 'pendente' ? 'hidden' : ''}`} data-status="pendente">
          <div className="discipline-grade g-blue">7.5</div>
          <div className="discipline-code">GB-103</div>
          <h3>Grego Bíblico I</h3>
          <div className="discipline-professor">
            <i className="fa-solid fa-user-tie"></i>
            <span>Dr. Lucas Ferreira</span>
          </div>
          <div className="discipline-progress">
            <div className="progress-header">
              <span>Progresso</span>
              <strong>25%</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '25%'}}></div>
            </div>
          </div>
          <div className="discipline-footer">
            <div className="discipline-hours">
              <i className="fa-regular fa-clock"></i>
              <span>60h</span>
            </div>
            <span className="discipline-status-tag pendente">Pendente</span>
          </div>
        </article>

        {/* Card 5 - Hermenêutica Bíblica */}
        <article className={`card discipline-card ${activeFilter !== 'todas' && activeFilter !== 'pendente' ? 'hidden' : ''}`} data-status="pendente">
          <div className="discipline-grade g-blue">8.8</div>
          <div className="discipline-code">HB-102</div>
          <h3>Hermenêutica Bíblica</h3>
          <div className="discipline-professor">
            <i className="fa-solid fa-user-tie"></i>
            <span>Profa. Maria Santos</span>
          </div>
          <div className="discipline-progress">
            <div className="progress-header">
              <span>Progresso</span>
              <strong>40%</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '40%'}}></div>
            </div>
          </div>
          <div className="discipline-footer">
            <div className="discipline-hours">
              <i className="fa-regular fa-clock"></i>
              <span>45h</span>
            </div>
            <span className="discipline-status-tag pendente">Pendente</span>
          </div>
        </article>
      </section>

      {/* Lista de Atividades Pendentes */}
      <section className="card list-card" id="pending-tasks-section">
        <div className="card-header">
          <h3><i className="fa-regular fa-bell"></i> Atividades Pendentes</h3>
          <a href="./Cronograma">Ver Cronograma <i className="fa-solid fa-arrow-right-long"></i></a>
        </div>
        <ul className="pending-task-list">
          
          {/* Tarefa 1 */}
          <li className="pending-task-item" 
              data-due-date="2025-11-18T18:00"
              onClick={() => handleOpenTaskModal({
                title: "Prova de Hermenêutica",
                discipline: "Hermenêutica Bíblica (HB-102)",
                value: "10.0 pts",
                priority: "alta",
                dueDate: "2025-11-18T18:00",
                description: "Prova final sobre os capítulos 5 a 10 do livro-texto..."
              })}>
            <div className="task-icon icon-red"><i className="fa-solid fa-file-circle-question"></i></div>
            <div className="task-details">
              <span className="task-discipline">Hermenêutica Bíblica</span>
              <strong>Prova de Hermenêutica</strong>
            </div>
            <div className="task-meta">
              <span className="task-value">Valor: 10.0 pts</span>
              <span className={`task-countdown ${countdownTimers[0]?.late ? 'task-late' : ''}`}>
                {countdownTimers[0]?.text}
              </span>
              <span className="tag-priority alta">Prioridade Alta</span>
            </div>
          </li>
          
          {/* Tarefa 2 */}
          <li className="pending-task-item"
              data-due-date="2025-11-25T23:59"
              onClick={() => handleOpenTaskModal({
                title: "Resenha: 'Grego para Iniciantes'",
                discipline: "Grego Bíblico I (GB-103)",
                value: "5.0 pts",
                priority: "media",
                dueDate: "2025-11-25T23:59",
                description: "Escrever uma resenha de 3 páginas sobre a leitura dos capítulos 1-5..."
              })}>
            <div className="task-icon icon-orange"><i className="fa-solid fa-book-open"></i></div>
            <div className="task-details">
              <span className="task-discipline">Grego Bíblico I</span>
              <strong>Resenha: 'Grego para Iniciantes'</strong>
            </div>
            <div className="task-meta">
              <span className="task-value">Valor: 5.0 pts</span>
              <span className={`task-countdown ${countdownTimers[1]?.late ? 'task-late' : ''}`}>
                {countdownTimers[1]?.text}
              </span>
              <span className="tag-priority media">Prioridade Média</span>
            </div>
          </li>

          {/* Tarefa 3 */}
          <li className="pending-task-item"
              data-due-date="2025-12-05T23:59"
              onClick={() => handleOpenTaskModal({
                title: "Trabalho: Doutrina da Trindade",
                discipline: "Teologia Sistemática I (TS-101)",
                value: "8.0 pts",
                priority: "baixa",
                dueDate: "2025-12-05T23:59",
                description: "Trabalho em grupo sobre o desenvolvimento histórico da doutrina da Trindade..."
              })}>
            <div className="task-icon icon-green"><i className="fa-solid fa-file-pen"></i></div>
            <div className="task-details">
              <span className="task-discipline">Teologia Sistemática I</span>
              <strong>Trabalho: Doutrina da Trindade</strong>
            </div>
            <div className="task-meta">
              <span className="task-value">Valor: 8.0 pts</span>
              <span className={`task-countdown ${countdownTimers[2]?.late ? 'task-late' : ''}`}>
                {countdownTimers[2]?.text}
              </span>
              <span className="tag-priority baixa">Prioridade Baixa</span>
            </div>
          </li>

        </ul>
      </section>

      {/* Modal de Tarefa */}
      {selectedTask && (
        <div className="modal-overlay active" id="task-modal" onClick={handleCloseTaskModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 id="modal-task-title">{selectedTask.title}</h2>
              <button className="modal-close" id="modal-task-close-btn" onClick={handleCloseTaskModal}>&times;</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-task-details">
                <div className="task-detail-group">
                  <span>Disciplina</span>
                  <strong id="modal-task-discipline">{selectedTask.discipline}</strong>
                </div>
                <div className="task-detail-group">
                  <span>Prioridade</span>
                  <span id="modal-task-priority" className={`tag-priority ${selectedTask.priority}`}>
                    Prioridade {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                  </span>
                </div>
                <div className="task-detail-group">
                  <span>Valor</span>
                  <strong id="modal-task-value">{selectedTask.value}</strong>
                </div>
                <div className="task-detail-group">
                  <span>Data de Entrega</span>
                  <strong id="modal-task-due-date">{formatDueDate(selectedTask.dueDate)}</strong>
                </div>
                <div className="task-detail-group">
                  <span>Tempo Restante</span>
                  <strong id="modal-task-countdown" className={calculateCountdown(selectedTask.dueDate).late ? 'task-late' : ''}>
                    {calculateCountdown(selectedTask.dueDate).text}
                  </strong>
                </div>
                
                <hr className="task-divider" />
                <h4>Descrição</h4>
                <p id="modal-task-description">{selectedTask.description}</p>
                <hr className="task-divider" />

                {/* Seção de Anexo */}
                <h4>Anexar Atividade</h4>
                <div className="task-attachment-group">
                  <label htmlFor="task-file-input" className="btn-secondary btn-attach" 
                         style={{ display: attachedFile ? 'none' : 'inline-flex' }}>
                    <i className="fa-solid fa-paperclip"></i>
                    Anexar Arquivo
                  </label>
                  <input type="file" id="task-file-input" onChange={handleFileChange} />

                  {attachedFile && (
                    <div className="uploaded-file-preview" id="file-preview" style={{ display: 'flex' }}>
                      <i className="fa-solid fa-file-zipper"></i>
                      <span id="uploaded-file-name">{attachedFile.name}</span>
                      <button className="remove-file-btn" id="remove-file-btn" onClick={handleRemoveFile}>&times;</button>
                    </div>
                  )}
                </div>
                <span className="attachment-note">Você pode alterar o anexo até a data de entrega.</span>

              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" id="modal-task-cancel-btn" onClick={handleCloseTaskModal}>
                  Fechar
              </button>
              <button className="btn-more">
                  <i className="fa-solid fa-arrow-right"></i>
                  Mais Informações
              </button>
              <button className="btn-primary" id="modal-save-btn">
                  Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
      
    </main>
  );
}

export default Disciplinas;