import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, ThemeColors } from './index';
import BrandSplash from '../components/ui/BrandSplash';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Scheme = 'light' | 'dark';

const STORAGE_KEY = '@ferbun_theme';

interface ThemeContextValue {
  colors: ThemeColors;
  scheme: Scheme;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  hydrated: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * App-wide appearance provider. Resolves the active colour scheme from a
 * persisted mode (system / light / dark) plus the OS scheme, and exposes the
 * matching colour palette. Components read colours through useColors() so they
 * follow the active scheme. Preference is stored locally (no accounts).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const osScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setModeState(saved);
        }
      } catch {}
      setHydrated(true);
    })();
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    AsyncStorage.setItem(STORAGE_KEY, m).catch(() => {});
  }, []);

  const scheme: Scheme = mode === 'system' ? (osScheme === 'dark' ? 'dark' : 'light') : mode;
  const colors = scheme === 'dark' ? darkColors : lightColors;

  const value = useMemo<ThemeContextValue>(
    () => ({ colors, scheme, mode, setMode, hydrated }),
    [colors, scheme, mode, setMode, hydrated],
  );

  // Defer first paint until the saved mode is read so users who pinned light/dark
  // never see a one-frame flash of the opposite scheme on cold start. While the
  // flag loads we show the branded splash (on the resolved palette) rather than a
  // blank frame, bridging from the native splash to the app.
  return (
    <ThemeContext.Provider value={value}>
      {hydrated ? children : <BrandSplash colors={colors} />}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}

/** Active colour palette for the current scheme. */
export function useColors(): ThemeColors {
  return useTheme().colors;
}
