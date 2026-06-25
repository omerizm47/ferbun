// Fêrbûn — Kurdish Language Learning App
// Theme constants

import { Platform, ViewStyle, TextStyle } from 'react-native';

// --- Constant brand accent scales (identical in light & dark) ---
const fire = {
  50: '#FFF8F0',
  100: '#FFECD4',
  200: '#FFD5A8',
  300: '#FFB86C',
  400: '#FF9A3C',
  500: '#FF7A15',
  600: '#E85D00',
  700: '#C44B00',
  800: '#9A3B00',
  900: '#7A2F00',
};
const kurdish = {
  50: '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
};

// Light palette — values are EXACTLY the historical theme, so light mode is
// pixel-identical. Migrated components read this through useColors().
export const lightColors = {
  fire,
  kurdish,
  // Warm cream background
  cream: {
    50: '#FFFDF7',
    100: '#FFF9EB',
    200: '#FFF3D6',
    300: '#FFEABD',
  },
  // Midnight dark tones — primary text in light mode
  midnight: {
    700: '#1E293B',
    800: '#0F172A',
    900: '#020617',
  },
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
  },
  success: '#22C55E',
  successBg: '#F0FDF4',
  successBorder: '#BBF7D0',
  error: '#EF4444',
  errorBg: '#FEF2F2',
  errorBorder: '#FECACA',
  warning: '#F59E0B',
  // Semantic on-surface tokens (per-theme; light values match the historical look).
  successText: '#15803D',    // correct-answer value text (was kurdish[700])
  successTextDim: '#16A34A',  // correct-answer label text (was kurdish[600])
  hairline: 'rgba(0,0,0,0.12)', // drag handles / dividers on surfaces
  tintSoft: 'rgba(0,0,0,0.04)', // very subtle fills (e.g. explanation box)
  lockedBg: '#FAFAFA',        // disabled / locked card surface
  // Soft accent fills for selected/active chips. Pale in light (== fire[50]/
  // fire[100]/kurdish[50]/kurdish[200]); deep charcoal-tints in dark so chips
  // don't glow near-white on dark cards.
  fireSoft: '#FFF8F0',
  fireSoftBorder: '#FFECD4',
  kurdishSoft: '#F0FDF4',
  kurdishSoftBorder: '#BBF7D0',
};

export type ThemeColors = typeof lightColors;

// Warm-charcoal dark palette — same shape, semantic remap. Brand accents
// (fire/kurdish) stay constant; cream→charcoal surfaces, gray ramp inverts so
// gray[50] becomes a dim surface and gray[700] becomes near-white text, and
// midnight tones flip to warm off-whites for primary text.
export const darkColors: ThemeColors = {
  fire,
  kurdish,
  cream: {
    50: '#16130F', // deepest screen background
    100: '#221E1A',
    200: '#2C2722',
    300: '#363029',
  },
  midnight: {
    700: '#D8D0C5',
    800: '#F5EFE7', // primary text
    900: '#FFFFFF',
  },
  white: '#221E1A', // card / surface
  black: '#000000',
  gray: {
    50: '#221E1A', // dim surface
    100: '#332E28', // hairline border
    200: '#3F392F', // border
    300: '#6B6357', // faint text / icons
    400: '#8A8175', // muted text
    500: '#A39A8C', // secondary text
    600: '#C9C0B5', // body text
    700: '#E5E0D8', // strong text
  },
  success: '#34D399',
  successBg: '#16251C',
  successBorder: '#1F5135',
  error: '#F87171',
  errorBg: '#2A1715',
  errorBorder: '#5B2620',
  warning: '#FBBF24',
  // Semantic on-surface tokens tuned for legibility on charcoal.
  successText: '#86EFAC',     // bright mint — correct value on dark successBg
  successTextDim: '#4ADE80',  // mid mint — correct label
  hairline: 'rgba(255,255,255,0.16)',
  tintSoft: 'rgba(255,255,255,0.06)',
  lockedBg: '#1B1814',        // dim locked surface just above the background
  fireSoft: '#2A1E12',        // warm amber-charcoal chip fill
  fireSoftBorder: '#4A3520',  // dim ember chip border
  kurdishSoft: '#172A1E',     // deep green-charcoal chip fill
  kurdishSoftBorder: '#2C4A38', // dim green chip border
};

// Back-compat: COLORS is the light palette. Components that haven't migrated to
// useColors() keep compiling and render light. Do NOT add new usages — prefer
// useColors() so the value follows the active scheme.
export const COLORS = lightColors;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
};

// Cross-platform elevation tokens — keeps iOS shadow* and Android elevation in sync.
export const SHADOWS: Record<'sm' | 'md' | 'lg', ViewStyle> = {
  sm: Platform.select({
    ios: { shadowColor: COLORS.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
    android: { elevation: 2 },
    default: {},
  }) as ViewStyle,
  md: Platform.select({
    ios: { shadowColor: COLORS.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
    android: { elevation: 5 },
    default: {},
  }) as ViewStyle,
  lg: Platform.select({
    ios: { shadowColor: COLORS.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.14, shadowRadius: 20 },
    android: { elevation: 10 },
    default: {},
  }) as ViewStyle,
};

// Typography presets (size + weight + spacing). Pair with a color at the call site.
export const TYPOGRAPHY = {
  display: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 } as TextStyle,
  title: { fontSize: FONT_SIZE.xxl, fontWeight: '800', letterSpacing: -0.3 } as TextStyle,
  heading: { fontSize: FONT_SIZE.lg, fontWeight: '700' } as TextStyle,
  body: { fontSize: FONT_SIZE.md, fontWeight: '500', lineHeight: 24 } as TextStyle,
  label: { fontSize: FONT_SIZE.sm, fontWeight: '600' } as TextStyle,
  caption: { fontSize: FONT_SIZE.xs, fontWeight: '500' } as TextStyle,
  // Uppercase eyebrow above a heading/prompt (e.g. "HILBIJÊRE · CHOOSE"). The
  // app's signature kicker — unify the ~12 hand-rolled variants on this.
  kicker: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5 } as TextStyle,
  // Quieter section eyebrow (Profile-style "APPEARANCE", field labels).
  section: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 } as TextStyle,
  overline: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2 } as TextStyle,
};

// Streak flame thresholds
export const STREAK_LEVELS = {
  CANDLE: { min: 0, max: 2, label: 'Candle' },
  SPARK: { min: 3, max: 6, label: 'Spark' },
  CAMPFIRE: { min: 7, max: 13, label: 'Campfire' },
  BONFIRE: { min: 14, max: 29, label: 'Bonfire' },
  NEWROZ: { min: 30, max: Infinity, label: 'Newroz Fire' },
};

export const XP_PER_LESSON = 10;
export const XP_PER_PERFECT_LESSON = 15;
export const XP_PER_LEVEL = 100;

// Daily XP goal presets (Profile picker). A lesson awards ~10 XP, so 50 is a
// gentle "five lessons" default and 200 is a committed pace.
export const DAILY_GOAL_OPTIONS = [50, 100, 150, 200] as const;
export const DEFAULT_DAILY_GOAL_XP = 50;

// Reminder time presets (local hour, 24h). Preset chips keep the control
// pixel-identical on iOS and Android — no native date-picker divergence.
export const REMINDER_TIME_OPTIONS: { hour: number; label: string }[] = [
  { hour: 8, label: '08:00' },
  { hour: 12, label: '12:00' },
  { hour: 18, label: '18:00' },
  { hour: 21, label: '21:00' },
];
export const DEFAULT_REMINDER_HOUR = 18;
