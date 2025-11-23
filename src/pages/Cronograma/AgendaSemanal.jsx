import React from 'react';
import './AgendaSemanal.css'; // CSS próprio

export default function AgendaSemanal({ turno, setTurno, ano, setAno, semestre, setSemestre }) {
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const aulaPlaceholder = { materia: "Aula Vaga", professor: "A definir", sala: "S-01" };
  const tituloAgenda = `Agenda (${turno === 'manha' ? 'Manhã' : 'Noite'}) - ${semestre}º Semestre / ${ano}`;
  const anos = ["2026","2025", "2024", "2023"];
  const semestres = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  // Renderização para turno da manhã
  if (turno === 'manha') {
    return (
      <div className="agenda-container widget">
        <div className="agenda-header">
          <h3>{tituloAgenda}</h3>
          <div className="agenda-filters">
            <div className="agenda-filter-group">
              <label htmlFor="agenda-ano-select">Ano</label>
              <select 
                id="agenda-ano-select" 
                value={ano} 
                onChange={(e) => setAno(e.target.value)}
              >
                {anos.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="agenda-filter-group">
              <label htmlFor="agenda-semestre-select">Semestre</label>
              <select 
                id="agenda-semestre-select" 
                value={semestre} 
                onChange={(e) => setSemestre(e.target.value)}
              >
                {semestres.map(s => <option key={s} value={s}>{s}º</option>)}
              </select>
            </div>
            <div className="agenda-filter-group">
              <label htmlFor="agenda-turno-select">Turno</label>
              <select 
                id="agenda-turno-select" 
                value={turno} 
                onChange={(e) => setTurno(e.target.value)}
              >
                <option value="manha">Manhã</option>
                <option value="noite">Noite</option>
              </select>
            </div>
          </div>
        </div>
        <div className="agenda-grid">
          <div className="agenda-cell header-cell time-header">Horário</div>
          {dias.map(dia => (<div key={dia} className="agenda-cell header-cell day-header">{dia}</div>))}
          
          <div className="agenda-cell time-cell">07:00 - 08:40</div>
          {dias.map((dia, idx) => (<div key={'m1' + idx} className="agenda-cell class-cell"><strong>{aulaPlaceholder.materia}</strong><span>{aulaPlaceholder.professor}</span><em>{aulaPlaceholder.sala}</em></div>))}
          
          <div className="agenda-cell time-cell">08:40 - 08:45</div>
          <div className="agenda-cell break-cell" style={{ gridColumn: 'span 5' }}>Intervalo</div>
          
          <div className="agenda-cell time-cell">08:45 - 10:25</div>
          {dias.map((dia, idx) => (<div key={'m2' + idx} className="agenda-cell class-cell"><strong>{aulaPlaceholder.materia}</strong><span>{aulaPlaceholder.professor}</span><em>{aulaPlaceholder.sala}</em></div>))}
          
          <div className="agenda-cell time-cell">10:25 - 10:40</div>
          <div className="agenda-cell break-cell" style={{ gridColumn: 'span 5' }}>Intervalo</div>
          
          <div className="agenda-cell time-cell">10:40 - 12:20</div>
          {dias.map((dia, idx) => (<div key={'m3' + idx} className="agenda-cell class-cell"><strong>{aulaPlaceholder.materia}</strong><span>{aulaPlaceholder.professor}</span><em>{aulaPlaceholder.sala}</em></div>))}
        </div>
      </div>
    );
  }

  // Renderização para turno da noite
  return (
    <div className="agenda-container widget">
      <div className="agenda-header">
        <h3>{tituloAgenda}</h3>
        <div className="agenda-filters">
          <div className="agenda-filter-group">
            <label htmlFor="agenda-ano-select">Ano</label>
            <select 
              id="agenda-ano-select" 
              value={ano} 
              onChange={(e) => setAno(e.target.value)}
            >
              {anos.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="agenda-filter-group">
            <label htmlFor="agenda-semestre-select">Semestre</label>
            <select 
              id="agenda-semestre-select" 
              value={semestre} 
              onChange={(e) => setSemestre(e.target.value)}
            >
              {semestres.map(s => <option key={s} value={s}>{s}º</option>)}
            </select>
          </div>
          <div className="agenda-filter-group">
            <label htmlFor="agenda-turno-select">Turno</label>
            <select 
              id="agenda-turno-select" 
              value={turno} 
              onChange={(e) => setTurno(e.target.value)}
            >
              <option value="manha">Manhã</option>
              <option value="noite">Noite</option>
            </select>
          </div>
        </div>
      </div>
      <div className="agenda-grid night-schedule">
        <div className="agenda-cell header-cell time-header">Horário</div>
        {dias.map(dia => (<div key={dia} className="agenda-cell header-cell day-header">{dia}</div>))}
        
        <div className="agenda-cell time-cell">19:00 - 20:30</div>
        {dias.map((dia, idx) => (<div key={'n1' + idx} className="agenda-cell class-cell"><strong>{aulaPlaceholder.materia}</strong><span>{aulaPlaceholder.professor}</span><em>{aulaPlaceholder.sala}</em></div>))}
        
        <div className="agenda-cell time-cell">20:30 - 20:45</div>
        <div className="agenda-cell break-cell" style={{ gridColumn: 'span 5' }}>Intervalo</div>
        
        <div className="agenda-cell time-cell">20:45 - 22:15</div>
        {dias.map((dia, idx) => (<div key={'n2' + idx} className="agenda-cell class-cell"><strong>{aulaPlaceholder.materia}</strong><span>{aulaPlaceholder.professor}</span><em>{aulaPlaceholder.sala}</em></div>))}
      </div>
    </div>
  );
}