import React, { useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, TYPOGRAPHY, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { Lang } from '../i18n/types';
import { KurdishSun, KilimBorder } from '../components/ui/KurdishDecorations';
import { haptics } from '../utils/haptics';

/**
 * First-run base-language picker. Shown only to brand-new users before the
 * intro carousel, so the onboarding copy can already be in their language.
 * Styled with the app's own Kurdish emblem + kilim motifs (no flags / emojis):
 * each option carries its native name and an own-language subtitle, so an
 * English or a Turkish speaker each reads a line meant for them.
 */
export default function LanguagePickerScreen() {
  const insets = useSafeAreaInsets();
  const { colors: c, scheme } = useTheme();
  const { lang, t, setLang, confirmLanguage } = useLang();
  const s = useMemo(() => makeStyles(c), [c]);

  const options: { lang: Lang; code: string; name: string; sub: string }[] = [
    { lang: 'en', code: 'EN', name: t.language.englishName, sub: t.language.englishSub },
    { lang: 'tr', code: 'TR', name: t.language.turkishName, sub: t.language.turkishSub },
  ];

  const choose = (l: Lang) => {
    haptics.selection();
    setLang(l);
  };

  const confirm = () => {
    haptics.success();
    confirmLanguage(); // persists + flips the app; the nav gate advances to onboarding
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingTop: insets.top + SPACING.xl }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Brand emblem + Kurmanji welcome (the same warm greeting for everyone). */}
        <View style={s.header}>
          <View style={s.sun} pointerEvents="none">
            <KurdishSun size={84} color={c.fire[500]} />
          </View>
          <Text style={[s.wordmark, { color: c.fire[600] }]}>Fêrbûn</Text>
          <Text style={s.welcomeKu}>Bi xêr hatî</Text>
          <View style={s.kilim} pointerEvents="none">
            <KilimBorder width={76} color={c.fire[300]} />
          </View>
        </View>

        {/* Prompt + options */}
        <Text style={s.title}>{t.language.title}</Text>
        <Text style={s.subtitle}>{t.language.subtitle}</Text>

        <View style={s.options}>
          {options.map((o) => {
            const active = lang === o.lang;
            return (
              <Pressable
                key={o.lang}
                onPress={() => choose(o.lang)}
                style={[s.card, active && s.cardActive]}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                accessibilityLabel={`${o.name}. ${o.sub}`}
              >
                <View style={[s.badge, active && s.badgeActive]}>
                  <Text style={[s.badgeText, active && s.badgeTextActive]}>{o.code}</Text>
                </View>
                <View style={s.cardInfo}>
                  <Text style={s.cardName}>{o.name}</Text>
                  <Text style={s.cardSub}>{o.sub}</Text>
                </View>
                <Ionicons
                  name={active ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={active ? c.fire[500] : c.gray[300]}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Confirm — pinned below the scrollable content. */}
      <View style={[s.footer, { paddingBottom: insets.bottom + SPACING.lg }]}>
        <Pressable
          style={s.button}
          onPress={confirm}
          accessibilityRole="button"
          accessibilityLabel={t.language.continue}
        >
          <Text style={s.buttonText}>{t.language.continue}</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl },

  header: { alignItems: 'center', marginBottom: SPACING.xl * 1.6 },
  sun: { marginBottom: SPACING.md },
  wordmark: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  welcomeKu: { fontSize: FONT_SIZE.md, fontWeight: '600', color: c.gray[500], marginTop: 4 },
  kilim: { marginTop: SPACING.md, opacity: 0.9 },

  title: { fontSize: 24, fontWeight: '800', color: c.midnight[800], textAlign: 'center', letterSpacing: -0.4 },
  subtitle: { fontSize: FONT_SIZE.sm, color: c.gray[500], textAlign: 'center', marginTop: SPACING.sm, marginBottom: SPACING.xl, paddingHorizontal: SPACING.md, lineHeight: 20 },

  options: { gap: SPACING.md },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.lg,
    borderWidth: 2, borderColor: c.gray[200], ...SHADOWS.sm,
  },
  cardActive: { borderColor: c.fire[500], backgroundColor: c.fireSoft },
  badge: { width: 44, height: 44, borderRadius: RADIUS.md, backgroundColor: c.fireSoft, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: c.fireSoftBorder },
  badgeActive: { backgroundColor: c.fire[500], borderColor: c.fire[500] },
  badgeText: { ...TYPOGRAPHY.section, color: c.fire[600] },
  badgeTextActive: { color: '#FFFFFF' },
  cardInfo: { flex: 1 },
  cardName: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: c.midnight[800] },
  cardSub: { fontSize: FONT_SIZE.xs, color: c.gray[500], marginTop: 2 },

  footer: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    backgroundColor: c.fire[500], paddingVertical: 16, borderRadius: RADIUS.lg, ...SHADOWS.md,
  },
  buttonText: { fontSize: FONT_SIZE.md, fontWeight: '700', color: '#FFFFFF' },
});
