import React, { useState, useEffect, useRef } from 'react';
import { Image as KonvaImage, Group } from 'react-konva';
import Konva from 'konva';
import { ICON_SVGS } from './config.js';

function IconImage({ type, size = 30 }) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setImg(image);
    image.src = ICON_SVGS[type];
  }, [type]);
  if (!img) return null;
  return <KonvaImage image={img} x={-size / 2} y={-size / 2} width={size} height={size} />;
}

function AnimatedIconImage({ type, animation, size = 30 }) {
  const ref = useRef(null);
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      if (!ref.current) return;
      if (animation === 'spin') ref.current.rotation((frame.time * 120) / 1000);
      if (animation === 'sweep') ref.current.rotation(Math.sin(frame.time / 600) * 80);
    }, ref.current?.getLayer());
    anim.start();
    return () => anim.stop();
  }, [animation]);
  return (
    <Group ref={ref}>
      <IconImage type={type} size={size} />
    </Group>
  );
}

export function renderIcon(type) {
  switch (type) {
    case 'navigational_radar':
      return <AnimatedIconImage type={type} animation="spin" />;
    case 'tracking_radar':
      return <AnimatedIconImage type={type} animation="sweep" />;
    default:
      return <IconImage type={type} />;
  }
}