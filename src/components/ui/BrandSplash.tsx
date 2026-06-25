import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColors, SPACING } from '../../theme';
import { KurdishSun, KilimBorder } from './KurdishDecorations';

/**
 * Branded loading screen shown during the brief hydrate gate (reading theme +
 * onboarding flags from AsyncStorage) so a cold start fades from the native
 * splash into the Newroz-sun emblem instead of a blank frame. Takes the active
 * palette so it already matches light/dark before the app content mounts.
 */
export default function BrandSplash({ colors: c }: { colors: ThemeColors }) {
  return (
    <View style={[styles.root, { backgroundColor: c.cream[50] }]}>
      <View style={styles.sun} pointerEvents="none">
        <KurdishSun size={96} color={c.fire[500]} />
      </View>
      <Text style={[styles.wordmark, { color: c.fire[600] }]}>Fêrbûn</Text>
      <View style={styles.kilim} pointerEvents="none">
        <KilimBorder width={72} color={c.fire[300]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sun: { marginBottom: SPACING.lg },
  wordmark: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  kilim: { marginTop: SPACING.md, opacity: 0.9 },
});
