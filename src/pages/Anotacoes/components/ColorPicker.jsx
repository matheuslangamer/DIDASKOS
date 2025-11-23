import React from "react";
import "./ColorPicker.css";

const CORES = [
  "#ffffff", "#FFE8E8", "#E8F4FF", "#E8F5E9", 
  "#FFF3E0", "#F3E5F5", "#FFFDE7", "#F0F0F0"
];

export default function ColorPicker({ corSelecionada, onCorChange }) {
  return (
    <div className="color-picker">
      {CORES.map((cor) => (
        <button
          key={cor}
          type="button"
          className={`color-option ${corSelecionada === cor ? 'selecionada' : ''}`}
          style={{ backgroundColor: cor }}
          onClick={() => onCorChange(cor)}
        />
      ))}
    </div>
  );
}