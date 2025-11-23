import React, { useState, useEffect, useCallback } from "react";
import ColorPicker from "./ColorPicker";
import Tag from "./Tag";
import "./AnotacaoModal.css";

export default function AnotacaoModal({ aberto, onClose, nota, onSave }) {
  const [formData, setFormData] = useState({
    titulo: "",
    conteudo: "",
    tags: [],
    disciplina: "",
    cor: "#ffffff",
    fixada: false,
    data: new Date().toISOString().split('T')[0]
  });

  const [novaTag, setNovaTag] = useState("");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Reset form quando modal abrir/fechar ou nota mudar
  useEffect(() => {
    if (aberto) {
      setIsClosing(false);
      if (nota) {
        setFormData({
          ...nota,
          data: nota.data ? nota.data.split('T')[0] : new Date().toISOString().split('T')[0]
        });
      } else {
        setFormData({
          titulo: "",
          conteudo: "",
          tags: [],
          disciplina: "",
          cor: "#ffffff",
          fixada: false,
          data: new Date().toISOString().split('T')[0]
        });
      }
      setNovaTag("");
      setErrors({});
    }
  }, [nota, aberto]);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Remove erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  const processarTag = useCallback((texto) => {
    if (!texto) return;
    const novasTags = texto.split(';')
      .map(t => t.trim())
      .filter(t => t !== "" && !formData.tags.includes(t));
    
    if (novasTags.length > 0) {
      handleChange('tags', [...formData.tags, ...novasTags]);
    }
  }, [formData.tags, handleChange]);

  const handleChangeTag = (e) => {
    const valor = e.target.value;
    if (valor.includes(";")) {
      processarTag(valor);
      setNovaTag("");
    } else {
      setNovaTag(valor);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processarTag(novaTag);
      setNovaTag("");
    }
  };

  const handleRemoveTag = useCallback((tagToRemove) => {
    handleChange('tags', formData.tags.filter(t => t !== tagToRemove));
  }, [formData.tags, handleChange]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = "Título é obrigatório";
    }
    
    if (!formData.conteudo.trim()) {
      newErrors.conteudo = "Conteúdo é obrigatório";
    }
    
    if (!formData.data) {
      newErrors.data = "Data é obrigatória";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm() && !isSaving) {
      setIsSaving(true);
      
      try {
        await onSave(formData);
        handleClose();
      } catch (error) {
        console.error("Erro ao salvar:", error);
        setErrors({ submit: "Erro ao salvar anotação. Tente novamente." });
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (!aberto && !isClosing) return null;

  return (
    <div 
      className={`modal-overlay ${aberto && !isClosing ? 'active' : 'closing'}`} 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`modal-content anotacao-modal ${isClosing ? 'closing' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="modal-header">
          <h2 id="modal-title">{nota ? "Editar Anotação" : "Nova Anotação"}</h2>
          <div className="modal-header-actions">
            <button 
              type="button"
              className={`btn-icon-toggle ${formData.fixada ? 'active' : ''}`} 
              onClick={() => handleChange('fixada', !formData.fixada)}
              title={formData.fixada ? "Desfixar" : "Fixar no topo"}
              aria-label={formData.fixada ? "Desfixar anotação" : "Fixar anotação no topo"}
            >
              <i className="fa-solid fa-thumbtack"></i>
            </button>
            <button 
              className="modal-close" 
              onClick={handleClose}
              aria-label="Fechar modal"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label htmlFor="disciplina">Disciplina</label>
              <input
                id="disciplina"
                type="text"
                value={formData.disciplina}
                onChange={(e) => handleChange('disciplina', e.target.value)}
                placeholder="Ex: Teologia Sistemática"
                className={errors.disciplina ? 'error' : ''}
              />
              {errors.disciplina && <span className="error-message">{errors.disciplina}</span>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="data">Data</label>
              <input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => handleChange('data', e.target.value)}
                required
                className={errors.data ? 'error' : ''}
              />
              {errors.data && <span className="error-message">{errors.data}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              type="text"
              value={formData.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              placeholder="Título da anotação..."
              required
              className={errors.titulo ? 'error' : ''}
              style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            />
            {errors.titulo && <span className="error-message">{errors.titulo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="conteudo">Conteúdo</label>
            <textarea
              id="conteudo"
              value={formData.conteudo}
              onChange={(e) => handleChange('conteudo', e.target.value)}
              placeholder="Escreva suas ideias aqui..."
              rows="8"
              required
              className={errors.conteudo ? 'error' : ''}
            />
            {errors.conteudo && <span className="error-message">{errors.conteudo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nova-tag">
              Tags <small style={{color:'#888', fontWeight:'normal'}}>(Separe por ponto e vírgula)</small>
            </label>
            <div className="tags-input-container">
              <input
                id="nova-tag"
                type="text"
                value={novaTag}
                onChange={handleChangeTag}
                onKeyPress={handleKeyPress}
                placeholder="Ex: prova; importante;"
              />
              <button 
                type="button" 
                onClick={() => { processarTag(novaTag); setNovaTag(""); }} 
                className="btn-add-tag"
                aria-label="Adicionar tag"
              >
                +
              </button>
            </div>
            <div className="tags-preview">
              {formData.tags.map((tag, index) => (
                <Tag 
                  key={index} 
                  tag={tag} 
                  onRemove={() => handleRemoveTag(tag)} 
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Cor do Cartão</label>
            <ColorPicker 
              corSelecionada={formData.cor} 
              onCorChange={(cor) => handleChange('cor', cor)} 
            />
          </div>

          {errors.submit && (
            <div className="error-banner">
              <i className="fa-solid fa-triangle-exclamation"></i>
              {errors.submit}
            </div>
          )}

          <div className="modal-footer">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Salvando...
                </>
              ) : (
                nota ? "Salvar Alterações" : "Criar Anotação"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}