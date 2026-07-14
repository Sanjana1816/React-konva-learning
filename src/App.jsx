import React, { useState, useMemo } from 'react';
import { Stage, Layer, Group, Circle, Rect, Text } from 'react-konva';
import { THEMES, ICON_COLORS, computePositions } from './config';
import { renderIcon } from './ShipIcons';
import ShipHull from './ShipHull';
import Legend from './Legend';
import './App.css';

const backendData = [
  { id: 1,  type: 'navigational_radar',  name: 'Navigational Radar',  quantity: 4,  position: 'fore' },
  { id: 2,  type: 'tracking_radar',      name: 'Tracking Radar',      quantity: 2,  position: 'fore' },
  { id: 3,  type: 'gun',                 name: 'Naval Gun',           quantity: 1,  position: 'fore' },
  { id: 4,  type: 'missile',             name: 'Anti-Ship Missiles',  quantity: 8,  position: 'midship' },
  { id: 5,  type: 'sonar',              name: 'Hull Sonar',          quantity: 1,  position: 'midship' },
  { id: 6,  type: 'esm',                name: 'ESM Suite',           quantity: 2,  position: 'midship' },
  { id: 7,  type: 'torpedo',            name: 'Torpedo Tubes',       quantity: 6,  position: 'port' },
  { id: 8,  type: 'infrared',           name: 'IR Sensors',          quantity: 4,  position: 'port' },
  { id: 9,  type: 'radar_noise_jammer', name: 'Noise Jammer',       quantity: 2,  position: 'starboard' },
  { id: 10, type: 'chaff',              name: 'Chaff Launchers',     quantity: 4,  position: 'starboard' },
  { id: 11, type: 'helicopter',         name: 'ASW Helicopter',      quantity: 1,  position: 'aft' },
  { id: 12, type: 'flare',              name: 'Flare Launchers',     quantity: 6,  position: 'aft' },
];

const STAGE_W = 700, STAGE_H = 1000;

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isVertical, setIsVertical] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  const theme = isDark ? THEMES.dark : THEMES.light;
  const positionedItems = useMemo(() => computePositions(backendData), []);

  const stageW = isVertical ? STAGE_W : STAGE_H;
  const stageH = isVertical ? STAGE_H : STAGE_W;

  return (
    <div className="dashboard" style={{ backgroundColor: theme.bg }}>
      <div className="controls">
        <button className={`control-btn ${isDark ? 'active' : ''}`} style={{ background: isDark ? theme.controlActive : theme.controlBg, color: isDark ? theme.controlActiveText : theme.controlText, borderColor: theme.panelBorder }} onClick={() => setIsDark(true)}>🌙 Dark</button>
        <button className={`control-btn ${!isDark ? 'active' : ''}`} style={{ background: !isDark ? theme.controlActive : theme.controlBg, color: !isDark ? theme.controlActiveText : theme.controlText, borderColor: theme.panelBorder }} onClick={() => setIsDark(false)}>☀️ Light</button>
        <button className="control-btn" style={{ background: theme.controlBg, color: theme.controlText, borderColor: theme.panelBorder }} onClick={() => setIsVertical(!isVertical)}>{isVertical ? '↔️ Horizontal' : '↕️ Vertical'}</button>
      </div>

      <Legend theme={theme} />

      <div className="canvas-area">
        <Stage width={stageW} height={stageH}>
          <Layer>
            <Group
              rotation={isVertical ? 0 : -90}
              offsetX={isVertical ? 0 : STAGE_W / 2}
              offsetY={isVertical ? 0 : STAGE_H / 2}
              x={isVertical ? 0 : (stageW - STAGE_H) / 2 + STAGE_H / 2}
              y={isVertical ? 0 : (stageH - STAGE_W) / 2 + STAGE_W / 2}
            >
              <ShipHull theme={theme} />

              {positionedItems.map((item) => (
                <Group key={item.id} x={item.computedX} y={item.computedY} onMouseEnter={(e) => { e.target.getStage().container().style.cursor = 'crosshair'; setHoveredItem(item); }} onMouseLeave={(e) => { e.target.getStage().container().style.cursor = 'default'; setHoveredItem(null); }}>
                  <Circle radius={22} fill={theme.iconBackdrop} stroke={ICON_COLORS[item.type] || '#fff'} strokeWidth={1.5} shadowColor={ICON_COLORS[item.type] || '#fff'} shadowBlur={12} />
                  {renderIcon(item.type)}
                  <Group rotation={isVertical ? 0 : 90}>
                    <Circle x={16} y={-16} radius={9} fill="white" stroke="#0a0e1a" strokeWidth={2} />
                    <Text x={item.quantity > 9 ? 10 : 13} y={-21} text={`${item.quantity}`} fontSize={9} fill="black" fontStyle="bold" />
                  </Group>
                </Group>
              ))}

              {hoveredItem && (
                <Group x={hoveredItem.computedX > 350 ? hoveredItem.computedX - 230 : hoveredItem.computedX + 30} y={hoveredItem.computedY - 55}>
                  <Group rotation={isVertical ? 0 : 90}>
                    <Rect width={210} height={58} fill={theme.tooltipBg} cornerRadius={5} shadowColor="cyan" shadowBlur={10} />
                    <Text x={10} y={8} text={hoveredItem.name} fill={theme.tooltipText} fontSize={14} fontStyle="bold" />
                    <Text x={10} y={26} text={`SYS: ${hoveredItem.type.toUpperCase()} | QTY: ${hoveredItem.quantity}`} fill={theme.tooltipSub} fontSize={10} fontStyle="bold" />
                    <Text x={10} y={42} text={`ZONE: ${hoveredItem.position.toUpperCase()}`} fill={theme.tooltipSub} fontSize={9} />
                  </Group>
                </Group>
              )}              
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}