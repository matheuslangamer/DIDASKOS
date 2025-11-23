import React from "react";
import "./AnotacaoCard.css";

// --- O SEGREDO DAS CORES ---
// Mapeamento manual: [Cor do Fundo] -> [Cor da Borda Forte]
const PALETA_BORDAS = {
  "#ffffff": "#e2e8f0", // Branco -> Cinza Borda Padrão
  "#FFE8E8": "#ef4444", // Pastel Vermelho -> Vermelho Vivo
  "#E8F4FF": "#3b82f6", // Pastel Azul -> Azul Vivo
  "#E8F5E9": "#22c55e", // Pastel Verde -> Verde Vivo (Igual sua imagem)
  "#FFF3E0": "#f97316", // Pastel Laranja -> Laranja Vivo
  "#F3E5F5": "#a855f7", // Pastel Roxo -> Roxo Vivo
  "#FFFDE7": "#e2a705ff", // Pastel Amarelo/Lima -> Lima Vivo
  "#F0F0F0": "#94a3b8"  // Cinza Claro -> Cinza Escuro
};

// Função inteligente:
// 1. Tenta achar a cor perfeita no mapa acima.
// 2. Se não achar (cor customizada), calcula matematicamente.
const getCorBorda = (hexCor) => {
  if (!hexCor) return "#e2e8f0";
  
  // Se existe no nosso mapa manual, usa ele (Fica muito mais bonito)
  if (PALETA_BORDAS[hexCor]) {
    return PALETA_BORDAS[hexCor];
  }

  // --- FALLBACK (Matemática para cores desconhecidas) ---
  // Remove # se tiver
  let c = hexCor.replace("#", "");
  if (c.length === 3) c = c.split("").map(i => i + i).join("");
  const rgb = parseInt(c, 16);
  let r = (rgb >> 16) & 0xff;
  let g = (rgb >>  8) & 0xff;
  let b = (rgb >>  0) & 0xff;

  // Escurece drasticamente para garantir contraste
  r = Math.max(0, r - 80);
  g = Math.max(0, g - 80);
  b = Math.max(0, b - 80);

  return `rgb(${r}, ${g}, ${b})`;
};

const formatarData = (dataString) => {
  if (!dataString) return "";
  const [ano, mes, dia] = dataString.split('-');
  if(!dia) return new Date(dataString).toLocaleDateString('pt-BR');
  return `${dia}/${mes}/${ano}`;
};

export default function AnotacaoCard({ nota, onEdit, onDelete, onFixar }) {
  
  const handleFixar = (e) => {
    e.stopPropagation();
    onFixar(nota);
  };

  const handleAction = (e, action) => {
    e.stopPropagation();
    action();
  };

  // Pega a cor da borda forte baseada no fundo
  const corBorda = getCorBorda(nota.cor);

  return (
    <div
      className={`anotacao-card ${nota.fixada ? 'fixada' : ''}`}
      style={{ 
        backgroundColor: nota.cor || "#ffffff",
        // Aplica a borda forte com 2px de espessura
        border: `2px solid ${corBorda}` 
      }}
      onClick={() => onEdit(nota)}
    >
      <div className="anotacao-header">
        <div className="anotacao-info">
          <h3>{nota.titulo}</h3>
          {nota.disciplina && (
            <span 
              className="anotacao-disciplina"
              // Opcional: Deixar o fundo da disciplina levemente mais escuro que o card
              style={{ borderColor: corBorda, color: 'var(--dark-text)' }}
            >
              {nota.disciplina}
            </span>
          )}
        </div>

        <div className="anotacao-acoes">
          <button 
            className={`btn-fixar ${nota.fixada ? 'fixada' : ''}`}
            onClick={handleFixar}
            title={nota.fixada ? "Desfixar" : "Fixar"}
          >
            <i className="fa-solid fa-thumbtack"></i>
          </button>
          
          <button 
            className="btn-edit" 
            onClick={(e) => handleAction(e, () => onEdit(nota))} 
            title="Editar"
          >
            <i className="fa-solid fa-pen"></i>
          </button>
          
          <button 
            className="btn-delete" 
            onClick={(e) => handleAction(e, () => onDelete(nota.id))} 
            title="Excluir"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <p className="anotacao-conteudo">{nota.conteudo}</p>

      <div className="card-footer-info">
        <span className="anotacao-data" style={{color: corBorda}}>
          <i className="fa-regular fa-calendar"></i> {formatarData(nota.data || nota.criadaEm)}
        </span>

        {nota.tags?.length > 0 && (
          <div className="anotacao-tags">
            {nota.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
            {nota.tags.length > 3 && <span className="tag-more">+{nota.tags.length - 3}</span>}
          </div>
        )}
      </div>
    </div>
  );
}