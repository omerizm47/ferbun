import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../theme';
import { KilimDiamond } from './KurdishDecorations';

interface MotifTileProps {
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  color: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

/** Mix a 6-digit hex toward a target channel value by `amount` (0..1). */
function mix(hex: string, target: number, amount: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const c = (v: number) => Math.round(v + (target - v) * amount);
  return `rgb(${c(r)}, ${c(g)}, ${c(b)})`;
}
const lighten = (hex: string, amt: number) => mix(hex, 255, amt);
const darken = (hex: string, amt: number) => mix(hex, 0, amt);

/**
 * Premium, culturally-grounded icon tile. A tonally-graded colour panel with a
 * glassy inset edge, a soft inner glow behind the glyph, and an authentic
 * Kurdish kilim lozenge woven into the corner. Replaces flat icon circles so
 * content reads as crafted, not generic.
 */
export default function MotifTile({ icon, label, color, size = 56, style }: MotifTileProps) {
  const radius = Math.round(size * 0.32);
  return (
    <View style={[{ width: size, height: size, borderRadius: radius }, SHADOWS.md, style]}>
      <View style={[styles.inner, { borderRadius: radius }]}>
        {/* Tonal base — light corner to deep corner for real depth */}
        <LinearGradient
          colors={[lighten(color, 0.24), color, darken(color, 0.32)]}
          locations={[0, 0.5, 1]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Top sheen for a glassy highlight */}
        <LinearGradient
          colors={['rgba(255,255,255,0.30)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.62 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Soft glow centred behind the glyph */}
        <View style={[styles.glow, { width: size * 0.7, height: size * 0.7, borderRadius: size }]} pointerEvents="none" />
        {/* Kilim lozenge woven into the lower-right corner */}
        <View style={{ position: 'absolute', right: -size * 0.14, bottom: -size * 0.14 }} pointerEvents="none">
          <KilimDiamond size={size * 0.5} color="rgba(255,255,255,0.22)" />
        </View>
        {/* Glassy inset edge */}
        <View style={[styles.edge, { borderRadius: radius }]} pointerEvents="none" />
        <View style={styles.center}>
          {label != null ? (
            <Text style={[styles.label, { fontSize: Math.round(size * 0.42) }]} maxFontSizeMultiplier={1.2} numberOfLines={1}>{label}</Text>
          ) : icon ? (
            <Ionicons name={icon} size={Math.round(size * 0.4)} color={COLORS.white} style={styles.glyph} />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: { flex: 1, overflow: 'hidden' },
  glow: { position: 'absolute', alignSelf: 'center', top: '14%', backgroundColor: 'rgba(255,255,255,0.16)' },
  edge: { ...StyleSheet.absoluteFillObject, borderWidth: 1, borderColor: 'rgba(255,255,255,0.28)' },
  center: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  glyph: { textShadowColor: 'rgba(0,0,0,0.22)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  label: { color: COLORS.white, fontWeight: '800', textShadowColor: 'rgba(0,0,0,0.22)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
});
