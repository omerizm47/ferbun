import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { themeLabel } from '../i18n/content';
import { getVocabByTheme, VOCAB_THEMES } from '../data/vocabulary';
import { useProgressStore, selectDueVocabIds, selectWeakVocabIds } from '../stores/progressStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { haptics } from '../utils/haptics';
import { toIconName } from '../utils/icons';
import ScreenHeader from '../components/ui/ScreenHeader';
import MotifTile from '../components/ui/MotifTile';
import PressableScale from '../components/ui/PressableScale';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function VocabScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { colors: c, scheme } = useTheme();
  const { t, lang } = useLang();
  const s = useMemo(() => makeStyles(c), [c]);
  const vocabMastery = useProgressStore((st) => st.vocabMastery);
  const dueCount = useMemo(() => selectDueVocabIds(vocabMastery).length, [vocabMastery]);
  const weakCount = useMemo(() => selectWeakVocabIds(vocabMastery).length, [vocabMastery]);

  return (
    <View style={s.container}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={c.cream[50]} />
      <ScreenHeader titleEn={t.vocab.title} titleKu="Peyvên Kurdî" topInset={insets.top} emblem />
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {dueCount > 0 && (
          <PressableScale
            style={s.reviewBanner}
            onPress={() => { haptics.selection(); navigation.navigate('Flashcard', { mode: 'review' }); }}
            accessibilityRole="button"
            accessibilityLabel={t.review.a11y}
          >
            <View style={s.reviewIconWrap}>
              <Ionicons name="albums" size={20} color="#FFFFFF" />
            </View>
            <View style={s.reviewInfo}>
              <Text style={s.reviewTitle}>{t.review.title}</Text>
              <Text style={s.reviewSub}>{t.review.due(dueCount)}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </PressableScale>
        )}
        {weakCount > 0 && (
          <PressableScale
            style={s.weakBanner}
            onPress={() => { haptics.selection(); navigation.navigate('Flashcard', { mode: 'weak' }); }}
            accessibilityRole="button"
            accessibilityLabel={lang === 'tr' ? 'Zayıf kelimeleri tekrar et' : 'Review weak words'}
          >
            <View style={s.weakIconWrap}>
              <Ionicons name="trending-up" size={20} color="#FFFFFF" />
            </View>
            <View style={s.reviewInfo}>
              <Text style={s.reviewTitle}>
                {lang === 'tr' ? 'Zayıf Kelimeler' : 'Weak Words'}
              </Text>
              <Text style={s.reviewSub}>
                {lang === 'tr' ? `${weakCount} kelime pratik istiyor` : `${weakCount} words need practice`}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </PressableScale>
        )}
        {VOCAB_THEMES.map((theme) => {
          const words = getVocabByTheme(theme.id);
          return (
            <PressableScale key={theme.id} style={s.card} onPress={() => { haptics.selection(); navigation.navigate('Flashcard', { theme: theme.id }); }}>
              <MotifTile icon={toIconName(theme.icon)} color={theme.color} size={54} />
              <View style={s.info}>
                <Text style={s.labelKu}>{theme.labelKu}</Text>
                <Text style={s.labelEn}>{themeLabel(theme, lang)} · {words.length} {t.vocab.words}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={c.gray[300]} />
            </PressableScale>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xs },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.lg, marginBottom: 10, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm },
  info: { flex: 1, marginLeft: SPACING.md },
  labelKu: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.2 },
  labelEn: { fontSize: FONT_SIZE.xs, color: c.gray[400], marginTop: 2 },

  // Review banner (spaced-repetition deck)
  reviewBanner: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: c.kurdish[600], borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: 10, ...SHADOWS.md },
  reviewIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  reviewInfo: { flex: 1 },
  reviewTitle: { fontSize: FONT_SIZE.md, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.2 },
  reviewSub: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.8)', marginTop: 1 },

  // Weak words banner
  weakBanner: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: '#EA580C', borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: 12, ...SHADOWS.md },
  weakIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
});
