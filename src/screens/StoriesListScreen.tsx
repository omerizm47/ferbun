import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { storyTitleGloss, storyDescription } from '../i18n/content';
import { Story } from '../data/stories';
import { TaughtChrome } from '../data/chrome';
import { useChrome } from '../hooks/useChrome';
import { useTrackContent } from '../hooks/useTrackContent';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { haptics } from '../utils/haptics';
import { useProgressStore } from '../stores/progressStore';
import ScreenHeader from '../components/ui/ScreenHeader';
import MotifTile from '../components/ui/MotifTile';
import EmptyState from '../components/ui/EmptyState';
import { toIconName } from '../utils/icons';
import PressableScale from '../components/ui/PressableScale';
import { KilimDiamond } from '../components/ui/KurdishDecorations';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const levelColors = {
  beginner: { bg: COLORS.kurdish[50], text: COLORS.kurdish[600], border: COLORS.kurdish[200] },
  intermediate: { bg: COLORS.fire[50], text: COLORS.fire[600], border: COLORS.fire[200] },
  advanced: { bg: '#FDECEE', text: '#A81E2E', border: '#F5CBD1' },
};

const levelSlot: Record<Story['level'], keyof TaughtChrome> = {
  beginner: 'levelBeginner',
  intermediate: 'levelIntermediate',
  advanced: 'levelAdvanced',
};

// Rough read time from total word count (~120 wpm for a learner reading aloud).
function readMinutes(story: Story): number {
  const words = story.paragraphs.reduce((n, p) => n + p.length, 0);
  return Math.max(1, Math.round(words / 120));
}

export default function StoriesListScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { colors: c, scheme } = useTheme();
  const { t, lang } = useLang();
  const chrome = useChrome();
  const s = useMemo(() => makeStyles(c), [c]);
  const { stories } = useTrackContent();
  const isStoryComplete = useProgressStore((st) => st.isStoryComplete);

  // A track with no stories has nothing to list, and the reading hint below the
  // header would be pointing at an empty page.
  if (stories.length === 0) {
    return (
      <View style={s.container}>
        <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={c.cream[50]} />
        <ScreenHeader titleEn={t.stories.title} titleKu={chrome.storiesHeader} topInset={insets.top} emblem />
        <EmptyState
          icon="book-outline"
          title={t.stories.emptyTitle}
          message={t.stories.emptyMessage}
        />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={c.cream[50]} />
      <ScreenHeader titleEn={t.stories.title} titleKu={chrome.storiesHeader} topInset={insets.top} emblem />
      <View style={s.hintRow}>
        <Ionicons name="hand-left-outline" size={13} color={c.fire[500]} />
        <Text style={s.hint}>{t.stories.hint}</Text>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {stories.map((story) => {
          const colors = levelColors[story.level];
          const level = chrome[levelSlot[story.level]];
          const mins = readMinutes(story);
          const read = isStoryComplete(story.id);
          return (
            <PressableScale
              key={story.id}
              style={s.card}
              onPress={() => { haptics.selection(); navigation.navigate('Story', { storyId: story.id }); }}
            >
              <View style={[s.accentEdge, { backgroundColor: story.accent }]} />
              <View style={s.cardBody}>
                <View style={s.cardTop}>
                  <View>
                    <MotifTile icon={toIconName(story.icon)} color={story.accent} size={52} />
                    {read && (
                      <View style={s.readCheck}>
                        <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  <View style={s.cardInfo}>
                    <Text style={s.cardTitle} numberOfLines={1}>{story.title}</Text>
                    <Text style={s.cardTitleEn} numberOfLines={1}>{storyTitleGloss(story, lang)}</Text>
                  </View>
                  {level ? (
                    <View style={[s.levelBadge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                      <Text style={[s.levelText, { color: colors.text }]}>{level}</Text>
                    </View>
                  ) : null}
                </View>

                <Text style={s.cardDesc} numberOfLines={2}>{storyDescription(story, lang)}</Text>

                <View style={s.cardFooter}>
                  <View style={s.metaRow}>
                    <View style={s.metaChip}>
                      <Ionicons name="time-outline" size={13} color={c.gray[500]} />
                      <Text style={s.metaText}>{mins} {t.stories.min}</Text>
                    </View>
                    <View style={s.metaChip}>
                      <Ionicons name="help-circle-outline" size={13} color={c.gray[500]} />
                      <Text style={s.metaText}>{`${story.comprehensionQuestions.length} ${chrome.questionsNoun}`.trim()}</Text>
                    </View>
                  </View>
                  {read ? (
                    <View style={[s.readPill, s.donePill]}>
                      <Ionicons name="checkmark-done" size={14} color={c.successText} />
                      {chrome.storyRead ? <Text style={[s.readText, { color: c.successText }]}>{chrome.storyRead}</Text> : null}
                    </View>
                  ) : (
                    <View style={[s.readPill, { backgroundColor: story.accent }]}>
                      {chrome.storyReadCta ? <Text style={s.readText}>{chrome.storyReadCta}</Text> : null}
                      <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                    </View>
                  )}
                </View>
              </View>
              <View style={s.cardCorner} pointerEvents="none">
                <KilimDiamond size={18} color={story.accent} />
              </View>
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
  hintRow: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: SPACING.lg, marginTop: 4, marginBottom: SPACING.md },
  hint: { fontSize: FONT_SIZE.xs, color: c.gray[500] },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg },
  card: { flexDirection: 'row', backgroundColor: c.white, borderRadius: RADIUS.lg, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.md },
  accentEdge: { width: 5 },
  cardBody: { flex: 1, padding: SPACING.md },
  cardCorner: { position: 'absolute', right: 12, top: 12, opacity: 0.16 },
  readCheck: { position: 'absolute', right: -3, bottom: -3, width: 18, height: 18, borderRadius: 9, backgroundColor: c.kurdish[500], justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: c.white },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.3 },
  cardTitleEn: { fontSize: FONT_SIZE.xs, color: c.gray[400], marginTop: 1 },
  levelBadge: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: RADIUS.full, borderWidth: 1 },
  levelText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  cardDesc: { fontSize: FONT_SIZE.sm, color: c.gray[500], lineHeight: 20, marginTop: SPACING.md },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACING.md },
  metaRow: { flexDirection: 'row', gap: SPACING.sm },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: c.gray[50], paddingHorizontal: 8, paddingVertical: 4, borderRadius: RADIUS.full },
  metaText: { fontSize: 11, fontWeight: '600', color: c.gray[500] },
  readPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: RADIUS.full },
  donePill: { backgroundColor: c.kurdishSoft, borderWidth: 1, borderColor: c.kurdishSoftBorder },
  readText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
});
