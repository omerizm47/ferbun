import React, { useEffect } from 'react';
import Svg, { Circle, Path, G, Defs, RadialGradient, Stop, Line } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { COLORS } from '../../theme';

// Kurdish Sun — inspired by the Newroz/Rojava sun motif
export function KurdishSun({
  size = 80,
  color = COLORS.fire[500],
  animate = false,
}: {
  size?: number;
  color?: string;
  animate?: boolean;
}) {
  const r = size / 2;
  const innerR = r * 0.35;
  const rays = 21;

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 36000, // 36 seconds for a very slow, premium loop rotation
          easing: Easing.linear,
        }),
        -1, // infinite loop
        false // do not reverse direction
      );
    } else {
      rotation.value = 0;
    }
  }, [animate, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const svgContent = (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={COLORS.fire[300]} stopOpacity="1" />
          <Stop offset="100%" stopColor={color} stopOpacity="1" />
        </RadialGradient>
      </Defs>
      <Circle cx={r} cy={r} r={innerR} fill="url(#sunGrad)" />
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i * 360) / rays - 90;
        const rad = (angle * Math.PI) / 180;
        const x1 = r + Math.cos(rad) * (innerR + 2);
        const y1 = r + Math.sin(rad) * (innerR + 2);
        const x2 = r + Math.cos(rad) * (r - 4);
        const y2 = r + Math.sin(rad) * (r - 4);
        return (
          <Line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color}
            strokeWidth={i % 2 === 0 ? 2 : 1.2}
            strokeLinecap="round"
            opacity={i % 2 === 0 ? 1 : 0.5}
          />
        );
      })}
    </Svg>
  );

  return animate ? (
    <Animated.View style={animatedStyle}>{svgContent}</Animated.View>
  ) : (
    svgContent
  );
}

// Mountain silhouette — stylized Kurdish mountain range
export function MountainSilhouette({ width = 300, height = 60, color = COLORS.fire[100] }: { width?: number; height?: number; color?: string }) {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Path
        d={`M0 ${height} L${width * 0.12} ${height * 0.3} L${width * 0.22} ${height * 0.55} L${width * 0.35} ${height * 0.1} L${width * 0.48} ${height * 0.45} L${width * 0.58} ${height * 0.2} L${width * 0.72} ${height * 0.5} L${width * 0.82} ${height * 0.15} L${width * 0.92} ${height * 0.4} L${width} ${height * 0.25} L${width} ${height} Z`}
        fill={color}
        opacity={0.6}
      />
    </Svg>
  );
}

// Kilim-style border pattern — woven textile motif
export function KilimBorder({ width = 300, color = COLORS.fire[200] }: { width?: number; color?: string }) {
  const h = 12;
  const step = 16;
  const count = Math.floor(width / step);

  return (
    <Svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      {Array.from({ length: count }).map((_, i) => {
        const x = i * step + step / 2;
        return (
          <G key={i}>
            <Path
              d={`M${x} 0 L${x + step / 4} ${h / 2} L${x} ${h} L${x - step / 4} ${h / 2} Z`}
              fill={i % 2 === 0 ? color : 'transparent'}
              stroke={color}
              strokeWidth={1}
            />
          </G>
        );
      })}
    </Svg>
  );
}

// Kilim lozenge — the woven "eye/star" diamond motif of Kurdish textiles.
// Concentric diamonds with hooked points; used as a refined accent.
export function KilimDiamond({ size = 40, color = COLORS.fire[500] }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path d="M20 1 L39 20 L20 39 L1 20 Z" fill="none" stroke={color} strokeWidth={1.4} />
      <Path d="M2 14 L6 20 L2 26" fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M38 14 L34 20 L38 26" fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M20 9 L31 20 L20 31 L9 20 Z" fill="none" stroke={color} strokeWidth={1.4} />
      <Path d="M20 15.5 L24.5 20 L20 24.5 L15.5 20 Z" fill={color} />
    </Svg>
  );
}

// Decorative dot pattern — subtle background texture
export function DotPattern({ width = 100, height = 100, color = COLORS.fire[100], spacing = 20 }: { width?: number; height?: number; color?: string; spacing?: number }) {
  const cols = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <Circle
            key={`${row}-${col}`}
            cx={col * spacing + spacing / 2}
            cy={row * spacing + spacing / 2}
            r={1.5}
            fill={color}
            opacity={(row + col) % 3 === 0 ? 0.6 : 0.25}
          />
        ))
      )}
    </Svg>
  );
}

// Flame icon — custom Newroz flame (not a generic icon)
export function NewrozFlame({ size = 40, intensity = 1 }: { size?: number; intensity?: number }) {
  const colors = [COLORS.fire[300], COLORS.fire[500], COLORS.fire[700]];
  const c = intensity >= 3 ? colors[2] : intensity >= 2 ? colors[1] : colors[0];

  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        d="M20 4 C20 4 28 14 28 22 C28 27.5 24.4 32 20 32 C15.6 32 12 27.5 12 22 C12 14 20 4 20 4Z"
        fill={c}
        opacity={0.9}
      />
      <Path
        d="M20 12 C20 12 24 18 24 23 C24 26 22.2 28 20 28 C17.8 28 16 26 16 23 C16 18 20 12 20 12Z"
        fill={COLORS.fire[200]}
        opacity={0.7}
      />
      <Path
        d="M20 18 C20 18 22 21 22 23.5 C22 25 21.1 26 20 26 C18.9 26 18 25 18 23.5 C18 21 20 18 20 18Z"
        fill={COLORS.cream[100]}
        opacity={0.8}
      />
    </Svg>
  );
}
