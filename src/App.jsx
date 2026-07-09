// import React, { useState, useRef, useEffect } from 'react';
// import { Stage, Layer, Path, Circle, Text, Line, Group, Wedge, Rect } from 'react-konva';
// import Konva from 'konva';

// const backendData = [
//   { id: 1, type: 'ldr', name: 'LDR Sensors', quantity: 100, position: 'front', x: 200, y: 150, color: '#00ffcc' },
//   { id: 2, type: 'radar', name: 'Main Radar', quantity: 1, position: 'middle', x: 200, y: 380, color: '#33ff33' },
//   { id: 3, type: 'weapon', name: 'Twin Turrets', quantity: 4, position: 'back', x: 200, y: 650, color: '#ffcc00' },
//   { id: 4, type: 'camera', name: 'Port CCTV', quantity: 12, position: 'left', x: 100, y: 450, color: '#ff3366' },
//   { id: 5, type: 'camera', name: 'Starboard CCTV', quantity: 12, position: 'right', x: 300, y: 450, color: '#ff3366' },
// ];


// // 1. Radar (Spins 360 continuously)
// const AnimatedRadar = ({ color }) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const anim = new Konva.Animation((frame) => {
//       ref.current.rotation((frame.time * 180) / 1000); // 180 degrees per second
//     }, ref.current.getLayer());
//     anim.start();
//     return () => anim.stop();
//   }, []);

//   return (
//     <Group ref={ref}>
//       <Circle radius={25} stroke={color} strokeWidth={1} opacity={0.4} dash={[4, 4]} />
//       <Wedge radius={25} angle={60} fill={color} opacity={0.3} rotation={-30} />
//       <Line points={[0, 0, 25, 0]} stroke={color} strokeWidth={2} />
//     </Group>
//   );
// };

// // 2. Weapon Turret (Sweeps back and forth looking for targets)
// const AnimatedWeapon = ({ color }) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const anim = new Konva.Animation((frame) => {
//       // Sine wave creates a natural sweeping motion back and forth
//       const angle = Math.sin(frame.time / 600) * 90; 
//       ref.current.rotation(angle - 90); // Default facing up (-90deg)
//     }, ref.current.getLayer());
//     anim.start();
//     return () => anim.stop();
//   }, []);

//   return (
//     <Group ref={ref}>
//       <Circle radius={12} fill="#334155" stroke={color} strokeWidth={2} />
//       <Rect x={5} y={-6} width={18} height={4} fill={color} />
//       <Rect x={5} y={2} width={18} height={4} fill={color} />
//     </Group>
//   );
// };

// // 3. Camera/Sensor (Pans left and right casting a cone of vision)
// const AnimatedCamera = ({ color }) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const anim = new Konva.Animation((frame) => {
//       const angle = Math.cos(frame.time / 400) * 45; 
//       ref.current.rotation(angle);
//     }, ref.current.getLayer());
//     anim.start();
//     return () => anim.stop();
//   }, []);

//   return (
//     <Group ref={ref}>
//       <Wedge radius={35} angle={50} fill={color} opacity={0.15} rotation={-25} />
//       <Rect x={-4} y={-4} width={8} height={8} fill={color} cornerRadius={2} />
//     </Group>
//   );
// };

// // 4. Default Pulse for simple sensors
// const PulsingDot = ({ color }) => {
//   return <Circle radius={10} fill={color} shadowColor={color} shadowBlur={15} />;
// };


// export default function App() {
//   const [hoveredItem, setHoveredItem] = useState(null);

//   // Decides which animated icon to draw based on the backend 'type'
//   const renderIcon = (item) => {
//     switch (item.type) {
//       case 'radar': return <AnimatedRadar color={item.color} />;
//       case 'weapon': return <AnimatedWeapon color={item.color} />;
//       case 'camera': return <AnimatedCamera color={item.color} />;
//       default: return <PulsingDot color={item.color} />;
//     }
//   };

//   return (
//     <div style={{ backgroundColor: '#0f172a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <Stage width={400} height={850}>
//         <Layer>
          
//           {/* REALISTIC SHIP HULL (Outer contour) */}
//           <Path
//             x={0}
//             y={50}
//             data="M 200 0 Q 320 200, 320 400 L 320 700 Q 320 740, 200 750 Q 80 740, 80 700 L 80 400 Q 80 200, 200 0 Z"
//             fill="#1e293b" 
//             stroke="#38bdf8" 
//             strokeWidth={3}
//             shadowColor="#38bdf8"
//             shadowBlur={20}
//           />

//           {/* INNER SHIP SUPERSTRUCTURE (The elevated deck) */}
//           <Path
//             x={0}
//             y={50}
//             data="M 200 80 L 270 250 L 270 650 L 130 650 L 130 250 Z"
//             fill="#334155"
//             stroke="#475569"
//             strokeWidth={2}
//           />

//           {/* DYNAMIC ANIMATED SENSORS & WEAPONS */}
//           {backendData.map((item) => (
//             <Group 
//               key={item.id} 
//               x={item.x} 
//               y={item.y}
//               onMouseEnter={(e) => {
//                 e.target.getStage().container().style.cursor = 'crosshair';
//                 setHoveredItem(item);
//               }}
//               onMouseLeave={(e) => {
//                 e.target.getStage().container().style.cursor = 'default';
//                 setHoveredItem(null);
//               }}
//             >
              
//               {/* Renders the specific animated component */}
//               {renderIcon(item)}
              
//               {/* Status Badge (Stays upright while the weapon rotates inside) */}
//               <Circle x={15} y={-15} radius={10} fill="white" stroke="#0f172a" strokeWidth={2} />
//               <Text x={item.quantity > 9 ? 9 : 12} y={-20} text={`${item.quantity}`} fontSize={10} fill="black" fontStyle="bold" />
//             </Group>
//           ))}

//           {/* HIGH-TECH HOVER TOOLTIP */}
//           {hoveredItem && (
//             <Group x={hoveredItem.x + 30} y={hoveredItem.y - 50}>
//               <Rect width={150} height={50} fill="rgba(255,255,255,0.95)" cornerRadius={5} shadowColor="cyan" shadowBlur={10} />
//               <Text x={10} y={10} text={hoveredItem.name} fill="#0f172a" fontSize={14} fontStyle="bold" />
//               <Text x={10} y={28} text={`SYS: ${hoveredItem.type.toUpperCase()} | QTY: ${hoveredItem.quantity}`} fill="#334155" fontSize={10} fontStyle="bold" />
//             </Group>
//           )}

//         </Layer>
//       </Stage>
//     </div>
//   );
// }













// import React, { useState, useMemo } from 'react';
// import { Stage, Layer, Path, Circle, Text, Line, Group, Rect, Ellipse } from 'react-konva';
// import { ICON_COLORS, renderIcon } from './ShipIcons';

// /* ================================================== */
// /* ===        ZONE PLACEMENT ENGINE                === */
// /* ================================================== */

// // Each zone defines a rectangular region on the ship where icons can be placed.
// // The engine will auto-distribute items in a grid within their zone.
// const ZONES = {
//   fore:      { x: 310, y: 195, width: 80,  height: 80 },
//   port:      { x: 240, y: 350, width: 50,  height: 200 },
//   midship:   { x: 320, y: 440, width: 60,  height: 120 },
//   starboard: { x: 415, y: 350, width: 50,  height: 200 },
//   aft:       { x: 310, y: 700, width: 80,  height: 60 },
// };

// // Takes the flat backend array and calculates X, Y positions for each item
// function computePositions(items) {
//   // Group items by their zone
//   const grouped = {};
//   items.forEach((item) => {
//     if (!grouped[item.position]) grouped[item.position] = [];
//     grouped[item.position].push(item);
//   });

//   const positioned = [];

//   Object.entries(grouped).forEach(([zoneName, zoneItems]) => {
//     const zone = ZONES[zoneName];
//     if (!zone) return;

//     const count = zoneItems.length;
//     // Calculate how many columns we need (try to keep it roughly square)
//     const cols = Math.ceil(Math.sqrt(count));
//     const rows = Math.ceil(count / cols);

//     const cellW = zone.width / cols;
//     const cellH = zone.height / rows;

//     zoneItems.forEach((item, i) => {
//       const col = i % cols;
//       const row = Math.floor(i / cols);

//       positioned.push({
//         ...item,
//         computedX: zone.x + col * cellW + cellW / 2,
//         computedY: zone.y + row * cellH + cellH / 2,
//       });
//     });
//   });

//   return positioned;
// }

// /* ================================================== */
// /* ===        MOCK BACKEND DATA                    === */
// /* ===  (No x, y — only position name!)            === */
// /* ================================================== */

// const backendData = [
//   { id: 1,  type: 'navigational_radar',  name: 'Navigational Radar',  quantity: 4,  position: 'fore' },
//   { id: 2,  type: 'tracking_radar',      name: 'Tracking Radar',      quantity: 2,  position: 'fore' },
//   { id: 3,  type: 'gun',                 name: 'Naval Gun',           quantity: 1,  position: 'fore' },
//   { id: 4,  type: 'missile',             name: 'Anti-Ship Missiles',  quantity: 8,  position: 'midship' },
//   { id: 5,  type: 'sonar',              name: 'Hull Sonar',          quantity: 1,  position: 'midship' },
//   { id: 6,  type: 'esm',                name: 'ESM Suite',           quantity: 2,  position: 'midship' },
//   { id: 7,  type: 'torpedo',            name: 'Torpedo Tubes',       quantity: 6,  position: 'port' },
//   { id: 8,  type: 'infrared',           name: 'IR Sensors',          quantity: 4,  position: 'port' },
//   { id: 9,  type: 'radar_noise_jammer', name: 'Noise Jammer',       quantity: 2,  position: 'starboard' },
//   { id: 10, type: 'chaff',              name: 'Chaff Launchers',     quantity: 4,  position: 'starboard' },
//   { id: 11, type: 'helicopter',         name: 'ASW Helicopter',      quantity: 1,  position: 'aft' },
//   { id: 12, type: 'flare',              name: 'Flare Launchers',     quantity: 6,  position: 'aft' },
// ];

// /* ================================================== */
// /* ===        ANIMATED ICON COMPONENTS             === */
// /* ================================================== */

// const AnimatedRadar = ({ color }) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const anim = new Konva.Animation((frame) => {
//       ref.current.rotation((frame.time * 120) / 1000);
//     }, ref.current.getLayer());
//     anim.start();
//     return () => anim.stop();
//   }, []);
//   return (
//     <Group ref={ref}>
//       <Circle radius={20} stroke={color} strokeWidth={1} opacity={0.4} dash={[4, 4]} />
//       <Wedge radius={20} angle={60} fill={color} opacity={0.3} rotation={-30} />
//       <Line points={[0, 0, 20, 0]} stroke={color} strokeWidth={2} />
//     </Group>
//   );
// };

// const AnimatedWeapon = ({ color }) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const anim = new Konva.Animation((frame) => {
//       const angle = Math.sin(frame.time / 800) * 60;
//       ref.current.rotation(angle - 90);
//     }, ref.current.getLayer());
//     anim.start();
//     return () => anim.stop();
//   }, []);
//   return (
//     <Group ref={ref}>
//       <Circle radius={10} fill="#4a5568" stroke={color} strokeWidth={2} />
//       <Rect x={5} y={-5} width={14} height={3} fill={color} />
//       <Rect x={5} y={2} width={14} height={3} fill={color} />
//     </Group>
//   );
// };

// const AnimatedCamera = ({ color }) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const anim = new Konva.Animation((frame) => {
//       const angle = Math.cos(frame.time / 500) * 40;
//       ref.current.rotation(angle);
//     }, ref.current.getLayer());
//     anim.start();
//     return () => anim.stop();
//   }, []);
//   return (
//     <Group ref={ref}>
//       <Wedge radius={25} angle={45} fill={color} opacity={0.15} rotation={-22} />
//       <Rect x={-3} y={-3} width={6} height={6} fill={color} cornerRadius={1} />
//     </Group>
//   );
// };

// const PulsingDot = ({ color }) => {
//   return <Circle radius={8} fill={color} shadowColor={color} shadowBlur={12} />;
// };

// /* ================================================== */
// /* ===        SHIP DETAIL COMPONENTS               === */
// /* ================================================== */

// const Helipad = ({ x, y }) => (
//   <Group x={x} y={y}>
//     <Circle radius={38} stroke="#7a8a9d" strokeWidth={1.5} dash={[6, 4]} />
//     <Circle radius={26} stroke="#7a8a9d" strokeWidth={1} />
//     <Text x={-8} y={-9} text="H" fontSize={20} fill="#7a8a9d" fontStyle="bold" />
//     <Line points={[-44, 0, -28, 0]} stroke="#7a8a9d" strokeWidth={1.5} />
//     <Line points={[28, 0, 44, 0]} stroke="#7a8a9d" strokeWidth={1.5} />
//     <Line points={[0, -44, 0, -28]} stroke="#7a8a9d" strokeWidth={1.5} />
//     <Line points={[0, 28, 0, 44]} stroke="#7a8a9d" strokeWidth={1.5} />
//   </Group>
// );

// const VLSBlock = ({ x, y, rows, cols }) => {
//   const cells = [];
//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       cells.push(
//         <Rect key={`${r}-${c}`} x={x + c * 10} y={y + r * 10} width={8} height={8} fill="#2d3748" stroke="#4a5568" strokeWidth={0.5} />
//       );
//     }
//   }
//   return <>{cells}</>;
// };

// const Bollard = ({ x, y }) => (
//   <Group x={x} y={y}>
//     <Circle radius={3} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />
//     <Circle radius={1.5} fill="#2d3748" />
//   </Group>
// );

// /* ================================================== */
// /* ===              MAIN APP                       === */
// /* ================================================== */

// export default function App() {
//   const [hoveredItem, setHoveredItem] = useState(null);

//   // Compute positions from backend data (runs once, or whenever backendData changes)
//   const positionedItems = useMemo(() => computePositions(backendData), []);

//   const renderIcon = (item) => {
//     switch (item.type) {
//       case 'radar':  return <AnimatedRadar color={item.color} />;
//       case 'weapon': return <AnimatedWeapon color={item.color} />;
//       case 'camera': return <AnimatedCamera color={item.color} />;
//       default:       return <PulsingDot color={item.color} />;
//     }
//   };

//   return (
//     <div style={{ backgroundColor: '#0a0e1a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'auto', paddingTop: '20px' }}>
//       <Stage width={700} height={1000}>
//         <Layer>

//           {/* ============================================ */}
//           {/* ===           HULL STRUCTURE              === */}
//           {/* ============================================ */}

//           {/* Outer hull / waterline */}
//           <Path
//             data="M 350 55 Q 400 75, 450 180 L 475 300 L 480 500 L 480 750 Q 480 830, 350 845 Q 220 830, 220 750 L 220 500 L 225 300 L 250 180 Q 300 75, 350 55 Z"
//             fill="#2d3748"
//             stroke="#1a202c"
//             strokeWidth={4}
//             shadowColor="rgba(0,0,0,0.6)"
//             shadowBlur={25}
//             shadowOffsetY={5}
//           />

//           {/* Main deck surface */}
//           <Path
//             data="M 350 65 Q 398 83, 445 185 L 470 300 L 474 500 L 474 745 Q 474 822, 350 838 Q 226 822, 226 745 L 226 500 L 230 300 L 255 185 Q 302 83, 350 65 Z"
//             fill="#5a6a7d"
//           />

//           {/* Inner deck */}
//           <Path
//             data="M 350 80 Q 395 96, 440 190 L 464 305 L 468 500 L 468 740 Q 468 815, 350 830 Q 232 815, 232 740 L 232 500 L 236 305 L 260 190 Q 305 96, 350 80 Z"
//             fill="#63738a"
//           />

//           {/* Hull plating lines */}
//           <Line points={[260, 200, 440, 200]} stroke="rgba(45, 55, 72, 0.5)" strokeWidth={0.5} />
//           <Line points={[240, 300, 460, 300]} stroke="rgba(45, 55, 72, 0.5)" strokeWidth={0.5} />
//           <Line points={[233, 400, 467, 400]} stroke="rgba(45, 55, 72, 0.5)" strokeWidth={0.5} />
//           <Line points={[230, 500, 470, 500]} stroke="rgba(45, 55, 72, 0.5)" strokeWidth={0.5} />
//           <Line points={[230, 600, 470, 600]} stroke="rgba(45, 55, 72, 0.5)" strokeWidth={0.5} />
//           <Line points={[232, 700, 468, 700]} stroke="rgba(45, 55, 72, 0.5)" strokeWidth={0.5} />

//           {/* Centerline */}
//           <Line points={[350, 85, 350, 830]} stroke="rgba(45, 55, 72, 0.25)" strokeWidth={0.5} dash={[10, 10]} />

//           {/* ============================================ */}
//           {/* ===           BOW SECTION                 === */}
//           {/* ============================================ */}

//           <Path data="M 350 65 L 385 145 L 315 145 Z" fill="#4e5e71" stroke="#2d3748" strokeWidth={1.5} />
//           <Path data="M 350 75 L 375 135 L 325 135 Z" fill="#576879" stroke="#2d3748" strokeWidth={1} />

//           {/* Anchor chains */}
//           <Line points={[335, 90, 305, 165]} stroke="#2d3748" strokeWidth={2.5} />
//           <Line points={[365, 90, 395, 165]} stroke="#2d3748" strokeWidth={2.5} />
//           <Ellipse x={303} y={168} radiusX={5} radiusY={3} fill="#2d3748" stroke="#4a5568" strokeWidth={1} />
//           <Ellipse x={397} y={168} radiusX={5} radiusY={3} fill="#2d3748" stroke="#4a5568" strokeWidth={1} />

//           {/* Bow capstan */}
//           <Circle x={350} y={140} radius={6} fill="#4a5568" stroke="#2d3748" strokeWidth={1.5} />
//           <Circle x={350} y={140} radius={3} fill="#3d4a5c" />

//           {/* Bollards */}
//           <Bollard x={310} y={155} />
//           <Bollard x={390} y={155} />
//           <Bollard x={295} y={178} />
//           <Bollard x={405} y={178} />

//           {/* Breakwater */}
//           <Path data="M 275 190 Q 350 172, 425 190" stroke="#4a5568" strokeWidth={4} fill="transparent" />
//           <Path data="M 277 193 Q 350 175, 423 193" stroke="#3d4a5c" strokeWidth={2} fill="transparent" />

//           {/* ============================================ */}
//           {/* ===      FORWARD GUN PLATFORM            === */}
//           {/* ============================================ */}

//           <Circle x={350} y={225} radius={30} fill="#4e5e71" stroke="#2d3748" strokeWidth={2} />
//           <Circle x={350} y={225} radius={22} fill="#576879" stroke="#2d3748" strokeWidth={1.5} />
//           <Circle x={350} y={225} radius={14} fill="#63738a" stroke="#2d3748" strokeWidth={1} />
//           <Circle x={350} y={225} radius={27} stroke="#2d3748" strokeWidth={0.5} dash={[3, 3]} />

//           {/* Gun barrel */}
//           <Rect x={345} y={185} width={10} height={35} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
//           <Rect x={343} y={182} width={14} height={5} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />

//           {/* ============================================ */}
//           {/* ===      VLS MISSILE CELLS                === */}
//           {/* ============================================ */}

//           <Rect x={290} y={270} width={120} height={50} fill="#4a5568" stroke="#2d3748" strokeWidth={2} cornerRadius={2} />
//           <VLSBlock x={296} y={275} rows={4} cols={5} />
//           <VLSBlock x={352} y={275} rows={4} cols={5} />
//           <Line points={[350, 270, 350, 320]} stroke="#2d3748" strokeWidth={2} />

//           {/* ============================================ */}
//           {/* ===    FORWARD SUPERSTRUCTURE (BRIDGE)    === */}
//           {/* ============================================ */}

//           <Rect x={275} y={340} width={150} height={95} fill="#6b7a8d" stroke="#2d3748" strokeWidth={2} cornerRadius={4} />
//           <Rect x={288} y={350} width={124} height={68} fill="#7a8a9d" stroke="#2d3748" strokeWidth={1.5} cornerRadius={3} />

//           {/* Bridge windows */}
//           <Rect x={293} y={345} width={114} height={9} fill="#1a202c" cornerRadius={2} />
//           <Line points={[317, 345, 317, 354]} stroke="#2d3748" strokeWidth={0.5} />
//           <Line points={[340, 345, 340, 354]} stroke="#2d3748" strokeWidth={0.5} />
//           <Line points={[363, 345, 363, 354]} stroke="#2d3748" strokeWidth={0.5} />
//           <Line points={[386, 345, 386, 354]} stroke="#2d3748" strokeWidth={0.5} />

//           {/* Side windows */}
//           <Rect x={277} y={360} width={7} height={22} fill="#1a202c" cornerRadius={1} />
//           <Rect x={416} y={360} width={7} height={22} fill="#1a202c" cornerRadius={1} />

//           {/* Chart room */}
//           <Rect x={302} y={360} width={96} height={45} fill="#8a9aad" stroke="#2d3748" strokeWidth={1} cornerRadius={2} />

//           {/* Bridge wings */}
//           <Rect x={262} y={355} width={15} height={32} fill="#5a6a7d" stroke="#2d3748" strokeWidth={1} cornerRadius={2} />
//           <Rect x={423} y={355} width={15} height={32} fill="#5a6a7d" stroke="#2d3748" strokeWidth={1} cornerRadius={2} />

//           {/* Nav lights on bridge wings */}
//           <Circle x={266} y={358} radius={2.5} fill="#ff4444" shadowColor="#ff4444" shadowBlur={4} />
//           <Circle x={434} y={358} radius={2.5} fill="#44ff44" shadowColor="#44ff44" shadowBlur={4} />

//           {/* ============================================ */}
//           {/* ===         MAIN MAST                     === */}
//           {/* ============================================ */}

//           <Rect x={338} y={400} width={24} height={32} fill="#5a6a7d" stroke="#2d3748" strokeWidth={1.5} />
//           <Line points={[350, 405, 350, 428]} stroke="#a0aec0" strokeWidth={3} />
//           <Line points={[336, 412, 364, 412]} stroke="#a0aec0" strokeWidth={2} />
//           <Line points={[334, 420, 366, 420]} stroke="#a0aec0" strokeWidth={2} />

//           {/* Phased array radar panels */}
//           <Rect x={320} y={407} width={12} height={16} fill="#8a9aad" stroke="#2d3748" strokeWidth={1} />
//           <Rect x={368} y={407} width={12} height={16} fill="#8a9aad" stroke="#2d3748" strokeWidth={1} />

//           {/* Whip antennas */}
//           <Line points={[344, 405, 340, 394]} stroke="#a0aec0" strokeWidth={1} />
//           <Line points={[356, 405, 360, 394]} stroke="#a0aec0" strokeWidth={1} />

//           {/* ============================================ */}
//           {/* ===      EXHAUST FUNNELS                  === */}
//           {/* ============================================ */}

//           <Rect x={295} y={445} width={110} height={38} fill="#5a6a7d" stroke="#2d3748" strokeWidth={2} cornerRadius={3} />

//           {/* Port stack */}
//           <Rect x={305} y={450} width={30} height={28} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1.5} cornerRadius={2} />
//           <Line points={[308, 455, 332, 455]} stroke="#1a202c" strokeWidth={1.5} />
//           <Line points={[308, 459, 332, 459]} stroke="#1a202c" strokeWidth={1.5} />
//           <Line points={[308, 463, 332, 463]} stroke="#1a202c" strokeWidth={1.5} />
//           <Line points={[308, 467, 332, 467]} stroke="#1a202c" strokeWidth={1.5} />

//           {/* Starboard stack */}
//           <Rect x={365} y={450} width={30} height={28} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1.5} cornerRadius={2} />
//           <Line points={[368, 455, 392, 455]} stroke="#1a202c" strokeWidth={1.5} />
//           <Line points={[368, 459, 392, 459]} stroke="#1a202c" strokeWidth={1.5} />
//           <Line points={[368, 463, 392, 463]} stroke="#1a202c" strokeWidth={1.5} />
//           <Line points={[368, 467, 392, 467]} stroke="#1a202c" strokeWidth={1.5} />

//           {/* Heat shield */}
//           <Rect x={340} y={453} width={20} height={22} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />

//           {/* ============================================ */}
//           {/* ===      BOAT STORAGE                     === */}
//           {/* ============================================ */}

//           {/* Port davit */}
//           <Rect x={226} y={485} width={40} height={20} fill="#4e5e71" stroke="#2d3748" strokeWidth={1.5} />
//           <Path data="M 230 488 L 262 488 L 260 502 L 232 502 Z" fill="#3d4a5c" stroke="#2d3748" strokeWidth={0.5} />
//           <Line points={[246, 485, 242, 476]} stroke="#7a8a9d" strokeWidth={2} />
//           <Line points={[242, 476, 230, 476]} stroke="#7a8a9d" strokeWidth={1.5} />

//           {/* Starboard davit */}
//           <Rect x={434} y={485} width={40} height={20} fill="#4e5e71" stroke="#2d3748" strokeWidth={1.5} />
//           <Path data="M 438 488 L 470 488 L 468 502 L 440 502 Z" fill="#3d4a5c" stroke="#2d3748" strokeWidth={0.5} />
//           <Line points={[454, 485, 458, 476]} stroke="#7a8a9d" strokeWidth={2} />
//           <Line points={[458, 476, 470, 476]} stroke="#7a8a9d" strokeWidth={1.5} />

//           {/* ============================================ */}
//           {/* ===      TORPEDO TUBES                    === */}
//           {/* ============================================ */}

//           <Group x={238} y={540} rotation={-15}>
//             <Rect width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />
//             <Rect y={8} width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />
//             <Rect y={16} width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />
//             <Rect x={-5} y={-2} width={7} height={24} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           </Group>

//           <Group x={432} y={535} rotation={15}>
//             <Rect width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />
//             <Rect y={8} width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />
//             <Rect y={16} width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />
//             <Rect x={-5} y={-2} width={7} height={24} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           </Group>

//           {/* ============================================ */}
//           {/* ===     AFT SUPERSTRUCTURE                === */}
//           {/* ============================================ */}

//           <Rect x={290} y={560} width={120} height={58} fill="#6b7a8d" stroke="#2d3748" strokeWidth={2} cornerRadius={3} />
//           <Rect x={302} y={568} width={96} height={38} fill="#7a8a9d" stroke="#2d3748" strokeWidth={1} cornerRadius={2} />

//           {/* Sensor dome */}
//           <Circle x={350} y={580} radius={14} fill="#8a9aad" stroke="#2d3748" strokeWidth={1.5} />
//           <Circle x={350} y={580} radius={7} fill="#9aaabb" stroke="#2d3748" strokeWidth={1} />
//           <Circle x={350} y={580} radius={3} fill="#aabbcc" />

//           {/* Aft mast */}
//           <Rect x={343} y={600} width={14} height={20} fill="#5a6a7d" stroke="#2d3748" strokeWidth={1} />
//           <Line points={[350, 603, 350, 617]} stroke="#a0aec0" strokeWidth={2} />
//           <Line points={[340, 609, 360, 609]} stroke="#a0aec0" strokeWidth={1.5} />

//           {/* ============================================ */}
//           {/* ===      CIWS PLATFORM                    === */}
//           {/* ============================================ */}

//           <Circle x={350} y={645} radius={18} fill="#4e5e71" stroke="#2d3748" strokeWidth={2} />
//           <Circle x={350} y={645} radius={11} fill="#576879" stroke="#2d3748" strokeWidth={1.5} />
//           <Circle x={350} y={645} radius={6} fill="#63738a" stroke="#2d3748" strokeWidth={1} />
//           <Rect x={347} y={623} width={6} height={18} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />

//           {/* ============================================ */}
//           {/* ===         AFT DECK                      === */}
//           {/* ============================================ */}

//           {/* Towed array winch */}
//           <Rect x={326} y={672} width={48} height={20} fill="#4a5568" stroke="#2d3748" strokeWidth={1.5} cornerRadius={2} />
//           <Circle x={350} y={682} radius={7} fill="#3d4a5c" stroke="#4a5568" strokeWidth={1} />
//           <Circle x={350} y={682} radius={3.5} fill="#2d3748" />

//           {/* Deck hatches */}
//           <Rect x={305} y={700} width={18} height={18} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
//           <Line points={[305, 700, 323, 718]} stroke="#2d3748" strokeWidth={0.5} />
//           <Line points={[323, 700, 305, 718]} stroke="#2d3748" strokeWidth={0.5} />
//           <Rect x={377} y={700} width={18} height={18} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
//           <Line points={[377, 700, 395, 718]} stroke="#2d3748" strokeWidth={0.5} />
//           <Line points={[395, 700, 377, 718]} stroke="#2d3748" strokeWidth={0.5} />

//           {/* ============================================ */}
//           {/* ===      HELICOPTER HANGAR                === */}
//           {/* ============================================ */}

//           <Rect x={290} y={730} width={120} height={34} fill="#576879" stroke="#2d3748" strokeWidth={2} cornerRadius={2} />
//           <Rect x={316} y={732} width={30} height={30} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
//           <Rect x={354} y={732} width={30} height={30} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
//           <Line points={[350, 735, 350, 759]} stroke="#3d4a5c" strokeWidth={2} />

//           {/* ============================================ */}
//           {/* ===         FLIGHT DECK / HELIPAD         === */}
//           {/* ============================================ */}

//           <Path
//             data="M 238 764 L 462 764 L 468 790 Q 468 822, 350 835 Q 232 822, 232 790 Z"
//             fill="#586878"
//             stroke="transparent"
//           />
//           <Path
//             data="M 242 766 L 458 766 L 464 788 Q 464 818, 350 830 Q 236 818, 236 788 Z"
//             stroke="#7a8a6d"
//             strokeWidth={1.5}
//             fill="transparent"
//             dash={[8, 4]}
//           />

//           <Helipad x={350} y={795} />

//           {/* ============================================ */}
//           {/* ===         STERN DETAILS                 === */}
//           {/* ============================================ */}

//           <Bollard x={280} y={815} />
//           <Bollard x={420} y={815} />

//           <Circle x={245} y={820} radius={3} fill="#ff4444" shadowColor="#ff4444" shadowBlur={6} />
//           <Circle x={455} y={820} radius={3} fill="#44ff44" shadowColor="#44ff44" shadowBlur={6} />
//           <Circle x={350} y={840} radius={2.5} fill="#ffffff" shadowColor="#ffffff" shadowBlur={6} />

//           {/* ============================================ */}
//           {/* ===      HULL EDGE DETAILS               === */}
//           {/* ============================================ */}

//           <Path data="M 275 185 L 233 300 L 228 500 L 228 750" stroke="rgba(122, 138, 157, 0.4)" strokeWidth={1} fill="transparent" dash={[3, 5]} />
//           <Path data="M 425 185 L 467 300 L 472 500 L 472 750" stroke="rgba(122, 138, 157, 0.4)" strokeWidth={1} fill="transparent" dash={[3, 5]} />

//           {/* Scuppers */}
//           <Rect x={228} y={360} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           <Rect x={227} y={440} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           <Rect x={227} y={570} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           <Rect x={228} y={650} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           <Rect x={463} y={360} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           <Rect x={464} y={440} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           <Rect x={464} y={570} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
//           <Rect x={463} y={650} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />

//           {/* Hull number */}
//           <Text x={430} y={770} text="76" fontSize={24} fill="rgba(200, 210, 220, 0.3)" fontStyle="bold" />

//           {/* ============================================ */}
//           {/* ===     DYNAMIC DATA ICONS                === */}
//           {/* ============================================ */}

//           {positionedItems.map((item) => (
//             <Group
//               key={item.id}
//               x={item.computedX}
//               y={item.computedY}
//               onMouseEnter={(e) => {
//                 e.target.getStage().container().style.cursor = 'crosshair';
//                 setHoveredItem(item);
//               }}
//               onMouseLeave={(e) => {
//                 e.target.getStage().container().style.cursor = 'default';
//                 setHoveredItem(null);
//               }}
//             >
//               <Circle radius={22} fill="rgba(10, 14, 26, 0.85)" stroke={ICON_COLORS[item.type] || '#fff'} strokeWidth={1.5} shadowColor={ICON_COLORS[item.type] || '#fff'} shadowBlur={12} />
//               {renderIcon(item.type)}
//               <Circle x={16} y={-16} radius={9} fill="white" stroke="#0a0e1a" strokeWidth={2} />
//               <Text x={item.quantity > 9 ? 10 : 13} y={-21} text={`${item.quantity}`} fontSize={9} fill="black" fontStyle="bold" />
//             </Group>
//           ))}

//            //HOVER TOOLTIP 

//           {hoveredItem && (
//             <Group
//               x={hoveredItem.computedX > 350 ? hoveredItem.computedX - 230 : hoveredItem.computedX + 30}
//               y={hoveredItem.computedY - 55}
//             >
//               <Rect width={210} height={58} fill="rgba(255,255,255,0.95)" cornerRadius={5} shadowColor="cyan" shadowBlur={10} />
//               <Text x={10} y={8} text={hoveredItem.name} fill="#0a0e1a" fontSize={14} fontStyle="bold" />
//               <Text x={10} y={26} text={`SYS: ${hoveredItem.type.toUpperCase()} | QTY: ${hoveredItem.quantity}`} fill="#4a5568" fontSize={10} fontStyle="bold" />
//               <Text x={10} y={42} text={`ZONE: ${hoveredItem.position.toUpperCase()}`} fill="#718096" fontSize={9} />
//             </Group>
//           )}

//         </Layer>
//       </Stage>
//     </div>
//   );
// }


























import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Stage, Layer, Path, Circle, Ellipse, Text, Line, Group, Rect, Wedge } from 'react-konva';
import Konva from 'konva';

// COLOR CONFIG
const ICON_COLORS = {
  navigational_radar: '#00e5ff', tracking_radar: '#448aff', sonar: '#00bfa5',
  sonobuoy: '#26a69a', infrared: '#ff6e40', visual: '#42a5f5',
  esm: '#76ff03', interrogator: '#69f0ae', transponder: '#b2ff59',
  gun: '#ff1744', missile: '#ff5252', rocket: '#ff7043',
  asw_rocket: '#ff9100', torpedo: '#d50000', depth_charge: '#ff3d00',
  mine: '#dd2c00', smoke: '#9e9e9e', chaff: '#ffd740',
  flare: '#ffab00', radar_decoy: '#ffc400', radar_noise_jammer: '#ff6d00',
  radar_deception_jammer: '#e65100', aircraft: '#e040fb', helicopter: '#ab47bc', uav: '#7c4dff',
};

// ZONE PLACEMENT ENGINE
const ZONES = {
  fore:      { x: 310, y: 195, width: 80,  height: 80 },
  port:      { x: 240, y: 350, width: 50,  height: 200 },
  midship:   { x: 320, y: 440, width: 60,  height: 120 },
  starboard: { x: 415, y: 350, width: 50,  height: 200 },
  aft:       { x: 310, y: 700, width: 80,  height: 60 },
};

function computePositions(items) {
  const grouped = {};
  items.forEach((item) => {
    if (!grouped[item.position]) grouped[item.position] = [];
    grouped[item.position].push(item);
  });
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
      const col = i % cols;
      const row = Math.floor(i / cols);
      positioned.push({ ...item, computedX: zone.x + col * cellW + cellW / 2, computedY: zone.y + row * cellH + cellH / 2 });
    });
  });
  return positioned;
}


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

// ANIMATED ICONS (3 types)

const NavRadarIcon = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => { ref.current.rotation((frame.time * 120) / 1000); }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (<Group ref={ref}><Wedge radius={16} angle={90} fill={color} rotation={-45} /><Line points={[0,0,16,0]} stroke={color} strokeWidth={2} /><Circle radius={3} fill={color} /></Group>);
};

const TrackRadarIcon = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => { ref.current.rotation(Math.sin(frame.time / 600) * 80); }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (<Group ref={ref}><Wedge radius={16} angle={30} fill={color} rotation={-15} /><Line points={[0,0,16,0]} stroke={color} strokeWidth={2} /><Circle radius={3} fill={color} /></Group>);
};

const HeliIcon = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => { ref.current.rotation((frame.time * 300) / 1000); }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (<Group><Ellipse radiusX={4} radiusY={7} fill={color} /><Line points={[0,7,0,14]} stroke={color} strokeWidth={1.5} /><Group ref={ref}><Line points={[-14,0,14,0]} stroke={color} strokeWidth={2} /><Line points={[0,-14,0,14]} stroke={color} strokeWidth={2} /></Group><Circle radius={2} fill="white" /></Group>);
};

// STATIC ICONS (22 types)

const SonarIcon = ({ c }) => (<Group><Circle radius={14} stroke={c} strokeWidth={1.5} /><Circle radius={9} stroke={c} strokeWidth={1.5} /><Circle radius={4} fill={c} /></Group>);
const SonobuoyIcon = ({ c }) => (<Group><Line points={[0,-12,0,-6]} stroke={c} strokeWidth={2} /><Circle y={-12} radius={2} fill={c} /><Rect x={-4} y={-6} width={8} height={12} fill={c} cornerRadius={2} /></Group>);
const InfraredIcon = ({ c }) => (<Group><Ellipse radiusX={12} radiusY={7} stroke={c} strokeWidth={2} /><Circle radius={4} fill={c} /><Line points={[14,0,18,-3]} stroke={c} strokeWidth={1.5} /><Line points={[14,0,18,3]} stroke={c} strokeWidth={1.5} /></Group>);
const VisualIcon = ({ c }) => (<Group><Rect x={-10} y={-7} width={20} height={14} stroke={c} strokeWidth={2} cornerRadius={2} /><Circle radius={5} stroke={c} strokeWidth={2} /><Circle radius={2} fill={c} /></Group>);
const ESMIcon = ({ c }) => (<Group><Line points={[-2,-12,4,-2,-1,-2,3,10]} stroke={c} strokeWidth={2.5} /><Line points={[5,-4,10,-6]} stroke={c} strokeWidth={1.5} /><Line points={[5,0,12,0]} stroke={c} strokeWidth={1.5} /></Group>);
const InterrogatorIcon = ({ c }) => (<Group><Rect x={-3} y={-4} width={6} height={10} fill={c} cornerRadius={1} /><Line points={[0,-4,0,-12]} stroke={c} strokeWidth={2} /><Path data="M -5 -12 Q 0 -18, 5 -12" stroke={c} strokeWidth={1.5} fill="transparent" /><Path data="M -8 -12 Q 0 -22, 8 -12" stroke={c} strokeWidth={1.5} fill="transparent" /></Group>);
const TransponderIcon = ({ c }) => (<Group><Rect x={-3} y={-6} width={6} height={12} fill={c} cornerRadius={1} /><Path data="M -5 -3 Q -10 0, -5 3" stroke={c} strokeWidth={1.5} fill="transparent" /><Path data="M -8 -5 Q -14 0, -8 5" stroke={c} strokeWidth={1.5} fill="transparent" /><Path data="M 5 -3 Q 10 0, 5 3" stroke={c} strokeWidth={1.5} fill="transparent" /><Path data="M 8 -5 Q 14 0, 8 5" stroke={c} strokeWidth={1.5} fill="transparent" /></Group>);

const GunIcon = ({ c }) => (<Group><Circle radius={8} fill={c} /><Rect x={-3} y={-20} width={6} height={14} fill={c} /><Rect x={-5} y={-22} width={10} height={4} fill={c} cornerRadius={1} /></Group>);
const MissileIcon = ({ c }) => (<Group><Rect x={-3} y={-12} width={6} height={20} fill={c} cornerRadius={[3,3,0,0]} /><Line points={[-3,-12,0,-16,3,-12]} stroke={c} strokeWidth={1} fill={c} closed /><Line points={[-8,8,-3,5]} stroke={c} strokeWidth={2} /><Line points={[8,8,3,5]} stroke={c} strokeWidth={2} /></Group>);
const RocketIcon = ({ c }) => (<Group><Rect x={-3} y={-10} width={6} height={16} fill={c} cornerRadius={[3,3,0,0]} /><Line points={[-3,-10,0,-14,3,-10]} stroke={c} fill={c} closed /><Line points={[-5,6,-3,4]} stroke={c} strokeWidth={2} /><Line points={[5,6,3,4]} stroke={c} strokeWidth={2} /></Group>);
const ASWRocketIcon = ({ c }) => (<Group><Rect x={-3} y={-10} width={6} height={14} fill={c} cornerRadius={[3,3,0,0]} /><Line points={[-3,-10,0,-14,3,-10]} stroke={c} fill={c} closed /><Path data="M -7 10 Q -3 6, 0 10 Q 3 14, 7 10" stroke={c} strokeWidth={1.5} fill="transparent" /></Group>);
const TorpedoIcon = ({ c }) => (<Group><Rect x={-3} y={-12} width={6} height={22} fill={c} cornerRadius={3} /><Line points={[-3,-12,0,-15,3,-12]} stroke={c} fill={c} closed /><Line points={[-4,10,-4,13]} stroke={c} strokeWidth={1.5} /><Line points={[4,10,4,13]} stroke={c} strokeWidth={1.5} /></Group>);
const DepthChargeIcon = ({ c }) => (<Group><Circle radius={9} fill={c} /><Line points={[0,-9,0,-13]} stroke={c} strokeWidth={2} /><Circle y={-13} radius={2} fill={c} /><Line points={[-3,-3,3,3]} stroke="#0a0e1a" strokeWidth={1.5} /><Line points={[-3,3,3,-3]} stroke="#0a0e1a" strokeWidth={1.5} /></Group>);
const MineIcon = ({ c }) => (<Group><Circle radius={8} fill={c} /><Circle y={-12} radius={3} fill={c} /><Circle y={12} radius={3} fill={c} /><Circle x={12} radius={3} fill={c} /><Circle x={-12} radius={3} fill={c} /></Group>);

const SmokeIcon = ({ c }) => (<Group><Circle x={-5} y={2} radius={7} fill={c} /><Circle x={5} y={2} radius={7} fill={c} /><Circle y={-4} radius={8} fill={c} /></Group>);
const ChaffIcon = ({ c }) => (<Group><Line points={[-7,-7,-1,-1]} stroke={c} strokeWidth={2} /><Line points={[1,-5,7,1]} stroke={c} strokeWidth={2} /><Line points={[-5,1,1,7]} stroke={c} strokeWidth={2} /><Line points={[3,3,9,9]} stroke={c} strokeWidth={2} /><Line points={[-9,-1,-3,5]} stroke={c} strokeWidth={2} /><Line points={[5,-9,9,-3]} stroke={c} strokeWidth={2} /></Group>);
const FlareIcon = ({ c }) => (<Group><Circle radius={4} fill={c} shadowColor={c} shadowBlur={15} /><Line points={[0,-12,0,-5]} stroke={c} strokeWidth={2} /><Line points={[0,5,0,12]} stroke={c} strokeWidth={2} /><Line points={[-12,0,-5,0]} stroke={c} strokeWidth={2} /><Line points={[5,0,12,0]} stroke={c} strokeWidth={2} /><Line points={[-8,-8,-4,-4]} stroke={c} strokeWidth={1.5} /><Line points={[4,4,8,8]} stroke={c} strokeWidth={1.5} /><Line points={[8,-8,4,-4]} stroke={c} strokeWidth={1.5} /><Line points={[-4,4,-8,8]} stroke={c} strokeWidth={1.5} /></Group>);
const RadarDecoyIcon = ({ c }) => (<Group><Circle radius={11} stroke={c} strokeWidth={2} dash={[4,3]} /><Circle radius={4} fill={c} /><Line points={[0,-4,0,-8]} stroke={c} strokeWidth={1.5} /></Group>);
const NoiseJammerIcon = ({ c }) => (<Group><Line points={[-12,0,-8,-5,-4,4,0,-6,4,5,8,-3,12,2]} stroke={c} strokeWidth={2.5} /><Line points={[-12,-8,12,-8]} stroke={c} strokeWidth={1} /><Line points={[-12,8,12,8]} stroke={c} strokeWidth={1} /></Group>);
const DeceptionJammerIcon = ({ c }) => (<Group><Path data="M -10 0 Q -5 -8, 0 0 Q 5 8, 10 0" stroke={c} strokeWidth={2} fill="transparent" /><Line points={[-5,-5,5,5]} stroke={c} strokeWidth={3} /><Line points={[-5,5,5,-5]} stroke={c} strokeWidth={3} /></Group>);

const AircraftIcon = ({ c }) => (<Group><Rect x={-2} y={-12} width={4} height={20} fill={c} cornerRadius={2} /><Rect x={-12} y={-2} width={24} height={4} fill={c} cornerRadius={1} /><Rect x={-6} y={8} width={12} height={3} fill={c} cornerRadius={1} /></Group>);
const UAVIcon = ({ c }) => (<Group><Line points={[0,-10,12,6,5,4,0,8,-5,4,-12,6]} fill={c} closed stroke={c} strokeWidth={1} /><Circle radius={2} fill="white" /></Group>);

// MASTER RENDER FUNCTION
function renderIcon(type) {
  const c = ICON_COLORS[type] || '#ffffff';
  switch (type) {
    case 'navigational_radar':      return <NavRadarIcon color={c} />;
    case 'tracking_radar':          return <TrackRadarIcon color={c} />;
    case 'helicopter':              return <HeliIcon color={c} />;
    case 'sonar':                   return <SonarIcon c={c} />;
    case 'sonobuoy':                return <SonobuoyIcon c={c} />;
    case 'infrared':                return <InfraredIcon c={c} />;
    case 'visual':                  return <VisualIcon c={c} />;
    case 'esm':                     return <ESMIcon c={c} />;
    case 'interrogator':            return <InterrogatorIcon c={c} />;
    case 'transponder':             return <TransponderIcon c={c} />;
    case 'gun':                     return <GunIcon c={c} />;
    case 'missile':                 return <MissileIcon c={c} />;
    case 'rocket':                  return <RocketIcon c={c} />;
    case 'asw_rocket':              return <ASWRocketIcon c={c} />;
    case 'torpedo':                 return <TorpedoIcon c={c} />;
    case 'depth_charge':            return <DepthChargeIcon c={c} />;
    case 'mine':                    return <MineIcon c={c} />;
    case 'smoke':                   return <SmokeIcon c={c} />;
    case 'chaff':                   return <ChaffIcon c={c} />;
    case 'flare':                   return <FlareIcon c={c} />;
    case 'radar_decoy':             return <RadarDecoyIcon c={c} />;
    case 'radar_noise_jammer':      return <NoiseJammerIcon c={c} />;
    case 'radar_deception_jammer':  return <DeceptionJammerIcon c={c} />;
    case 'aircraft':                return <AircraftIcon c={c} />;
    case 'uav':                     return <UAVIcon c={c} />;
    default:                        return <Circle radius={8} fill={c} />;
  }
}


// SHIP SUB-COMPONENTS
const Helipad = ({ x, y }) => (<Group x={x} y={y}><Circle radius={38} stroke="#7a8a9d" strokeWidth={1.5} dash={[6,4]} /><Circle radius={26} stroke="#7a8a9d" strokeWidth={1} /><Text x={-8} y={-9} text="H" fontSize={20} fill="#7a8a9d" fontStyle="bold" /><Line points={[-44,0,-28,0]} stroke="#7a8a9d" strokeWidth={1.5} /><Line points={[28,0,44,0]} stroke="#7a8a9d" strokeWidth={1.5} /><Line points={[0,-44,0,-28]} stroke="#7a8a9d" strokeWidth={1.5} /><Line points={[0,28,0,44]} stroke="#7a8a9d" strokeWidth={1.5} /></Group>);

const VLSBlock = ({ x, y, rows, cols }) => {
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push(<Rect key={`${r}-${c}`} x={x + c * 10} y={y + r * 10} width={8} height={8} fill="#2d3748" stroke="#4a5568" strokeWidth={0.5} />);
  return <>{cells}</>;
};

const Bollard = ({ x, y }) => (<Group x={x} y={y}><Circle radius={3} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} /><Circle radius={1.5} fill="#2d3748" /></Group>);


// MAIN APP                       

export default function App() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const positionedItems = useMemo(() => computePositions(backendData), []);

  return (
    <div style={{ backgroundColor: '#0a0e1a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'auto', paddingTop: '20px' }}>
      <Stage width={700} height={1000}>
        <Layer>
          <Path data="M 350 55 Q 400 75, 450 180 L 475 300 L 480 500 L 480 750 Q 480 830, 350 845 Q 220 830, 220 750 L 220 500 L 225 300 L 250 180 Q 300 75, 350 55 Z" fill="#2d3748" stroke="#1a202c" strokeWidth={4} shadowColor="rgba(0,0,0,0.6)" shadowBlur={25} shadowOffsetY={5} />
          <Path data="M 350 65 Q 398 83, 445 185 L 470 300 L 474 500 L 474 745 Q 474 822, 350 838 Q 226 822, 226 745 L 226 500 L 230 300 L 255 185 Q 302 83, 350 65 Z" fill="#5a6a7d" />
          <Path data="M 350 80 Q 395 96, 440 190 L 464 305 L 468 500 L 468 740 Q 468 815, 350 830 Q 232 815, 232 740 L 232 500 L 236 305 L 260 190 Q 305 96, 350 80 Z" fill="#63738a" />
          <Line points={[260,200,440,200]} stroke="rgba(45,55,72,0.5)" strokeWidth={0.5} />
          <Line points={[240,300,460,300]} stroke="rgba(45,55,72,0.5)" strokeWidth={0.5} />
          <Line points={[233,400,467,400]} stroke="rgba(45,55,72,0.5)" strokeWidth={0.5} />
          <Line points={[230,500,470,500]} stroke="rgba(45,55,72,0.5)" strokeWidth={0.5} />
          <Line points={[230,600,470,600]} stroke="rgba(45,55,72,0.5)" strokeWidth={0.5} />
          <Line points={[232,700,468,700]} stroke="rgba(45,55,72,0.5)" strokeWidth={0.5} />
          <Line points={[350,85,350,830]} stroke="rgba(45,55,72,0.25)" strokeWidth={0.5} dash={[10,10]} />
          <Path data="M 350 65 L 385 145 L 315 145 Z" fill="#4e5e71" stroke="#2d3748" strokeWidth={1.5} />
          <Path data="M 350 75 L 375 135 L 325 135 Z" fill="#576879" stroke="#2d3748" strokeWidth={1} />
          <Line points={[335,90,305,165]} stroke="#2d3748" strokeWidth={2.5} />
          <Line points={[365,90,395,165]} stroke="#2d3748" strokeWidth={2.5} />
          <Ellipse x={303} y={168} radiusX={5} radiusY={3} fill="#2d3748" stroke="#4a5568" strokeWidth={1} />
          <Ellipse x={397} y={168} radiusX={5} radiusY={3} fill="#2d3748" stroke="#4a5568" strokeWidth={1} />
          <Circle x={350} y={140} radius={6} fill="#4a5568" stroke="#2d3748" strokeWidth={1.5} />
          <Circle x={350} y={140} radius={3} fill="#3d4a5c" />
          <Bollard x={310} y={155} /><Bollard x={390} y={155} /><Bollard x={295} y={178} /><Bollard x={405} y={178} />
          <Path data="M 275 190 Q 350 172, 425 190" stroke="#4a5568" strokeWidth={4} fill="transparent" />
          <Path data="M 277 193 Q 350 175, 423 193" stroke="#3d4a5c" strokeWidth={2} fill="transparent" />
          <Circle x={350} y={225} radius={30} fill="#4e5e71" stroke="#2d3748" strokeWidth={2} />
          <Circle x={350} y={225} radius={22} fill="#576879" stroke="#2d3748" strokeWidth={1.5} />
          <Circle x={350} y={225} radius={14} fill="#63738a" stroke="#2d3748" strokeWidth={1} />
          <Circle x={350} y={225} radius={27} stroke="#2d3748" strokeWidth={0.5} dash={[3,3]} />
          <Rect x={345} y={185} width={10} height={35} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
          <Rect x={343} y={182} width={14} height={5} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} />
          <Rect x={290} y={270} width={120} height={50} fill="#4a5568" stroke="#2d3748" strokeWidth={2} cornerRadius={2} />
          <VLSBlock x={296} y={275} rows={4} cols={5} /><VLSBlock x={352} y={275} rows={4} cols={5} />
          <Line points={[350,270,350,320]} stroke="#2d3748" strokeWidth={2} />
          <Rect x={275} y={340} width={150} height={95} fill="#6b7a8d" stroke="#2d3748" strokeWidth={2} cornerRadius={4} />
          <Rect x={288} y={350} width={124} height={68} fill="#7a8a9d" stroke="#2d3748" strokeWidth={1.5} cornerRadius={3} />
          <Rect x={293} y={345} width={114} height={9} fill="#1a202c" cornerRadius={2} />
          <Line points={[317,345,317,354]} stroke="#2d3748" strokeWidth={0.5} />
          <Line points={[340,345,340,354]} stroke="#2d3748" strokeWidth={0.5} />
          <Line points={[363,345,363,354]} stroke="#2d3748" strokeWidth={0.5} />
          <Line points={[386,345,386,354]} stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={277} y={360} width={7} height={22} fill="#1a202c" cornerRadius={1} />
          <Rect x={416} y={360} width={7} height={22} fill="#1a202c" cornerRadius={1} />
          <Rect x={302} y={360} width={96} height={45} fill="#8a9aad" stroke="#2d3748" strokeWidth={1} cornerRadius={2} />
          <Rect x={262} y={355} width={15} height={32} fill="#5a6a7d" stroke="#2d3748" strokeWidth={1} cornerRadius={2} />
          <Rect x={423} y={355} width={15} height={32} fill="#5a6a7d" stroke="#2d3748" strokeWidth={1} cornerRadius={2} />
          <Circle x={266} y={358} radius={2.5} fill="#ff4444" shadowColor="#ff4444" shadowBlur={4} />
          <Circle x={434} y={358} radius={2.5} fill="#44ff44" shadowColor="#44ff44" shadowBlur={4} />
          <Rect x={338} y={400} width={24} height={32} fill="#5a6a7d" stroke="#2d3748" strokeWidth={1.5} />
          <Line points={[350,405,350,428]} stroke="#a0aec0" strokeWidth={3} />
          <Line points={[336,412,364,412]} stroke="#a0aec0" strokeWidth={2} />
          <Line points={[334,420,366,420]} stroke="#a0aec0" strokeWidth={2} />
          <Rect x={320} y={407} width={12} height={16} fill="#8a9aad" stroke="#2d3748" strokeWidth={1} />
          <Rect x={368} y={407} width={12} height={16} fill="#8a9aad" stroke="#2d3748" strokeWidth={1} />
          <Line points={[344,405,340,394]} stroke="#a0aec0" strokeWidth={1} />
          <Line points={[356,405,360,394]} stroke="#a0aec0" strokeWidth={1} />
          <Rect x={295} y={445} width={110} height={38} fill="#5a6a7d" stroke="#2d3748" strokeWidth={2} cornerRadius={3} />
          <Rect x={305} y={450} width={30} height={28} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1.5} cornerRadius={2} />
          <Line points={[308,455,332,455]} stroke="#1a202c" strokeWidth={1.5} />
          <Line points={[308,459,332,459]} stroke="#1a202c" strokeWidth={1.5} />
          <Line points={[308,463,332,463]} stroke="#1a202c" strokeWidth={1.5} />
          <Line points={[308,467,332,467]} stroke="#1a202c" strokeWidth={1.5} />
          <Rect x={365} y={450} width={30} height={28} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1.5} cornerRadius={2} />
          <Line points={[368,455,392,455]} stroke="#1a202c" strokeWidth={1.5} />
          <Line points={[368,459,392,459]} stroke="#1a202c" strokeWidth={1.5} />
          <Line points={[368,463,392,463]} stroke="#1a202c" strokeWidth={1.5} />
          <Line points={[368,467,392,467]} stroke="#1a202c" strokeWidth={1.5} />
          <Rect x={340} y={453} width={20} height={22} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={226} y={485} width={40} height={20} fill="#4e5e71" stroke="#2d3748" strokeWidth={1.5} />
          <Path data="M 230 488 L 262 488 L 260 502 L 232 502 Z" fill="#3d4a5c" stroke="#2d3748" strokeWidth={0.5} />
          <Line points={[246,485,242,476]} stroke="#7a8a9d" strokeWidth={2} />
          <Line points={[242,476,230,476]} stroke="#7a8a9d" strokeWidth={1.5} />
          <Rect x={434} y={485} width={40} height={20} fill="#4e5e71" stroke="#2d3748" strokeWidth={1.5} />
          <Path data="M 438 488 L 470 488 L 468 502 L 440 502 Z" fill="#3d4a5c" stroke="#2d3748" strokeWidth={0.5} />
          <Line points={[454,485,458,476]} stroke="#7a8a9d" strokeWidth={2} />
          <Line points={[458,476,470,476]} stroke="#7a8a9d" strokeWidth={1.5} />
          <Group x={238} y={540} rotation={-15}><Rect width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} /><Rect y={8} width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} /><Rect y={16} width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} /><Rect x={-5} y={-2} width={7} height={24} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} /></Group>
          <Group x={432} y={535} rotation={15}><Rect width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} /><Rect y={8} width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} /><Rect y={16} width={32} height={6} fill="#3d4a5c" stroke="#2d3748" strokeWidth={1} /><Rect x={-5} y={-2} width={7} height={24} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} /></Group>
          <Rect x={290} y={560} width={120} height={58} fill="#6b7a8d" stroke="#2d3748" strokeWidth={2} cornerRadius={3} />
          <Rect x={302} y={568} width={96} height={38} fill="#7a8a9d" stroke="#2d3748" strokeWidth={1} cornerRadius={2} />
          <Circle x={350} y={580} radius={14} fill="#8a9aad" stroke="#2d3748" strokeWidth={1.5} />
          <Circle x={350} y={580} radius={7} fill="#9aaabb" stroke="#2d3748" strokeWidth={1} />
          <Circle x={350} y={580} radius={3} fill="#aabbcc" />
          <Rect x={343} y={600} width={14} height={20} fill="#5a6a7d" stroke="#2d3748" strokeWidth={1} />
          <Line points={[350,603,350,617]} stroke="#a0aec0" strokeWidth={2} />
          <Line points={[340,609,360,609]} stroke="#a0aec0" strokeWidth={1.5} />
          <Circle x={350} y={645} radius={18} fill="#4e5e71" stroke="#2d3748" strokeWidth={2} />
          <Circle x={350} y={645} radius={11} fill="#576879" stroke="#2d3748" strokeWidth={1.5} />
          <Circle x={350} y={645} radius={6} fill="#63738a" stroke="#2d3748" strokeWidth={1} />
          <Rect x={347} y={623} width={6} height={18} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
          <Rect x={326} y={672} width={48} height={20} fill="#4a5568" stroke="#2d3748" strokeWidth={1.5} cornerRadius={2} />
          <Circle x={350} y={682} radius={7} fill="#3d4a5c" stroke="#4a5568" strokeWidth={1} />
          <Circle x={350} y={682} radius={3.5} fill="#2d3748" />
          <Rect x={305} y={700} width={18} height={18} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
          <Line points={[305,700,323,718]} stroke="#2d3748" strokeWidth={0.5} /><Line points={[323,700,305,718]} stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={377} y={700} width={18} height={18} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
          <Line points={[377,700,395,718]} stroke="#2d3748" strokeWidth={0.5} /><Line points={[395,700,377,718]} stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={290} y={730} width={120} height={34} fill="#576879" stroke="#2d3748" strokeWidth={2} cornerRadius={2} />
          <Rect x={316} y={732} width={30} height={30} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
          <Rect x={354} y={732} width={30} height={30} fill="#4a5568" stroke="#2d3748" strokeWidth={1} />
          <Line points={[350,735,350,759]} stroke="#3d4a5c" strokeWidth={2} />
          <Path data="M 238 764 L 462 764 L 468 790 Q 468 822, 350 835 Q 232 822, 232 790 Z" fill="#586878" />
          <Path data="M 242 766 L 458 766 L 464 788 Q 464 818, 350 830 Q 236 818, 236 788 Z" stroke="#7a8a6d" strokeWidth={1.5} fill="transparent" dash={[8,4]} />
          <Helipad x={350} y={795} />
          <Bollard x={280} y={815} /><Bollard x={420} y={815} />
          <Circle x={245} y={820} radius={3} fill="#ff4444" shadowColor="#ff4444" shadowBlur={6} />
          <Circle x={455} y={820} radius={3} fill="#44ff44" shadowColor="#44ff44" shadowBlur={6} />
          <Circle x={350} y={840} radius={2.5} fill="#ffffff" shadowColor="#ffffff" shadowBlur={6} />
          <Path data="M 275 185 L 233 300 L 228 500 L 228 750" stroke="rgba(122,138,157,0.4)" strokeWidth={1} fill="transparent" dash={[3,5]} />
          <Path data="M 425 185 L 467 300 L 472 500 L 472 750" stroke="rgba(122,138,157,0.4)" strokeWidth={1} fill="transparent" dash={[3,5]} />
          <Rect x={228} y={360} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={227} y={440} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={227} y={570} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={228} y={650} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={463} y={360} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={464} y={440} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={464} y={570} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Rect x={463} y={650} width={9} height={5} fill="#4a5568" stroke="#2d3748" strokeWidth={0.5} />
          <Text x={430} y={770} text="76" fontSize={24} fill="rgba(200,210,220,0.3)" fontStyle="bold" />

          {positionedItems.map((item) => (
            <Group key={item.id} x={item.computedX} y={item.computedY} onMouseEnter={(e) => { e.target.getStage().container().style.cursor = 'crosshair'; setHoveredItem(item); }} onMouseLeave={(e) => { e.target.getStage().container().style.cursor = 'default'; setHoveredItem(null); }}>
              {/* <Circle radius={22} fill="rgba(10,14,26,0.85)" stroke={ICON_COLORS[item.type] || '#fff'} strokeWidth={1.5} shadowColor={ICON_COLORS[item.type] || '#fff'} shadowBlur={12} /> */}
              {renderIcon(item.type)}
              <Circle x={16} y={-16} radius={9} fill="white" stroke="#0a0e1a" strokeWidth={2} />
              <Text x={item.quantity > 9 ? 10 : 13} y={-21} text={`${item.quantity}`} fontSize={9} fill="black" fontStyle="bold" />
            </Group>
          ))}

          {hoveredItem && (
            <Group x={hoveredItem.computedX > 350 ? hoveredItem.computedX - 230 : hoveredItem.computedX + 30} y={hoveredItem.computedY - 55}>
              <Rect width={210} height={58} fill="rgba(255,255,255,0.95)" cornerRadius={5} shadowColor="cyan" shadowBlur={10} />
              <Text x={10} y={8} text={hoveredItem.name} fill="#0a0e1a" fontSize={14} fontStyle="bold" />
              <Text x={10} y={26} text={`SYS: ${hoveredItem.type.toUpperCase()} | QTY: ${hoveredItem.quantity}`} fill="#4a5568" fontSize={10} fontStyle="bold" />
              <Text x={10} y={42} text={`ZONE: ${hoveredItem.position.toUpperCase()}`} fill="#718096" fontSize={9} />
            </Group>
          )}
        </Layer>
      </Stage>
    </div>
  );
}