import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Path, Circle, Text, Line, Group, Wedge, Rect } from 'react-konva';
import Konva from 'konva';

const backendData = [
  { id: 1, type: 'ldr', name: 'LDR Sensors', quantity: 100, position: 'front', x: 200, y: 150, color: '#00ffcc' },
  { id: 2, type: 'radar', name: 'Main Radar', quantity: 1, position: 'middle', x: 200, y: 380, color: '#33ff33' },
  { id: 3, type: 'weapon', name: 'Twin Turrets', quantity: 4, position: 'back', x: 200, y: 650, color: '#ffcc00' },
  { id: 4, type: 'camera', name: 'Port CCTV', quantity: 12, position: 'left', x: 100, y: 450, color: '#ff3366' },
  { id: 5, type: 'camera', name: 'Starboard CCTV', quantity: 12, position: 'right', x: 300, y: 450, color: '#ff3366' },
];


// 1. Radar (Spins 360 continuously)
const AnimatedRadar = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      ref.current.rotation((frame.time * 180) / 1000); // 180 degrees per second
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Group ref={ref}>
      <Circle radius={25} stroke={color} strokeWidth={1} opacity={0.4} dash={[4, 4]} />
      <Wedge radius={25} angle={60} fill={color} opacity={0.3} rotation={-30} />
      <Line points={[0, 0, 25, 0]} stroke={color} strokeWidth={2} />
    </Group>
  );
};

// 2. Weapon Turret (Sweeps back and forth looking for targets)
const AnimatedWeapon = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      // Sine wave creates a natural sweeping motion back and forth
      const angle = Math.sin(frame.time / 600) * 90; 
      ref.current.rotation(angle - 90); // Default facing up (-90deg)
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Group ref={ref}>
      <Circle radius={12} fill="#334155" stroke={color} strokeWidth={2} />
      <Rect x={5} y={-6} width={18} height={4} fill={color} />
      <Rect x={5} y={2} width={18} height={4} fill={color} />
    </Group>
  );
};

// 3. Camera/Sensor (Pans left and right casting a cone of vision)
const AnimatedCamera = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      const angle = Math.cos(frame.time / 400) * 45; 
      ref.current.rotation(angle);
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Group ref={ref}>
      <Wedge radius={35} angle={50} fill={color} opacity={0.15} rotation={-25} />
      <Rect x={-4} y={-4} width={8} height={8} fill={color} cornerRadius={2} />
    </Group>
  );
};

// 4. Default Pulse for simple sensors
const PulsingDot = ({ color }) => {
  return <Circle radius={10} fill={color} shadowColor={color} shadowBlur={15} />;
};


export default function App() {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Decides which animated icon to draw based on the backend 'type'
  const renderIcon = (item) => {
    switch (item.type) {
      case 'radar': return <AnimatedRadar color={item.color} />;
      case 'weapon': return <AnimatedWeapon color={item.color} />;
      case 'camera': return <AnimatedCamera color={item.color} />;
      default: return <PulsingDot color={item.color} />;
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stage width={400} height={850}>
        <Layer>
          
          {/* REALISTIC SHIP HULL (Outer contour) */}
          <Path
            x={0}
            y={50}
            data="M 200 0 Q 320 200, 320 400 L 320 700 Q 320 740, 200 750 Q 80 740, 80 700 L 80 400 Q 80 200, 200 0 Z"
            fill="#1e293b" 
            stroke="#38bdf8" 
            strokeWidth={3}
            shadowColor="#38bdf8"
            shadowBlur={20}
          />

          {/* INNER SHIP SUPERSTRUCTURE (The elevated deck) */}
          <Path
            x={0}
            y={50}
            data="M 200 80 L 270 250 L 270 650 L 130 650 L 130 250 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth={2}
          />

          {/* DYNAMIC ANIMATED SENSORS & WEAPONS */}
          {backendData.map((item) => (
            <Group 
              key={item.id} 
              x={item.x} 
              y={item.y}
              onMouseEnter={(e) => {
                e.target.getStage().container().style.cursor = 'crosshair';
                setHoveredItem(item);
              }}
              onMouseLeave={(e) => {
                e.target.getStage().container().style.cursor = 'default';
                setHoveredItem(null);
              }}
            >
              
              {/* Renders the specific animated component */}
              {renderIcon(item)}
              
              {/* Status Badge (Stays upright while the weapon rotates inside) */}
              <Circle x={15} y={-15} radius={10} fill="white" stroke="#0f172a" strokeWidth={2} />
              <Text x={item.quantity > 9 ? 9 : 12} y={-20} text={`${item.quantity}`} fontSize={10} fill="black" fontStyle="bold" />
            </Group>
          ))}

          {/* HIGH-TECH HOVER TOOLTIP */}
          {hoveredItem && (
            <Group x={hoveredItem.x + 30} y={hoveredItem.y - 50}>
              <Rect width={150} height={50} fill="rgba(255,255,255,0.95)" cornerRadius={5} shadowColor="cyan" shadowBlur={10} />
              <Text x={10} y={10} text={hoveredItem.name} fill="#0f172a" fontSize={14} fontStyle="bold" />
              <Text x={10} y={28} text={`SYS: ${hoveredItem.type.toUpperCase()} | QTY: ${hoveredItem.quantity}`} fill="#334155" fontSize={10} fontStyle="bold" />
            </Group>
          )}

        </Layer>
      </Stage>
    </div>
  );
}














import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Path, Circle, Text, Line, Group, Wedge, Rect } from 'react-konva';
import Konva from 'konva';

const backendData = [
  { id: 1, type: 'ldr', name: 'Forward Scanners', quantity: 10, position: 'front', x: 200, y: 150, color: '#00ffcc' },
  { id: 2, type: 'radar', name: 'Main Sensor Array', quantity: 1, position: 'middle', x: 200, y: 450, color: '#33ff33' },
  { id: 3, type: 'weapon', name: 'Port Turbolasers', quantity: 4, position: 'left', x: 130, y: 550, color: '#ff3366' },
  { id: 4, type: 'weapon', name: 'Starboard Turbolasers', quantity: 4, position: 'right', x: 270, y: 550, color: '#ff3366' },
  { id: 5, type: 'camera', name: 'Aft Engine Cameras', quantity: 3, position: 'back', x: 200, y: 730, color: '#ffcc00' },
];

// ANIMATED COMPONENTS 
const AnimatedRadar = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      ref.current.rotation((frame.time * 180) / 1000); 
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (
    <Group ref={ref}>
      <Circle radius={25} stroke={color} strokeWidth={1} opacity={0.4} dash={[4, 4]} />
      <Wedge radius={25} angle={60} fill={color} opacity={0.3} rotation={-30} />
      <Line points={[0, 0, 25, 0]} stroke={color} strokeWidth={2} />
    </Group>
  );
};

const AnimatedWeapon = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      const angle = Math.sin(frame.time / 600) * 90; 
      ref.current.rotation(angle - 90);
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (
    <Group ref={ref}>
      <Circle radius={12} fill="#1e293b" stroke={color} strokeWidth={2} />
      <Rect x={5} y={-6} width={18} height={4} fill={color} />
      <Rect x={5} y={2} width={18} height={4} fill={color} />
    </Group>
  );
};

const AnimatedCamera = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      const angle = Math.cos(frame.time / 400) * 45; 
      ref.current.rotation(angle + 90); // Aiming backwards
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, []);
  return (
    <Group ref={ref}>
      <Wedge radius={35} angle={50} fill={color} opacity={0.15} rotation={-25} />
      <Rect x={-4} y={-4} width={8} height={8} fill={color} cornerRadius={2} />
    </Group>
  );
};

const PulsingDot = ({ color }) => {
  return <Circle radius={10} fill={color} shadowColor={color} shadowBlur={15} />;
};


// main app
export default function App() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const renderIcon = (item) => {
    switch (item.type) {
      case 'radar': return <AnimatedRadar color={item.color} />;
      case 'weapon': return <AnimatedWeapon color={item.color} />;
      case 'camera': return <AnimatedCamera color={item.color} />;
      default: return <PulsingDot color={item.color} />;
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stage width={400} height={850}>
        <Layer>
          
          {/* ship structure */}
          
          {/* 1. Main Outer Hull (The massive triangle) */}
          <Path
            data="M 200 50 L 370 720 L 230 720 L 230 700 L 170 700 L 170 720 L 30 720 Z"
            fill="#334155" 
            stroke="#1e293b" 
            strokeWidth={4}
            shadowColor="#0ea5e9" // Slight blue engine/shield glow
            shadowBlur={30}
          />

          {/* 2. The Trench (Darker inner rim) */}
          <Path
            data="M 200 70 L 350 700 L 230 700 L 200 680 L 170 700 L 50 700 Z"
            fill="#1e293b" 
          />

          {/* 3. Base Superstructure (The terraced city at the back) */}
          <Path
            data="M 200 250 L 290 680 L 110 680 Z"
            fill="#475569"
            stroke="#0f172a"
            strokeWidth={2}
          />

          {/* 4. Second Terrace Layer */}
          <Path
            data="M 200 350 L 250 660 L 150 660 Z"
            fill="#64748b"
            stroke="#0f172a"
            strokeWidth={2}
          />

          {/* 5. The Command Bridge Neck */}
          <Rect x={185} y={630} width={30} height={30} fill="#475569" stroke="#0f172a" strokeWidth={2} />

          {/* 6. The Command Bridge Head */}
          <Rect x={140} y={600} width={120} height={30} fill="#94a3b8" stroke="#0f172a" strokeWidth={2} />

          {/* 7. Shield Generator Domes (The two balls on top of the bridge) */}
          <Circle x={160} y={590} radius={8} fill="#cbd5e1" stroke="#0f172a" strokeWidth={2} />
          <Circle x={240} y={590} radius={8} fill="#cbd5e1" stroke="#0f172a" strokeWidth={2} />

          {/* --- END OF ship --- */}


          {/* DYNAMIC ANIMATED SENSORS & WEAPONS */}
          {backendData.map((item) => (
            <Group 
              key={item.id} 
              x={item.x} 
              y={item.y}
              onMouseEnter={(e) => {
                e.target.getStage().container().style.cursor = 'crosshair';
                setHoveredItem(item);
              }}
              onMouseLeave={(e) => {
                e.target.getStage().container().style.cursor = 'default';
                setHoveredItem(null);
              }}
            >
              {renderIcon(item)}
              
              <Circle x={15} y={-15} radius={10} fill="white" stroke="#0f172a" strokeWidth={2} />
              <Text x={item.quantity > 9 ? 9 : 12} y={-20} text={`${item.quantity}`} fontSize={10} fill="black" fontStyle="bold" />
            </Group>
          ))}

                    {/* HOVER TOOLTIP */}
          {hoveredItem && (
            <Group 
              x={hoveredItem.x > 200 ? hoveredItem.x - 220 : hoveredItem.x + 30} 
              y={hoveredItem.y - 50}
            >
              <Rect width={200} height={50} fill="rgba(255,255,255,0.95)" cornerRadius={5} shadowColor="cyan" shadowBlur={10} />
              <Text x={10} y={10} text={hoveredItem.name} fill="#0f172a" fontSize={14} fontStyle="bold" />
              <Text x={10} y={28} text={`SYS: ${hoveredItem.type.toUpperCase()} | QTY: ${hoveredItem.quantity}`} fill="#334155" fontSize={10} fontStyle="bold" />
            </Group>
          )}

        </Layer>
      </Stage>
    </div>
  );
}