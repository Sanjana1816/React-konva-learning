import React, { useRef, useEffect } from 'react';
import { Circle, Ellipse, Group, Line, Path, Rect, Wedge } from 'react-konva';
import Konva from 'konva';

/* ================================================== */
/* ===        COLOR CONFIG (By Type)               === */
/* ================================================== */

export const ICON_COLORS = {
  // Sensors — Blues, Cyans, Greens
  navigational_radar:      '#00e5ff',
  tracking_radar:          '#448aff',
  sonar:                   '#00bfa5',
  sonobuoy:                '#26a69a',
  infrared:                '#ff6e40',
  visual:                  '#42a5f5',
  esm:                     '#76ff03',
  interrogator:            '#69f0ae',
  transponder:             '#b2ff59',

  // Weapons — Reds
  gun:                     '#ff1744',
  missile:                 '#ff5252',
  rocket:                  '#ff7043',
  asw_rocket:              '#ff9100',
  torpedo:                 '#d50000',
  depth_charge:            '#ff3d00',
  mine:                    '#dd2c00',

  // Countermeasures — Yellows, Ambers, Greys
  smoke:                   '#9e9e9e',
  chaff:                   '#ffd740',
  flare:                   '#ffab00',
  radar_decoy:             '#ffc400',
  radar_noise_jammer:      '#ff6d00',
  radar_deception_jammer:  '#e65100',

  // Peripherals — Purples
  aircraft:                '#e040fb',
  helicopter:              '#ab47bc',
  uav:                     '#7c4dff',
};

/* ================================================== */
/* ===        ANIMATED ICONS                       === */
/* ================================================== */

// Navigational Radar — Wide 360° spinning sweep
const NavigationalRadarIcon = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      ref.current.rotation((frame.time * 120) / 1000);
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (
    <Group ref={ref}>
      <Circle radius={18} stroke={color} strokeWidth={1} opacity={0.9} dash={[3, 3]} />
      <Wedge radius={18} angle={90} fill={color} opacity={0.9} rotation={-45} />
      <Line points={[0, 0, 18, 0]} stroke={color} strokeWidth={2} />
      <Circle radius={3} fill={color} />
    </Group>
  );
};

// Tracking Radar — Narrow beam sweeping back and forth
const TrackingRadarIcon = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      const angle = Math.sin(frame.time / 600) * 80;
      ref.current.rotation(angle);
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (
    <Group ref={ref}>
      <Wedge radius={18} angle={30} fill={color} opacity={0.9} rotation={-15} />
      <Line points={[0, 0, 18, 0]} stroke={color} strokeWidth={2} />
      <Circle radius={3} fill={color} />
    </Group>
  );
};

// Helicopter — Spinning rotor blades
const HelicopterIcon = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      ref.current.rotation((frame.time * 300) / 1000);
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (
    <Group>
      <Ellipse radiusX={5} radiusY={8} fill={color} opacity={0.9} />
      <Line points={[0, 8, 0, 16]} stroke={color} strokeWidth={1.5} />
      <Rect x={-4} y={14} width={8} height={4} fill={color} opacity={0.9} />
      <Group ref={ref}>
        <Line points={[-16, 0, 16, 0]} stroke={color} strokeWidth={2} />
        <Line points={[0, -16, 0, 16]} stroke={color} strokeWidth={2} />
      </Group>
      <Circle radius={2} fill={color} />
    </Group>
  );
};

/* ================================================== */
/* ===        SENSOR ICONS (Static)                === */
/* ================================================== */

// Sonar — Concentric pulse rings
const SonarIcon = ({ color }) => (
  <Group>
    <Circle radius={16} stroke={color} strokeWidth={1} opacity={0.9} />
    <Circle radius={11} stroke={color} strokeWidth={1} opacity={0.9} />
    <Circle radius={6} stroke={color} strokeWidth={1.5} opacity={0.9} />
    <Circle radius={2} fill={color} />
  </Group>
);

// Sonobuoy — Small buoy with antenna
const SonobuoyIcon = ({ color }) => (
  <Group>
    <Line points={[0, -14, 0, -8]} stroke={color} strokeWidth={1.5} />
    <Circle y={-14} radius={2} fill={color} />
    <Rect x={-5} y={-8} width={10} height={14} fill={color} opacity={0.9} cornerRadius={2} />
    <Line points={[0, 6, 0, 14]} stroke={color} strokeWidth={1} dash={[2, 2]} />
  </Group>
);

// Infrared — Heat-sensing eye/lens
const InfraredIcon = ({ color }) => (
  <Group>
    <Ellipse radiusX={14} radiusY={8} stroke={color} strokeWidth={2} fill={color} opacity={0.9} />
    <Circle radius={5} fill={color} opacity={0.9} />
    <Circle radius={2} fill={color} />
    <Line points={[16, -3, 20, -6]} stroke={color} strokeWidth={1} />
    <Line points={[16, 0, 21, 0]} stroke={color} strokeWidth={1} />
    <Line points={[16, 3, 20, 6]} stroke={color} strokeWidth={1} />
  </Group>
);

// Visual — Camera/optical lens
const VisualIcon = ({ color }) => (
  <Group>
    <Rect x={-12} y={-8} width={24} height={16} fill={color} opacity={0.9} cornerRadius={3} stroke={color} strokeWidth={1.5} />
    <Circle radius={6} stroke={color} strokeWidth={2} />
    <Circle radius={3} fill={color} />
  </Group>
);

// ESM — Lightning bolt with signal arcs
const ESMIcon = ({ color }) => (
  <Group>
    <Path data="M -2 -14 L 4 -3 L -1 -3 L 3 10 L -4 -1 L 1 -1 Z" fill={color} opacity={0.9} />
    <Line points={[6, -6, 12, -8]} stroke={color} strokeWidth={1} opacity={0.9} />
    <Line points={[6, -2, 14, -2]} stroke={color} strokeWidth={1} opacity={0.9} />
    <Line points={[6, 2, 12, 4]} stroke={color} strokeWidth={1} opacity={0.9} />
  </Group>
);

// Interrogator — Directed signal beam upward
const InterrogatorIcon = ({ color }) => (
  <Group>
    <Rect x={-3} y={-6} width={6} height={12} fill={color} opacity={0.9} cornerRadius={1} />
    <Line points={[0, -6, 0, -14]} stroke={color} strokeWidth={2} />
    <Path data="M -6 -14 Q 0 -20, 6 -14" stroke={color} strokeWidth={1.5} fill="transparent" />
    <Path data="M -10 -14 Q 0 -24, 10 -14" stroke={color} strokeWidth={1} fill="transparent" opacity={0.9} />
  </Group>
);

// Transponder — Tower emitting signals both sides
const TransponderIcon = ({ color }) => (
  <Group>
    <Rect x={-3} y={-8} width={6} height={16} fill={color} opacity={0.9} cornerRadius={1} />
    <Path data="M -6 -4 Q -12 0, -6 4" stroke={color} strokeWidth={1.5} fill="transparent" />
    <Path data="M -9 -6 Q -16 0, -9 6" stroke={color} strokeWidth={1} fill="transparent" opacity={0.9} />
    <Path data="M 6 -4 Q 12 0, 6 4" stroke={color} strokeWidth={1.5} fill="transparent" />
    <Path data="M 9 -6 Q 16 0, 9 6" stroke={color} strokeWidth={1} fill="transparent" opacity={0.9} />
  </Group>
);

/* ================================================== */
/* ===        WEAPON ICONS (Static)                === */
/* ================================================== */

// Gun — Turret with barrel
const GunIcon = ({ color }) => (
  <Group>
    <Circle radius={10} fill="#4a5568" stroke={color} strokeWidth={2} />
    <Rect x={-3} y={-22} width={6} height={16} fill={color} />
    <Rect x={-5} y={-24} width={10} height={4} fill={color} cornerRadius={1} />
    <Circle radius={4} fill={color} opacity={0.9} />
  </Group>
);

// Missile — Pointed body with fins
const MissileIcon = ({ color }) => (
  <Group>
    <Path data="M 0 -16 L 4 -8 L 4 10 L 6 14 L 0 12 L -6 14 L -4 10 L -4 -8 Z" fill={color} opacity={0.9} stroke={color} strokeWidth={0.5} />
    <Line points={[-8, 8, -4, 6]} stroke={color} strokeWidth={1.5} />
    <Line points={[8, 8, 4, 6]} stroke={color} strokeWidth={1.5} />
  </Group>
);

// Rocket — Simpler pointed shape
const RocketIcon = ({ color }) => (
  <Group>
    <Path data="M 0 -14 L 3 -6 L 3 8 L 5 12 L -5 12 L -3 8 L -3 -6 Z" fill={color} opacity={0.9} />
    <Circle y={12} radius={2} fill={color} opacity={0.9} />
  </Group>
);

// ASW Rocket — Rocket with water wave underneath
const ASWRocketIcon = ({ color }) => (
  <Group>
    <Path data="M 0 -12 L 3 -4 L 3 6 L 5 10 L -5 10 L -3 6 L -3 -4 Z" fill={color} opacity={0.9} />
    <Path data="M -8 14 Q -4 10, 0 14 Q 4 18, 8 14" stroke={color} strokeWidth={1.5} fill="transparent" />
  </Group>
);

// Torpedo — Long cylindrical shape with propeller
const TorpedoIcon = ({ color }) => (
  <Group>
    <Rect x={-4} y={-14} width={8} height={24} fill={color} opacity={0.9} cornerRadius={4} />
    <Path data="M 0 -16 L 3 -14 L -3 -14 Z" fill={color} />
    <Line points={[-5, 10, -5, 14]} stroke={color} strokeWidth={1} />
    <Line points={[5, 10, 5, 14]} stroke={color} strokeWidth={1} />
    <Line points={[-5, 14, 5, 14]} stroke={color} strokeWidth={1} />
  </Group>
);

// Depth Charge — Round bomb with fuse
const DepthChargeIcon = ({ color }) => (
  <Group>
    <Circle radius={10} fill={color} opacity={0.9} stroke={color} strokeWidth={1.5} />
    <Line points={[0, -10, 0, -15]} stroke={color} strokeWidth={2} />
    <Circle y={-15} radius={2} fill={color} />
    <Line points={[-4, -4, 4, 4]} stroke="#1a202c" strokeWidth={1} />
    <Line points={[-4, 4, 4, -4]} stroke="#1a202c" strokeWidth={1} />
  </Group>
);

// Mine — Spiked sphere with contact horns
const MineIcon = ({ color }) => (
  <Group>
    <Circle radius={9} fill={color} opacity={0.9} />
    <Circle y={-13} radius={3} fill={color} />
    <Circle y={13} radius={3} fill={color} />
    <Circle x={13} radius={3} fill={color} />
    <Circle x={-13} radius={3} fill={color} />
    <Circle x={9} y={-9} radius={2.5} fill={color} />
    <Circle x={-9} y={-9} radius={2.5} fill={color} />
    <Circle x={9} y={9} radius={2.5} fill={color} />
    <Circle x={-9} y={9} radius={2.5} fill={color} />
  </Group>
);

/* ================================================== */
/* ===     COUNTERMEASURE ICONS (Static)           === */
/* ================================================== */

// Smoke — Cloud puffs
const SmokeIcon = ({ color }) => (
  <Group>
    <Circle x={-6} y={3} radius={8} fill={color} opacity={0.9} />
    <Circle x={6} y={3} radius={8} fill={color} opacity={0.9} />
    <Circle y={-3} radius={9} fill={color} opacity={0.9} />
  </Group>
);

// Chaff — Scattered metallic strips
const ChaffIcon = ({ color }) => (
  <Group>
    <Line points={[-8, -8, -2, -2]} stroke={color} strokeWidth={1.5} />
    <Line points={[2, -6, 8, 0]} stroke={color} strokeWidth={1.5} />
    <Line points={[-6, 0, 0, 6]} stroke={color} strokeWidth={1.5} />
    <Line points={[4, 2, 10, 8]} stroke={color} strokeWidth={1.5} />
    <Line points={[-10, -2, -4, 4]} stroke={color} strokeWidth={1.5} />
    <Line points={[-2, 4, 4, 10]} stroke={color} strokeWidth={1.5} />
    <Line points={[6, -10, 10, -4]} stroke={color} strokeWidth={1.5} />
  </Group>
);

// Flare — Starburst radiating lines
const FlareIcon = ({ color }) => (
  <Group>
    <Circle radius={4} fill={color} shadowColor={color} shadowBlur={10} />
    <Line points={[0, -14, 0, -6]} stroke={color} strokeWidth={1.5} />
    <Line points={[0, 6, 0, 14]} stroke={color} strokeWidth={1.5} />
    <Line points={[-14, 0, -6, 0]} stroke={color} strokeWidth={1.5} />
    <Line points={[6, 0, 14, 0]} stroke={color} strokeWidth={1.5} />
    <Line points={[-10, -10, -5, -5]} stroke={color} strokeWidth={1} />
    <Line points={[5, 5, 10, 10]} stroke={color} strokeWidth={1} />
    <Line points={[10, -10, 5, -5]} stroke={color} strokeWidth={1} />
    <Line points={[-5, 5, -10, 10]} stroke={color} strokeWidth={1} />
  </Group>
);

// Radar Decoy — Dashed false target circle
const RadarDecoyIcon = ({ color }) => (
  <Group>
    <Circle radius={12} stroke={color} strokeWidth={1.5} dash={[4, 3]} opacity={0.9} />
    <Path data="M 0 -5 L 4 4 L -4 4 Z" fill={color} opacity={0.9} />
    <Circle radius={2} fill={color} />
  </Group>
);

// Radar Noise Jammer — Zigzag static noise wave
const RadarNoiseJammerIcon = ({ color }) => (
  <Group>
    <Path data="M -14 0 L -10 -6 L -6 4 L -2 -8 L 2 6 L 6 -4 L 10 8 L 14 -2" stroke={color} strokeWidth={2} fill="transparent" />
    <Line points={[-14, -10, 14, -10]} stroke={color} strokeWidth={1} opacity={0.9} />
    <Line points={[-14, 10, 14, 10]} stroke={color} strokeWidth={1} opacity={0.9} />
  </Group>
);

// Radar Deception Jammer — Smooth wave with X
const RadarDeceptionJammerIcon = ({ color }) => (
  <Group>
    <Path data="M -12 0 Q -6 -10, 0 0 Q 6 10, 12 0" stroke={color} strokeWidth={2} fill="transparent" />
    <Line points={[-6, -6, 6, 6]} stroke={color} strokeWidth={2.5} />
    <Line points={[-6, 6, 6, -6]} stroke={color} strokeWidth={2.5} />
  </Group>
);

/* ================================================== */
/* ===     PERIPHERAL ICONS (Static + Animated)    === */
/* ================================================== */

// Aircraft — Top-down fixed-wing plane
const AircraftIcon = ({ color }) => (
  <Group>
    <Path data="M 0 -14 L 2 -8 L 14 0 L 14 2 L 2 0 L 2 10 L 6 12 L 6 14 L 0 12 L -6 14 L -6 12 L -2 10 L -2 0 L -14 2 L -14 0 L -2 -8 Z" fill={color} opacity={0.9} />
  </Group>
);

// UAV — Small delta-wing drone
const UAVIcon = ({ color }) => (
  <Group>
    <Path data="M 0 -12 L 14 8 L 6 6 L 0 10 L -6 6 L -14 8 Z" fill={color} opacity={0.9} />
    <Circle radius={2} fill={color} />
  </Group>
);

/* ================================================== */
/* ===        MASTER RENDER FUNCTION               === */
/* ================================================== */

export function renderIcon(type) {
  const color = ICON_COLORS[type] || '#ffffff';
  switch (type) {
    case 'navigational_radar':      return <NavigationalRadarIcon color={color} />;
    case 'tracking_radar':          return <TrackingRadarIcon color={color} />;
    case 'sonar':                   return <SonarIcon color={color} />;
    case 'sonobuoy':                return <SonobuoyIcon color={color} />;
    case 'infrared':                return <InfraredIcon color={color} />;
    case 'visual':                  return <VisualIcon color={color} />;
    case 'esm':                     return <ESMIcon color={color} />;
    case 'interrogator':            return <InterrogatorIcon color={color} />;
    case 'transponder':             return <TransponderIcon color={color} />;
    case 'gun':                     return <GunIcon color={color} />;
    case 'missile':                 return <MissileIcon color={color} />;
    case 'rocket':                  return <RocketIcon color={color} />;
    case 'asw_rocket':              return <ASWRocketIcon color={color} />;
    case 'torpedo':                 return <TorpedoIcon color={color} />;
    case 'depth_charge':            return <DepthChargeIcon color={color} />;
    case 'mine':                    return <MineIcon color={color} />;
    case 'smoke':                   return <SmokeIcon color={color} />;
    case 'chaff':                   return <ChaffIcon color={color} />;
    case 'flare':                   return <FlareIcon color={color} />;
    case 'radar_decoy':             return <RadarDecoyIcon color={color} />;
    case 'radar_noise_jammer':      return <RadarNoiseJammerIcon color={color} />;
    case 'radar_deception_jammer':  return <RadarDeceptionJammerIcon color={color} />;
    case 'aircraft':                return <AircraftIcon color={color} />;
    case 'helicopter':              return <HelicopterIcon color={color} />;
    case 'uav':                     return <UAVIcon color={color} />;
    default:                        return <Circle radius={8} fill={color} shadowColor={color} shadowBlur={10} />;
  }
}