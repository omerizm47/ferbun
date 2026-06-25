import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { KilimDiamond } from './KurdishDecorations';
import TabIcon, { TabIconName } from './TabIcons';
import { useT } from '../../i18n/LanguageProvider';
import { haptics } from '../../utils/haptics';

const TAB_META: Record<string, { icon: TabIconName; key: 'learn' | 'words' | 'stories' | 'profile' }> = {
  Home: { icon: 'learn', key: 'learn' },
  Vocab: { icon: 'words', key: 'words' },
  Stories: { icon: 'stories', key: 'stories' },
  Profile: { icon: 'profile', key: 'profile' },
};

/**
 * Crafted bottom navigation. The active tab lifts into an ember-gradient tile
 * (the app's signature) with a tiny kilim diamond above it, while inactive tabs
 * stay quiet gray outlines — so the bar reads as a premium, on-brand surface
 * rather than a flat default bar.
 */
export default function CraftedTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const c = useColors();
  const t = useT();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + 8, height: 68 + insets.bottom }]}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const meta = TAB_META[route.name] ?? { icon: 'learn' as TabIconName, key: 'learn' as const };
          const label = t.tabs[meta.key];

          const onPress = () => {
            haptics.selection();
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          return (
            <Pressable
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              hitSlop={6}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={label}
              accessibilityHint={focused ? undefined : t.tabs.hint(label)}
            >
              <View style={styles.diamondSlot}>
                {focused && <KilimDiamond size={10} color={c.fire[500]} />}
              </View>
              {focused ? (
                <LinearGradient
                  colors={[c.fire[400], c.fire[600]]}
                  start={{ x: 0.1, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={[styles.tile, styles.tileActive]}
                >
                  <TabIcon name={meta.icon} size={22} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={styles.tile}>
                  <TabIcon name={meta.icon} size={22} color={c.gray[400]} />
                </View>
              )}
              <Text style={[styles.label, focused && styles.labelActive]} numberOfLines={1} maxFontSizeMultiplier={1.3}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  bar: {
    backgroundColor: c.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: c.cream[200],
    paddingTop: 8,
    ...Platform.select({
      ios: { shadowColor: c.black, shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.08, shadowRadius: 16 },
      android: { elevation: 16 },
      default: {},
    }),
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around' },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  diamondSlot: { height: 12, justifyContent: 'center', alignItems: 'center' },
  tile: { width: 46, height: 38, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  tileActive: {
    ...Platform.select({
      ios: { shadowColor: c.fire[700], shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.35, shadowRadius: 8 },
      android: { elevation: 5 },
      default: {},
    }),
  },
  label: { fontSize: 11, fontWeight: '600', color: c.gray[400], letterSpacing: 0.2 },
  labelActive: { color: c.fire[700], fontWeight: '800' },
});
