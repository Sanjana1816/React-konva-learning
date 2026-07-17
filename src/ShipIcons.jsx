import React, { useState, useEffect, useRef } from 'react';
import { Image as KonvaImage, Group } from 'react-konva';
import Konva from 'konva';
import { ICON_SVGS, ICON_PNGS } from './config.js';

function IconImage({ src, size = 30 }) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setImg(image);
    image.onerror = () => setImg(null);
    image.src = src;
  }, [src]);
  if (!img) return null;
  return <KonvaImage image={img} x={-size / 2} y={-size / 2} width={size} height={size} />;
}

function AnimatedIcon({ src, animation, size = 30 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const anim = new Konva.Animation((frame) => {
      if (!ref.current) return;
      if (animation === 'spin') ref.current.rotation((frame.time * 120) / 1000);
      if (animation === 'sweep') ref.current.rotation(Math.sin(frame.time / 600) * 80);
    }, ref.current.getLayer());
    anim.start();
    return () => anim.stop();
  }, [animation]);
  return (
    <Group ref={ref}>
      <IconImage src={src} size={size} />
    </Group>
  );
}

export function getIconSrc(subtype, iconMode) {
  if (iconMode === 'png' && ICON_PNGS[subtype]) {
    return ICON_PNGS[subtype];
  }
  return ICON_SVGS[subtype] || ICON_SVGS['navigational_radar'];
}

// export function renderIcon(subtype) {
//   const src = ICON_SVGS[subtype] || ICON_SVGS['navigational_radar'];
//   switch (subtype) {
//     case 'navigational_radar':
//       return <AnimatedIcon src={ICON_SVGS[subtype]} animation="spin" />;
//     case 'tracking_radar':
//       return <AnimatedIcon src={ICON_SVGS[subtype]} animation="sweep" />;
//     default:
//       return <IconImage src={src} />;
//   }
// }

export function renderIcon(subtype, size) {
  const src = ICON_SVGS[subtype] || ICON_SVGS['navigational_radar'];
  const s = size || 30;
  switch (subtype) {
    case 'navigational_radar':
      return <AnimatedIcon src={ICON_SVGS[subtype]} animation="spin" size={s} />;
    case 'tracking_radar':
      return <AnimatedIcon src={ICON_SVGS[subtype]} animation="sweep" size={s} />;
    default:
      return <IconImage src={src} size={s} />;
  }
}