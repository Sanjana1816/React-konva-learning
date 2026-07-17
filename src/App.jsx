import React, { useState, useMemo } from 'react';
import { Stage, Layer, Group, Circle, Rect, Text } from 'react-konva';
import { THEMES, ICON_COLORS, computePositions, TYPE_TO_CATEGORY } from './config.js';
import { renderIcon } from './ShipIcons.jsx';
import ShipHull from './ShipHull.jsx';
import Legend from './Legend.jsx';
import './App.css';

/* ================================================== */
/* ===        MOCK BACKEND DATA (New Structure)    === */
/* ================================================== */
const backendData = [
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 1,  type: 'sensor',          subtype: 'navigational_radar',  profile_name: 'BEL-M4 Nav Radar',       quantity: 4, position: 'fore' },
  { id: 2,  type: 'sensor',          subtype: 'tracking_radar',      profile_name: 'MR-90 Orekh Tracker',    quantity: 2, position: 'fore' },
  { id: 3,  type: 'weapon',          subtype: 'gun',                 profile_name: 'AK-176M Naval Gun',      quantity: 1, position: 'fore' },
  { id: 4,  type: 'weapon',          subtype: 'missile',             profile_name: 'BrahMos Anti-Ship Missile', quantity: 8, position: 'midship' },
  { id: 5,  type: 'sensor',          subtype: 'sonar',               profile_name: 'HUMSA Hull-Mounted Sonar', quantity: 1, position: 'midship' },
  { id: 6,  type: 'sensor',          subtype: 'esm',                 profile_name: 'Ajanta ESM Suite',        quantity: 2, position: 'midship' },
  { id: 7,  type: 'weapon',          subtype: 'torpedo',             profile_name: 'SET-65E Torpedo',         quantity: 6, position: 'port' },
  { id: 8,  type: 'sensor',          subtype: 'infrared',            profile_name: 'IRST Thermal Scanner',    quantity: 4, position: 'port' },
  { id: 9,  type: 'countermeasure',  subtype: 'radar_noise_jammer',  profile_name: 'Ellora Noise Jammer',     quantity: 2, position: 'starboard' },
  { id: 10, type: 'countermeasure',  subtype: 'chaff',               profile_name: 'PK-2 Chaff Launcher',     quantity: 4, position: 'starboard' },
  { id: 11, type: 'peripheral',      subtype: 'helicopter',          profile_name: 'HAL Dhruv ASW Helo',      quantity: 1, position: 'aft' },
  { id: 12, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 Flare Launcher',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 14, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
  { id: 13, type: 'countermeasure',  subtype: 'flare',               profile_name: 'KT-216 ',   quantity: 6, position: 'aft' },
];

const HULL_CENTER = 350;
const SCALE_X = 1.35;
const BASE_STAGE_W = 700;
const BASE_STAGE_H = 1100;

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isVertical, setIsVertical] = useState(true);
  // const [iconMode, setIconMode] = useState('png');
  const [hoveredItem, setHoveredItem] = useState(null);

  const theme = isDark ? THEMES.dark : THEMES.light;
  const positionedItems = useMemo(() => computePositions(backendData), []);

  const scaledW = BASE_STAGE_W * SCALE_X;
  const stageW = isVertical ? Math.ceil(scaledW) : BASE_STAGE_H;
  const stageH = isVertical ? BASE_STAGE_H : Math.ceil(scaledW);
  const shipOffsetX = (scaledW - BASE_STAGE_W) / 2;

  return (
    <div className="dashboard" style={{ backgroundColor: theme.bg }}>
      <div className="controls">
        <button className="control-btn" style={{ background: isDark ? theme.controlActive : theme.controlBg, color: isDark ? theme.controlActiveText : theme.controlText, borderColor: theme.panelBorder }} onClick={() => setIsDark(!isDark)}>
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <button className="control-btn" style={{ background: theme.controlBg, color: theme.controlText, borderColor: theme.panelBorder }} onClick={() => setIsVertical(!isVertical)}>
          {isVertical ? '↔️ Horizontal' : '↕️ Vertical'}
        </button>
        {/* <button className="control-btn" style={{ background: iconMode === 'png' ? theme.controlActive : theme.controlBg, color: iconMode === 'png' ? theme.controlActiveText : theme.controlText, borderColor: theme.panelBorder }} onClick={() => setIconMode(iconMode === 'svg' ? 'png' : 'svg')}>
          {iconMode === 'svg' ? '🖼️ Switch to PNG' : '✏️ Switch to SVG'}
        </button> */}
      </div>

      <Legend theme={theme} />

      <div className="canvas-area">
        <Stage width={stageW} height={stageH}>
          <Layer>
            <Group
              rotation={isVertical ? 0 : -90}
              offsetX={isVertical ? 0 : BASE_STAGE_W / 2}
              offsetY={isVertical ? 0 : BASE_STAGE_H / 2}
              x={isVertical ? 0 : (stageW - BASE_STAGE_H) / 2 + BASE_STAGE_H / 2}
              y={isVertical ? 0 : (stageH - BASE_STAGE_W) / 2 + BASE_STAGE_W / 2}
            >
              <Group scaleX={SCALE_X} scaleY={1.1} x={-shipOffsetX / 2}>
                <ShipHull theme={theme} />
              </Group>

              {/* {positionedItems.map((item) => {
                const sx = item.computedX * SCALE_X - shipOffsetX / 2;
                const sy = item.computedY;
                return (
                  <Group key={item.id} x={sx} y={sy}
                    onMouseEnter={(e) => { e.target.getStage().container().style.cursor = 'crosshair'; setHoveredItem({ ...item, sx, sy }); }}
                    onMouseLeave={(e) => { e.target.getStage().container().style.cursor = 'default'; setHoveredItem(null); }}
                  >
                    <Circle radius={22} fill={theme.iconBackdrop} stroke={ICON_COLORS[item.subtype] || '#fff'} strokeWidth={1.5} shadowColor={ICON_COLORS[item.subtype] || '#fff'} shadowBlur={12} />
                    {renderIcon(item.subtype)}
                    <Group rotation={isVertical ? 0 : 90}>
                      <Circle x={16} y={-16} radius={9} fill="white" stroke="#0a0e1a" strokeWidth={2} />
                      <Text x={item.quantity > 9 ? 10 : 13} y={-21} text={`${item.quantity}`} fontSize={9} fill="black" fontStyle="bold" />
                    </Group>
                  </Group>
                );
              })} */}

              {positionedItems.map((item) => {
                const sx = item.computedX * SCALE_X - shipOffsetX / 2;
                const sy = item.computedY;
                const r = item.iconRadius || 22;
                const badgeX = r * 0.7;
                const badgeY = -r * 0.7;
                return (
                  <Group key={item.id} x={sx} y={sy}
                    onMouseEnter={(e) => { e.target.getStage().container().style.cursor = 'crosshair'; setHoveredItem({ ...item, sx, sy }); }}
                    onMouseLeave={(e) => { e.target.getStage().container().style.cursor = 'default'; setHoveredItem(null); }}
                  >
                    <Circle radius={r} fill={theme.iconBackdrop} stroke={ICON_COLORS[item.subtype] || '#fff'} strokeWidth={1.5} shadowColor={ICON_COLORS[item.subtype] || '#fff'} shadowBlur={r > 16 ? 12 : 6} />
                    {renderIcon(item.subtype, item.iconImgSize || 30)}
                    <Group rotation={isVertical ? 0 : 90}>
                      <Circle x={badgeX} y={badgeY} radius={r > 16 ? 9 : 7} fill="white" stroke="#0a0e1a" strokeWidth={2} />
                      <Text x={item.quantity > 9 ? badgeX - 6 : badgeX - 3} y={badgeY - (r > 16 ? 5 : 4)} text={`${item.quantity}`} fontSize={r > 16 ? 9 : 7} fill="black" fontStyle="bold" />
                    </Group>
                  </Group>
                );
              })}

              {hoveredItem && (() => {
                const tx = isVertical
                  ? (hoveredItem.sx > scaledW / 2 ? hoveredItem.sx - 240 : hoveredItem.sx + 35)
                  : hoveredItem.sx + 35;
                const ty = isVertical
                  ? hoveredItem.sy - 60
                  : (hoveredItem.sy > BASE_STAGE_H / 2 ? hoveredItem.sy - 240 : hoveredItem.sy + 35);
                return (
                  <Group x={tx} y={ty}>
                    <Group rotation={isVertical ? 0 : 90}>
                      <Rect width={240} height={68} fill={theme.tooltipBg} cornerRadius={6} shadowColor="cyan" shadowBlur={12} />
                      <Text x={10} y={8} text={hoveredItem.profile_name} fill={theme.tooltipText} fontSize={13} fontStyle="bold" width={220} />
                      <Text x={10} y={28} text={`TYPE: ${hoveredItem.type.toUpperCase()} | QTY: ${hoveredItem.quantity}`} fill={theme.tooltipSub} fontSize={10} fontStyle="bold" />
                      <Text x={10} y={44} text={`SUBTYPE: ${hoveredItem.subtype.toUpperCase().replace(/_/g,' ')}`} fill={theme.tooltipSub} fontSize={9} />
                      <Text x={10} y={56} text={`ZONE: ${hoveredItem.position.toUpperCase()}`} fill={theme.tooltipSub} fontSize={9} />
                    </Group>
                  </Group>
                );
              })()}
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}