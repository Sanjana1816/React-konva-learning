/* ================================================== */
/* ===        ICON COLORS (By Type)                === */
/* ================================================== */
export const ICON_COLORS = {
  navigational_radar: '#00e5ff', tracking_radar: '#448aff', sonar: '#00bfa5',
  sonobuoy: '#26a69a', infrared: '#ff6e40', visual: '#42a5f5',
  esm: '#76ff03', interrogator: '#69f0ae', transponder: '#b2ff59',
  gun: '#ff1744', missile: '#ff5252', rocket: '#ff7043',
  asw_rocket: '#ff9100', torpedo: '#d50000', depth_charge: '#ff3d00',
  mine: '#dd2c00', smoke: '#9e9e9e', chaff: '#ffd740',
  flare: '#ffab00', radar_decoy: '#ffc400', radar_noise_jammer: '#ff6d00',
  radar_deception_jammer: '#e65100', aircraft: '#e040fb', helicopter: '#ab47bc', uav: '#7c4dff',
};

/* ================================================== */
/* ===    HUMAN READABLE LABELS + CATEGORIES       === */
/* ================================================== */
export const TYPE_LABELS = {
  navigational_radar: 'Nav Radar', tracking_radar: 'Track Radar', sonar: 'Sonar',
  sonobuoy: 'Sonobuoy', infrared: 'Infrared', visual: 'Visual',
  esm: 'ESM', interrogator: 'Interrogator', transponder: 'Transponder',
  gun: 'Gun', missile: 'Missile', rocket: 'Rocket',
  asw_rocket: 'ASW Rocket', torpedo: 'Torpedo', depth_charge: 'Depth Charge',
  mine: 'Mine', smoke: 'Smoke', chaff: 'Chaff',
  flare: 'Flare', radar_decoy: 'Radar Decoy', radar_noise_jammer: 'Noise Jammer',
  radar_deception_jammer: 'Deception Jammer', aircraft: 'Aircraft', helicopter: 'Helicopter', uav: 'UAV',
};

export const ICON_CATEGORIES = [
  { label: 'Sensors', types: ['navigational_radar','tracking_radar','sonar','sonobuoy','infrared','visual','esm','interrogator','transponder'] },
  { label: 'Weapons', types: ['gun','missile','rocket','asw_rocket','torpedo','depth_charge','mine'] },
  { label: 'Countermeasures', types: ['smoke','chaff','flare','radar_decoy','radar_noise_jammer','radar_deception_jammer'] },
  { label: 'Peripherals', types: ['aircraft','helicopter','uav'] },
];

/* ================================================== */
/* ===        ZONE PLACEMENT                       === */
/* ================================================== */
export const ZONES = {
  fore:      { x: 310, y: 195, width: 80,  height: 80 },
  port:      { x: 240, y: 350, width: 50,  height: 200 },
  midship:   { x: 320, y: 440, width: 60,  height: 120 },
  starboard: { x: 415, y: 350, width: 50,  height: 200 },
  aft:       { x: 310, y: 700, width: 80,  height: 60 },
};

export function computePositions(items) {
  const grouped = {};
  items.forEach((item) => { if (!grouped[item.position]) grouped[item.position] = []; grouped[item.position].push(item); });
  const positioned = [];
  Object.entries(grouped).forEach(([zoneName, zoneItems]) => {
    const zone = ZONES[zoneName];
    if (!zone) return;
    const count = zoneItems.length;
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const cellW = zone.width / cols;
    const cellH = zone.height / rows;
    zoneItems.forEach((item, i) => {
      positioned.push({ ...item, computedX: zone.x + (i % cols) * cellW + cellW / 2, computedY: zone.y + Math.floor(i / cols) * cellH + cellH / 2 });
    });
  });
  return positioned;
}

/* ================================================== */
/* ===        THEME PALETTES                       === */
/* ================================================== */
export const THEMES = {
  dark: {
    bg: '#0a0e1a',
    hull: ['#2d3748', '#5a6a7d', '#63738a'],
    hullStroke: '#1a202c',
    detail: '#4e5e71', detailDark: '#3d4a5c', detailAccent: '#576879',
    superstructure: ['#6b7a8d', '#7a8a9d', '#8a9aad'],
    window: '#1a202c',
    metal: '#a0aec0',
    iconBackdrop: 'rgba(10,14,26,0.85)',
    tooltipBg: 'rgba(255,255,255,0.95)', tooltipText: '#0a0e1a', tooltipSub: '#4a5568',
    panelBg: 'rgba(15,23,42,0.95)', panelText: '#e2e8f0', panelBorder: '#334155', panelHead: '#94a3b8',
    controlBg: '#1e293b', controlText: '#94a3b8', controlActive: '#38bdf8', controlActiveText: '#0a0e1a',
  },
  light: {
    bg: '#e8edf2',
    hull: ['#90a4ae', '#b0bec5', '#cfd8dc'],
    hullStroke: '#607d8b',
    detail: '#b0bec5', detailDark: '#90a4ae', detailAccent: '#b0bec5',
    superstructure: ['#b0bec5', '#cfd8dc', '#eceff1'],
    window: '#546e7a',
    metal: '#78909c',
    iconBackdrop: 'rgba(255,255,255,0.9)',
    tooltipBg: 'rgba(30,41,59,0.95)', tooltipText: '#f8fafc', tooltipSub: '#cbd5e1',
    panelBg: 'rgba(255,255,255,0.95)', panelText: '#1e293b', panelBorder: '#cbd5e1', panelHead: '#64748b',
    controlBg: '#e2e8f0', controlText: '#475569', controlActive: '#0284c7', controlActiveText: '#ffffff',
  },
};

/* ================================================== */
/* ===        SVG ICON DATA                        === */
/* ================================================== */
const s = (c) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${c}</svg>`)}`;

export const ICON_SVGS = {
  navigational_radar: s(`<circle cx="32" cy="42" r="8" fill="none" stroke="#00e5ff" stroke-width="2"/><rect x="30" y="18" width="4" height="24" fill="#00e5ff" rx="1"/><path d="M32 18 L12 8 A28 28 0 0 1 52 8Z" fill="#00e5ff" opacity="0.5"/><circle cx="32" cy="18" r="3" fill="#00e5ff"/><rect x="24" y="50" width="16" height="6" fill="#00e5ff" rx="2"/>`),

  tracking_radar: s(`<circle cx="32" cy="32" r="14" fill="none" stroke="#448aff" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="22" y1="22" x2="42" y2="42" stroke="#448aff" stroke-width="1"/><line x1="42" y1="22" x2="22" y2="42" stroke="#448aff" stroke-width="1"/><rect x="29" y="10" width="6" height="22" fill="#448aff" rx="1"/><path d="M29 10 L32 4 L35 10" fill="#448aff"/><circle cx="32" cy="32" r="4" fill="#448aff"/><rect x="26" y="42" width="12" height="14" fill="#448aff" rx="2"/><rect x="22" y="52" width="20" height="5" fill="#448aff" rx="2"/>`),

  sonar: s(`<circle cx="32" cy="12" r="6" fill="#00bfa5"/><rect x="30" y="12" width="4" height="8" fill="#00bfa5"/><path d="M16 22 Q32 38 48 22" fill="none" stroke="#00bfa5" stroke-width="2.5"/><path d="M12 30 Q32 48 52 30" fill="none" stroke="#00bfa5" stroke-width="2" opacity="0.7"/><path d="M8 38 Q32 58 56 38" fill="none" stroke="#00bfa5" stroke-width="2" opacity="0.4"/>`),

  sonobuoy: s(`<line x1="32" y1="4" x2="32" y2="18" stroke="#26a69a" stroke-width="2"/><circle cx="32" cy="4" r="3" fill="#26a69a"/><rect x="24" y="18" width="16" height="24" fill="#26a69a" rx="4"/><line x1="24" y1="26" x2="40" y2="26" stroke="#1a202c" stroke-width="1"/><line x1="24" y1="32" x2="40" y2="32" stroke="#1a202c" stroke-width="1"/><line x1="32" y1="42" x2="32" y2="58" stroke="#26a69a" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M20 42 Q32 50 44 42" stroke="#26a69a" stroke-width="1.5" fill="none" opacity="0.5"/>`),

  infrared: s(`<ellipse cx="32" cy="32" rx="18" ry="10" fill="none" stroke="#ff6e40" stroke-width="2.5"/><circle cx="32" cy="32" r="7" fill="#ff6e40" opacity="0.8"/><circle cx="32" cy="32" r="3" fill="#ff6e40"/><path d="M52 26 Q58 32 52 38" stroke="#ff6e40" stroke-width="2" fill="none"/><path d="M56 22 Q64 32 56 42" stroke="#ff6e40" stroke-width="1.5" fill="none" opacity="0.5"/><path d="M12 26 Q6 32 12 38" stroke="#ff6e40" stroke-width="2" fill="none"/><path d="M8 22 Q0 32 8 42" stroke="#ff6e40" stroke-width="1.5" fill="none" opacity="0.5"/>`),

  visual: s(`<rect x="12" y="20" width="40" height="28" fill="none" stroke="#42a5f5" stroke-width="2.5" rx="4"/><circle cx="32" cy="34" r="10" fill="none" stroke="#42a5f5" stroke-width="2"/><circle cx="32" cy="34" r="5" fill="#42a5f5"/><rect x="18" y="14" width="10" height="8" fill="#42a5f5" rx="2"/><circle cx="44" cy="26" r="2" fill="#42a5f5"/>`),

  esm: s(`<path d="M30 6 L38 24 L30 24 L38 42" stroke="#76ff03" stroke-width="3.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M42 14 Q50 20 42 26" stroke="#76ff03" stroke-width="2" fill="none"/><path d="M46 10 Q56 20 46 30" stroke="#76ff03" stroke-width="1.5" fill="none" opacity="0.6"/><rect x="22" y="46" width="20" height="10" fill="#76ff03" rx="3" opacity="0.7"/><line x1="32" y1="46" x2="32" y2="42" stroke="#76ff03" stroke-width="2"/>`),

  interrogator: s(`<rect x="28" y="28" width="8" height="22" fill="#69f0ae" rx="2"/><line x1="32" y1="28" x2="32" y2="14" stroke="#69f0ae" stroke-width="2.5"/><circle cx="32" cy="12" r="3" fill="#69f0ae"/><path d="M22 14 Q32 2 42 14" stroke="#69f0ae" stroke-width="2" fill="none"/><path d="M18 18 Q32 2 46 18" stroke="#69f0ae" stroke-width="1.5" fill="none" opacity="0.5"/><path d="M14 22 Q32 2 50 22" stroke="#69f0ae" stroke-width="1" fill="none" opacity="0.3"/><rect x="24" y="50" width="16" height="6" fill="#69f0ae" rx="2"/>`),

  transponder: s(`<rect x="28" y="14" width="8" height="36" fill="#b2ff59" rx="2"/><path d="M24 22 Q14 32 24 42" stroke="#b2ff59" stroke-width="2" fill="none"/><path d="M20 18 Q6 32 20 46" stroke="#b2ff59" stroke-width="1.5" fill="none" opacity="0.5"/><path d="M40 22 Q50 32 40 42" stroke="#b2ff59" stroke-width="2" fill="none"/><path d="M44 18 Q58 32 44 46" stroke="#b2ff59" stroke-width="1.5" fill="none" opacity="0.5"/><circle cx="32" cy="14" r="3" fill="#b2ff59"/><rect x="24" y="50" width="16" height="6" fill="#b2ff59" rx="2"/>`),

  gun: s(`<circle cx="32" cy="38" r="12" fill="none" stroke="#ff1744" stroke-width="2.5"/><circle cx="32" cy="38" r="6" fill="#ff1744"/><rect x="29" y="6" width="6" height="28" fill="#ff1744" rx="1"/><rect x="26" y="4" width="12" height="6" fill="#ff1744" rx="2"/><rect x="24" y="52" width="16" height="6" fill="#ff1744" rx="2"/>`),

  missile: s(`<rect x="28" y="12" width="8" height="36" fill="#ff5252" rx="3"/><path d="M28 12 L32 4 L36 12" fill="#ff5252"/><path d="M28 46 L20 56" stroke="#ff5252" stroke-width="2.5"/><path d="M36 46 L44 56" stroke="#ff5252" stroke-width="2.5"/><line x1="28" y1="20" x2="36" y2="20" stroke="#1a202c" stroke-width="1"/><circle cx="32" cy="16" r="2" fill="white" opacity="0.4"/><circle cx="32" cy="52" r="3" fill="#ff5252" opacity="0.4"/>`),

  rocket: s(`<rect x="28" y="14" width="8" height="30" fill="#ff7043" rx="2"/><path d="M28 14 L32 6 L36 14" fill="#ff7043"/><path d="M28 44 L22 54" stroke="#ff7043" stroke-width="2.5"/><path d="M36 44 L42 54" stroke="#ff7043" stroke-width="2.5"/><circle cx="32" cy="50" r="4" fill="#ff7043" opacity="0.3"/>`),

  asw_rocket: s(`<rect x="28" y="8" width="8" height="28" fill="#ff9100" rx="2"/><path d="M28 8 L32 2 L36 8" fill="#ff9100"/><path d="M28 36 L22 44" stroke="#ff9100" stroke-width="2.5"/><path d="M36 36 L42 44" stroke="#ff9100" stroke-width="2.5"/><path d="M14 54 Q24 44 32 54 Q40 64 50 54" stroke="#ff9100" stroke-width="2.5" fill="none"/><path d="M18 58 Q28 50 36 58" stroke="#ff9100" stroke-width="1.5" fill="none" opacity="0.4"/>`),

  torpedo: s(`<rect x="26" y="8" width="12" height="42" fill="#d50000" rx="6"/><path d="M26 8 Q32 2 38 8" fill="#d50000"/><line x1="24" y1="46" x2="24" y2="56" stroke="#d50000" stroke-width="2"/><line x1="40" y1="46" x2="40" y2="56" stroke="#d50000" stroke-width="2"/><line x1="24" y1="56" x2="40" y2="56" stroke="#d50000" stroke-width="2"/><line x1="32" y1="50" x2="32" y2="58" stroke="#d50000" stroke-width="1.5"/><line x1="26" y1="20" x2="38" y2="20" stroke="#1a202c" stroke-width="1"/>`),

  depth_charge: s(`<circle cx="32" cy="34" r="14" fill="none" stroke="#ff3d00" stroke-width="2.5"/><circle cx="32" cy="34" r="8" fill="#ff3d00" opacity="0.8"/><line x1="32" y1="10" x2="32" y2="20" stroke="#ff3d00" stroke-width="3"/><circle cx="32" cy="8" r="4" fill="#ff3d00"/><line x1="26" y1="28" x2="38" y2="40" stroke="white" stroke-width="1.5" opacity="0.4"/><line x1="38" y1="28" x2="26" y2="40" stroke="white" stroke-width="1.5" opacity="0.4"/><rect x="24" y="50" width="16" height="6" fill="#ff3d00" rx="2"/>`),

  mine: s(`<circle cx="32" cy="32" r="12" fill="#dd2c00"/><circle cx="32" cy="14" r="4" fill="#dd2c00"/><circle cx="32" cy="50" r="4" fill="#dd2c00"/><circle cx="14" cy="32" r="4" fill="#dd2c00"/><circle cx="50" cy="32" r="4" fill="#dd2c00"/><circle cx="19" cy="19" r="3" fill="#dd2c00"/><circle cx="45" cy="19" r="3" fill="#dd2c00"/><circle cx="19" cy="45" r="3" fill="#dd2c00"/><circle cx="45" cy="45" r="3" fill="#dd2c00"/>`),

  smoke: s(`<circle cx="20" cy="40" r="10" fill="#9e9e9e" opacity="0.6"/><circle cx="44" cy="40" r="10" fill="#9e9e9e" opacity="0.6"/><circle cx="32" cy="28" r="12" fill="#9e9e9e" opacity="0.7"/><circle cx="26" cy="34" r="8" fill="#9e9e9e" opacity="0.5"/><circle cx="38" cy="34" r="8" fill="#9e9e9e" opacity="0.5"/>`),

  chaff: s(`<line x1="10" y1="10" x2="22" y2="22" stroke="#ffd740" stroke-width="2.5" stroke-linecap="round"/><line x1="30" y1="8" x2="38" y2="18" stroke="#ffd740" stroke-width="2.5" stroke-linecap="round"/><line x1="44" y1="12" x2="54" y2="24" stroke="#ffd740" stroke-width="2.5" stroke-linecap="round"/><line x1="8" y1="30" x2="18" y2="40" stroke="#ffd740" stroke-width="2.5" stroke-linecap="round"/><line x1="26" y1="28" x2="38" y2="38" stroke="#ffd740" stroke-width="2.5" stroke-linecap="round"/><line x1="46" y1="32" x2="56" y2="42" stroke="#ffd740" stroke-width="2.5" stroke-linecap="round"/><line x1="14" y1="46" x2="24" y2="56" stroke="#ffd740" stroke-width="2.5" stroke-linecap="round"/><line x1="36" y1="44" x2="48" y2="54" stroke="#ffd740" stroke-width="2.5" stroke-linecap="round"/>`),

  flare: s(`<circle cx="32" cy="32" r="7" fill="#ffab00"/><line x1="32" y1="4" x2="32" y2="20" stroke="#ffab00" stroke-width="2.5"/><line x1="32" y1="44" x2="32" y2="60" stroke="#ffab00" stroke-width="2.5"/><line x1="4" y1="32" x2="20" y2="32" stroke="#ffab00" stroke-width="2.5"/><line x1="44" y1="32" x2="60" y2="32" stroke="#ffab00" stroke-width="2.5"/><line x1="12" y1="12" x2="22" y2="22" stroke="#ffab00" stroke-width="2"/><line x1="42" y1="42" x2="52" y2="52" stroke="#ffab00" stroke-width="2"/><line x1="52" y1="12" x2="42" y2="22" stroke="#ffab00" stroke-width="2"/><line x1="22" y1="42" x2="12" y2="52" stroke="#ffab00" stroke-width="2"/>`),

  radar_decoy: s(`<circle cx="32" cy="32" r="18" fill="none" stroke="#ffc400" stroke-width="2" stroke-dasharray="6 4"/><circle cx="32" cy="32" r="6" fill="#ffc400"/><path d="M26 26 L32 16 L38 26" fill="#ffc400" opacity="0.7"/><line x1="32" y1="16" x2="32" y2="6" stroke="#ffc400" stroke-width="1.5"/>`),

  radar_noise_jammer: s(`<path d="M6 32 L12 16 L20 44 L28 12 L36 50 L44 18 L52 38 L58 24" stroke="#ff6d00" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/><line x1="6" y1="8" x2="58" y2="8" stroke="#ff6d00" stroke-width="1.5" opacity="0.3"/><line x1="6" y1="56" x2="58" y2="56" stroke="#ff6d00" stroke-width="1.5" opacity="0.3"/>`),

  radar_deception_jammer: s(`<path d="M6 32 Q19 8 32 32 Q45 56 58 32" stroke="#e65100" stroke-width="2.5" fill="none"/><line x1="18" y1="18" x2="46" y2="46" stroke="#e65100" stroke-width="4" stroke-linecap="round"/><line x1="46" y1="18" x2="18" y2="46" stroke="#e65100" stroke-width="4" stroke-linecap="round"/>`),

  aircraft: s(`<rect x="30" y="4" width="4" height="50" fill="#e040fb" rx="2"/><rect x="8" y="24" width="48" height="6" fill="#e040fb" rx="2"/><rect x="20" y="48" width="24" height="5" fill="#e040fb" rx="2"/><circle cx="32" cy="28" r="3" fill="white" opacity="0.3"/>`),

  helicopter: s(`<ellipse cx="32" cy="32" rx="7" ry="12" fill="#ab47bc"/><line x1="32" y1="44" x2="32" y2="56" stroke="#ab47bc" stroke-width="2.5"/><rect x="24" y="54" width="16" height="5" fill="#ab47bc" rx="1"/><line x1="6" y1="32" x2="58" y2="32" stroke="#ab47bc" stroke-width="2.5"/><line x1="32" y1="6" x2="32" y2="58" stroke="#ab47bc" stroke-width="2.5"/><circle cx="32" cy="32" r="4" fill="white" opacity="0.4"/>`),

  uav: s(`<path d="M32 8 L58 44 L46 40 L32 50 L18 40 L6 44 Z" fill="#7c4dff"/><circle cx="32" cy="28" r="3" fill="white" opacity="0.4"/><line x1="32" y1="32" x2="32" y2="44" stroke="white" stroke-width="1" opacity="0.3"/>`),
};