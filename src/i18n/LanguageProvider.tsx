import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang, UiStrings } from './types';
import { STRINGS } from './strings';
import { useColors } from '../theme/ThemeProvider';
import BrandSplash from '../components/ui/BrandSplash';

const STORAGE_KEY = '@ferbun_lang';

interface LanguageContextValue {
  /** Effective bridge language. Defaults to English until the user picks. */
  lang: Lang;
  /** True once the user has explicitly chosen a language (stored locally). */
  chosen: boolean;
  setLang: (l: Lang) => void;
  confirmLanguage: () => void;
  /** Active interface strings for the current language. */
  t: UiStrings;
  hydrated: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/**
 * App-wide bridge-language provider. Resolves the interface language from a
 * locally persisted choice (no accounts) and exposes the matching string
 * catalogue. Mirrors ThemeProvider and must sit inside it (it reads the active
 * palette for the hydrate-gate splash). The taught language stays Kurmanji.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const colors = useColors();
  const [lang, setLangState] = useState<Lang>('en');
  const [chosen, setChosen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'en' || saved === 'tr') {
          setLangState(saved);
          setChosen(true);
        }
      } catch {}
      setHydrated(true);
    })();
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => {});
  }, []);

  const confirmLanguage = useCallback(() => {
    setChosen(true);
  }, []);

  const t = STRINGS[lang];

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, chosen, setLang, confirmLanguage, t, hydrated }),
    [lang, chosen, setLang, confirmLanguage, t, hydrated],
  );

  // Defer first paint until the saved language is read so a returning user never
  // sees a flash of English before their Turkish loads. The branded splash (on
  // the already-resolved palette) bridges the brief gap.
  return (
    <LanguageContext.Provider value={value}>
      {hydrated ? children : <BrandSplash colors={colors} />}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
}

/** Active interface strings for the current bridge language. */
export function useT(): UiStrings {
  return useLang().t;
}
