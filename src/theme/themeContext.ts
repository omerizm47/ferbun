import { createContext, useContext } from 'react';
import { ThemeColors } from './index';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Scheme = 'light' | 'dark';

export interface ThemeContextValue {
  colors: ThemeColors;
  scheme: Scheme;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  hydrated: boolean;
}

/**
 * Theme context + hooks live in this leaf module (no UI imports) so decorative
 * components can read the palette via useTheme() without importing ThemeProvider
 * — which would import BrandSplash → KurdishDecorations and form a require cycle.
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}

/** Active colour palette for the current scheme. */
export function useColors(): ThemeColors {
  return useTheme().colors;
}
