import React, { useMemo } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useLang } from '../../i18n/LanguageProvider';

/**
 * Drop-in replacement for <Text> whose string content is shown in UPPERCASE
 * using locale-correct casing. Avoids CSS `textTransform: 'uppercase'`, which
 * uppercases with English rules and turns Turkish "Dil" into "DIL" instead of
 * the correct "DİL" (the dotted capital İ). Hermes' toLocaleUpperCase is not
 * reliably locale-aware, so Turkish is handled explicitly: i → İ, ı → I.
 */
function upperFor(lang: string): (s: string) => string {
  if (lang === 'tr') {
    return (s) => s.replace(/i/g, 'İ').replace(/ı/g, 'I').toUpperCase();
  }
  return (s) => s.toUpperCase();
}

function transform(node: React.ReactNode, up: (s: string) => string): React.ReactNode {
  if (typeof node === 'string') return up(node);
  if (typeof node === 'number') return node;
  if (Array.isArray(node)) return node.map((n) => transform(n, up));
  return node;
}

const NEUTRALIZE: TextStyle = { textTransform: 'none' };

/**
 * Hook returning a locale-correct uppercase function for the active language.
 * Use for cases where <UpperText> can't be dropped in (e.g. Animated.Text);
 * pair it with `textTransform: 'none'` on the style to avoid double-casing.
 */
export function useUpper(): (s: string) => string {
  const { lang } = useLang();
  return useMemo(() => upperFor(lang), [lang]);
}

export default function UpperText({ children, style, ...rest }: TextProps) {
  const { lang } = useLang();
  const up = useMemo(() => upperFor(lang), [lang]);
  return (
    <Text {...rest} style={[style, NEUTRALIZE]}>
      {transform(children, up)}
    </Text>
  );
}
