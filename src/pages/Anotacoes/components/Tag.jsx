import React from "react";
import "./Tag.css";

export default function Tag({ tag, onRemove }) {
  return (
    <span className="tag">
      {tag}
      {onRemove && (
        <button className="tag-remove" onClick={() => onRemove(tag)}>
          ×
        </button>
      )}
    </span>
  );
}