import React, { useState } from 'react';
import { ICON_COLORS, TYPE_LABELS, ICON_CATEGORIES, ICON_SVGS, ICON_PNGS } from './config.js';

export default function Legend({ theme }) {
  const [isOpen, setIsOpen] = useState(false);

  function getIconSrc(subtype) {
    return ICON_SVGS[subtype];
  }

  return (
    <div className="legend-container">
      <button className="legend-toggle" style={{ background: theme.controlBg, color: theme.controlText, borderColor: theme.panelBorder }} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕ Close' : '☰ Legend'}
      </button>
      {isOpen && (
        <div className="legend-panel" style={{ background: theme.panelBg, borderColor: theme.panelBorder, color: theme.panelText }}>
          <h3 style={{ color: theme.panelHead }}>LEGEND</h3>
          {ICON_CATEGORIES.map((cat) => (
            <div key={cat.label} className="legend-category">
              <h4 style={{ color: theme.controlActive }}>{cat.label}</h4>
              <div className="legend-items">
                {cat.types.map((type) => (
                  <div key={type} className="legend-item">
                    <img src={getIconSrc(type)} width={22} height={22} alt={TYPE_LABELS[type]} style={{ flexShrink: 0, borderRadius: 4, background: theme.iconBackdrop, padding: 2 }} />
                    <span>{TYPE_LABELS[type]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}