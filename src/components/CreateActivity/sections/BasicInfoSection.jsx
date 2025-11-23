import React from 'react';
import { TURMAS_DISPONIVEIS, DISCIPLINAS_POR_DEPARTAMENTO } from '../utils/constants';

const BasicInfoSection = ({ formData, disciplinasDisponiveis, handleChange }) => {
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
    readonlyInput: {
      width: '100%', 
      padding: '10px', 
      borderRadius: '6px', 
      border: '1px solid #ddd',
      fontSize: '1rem', 
      boxSizing: 'border-box',
      backgroundColor: '#f8f9fa',
      color: '#6c757d'
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={{marginTop:0, color:'#007bff'}}>Informações Básicas</h3>
      
      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Turma</label>
          <select name="turma" style={styles.input} value={formData.turma} onChange={handleChange} required>
            <option value="">Selecione...</option>
            {TURMAS_DISPONIVEIS.map(t => 
              <option key={t.codigo} value={t.codigo}>{t.descricao}</option>
            )}
          </select>
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Departamento</label>
          <select name="departamento" style={styles.input} value={formData.departamento} onChange={handleChange} required>
            <option value="">Selecione...</option>
            {Object.keys(DISCIPLINAS_POR_DEPARTAMENTO).map(k => 
              <option key={k} value={k}>{k.replace('-', ' ').toUpperCase()}</option>
            )}
          </select>
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Disciplina</label>
          <select 
            name="disciplina" 
            style={styles.input} 
            value={formData.disciplina} 
            onChange={handleChange} 
            disabled={!formData.departamento}
            required
          >
            <option value="">
              {formData.departamento ? 'Selecione a disciplina' : 'Primeiro selecione o departamento'}
            </option>
            {disciplinasDisponiveis.map(d => 
              <option key={d.codigo} value={d.codigo}>
                ({d.codigo}) {d.nome}
              </option>
            )}
          </select>
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Semestre</label>
          <select name="semestre" style={styles.input} value={formData.semestre} onChange={handleChange} required>
            <option value="">Selecione...</option>
            {[1,2,3,4,5,6,7,8].map(n => 
              <option key={n} value={n}>{n}º Semestre</option>
            )}
          </select>
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ano</label>
          <input 
            type="number" 
            name="ano" 
            style={styles.input} 
            value={formData.ano} 
            onChange={handleChange} 
            required 
            min="2020"
            max="2030"
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Código da Atividade</label>
          <input 
            type="text" 
            style={styles.readonlyInput} 
            value={formData.codigo} 
            readOnly 
            placeholder="Gerado automaticamente"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;