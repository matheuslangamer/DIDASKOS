import React from 'react';
import { PRIORIDADES } from '../utils/constants';

const ActivityDetailsSection = ({ formData, handleChange }) => {
  const styles = {
    section: {
      marginBottom: '25px', 
      paddingBottom: '20px', 
      borderBottom: '1px dashed #eee'
    },
    row: {
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '20px', 
      marginBottom: '15px'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block', 
      marginBottom: '5px', 
      fontWeight: 'bold', 
      fontSize: '0.9rem', 
      color: '#555'
    },
    input: {
      width: '100%', 
      padding: '10px', 
      borderRadius: '6px', 
      border: '1px solid #ddd',
      fontSize: '1rem', 
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%', 
      padding: '10px', 
      borderRadius: '6px', 
      border: '1px solid #ddd',
      fontSize: '1rem', 
      boxSizing: 'border-box',
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit'
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={{marginTop:0, color:'#007bff'}}>Detalhes da Atividade</h3>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>Título da Atividade</label>
        <input 
          type="text" 
          name="titulo" 
          style={styles.input} 
          value={formData.titulo} 
          onChange={handleChange} 
          required 
          placeholder="Ex: Prova Parcial, Trabalho em Grupo, Seminário..." 
        />
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Prioridade</label>
          <select name="prioridade" style={styles.input} value={formData.prioridade} onChange={handleChange} required>
            {PRIORIDADES.map(prio => 
              <option key={prio.valor} value={prio.valor}>{prio.label}</option>
            )}
          </select>
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Valor (Pontos)</label>
          <input 
            type="number" 
            name="valor" 
            style={styles.input} 
            step="0.1" 
            min="0"
            value={formData.valor} 
            onChange={handleChange} 
            required 
            placeholder="Ex: 10.0, 5.5, 20.0"
          />
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Data de Entrega</label>
        <input 
          type="datetime-local" 
          name="dataEntrega" 
          style={styles.input} 
          value={formData.dataEntrega} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Descrição Detalhada</label>
        <textarea 
          name="descricao" 
          style={styles.textarea} 
          value={formData.descricao} 
          onChange={handleChange} 
          required 
          placeholder="Descreva detalhadamente a atividade, objetivos, critérios de avaliação, formato de entrega..."
        />
      </div>
    </div>
  );
};

export default ActivityDetailsSection;