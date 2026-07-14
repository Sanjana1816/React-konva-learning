import React from 'react';
import { Path, Circle, Ellipse, Text, Line, Group, Rect } from 'react-konva';

const Helipad = ({ x, y, t }) => (<Group x={x} y={y}><Circle radius={38} stroke={t.metal} strokeWidth={1.5} dash={[6,4]} /><Circle radius={26} stroke={t.metal} strokeWidth={1} /><Text x={-8} y={-9} text="H" fontSize={20} fill={t.metal} fontStyle="bold" /><Line points={[-44,0,-28,0]} stroke={t.metal} strokeWidth={1.5} /><Line points={[28,0,44,0]} stroke={t.metal} strokeWidth={1.5} /><Line points={[0,-44,0,-28]} stroke={t.metal} strokeWidth={1.5} /><Line points={[0,28,0,44]} stroke={t.metal} strokeWidth={1.5} /></Group>);

const VLSBlock = ({ x, y, rows, cols, t }) => {
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push(<Rect key={`${r}-${c}`} x={x + c * 10} y={y + r * 10} width={8} height={8} fill={t.hullStroke} stroke={t.detail} strokeWidth={0.5} />);
  return <>{cells}</>;
};

const Bollard = ({ x, y, t }) => (<Group x={x} y={y}><Circle radius={3} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1} /><Circle radius={1.5} fill={t.hullStroke} /></Group>);

export default function ShipHull({ theme }) {
  const t = theme;
  return (
    <Group>
      <Path data="M 350 55 Q 400 75, 450 180 L 475 300 L 480 500 L 480 750 Q 480 830, 350 845 Q 220 830, 220 750 L 220 500 L 225 300 L 250 180 Q 300 75, 350 55 Z" fill={t.hull[0]} stroke={t.hullStroke} strokeWidth={4} shadowColor="rgba(0,0,0,0.5)" shadowBlur={20} shadowOffsetY={4} />
      <Path data="M 350 65 Q 398 83, 445 185 L 470 300 L 474 500 L 474 745 Q 474 822, 350 838 Q 226 822, 226 745 L 226 500 L 230 300 L 255 185 Q 302 83, 350 65 Z" fill={t.hull[1]} />
      <Path data="M 350 80 Q 395 96, 440 190 L 464 305 L 468 500 L 468 740 Q 468 815, 350 830 Q 232 815, 232 740 L 232 500 L 236 305 L 260 190 Q 305 96, 350 80 Z" fill={t.hull[2]} />
      <Line points={[260,200,440,200]} stroke={`${t.hullStroke}80`} strokeWidth={0.5} />
      <Line points={[240,300,460,300]} stroke={`${t.hullStroke}80`} strokeWidth={0.5} />
      <Line points={[233,400,467,400]} stroke={`${t.hullStroke}80`} strokeWidth={0.5} />
      <Line points={[230,500,470,500]} stroke={`${t.hullStroke}80`} strokeWidth={0.5} />
      <Line points={[230,600,470,600]} stroke={`${t.hullStroke}80`} strokeWidth={0.5} />
      <Line points={[232,700,468,700]} stroke={`${t.hullStroke}80`} strokeWidth={0.5} />
      <Line points={[350,85,350,830]} stroke={`${t.hullStroke}40`} strokeWidth={0.5} dash={[10,10]} />
      <Path data="M 350 65 L 385 145 L 315 145 Z" fill={t.detail} stroke={t.hullStroke} strokeWidth={1.5} />
      <Path data="M 350 75 L 375 135 L 325 135 Z" fill={t.detailAccent} stroke={t.hullStroke} strokeWidth={1} />
      <Line points={[335,90,305,165]} stroke={t.hullStroke} strokeWidth={2.5} />
      <Line points={[365,90,395,165]} stroke={t.hullStroke} strokeWidth={2.5} />
      <Ellipse x={303} y={168} radiusX={5} radiusY={3} fill={t.hullStroke} stroke={t.detail} strokeWidth={1} />
      <Ellipse x={397} y={168} radiusX={5} radiusY={3} fill={t.hullStroke} stroke={t.detail} strokeWidth={1} />
      <Circle x={350} y={140} radius={6} fill={t.detail} stroke={t.hullStroke} strokeWidth={1.5} />
      <Circle x={350} y={140} radius={3} fill={t.detailDark} />
      <Bollard x={310} y={155} t={t} /><Bollard x={390} y={155} t={t} /><Bollard x={295} y={178} t={t} /><Bollard x={405} y={178} t={t} />
      <Path data="M 275 190 Q 350 172, 425 190" stroke={t.detail} strokeWidth={4} fill="transparent" />
      <Path data="M 277 193 Q 350 175, 423 193" stroke={t.detailDark} strokeWidth={2} fill="transparent" />
      <Circle x={350} y={225} radius={30} fill={t.detail} stroke={t.hullStroke} strokeWidth={2} />
      <Circle x={350} y={225} radius={22} fill={t.detailAccent} stroke={t.hullStroke} strokeWidth={1.5} />
      <Circle x={350} y={225} radius={14} fill={t.hull[2]} stroke={t.hullStroke} strokeWidth={1} />
      <Circle x={350} y={225} radius={27} stroke={t.hullStroke} strokeWidth={0.5} dash={[3,3]} />
      <Rect x={345} y={185} width={10} height={35} fill={t.detail} stroke={t.hullStroke} strokeWidth={1} />
      <Rect x={343} y={182} width={14} height={5} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1} />
      <Rect x={290} y={270} width={120} height={50} fill={t.detail} stroke={t.hullStroke} strokeWidth={2} cornerRadius={2} />
      <VLSBlock x={296} y={275} rows={4} cols={5} t={t} /><VLSBlock x={352} y={275} rows={4} cols={5} t={t} />
      <Line points={[350,270,350,320]} stroke={t.hullStroke} strokeWidth={2} />
      <Rect x={275} y={340} width={150} height={95} fill={t.superstructure[0]} stroke={t.hullStroke} strokeWidth={2} cornerRadius={4} />
      <Rect x={288} y={350} width={124} height={68} fill={t.superstructure[1]} stroke={t.hullStroke} strokeWidth={1.5} cornerRadius={3} />
      <Rect x={293} y={345} width={114} height={9} fill={t.window} cornerRadius={2} />
      <Line points={[317,345,317,354]} stroke={t.hullStroke} strokeWidth={0.5} />
      <Line points={[340,345,340,354]} stroke={t.hullStroke} strokeWidth={0.5} />
      <Line points={[363,345,363,354]} stroke={t.hullStroke} strokeWidth={0.5} />
      <Line points={[386,345,386,354]} stroke={t.hullStroke} strokeWidth={0.5} />
      <Rect x={277} y={360} width={7} height={22} fill={t.window} cornerRadius={1} />
      <Rect x={416} y={360} width={7} height={22} fill={t.window} cornerRadius={1} />
      <Rect x={302} y={360} width={96} height={45} fill={t.superstructure[2]} stroke={t.hullStroke} strokeWidth={1} cornerRadius={2} />
      <Rect x={262} y={355} width={15} height={32} fill={t.hull[1]} stroke={t.hullStroke} strokeWidth={1} cornerRadius={2} />
      <Rect x={423} y={355} width={15} height={32} fill={t.hull[1]} stroke={t.hullStroke} strokeWidth={1} cornerRadius={2} />
      <Circle x={266} y={358} radius={2.5} fill="#ff4444" shadowColor="#ff4444" shadowBlur={4} />
      <Circle x={434} y={358} radius={2.5} fill="#44ff44" shadowColor="#44ff44" shadowBlur={4} />
      <Rect x={338} y={400} width={24} height={32} fill={t.hull[1]} stroke={t.hullStroke} strokeWidth={1.5} />
      <Line points={[350,405,350,428]} stroke={t.metal} strokeWidth={3} />
      <Line points={[336,412,364,412]} stroke={t.metal} strokeWidth={2} />
      <Line points={[334,420,366,420]} stroke={t.metal} strokeWidth={2} />
      <Rect x={320} y={407} width={12} height={16} fill={t.superstructure[2]} stroke={t.hullStroke} strokeWidth={1} />
      <Rect x={368} y={407} width={12} height={16} fill={t.superstructure[2]} stroke={t.hullStroke} strokeWidth={1} />
      <Line points={[344,405,340,394]} stroke={t.metal} strokeWidth={1} />
      <Line points={[356,405,360,394]} stroke={t.metal} strokeWidth={1} />
      <Rect x={295} y={445} width={110} height={38} fill={t.hull[1]} stroke={t.hullStroke} strokeWidth={2} cornerRadius={3} />
      <Rect x={305} y={450} width={30} height={28} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1.5} cornerRadius={2} />
      <Line points={[308,455,332,455]} stroke={t.window} strokeWidth={1.5} /><Line points={[308,459,332,459]} stroke={t.window} strokeWidth={1.5} /><Line points={[308,463,332,463]} stroke={t.window} strokeWidth={1.5} /><Line points={[308,467,332,467]} stroke={t.window} strokeWidth={1.5} />
      <Rect x={365} y={450} width={30} height={28} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1.5} cornerRadius={2} />
      <Line points={[368,455,392,455]} stroke={t.window} strokeWidth={1.5} /><Line points={[368,459,392,459]} stroke={t.window} strokeWidth={1.5} /><Line points={[368,463,392,463]} stroke={t.window} strokeWidth={1.5} /><Line points={[368,467,392,467]} stroke={t.window} strokeWidth={1.5} />
      <Rect x={340} y={453} width={20} height={22} fill={t.detail} stroke={t.hullStroke} strokeWidth={0.5} />
      <Rect x={226} y={485} width={40} height={20} fill={t.detail} stroke={t.hullStroke} strokeWidth={1.5} />
      <Path data="M 230 488 L 262 488 L 260 502 L 232 502 Z" fill={t.detailDark} stroke={t.hullStroke} strokeWidth={0.5} />
      <Line points={[246,485,242,476]} stroke={t.metal} strokeWidth={2} /><Line points={[242,476,230,476]} stroke={t.metal} strokeWidth={1.5} />
      <Rect x={434} y={485} width={40} height={20} fill={t.detail} stroke={t.hullStroke} strokeWidth={1.5} />
      <Path data="M 438 488 L 470 488 L 468 502 L 440 502 Z" fill={t.detailDark} stroke={t.hullStroke} strokeWidth={0.5} />
      <Line points={[454,485,458,476]} stroke={t.metal} strokeWidth={2} /><Line points={[458,476,470,476]} stroke={t.metal} strokeWidth={1.5} />
      <Group x={238} y={540} rotation={-15}><Rect width={32} height={6} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1} /><Rect y={8} width={32} height={6} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1} /><Rect y={16} width={32} height={6} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1} /><Rect x={-5} y={-2} width={7} height={24} fill={t.detail} stroke={t.hullStroke} strokeWidth={0.5} /></Group>
      <Group x={432} y={535} rotation={15}><Rect width={32} height={6} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1} /><Rect y={8} width={32} height={6} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1} /><Rect y={16} width={32} height={6} fill={t.detailDark} stroke={t.hullStroke} strokeWidth={1} /><Rect x={-5} y={-2} width={7} height={24} fill={t.detail} stroke={t.hullStroke} strokeWidth={0.5} /></Group>
      <Rect x={290} y={560} width={120} height={58} fill={t.superstructure[0]} stroke={t.hullStroke} strokeWidth={2} cornerRadius={3} />
      <Rect x={302} y={568} width={96} height={38} fill={t.superstructure[1]} stroke={t.hullStroke} strokeWidth={1} cornerRadius={2} />
      <Circle x={350} y={580} radius={14} fill={t.superstructure[2]} stroke={t.hullStroke} strokeWidth={1.5} />
      <Circle x={350} y={580} radius={7} fill={t.metal} stroke={t.hullStroke} strokeWidth={1} />
      <Circle x={350} y={580} radius={3} fill={t.metal} />
      <Rect x={343} y={600} width={14} height={20} fill={t.hull[1]} stroke={t.hullStroke} strokeWidth={1} />
      <Line points={[350,603,350,617]} stroke={t.metal} strokeWidth={2} /><Line points={[340,609,360,609]} stroke={t.metal} strokeWidth={1.5} />
      <Circle x={350} y={645} radius={18} fill={t.detail} stroke={t.hullStroke} strokeWidth={2} />
      <Circle x={350} y={645} radius={11} fill={t.detailAccent} stroke={t.hullStroke} strokeWidth={1.5} />
      <Circle x={350} y={645} radius={6} fill={t.hull[2]} stroke={t.hullStroke} strokeWidth={1} />
      <Rect x={347} y={623} width={6} height={18} fill={t.detail} stroke={t.hullStroke} strokeWidth={1} />
      <Rect x={326} y={672} width={48} height={20} fill={t.detail} stroke={t.hullStroke} strokeWidth={1.5} cornerRadius={2} />
      <Circle x={350} y={682} radius={7} fill={t.detailDark} stroke={t.detail} strokeWidth={1} /><Circle x={350} y={682} radius={3.5} fill={t.hullStroke} />
      <Rect x={305} y={700} width={18} height={18} fill={t.detail} stroke={t.hullStroke} strokeWidth={1} />
      <Line points={[305,700,323,718]} stroke={t.hullStroke} strokeWidth={0.5} /><Line points={[323,700,305,718]} stroke={t.hullStroke} strokeWidth={0.5} />
      <Rect x={377} y={700} width={18} height={18} fill={t.detail} stroke={t.hullStroke} strokeWidth={1} />
      <Line points={[377,700,395,718]} stroke={t.hullStroke} strokeWidth={0.5} /><Line points={[395,700,377,718]} stroke={t.hullStroke} strokeWidth={0.5} />
      <Rect x={290} y={730} width={120} height={34} fill={t.detailAccent} stroke={t.hullStroke} strokeWidth={2} cornerRadius={2} />
      <Rect x={316} y={732} width={30} height={30} fill={t.detail} stroke={t.hullStroke} strokeWidth={1} />
      <Rect x={354} y={732} width={30} height={30} fill={t.detail} stroke={t.hullStroke} strokeWidth={1} />
      <Line points={[350,735,350,759]} stroke={t.detailDark} strokeWidth={2} />
      <Path data="M 238 764 L 462 764 L 468 790 Q 468 822, 350 835 Q 232 822, 232 790 Z" fill={t.detailAccent} />
      <Path data="M 242 766 L 458 766 L 464 788 Q 464 818, 350 830 Q 236 818, 236 788 Z" stroke="#7a8a6d" strokeWidth={1.5} fill="transparent" dash={[8,4]} />
      <Helipad x={350} y={795} t={t} />
      <Bollard x={280} y={815} t={t} /><Bollard x={420} y={815} t={t} />
      <Circle x={245} y={820} radius={3} fill="#ff4444" shadowColor="#ff4444" shadowBlur={6} />
      <Circle x={455} y={820} radius={3} fill="#44ff44" shadowColor="#44ff44" shadowBlur={6} />
      <Circle x={350} y={840} radius={2.5} fill="#ffffff" shadowColor="#ffffff" shadowBlur={6} />
      <Text x={430} y={770} text="76" fontSize={24} fill={`${t.metal}50`} fontStyle="bold" />
    </Group>
  );
}