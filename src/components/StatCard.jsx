import React from 'react';
import './StatCard.css'; // estilos específicos ou reaproveitar os globais

function StatCard({ title, value, description, icon, color }) {
  return (
    <article className="stat-card">
      {icon && (
        <div className="stat-icon" style={{ backgroundColor: color.bg, color: color.text }}>
          <i className={icon}></i>
        </div>
      )}
      <span className="stat-title">{title}</span>
      <h2>{value}</h2>
      {description && <p>{description}</p>}
    </article>
  );
}

export default StatCard;