import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export type TabIconName = 'learn' | 'words' | 'stories' | 'profile';

interface Props {
  name: TabIconName;
  color: string;
  size?: number;
}

/**
 * Original, cohesive tab-bar glyph set drawn in one unified filled style so all
 * four tabs read as a crafted family rather than stock icons:
 *  - learn   → Roj, the Kurdish sun (the app's brand emblem)
 *  - words   → an open book (Pirtûk)
 *  - stories → a rolled scroll (Çîrok — tales & heritage)
 *  - profile → a head-and-shoulders bust
 * Each is a single-colour silhouette: pure white on the active ember tile,
 * muted grey when inactive. Shapes share weight, rounding and optical size.
 */
export default function TabIcon({ name, color, size = 24 }: Props) {
  switch (name) {
    case 'words':
      return <BookGlyph color={color} size={size} />;
    case 'stories':
      return <ScrollGlyph color={color} size={size} />;
    case 'profile':
      return <BustGlyph color={color} size={size} />;
    case 'learn':
    default:
      return <SunGlyph color={color} size={size} />;
  }
}

function SunGlyph({ color, size }: { color: string; size: number }) {
  const cx = 12;
  const cy = 12;
  const rays = 8;
  const base = 5.7; // ray base radius (just outside the disc)
  const tip = 9.5; // ray tip radius
  const halfBase = 1.45;
  const tri = Array.from({ length: rays })
    .map((_, i) => {
      const a = (i * 360) / rays - 90;
      const rad = (a * Math.PI) / 180;
      const perp = rad + Math.PI / 2;
      const tx = cx + Math.cos(rad) * tip;
      const ty = cy + Math.sin(rad) * tip;
      const b1x = cx + Math.cos(rad) * base + Math.cos(perp) * halfBase;
      const b1y = cy + Math.sin(rad) * base + Math.sin(perp) * halfBase;
      const b2x = cx + Math.cos(rad) * base - Math.cos(perp) * halfBase;
      const b2y = cy + Math.sin(rad) * base - Math.sin(perp) * halfBase;
      return `M${tx.toFixed(2)} ${ty.toFixed(2)} L${b1x.toFixed(2)} ${b1y.toFixed(2)} L${b2x.toFixed(2)} ${b2y.toFixed(2)} Z`;
    })
    .join(' ');
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={tri} fill={color} />
      <Circle cx={cx} cy={cy} r={4.3} fill={color} />
    </Svg>
  );
}

function BookGlyph({ color, size }: { color: string; size: number }) {
  // Two pages fanning from a centre spine (1.2px gap reveals the tile colour).
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M11.4 7.1 C9 5.85, 5.7 5.55, 3.6 6.05 C3.25 6.13, 3 6.45, 3 6.8 L3 17.05 C3 17.45, 3.35 17.78, 3.75 17.7 C5.8 17.3, 9 17.5, 11.4 18.6 Z"
        fill={color}
      />
      <Path
        d="M12.6 7.1 C15 5.85, 18.3 5.55, 20.4 6.05 C20.75 6.13, 21 6.45, 21 6.8 L21 17.05 C21 17.45, 20.65 17.78, 20.25 17.7 C18.2 17.3, 15 17.5, 12.6 18.6 Z"
        fill={color}
      />
    </Svg>
  );
}

function ScrollGlyph({ color, size }: { color: string; size: number }) {
  // Rolled parchment: pill-shaped rolls top & bottom overhang the sheet body.
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={6.7} y={5.5} width={10.6} height={13} fill={color} />
      <Rect x={4.8} y={4} width={14.4} height={3} rx={1.5} fill={color} />
      <Rect x={4.8} y={17} width={14.4} height={3} rx={1.5} fill={color} />
    </Svg>
  );
}

function BustGlyph({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={8} r={3.8} fill={color} />
      <Path
        d="M4.8 19.6 C4.8 15.4, 8 12.9, 12 12.9 C16 12.9, 19.2 15.4, 19.2 19.6 Z"
        fill={color}
      />
    </Svg>
  );
}
