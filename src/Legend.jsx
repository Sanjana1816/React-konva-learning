import React, { useState } from 'react';
import { ICON_COLORS, TYPE_LABELS, ICON_CATEGORIES, ICON_SVGS } from './config.js';

export default function Legend({ theme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`legend-container ${isOpen ? 'open' : ''}`}>
      <button
        className="legend-toggle"
        style={{ background: theme.controlBg, color: theme.controlText, borderColor: theme.panelBorder }}
        onClick={() => setIsOpen(!isOpen)}
      >
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
                    <img
                      src={ICON_SVGS[type]}
                      width={20}
                      height={20}
                      alt={TYPE_LABELS[type]}
                      style={{ flexShrink: 0 }}
                    />
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