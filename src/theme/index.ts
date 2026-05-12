// Fêrbûn — Kurdish Language Learning App
// Theme constants

export const COLORS = {
  // Newroz fire palette
  fire: {
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
  },
  // Kurdish green
  kurdish: {
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
  },
  // Warm cream background
  cream: {
    50: '#FFFDF7',
    100: '#FFF9EB',
    200: '#FFF3D6',
    300: '#FFEABD',
  },
  // Midnight dark tones
  midnight: {
    700: '#1E293B',
    800: '#0F172A',
    900: '#020617',
  },
  // Utility
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
  },
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
};

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

// Streak flame thresholds
export const STREAK_LEVELS = {
  CANDLE: { min: 0, max: 2, label: 'Candle', emoji: '🕯️' },
  SPARK: { min: 3, max: 6, label: 'Spark', emoji: '✨' },
  CAMPFIRE: { min: 7, max: 13, label: 'Campfire', emoji: '🔥' },
  BONFIRE: { min: 14, max: 29, label: 'Bonfire', emoji: '🔥' },
  NEWROZ: { min: 30, max: Infinity, label: 'Newroz Fire', emoji: '🎆' },
};

export const XP_PER_LESSON = 10;
export const XP_PER_PERFECT_LESSON = 15;
export const XP_PER_LEVEL = 100;
