import React, { useEffect } from 'react';
import Svg, { Circle, Path, G, Defs, RadialGradient, Stop, Line, LinearGradient } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { COLORS } from '../../theme';
import { useTheme } from '../../theme/themeContext';

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
export function KilimBorder({ width = 300, color }: { width?: number; color?: string }) {
  const { colors: c, scheme } = useTheme();
  const baseColor = color ?? (scheme === 'dark' ? c.fire[700] : c.fire[200]);
  const h = 12;
  const step = 16;
  const count = Math.floor(width / step);

  return (
    <Svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      <Defs>
        <LinearGradient id="kilimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={scheme === 'dark' ? '#C92A39' : baseColor} />
          <Stop offset="50%" stopColor={scheme === 'dark' ? '#E85D00' : baseColor} />
          <Stop offset="100%" stopColor={scheme === 'dark' ? '#C92A39' : baseColor} />
        </LinearGradient>
      </Defs>
      {Array.from({ length: count }).map((_, i) => {
        const x = i * step + step / 2;
        return (
          <G key={i}>
            <Path
              d={`M${x} 0 L${x + step / 4} ${h / 2} L${x} ${h} L${x - step / 4} ${h / 2} Z`}
              fill={i % 2 === 0 ? "url(#kilimGrad)" : 'transparent'}
              stroke={baseColor}
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
export function KilimDiamond({ size = 40, color }: { size?: number; color?: string }) {
  const { colors: c, scheme } = useTheme();
  const baseColor = color ?? (scheme === 'dark' ? c.fire[600] : c.fire[500]);

  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Defs>
        <LinearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={scheme === 'dark' ? '#FF9A3C' : baseColor} />
          <Stop offset="50%" stopColor={scheme === 'dark' ? '#E85D00' : baseColor} />
          <Stop offset="100%" stopColor={scheme === 'dark' ? '#C92A39' : baseColor} />
        </LinearGradient>
      </Defs>
      <Path d="M20 1 L39 20 L20 39 L1 20 Z" fill="none" stroke={baseColor} strokeWidth={1.4} />
      <Path d="M2 14 L6 20 L2 26" fill="none" stroke={baseColor} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M38 14 L34 20 L38 26" fill="none" stroke={baseColor} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M20 9 L31 20 L20 31 L9 20 Z" fill="none" stroke="url(#diamondGrad)" strokeWidth={1.4} />
      <Path d="M20 15.5 L24.5 20 L20 24.5 L15.5 20 Z" fill="url(#diamondGrad)" />
    </Svg>
  );
}

// Decorative dot pattern — subtle background texture
export function DotPattern({ width = 100, height = 100, color = COLORS.fire[100], spacing = 20 }: { width?: number; height?: number; color?: string; spacing?: number }) {
  const cols = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: rows }).map((_, row) => (
        <G key={`row-${row}`}>
          {Array.from({ length: cols }).map((_, col) => (
            <Circle
              key={`${row}-${col}`}
              cx={col * spacing + spacing / 2}
              cy={row * spacing + spacing / 2}
              r={1.5}
              fill={color}
              opacity={(row + col) % 3 === 0 ? 0.6 : 0.25}
            />
          ))}
        </G>
      ))}
    </Svg>
  );
}

// Flame icon — custom Newroz flame (not a generic icon) with subtle pulse & sway animations
export function NewrozFlame({
  size = 40,
  intensity = 1,
  animate = true,
}: {
  size?: number;
  intensity?: number;
  animate?: boolean;
}) {
  const colors = [COLORS.fire[300], COLORS.fire[500], COLORS.fire[700]];
  const c = intensity >= 3 ? colors[2] : intensity >= 2 ? colors[1] : colors[0];

  const pulse = useSharedValue(0);
  const sway = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      pulse.value = withRepeat(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
        -1,
        true
      );
      sway.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      );
    } else {
      pulse.value = 0;
      sway.value = 0;
    }
  }, [animate, pulse, sway]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!animate) return {};
    const s = 0.94 + pulse.value * 0.12; // scale between 0.94 and 1.06
    const r = -4 + sway.value * 8; // sway between -4 and 4 degrees
    return {
      transform: [
        { scale: s },
        { rotate: `${r}deg` },
      ],
    };
  });

  const svgContent = (
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

  return animate ? (
    <Animated.View style={animatedStyle}>{svgContent}</Animated.View>
  ) : (
    svgContent
  );
}

export function KurdishHorn({ size = 40, color = COLORS.fire[500] }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        d="M20 30 L20 16 C20 10 13 8 8 13 C3 18 8 25 13 20 L16 17 M20 16 C20 10 27 8 32 13 C37 18 32 25 27 20 L24 17"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8" cy="13" r="1.5" fill={color} />
      <Circle cx="32" cy="13" r="1.5" fill={color} />
    </Svg>
  );
}

export function KurdishSahmaran({ size = 40, color = COLORS.fire[500] }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        d="M20 6 L25 14 L33 14 L28 21 L31 29 L20 25 L9 29 L12 21 L7 14 L15 14 Z"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 16 C16 18 16 26 20 28 C24 26 24 18 20 16"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />
      <Circle cx="20" cy="22" r="2.5" fill={color} />
      <Circle cx="20" cy="9" r="1.5" fill={color} />
      <Circle cx="9" cy="14" r="1.5" fill={color} />
      <Circle cx="31" cy="14" r="1.5" fill={color} />
    </Svg>
  );
}

export function KurdishTreeOfLife({ size = 40, color = COLORS.fire[500] }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        d="M20 34 L20 8 M20 26 L28 18 M20 26 L12 18 M20 20 L30 10 M20 20 L10 10 M20 14 L26 8 M20 14 L14 8"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx="20" cy="8" r="2" fill={color} />
      <Circle cx="28" cy="18" r="1.5" fill={color} />
      <Circle cx="12" cy="18" r="1.5" fill={color} />
      <Circle cx="30" cy="10" r="1.5" fill={color} />
      <Circle cx="10" cy="10" r="1.5" fill={color} />
      <Circle cx="26" cy="8" r="1.5" fill={color} />
      <Circle cx="14" cy="8" r="1.5" fill={color} />
    </Svg>
  );
}

export function KurdishEagle({ size = 40, color = COLORS.fire[500] }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        d="M20 28 L12 24 L6 16 L12 16 L8 10 L20 14 M20 28 L28 24 L34 16 L28 16 L32 10 L20 14"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 14 L20 34 M17 32 H23 M17 34 H23"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />
      <Circle cx="13" cy="12" r="1.5" fill={color} />
      <Circle cx="27" cy="12" r="1.5" fill={color} />
    </Svg>
  );
}

export function KurdishKilimChest({ size = 40, color = COLORS.fire[500] }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        d="M6 10 H34 V30 H6 Z M12 15 H28 V25 H12 Z"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M2 15 H6 M2 25 H6 M38 15 H34 M38 25 H34 M20 10 V30 M6 20 H34"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
