import React from 'react';
import Svg, { Path, Circle, Polygon, Rect, G } from 'react-native-svg';

interface Props {
  /** Avatar id (kept stable for stored selections): sunny | flame | triangle | leaf | flower | star | heart | book */
  id: string;
  color: string;
  size?: number;
}

// Sun rays (Roj) generated around the disc.
function sunRays(color: string) {
  const rays = [];
  const cx = 24, cy = 24, ri = 10.5, ro = 22, hw = (9 * Math.PI) / 180;
  for (let i = 0; i < 8; i++) {
    const a = (i * 45 * Math.PI) / 180;
    const p1 = `${(cx + ri * Math.cos(a - hw)).toFixed(1)},${(cy + ri * Math.sin(a - hw)).toFixed(1)}`;
    const p2 = `${(cx + ro * Math.cos(a)).toFixed(1)},${(cy + ro * Math.sin(a)).toFixed(1)}`;
    const p3 = `${(cx + ri * Math.cos(a + hw)).toFixed(1)},${(cy + ri * Math.sin(a + hw)).toFixed(1)}`;
    rays.push(<Polygon key={i} points={`${p1} ${p2} ${p3}`} fill={color} />);
  }
  return rays;
}

/**
 * Original, culturally-grounded Kurdish avatar emblems drawn as SVG — the Roj
 * sun, Newroz fire, the mountains, wheat, the tulip (lale), the eight-point
 * star, a kilim heart, and the open book of learning. Replaces generic
 * icon-font glyphs so the avatar reads as crafted and Kurdish, not stock.
 */
export default function KurdishAvatar({ id, color, size = 32 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {renderEmblem(id, color)}
    </Svg>
  );
}

function renderEmblem(id: string, color: string) {
  switch (id) {
    case 'flame': // Newroz fire
      return (
        <Path
          d="M24 5 C30 13 33 17 33 26 C33 33 29 39 24 39 C19 39 15 33 15 26 C15 20 18.5 18 20 14.5 C21.5 17.5 22 19.5 24 19 C24.5 14 24 9 24 5 Z M24 23 C26.5 26 27.5 28 27.5 30.5 C27.5 34 25.5 36 24 36 C22.5 36 20.5 34 20.5 30.5 C20.5 27.5 22 26 24 23 Z"
          fill={color}
          fillRule="evenodd"
        />
      );
    case 'triangle': // Çiya — the mountains
      return <Path d="M3 40 L17 15 L24 27 L31 12 L45 40 Z" fill={color} />;
    case 'leaf': // Genim — wheat
      return (
        <G>
          <Path d="M23 43 L23 15 L25 15 L25 43 Z" fill={color} />
          {[
            { x: 24, y: 12, r: 0 },
            { x: 24, y: 18, r: -34 }, { x: 24, y: 18, r: 34 },
            { x: 24, y: 24, r: -36 }, { x: 24, y: 24, r: 36 },
            { x: 24, y: 30, r: -38 }, { x: 24, y: 30, r: 38 },
          ].map((g, i) => (
            <G key={i} transform={`translate(${g.x} ${g.y}) rotate(${g.r})`}>
              <Path d="M0 0 C2.6 -1.6 2.6 -7 0 -11 C-2.6 -7 -2.6 -1.6 0 0 Z" fill={color} />
            </G>
          ))}
        </G>
      );
    case 'flower': // Gul — the tulip (lale), a Newroz symbol
      return (
        <G>
          <Path d="M23 26 L23 42 L25 42 L25 26 Z" fill={color} />
          <Path d="M24 35 C20 32.5 15.5 33.5 13 37 C17.5 38 21.5 37.5 24 35 Z" fill={color} />
          <Path d="M24 35 C28 32.5 32.5 33.5 35 37 C30.5 38 26.5 37.5 24 35 Z" fill={color} />
          <Path d="M24 9 C22.5 9 21 10.5 20.5 12 C19.5 10.5 17 10.8 16 13 C14.5 17 17 24 24 28 C31 24 33.5 17 32 13 C31 10.8 28.5 10.5 27.5 12 C27 10.5 25.5 9 24 9 Z" fill={color} />
        </G>
      );
    case 'star': // Stêrk — eight-point star (two overlapping squares)
      return (
        <G>
          <Rect x={15} y={15} width={18} height={18} fill={color} />
          <Rect x={15} y={15} width={18} height={18} fill={color} transform="rotate(45 24 24)" />
        </G>
      );
    case 'heart': // Dil — heart with a kilim diamond
      return (
        <Path
          d="M24 40 C11 31 6.5 23 6.5 16.5 C6.5 11.5 10.5 8 15 8 C19 8 22.5 10.5 24 14 C25.5 10.5 29 8 33 8 C37.5 8 41.5 11.5 41.5 16.5 C41.5 23 37 31 24 40 Z M24 15 L28.5 19.5 L24 24 L19.5 19.5 Z"
          fill={color}
          fillRule="evenodd"
        />
      );
    case 'book': // Pirtûk — open book of learning
      return (
        <G>
          <Path d="M23 13 C18 10 12 9 7 10.5 L7 34 C12 32.8 18 33.5 23 36.5 Z" fill={color} />
          <Path d="M25 13 C30 10 36 9 41 10.5 L41 34 C36 32.8 30 33.5 25 36.5 Z" fill={color} />
          <Path d="M23 13 L23 36.5 L25 36.5 L25 13 Z" fill={color} />
        </G>
      );
    case 'sunny': // Roj — the Kurdish sun
    default:
      return (
        <G>
          {sunRays(color)}
          <Circle cx={24} cy={24} r={10.5} fill={color} />
        </G>
      );
  }
}
