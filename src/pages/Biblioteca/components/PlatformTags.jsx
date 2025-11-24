// src/pages/Biblioteca/components/PlatformTags.jsx
import React from 'react';
import './PlatformTags.css';

export default function PlatformTags({ editions }) {
  const getPlatformIcon = (platform) => {
    const icons = {
      kindle: 'fa-solid fa-tablet-screen',
      perlego: 'fa-solid fa-book-open',
      pilgrim: 'fa-solid fa-cross',
      physical: 'fa-solid fa-book',
      pdf: 'fa-solid fa-file-pdf',
      other: 'fa-solid fa-book'
    };
    return icons[platform] || icons.other;
  };

  const getPlatformLabel = (platform) => {
    const labels = {
      kindle: 'Kindle',
      perlego: 'Perlego', 
      pilgrim: 'Pilgrim',
      physical: 'Físico',
      pdf: 'PDF',
      other: 'Digital'
    };
    return labels[platform] || platform;
  };

  return (
    <div className="platform-tags">
      {editions.slice(0, 3).map((edition, index) => (
        <span key={index} className={`platform-tag ${edition.platform}`}>
          <i className={getPlatformIcon(edition.platform)}></i>
          {getPlatformLabel(edition.platform)}
        </span>
      ))}
      {editions.length > 3 && (
        <span className="platform-tag more">
          +{editions.length - 3} mais
        </span>
      )}
    </div>
  );
}