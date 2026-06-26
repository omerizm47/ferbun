import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Animated, {
  FadeInDown, FadeInUp, ZoomIn,
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONT_SIZE, SHADOWS, TYPOGRAPHY, ThemeColors } from '../theme';
import { useColors } from '../theme/ThemeProvider';
import { useT } from '../i18n/LanguageProvider';
import { UiStrings } from '../i18n/types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { KurdishSun, NewrozFlame, MountainSilhouette, DotPattern } from '../components/ui/KurdishDecorations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { haptics } from '../utils/haptics';
import { useUpper } from '../components/ui/UpperText';

const { width } = Dimensions.get('window');

interface Props {
  onComplete: () => void;
}

type HeroKind = 'welcome' | 'learn' | 'words' | 'stories' | 'streak';

// Visual configuration per slide. The Kurmanji title, gradient, accent and hero
// illustration are the same for every learner; the localized label/description
// come from the string catalogue (t.onboarding.slides), index-aligned with this.
const slideConfig: {
  hero: HeroKind;
  titleKu: string;
  gradient: [string, string];
  accent: string;
}[] = [
  { hero: 'welcome', titleKu: 'Bi xêr hatî', gradient: [COLORS.fire[500], COLORS.fire[700]], accent: COLORS.fire[600] },
  { hero: 'learn', titleKu: 'Rê li pêş te', gradient: [COLORS.kurdish[500], COLORS.kurdish[700]], accent: COLORS.kurdish[600] },
  { hero: 'words', titleKu: 'Peyv bi peyv', gradient: ['#E0A030', '#A8650C'], accent: '#A8650C' },
  { hero: 'stories', titleKu: 'Çîrokên rastîn', gradient: ['#D6485A', '#9B1C2E'], accent: '#A81E2E' },
  { hero: 'streak', titleKu: 'Agirê xwe vêxe', gradient: [COLORS.fire[600], '#7A2F00'], accent: COLORS.fire[700] },
];

// Gentle vertical float applied to the hero illustration.
function FloatingHero({ children }: { children: React.ReactNode }) {
  const y = useSharedValue(0);
  useEffect(() => {
    y.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [y]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }] }));
  return <Animated.View style={style}>{children}</Animated.View>;
}

// Slowly rotating Kurdish sun with a breathing halo.
function RotatingSun({ size = 170 }: { size?: number }) {
  const reducedMotion = useReducedMotion();
  const spin = useSharedValue(0);
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (reducedMotion) return;
    spin.value = withRepeat(withTiming(1, { duration: 48000, easing: Easing.linear }), -1, false);
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2600, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [reducedMotion, spin, pulse]);
  const sunStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value * 360}deg` }] }));
  const haloStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pulse.value * 0.14 }],
    opacity: 0.18 + pulse.value * 0.18,
  }));
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[{ position: 'absolute', backgroundColor: '#FFFFFF', width: size, height: size, borderRadius: size / 2 }, haloStyle]} />
      <Animated.View style={sunStyle}>
        <KurdishSun size={size * 0.8} color="rgba(255,255,255,0.96)" />
      </Animated.View>
    </View>
  );
}

// Flickering Newroz flame.
function FlickerFlame({ size = 120 }: { size?: number }) {
  const reducedMotion = useReducedMotion();
  const f = useSharedValue(0);
  useEffect(() => {
    if (reducedMotion) return;
    f.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 680, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.3, { duration: 480, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.85, { duration: 560, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 520, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [reducedMotion, f]);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: 0.94 + f.value * 0.12 }] }));
  return (
    <Animated.View style={style}>
      <NewrozFlame size={size} intensity={3} />
    </Animated.View>
  );
}

type HeroStyles = ReturnType<typeof makeHeroStyles>;

type PreviewStrings = UiStrings['onboarding']['preview'];

// A small mock of an exercise card — shows what a lesson looks like.
function LearnPreview({ hs, c, pv }: { hs: HeroStyles; c: ThemeColors; pv: PreviewStrings }) {
  return (
    <View style={hs.card}>
      <Text style={hs.kicker}>{pv.unitKicker}</Text>
      <Text style={hs.question}>{pv.question}</Text>
      <View style={[hs.option, hs.optionCorrect]}>
        <Text style={hs.optionTextCorrect}>{pv.optCorrect}</Text>
        <Ionicons name="checkmark-circle" size={18} color={c.kurdish[600]} />
      </View>
      <View style={hs.option}><Text style={hs.optionText}>{pv.opt2}</Text></View>
      <View style={[hs.option, { marginBottom: 0 }]}><Text style={hs.optionText}>{pv.opt3}</Text></View>
    </View>
  );
}

// A small mock of a flashcard.
function WordsPreview({ hs, pv }: { hs: HeroStyles; pv: PreviewStrings }) {
  return (
    <View style={hs.flashcard}>
      <Text style={hs.flashLabel}>KURDÎ</Text>
      <Text style={hs.flashWord}>roj baş</Text>
      <View style={hs.flashDivider} />
      <Text style={hs.flashHint}>{pv.wordsHint}</Text>
    </View>
  );
}

// A small mock of a story line with a tapped word.
function StoriesPreview({ hs, pv }: { hs: HeroStyles; pv: PreviewStrings }) {
  return (
    <View style={hs.card}>
      <Text style={hs.storyLine}>
        Ez li <Text style={hs.storyWord}>mal</Text> im.
      </Text>
      <View style={hs.tooltip}>
        <Text style={hs.tooltipKu}>mal</Text>
        <Text style={hs.tooltipEn}>{pv.storyGloss}</Text>
      </View>
    </View>
  );
}

// Flame hero plus a streak counter pill.
function StreakPreview({ hs }: { hs: HeroStyles }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <FlickerFlame size={118} />
      <View style={hs.streakPill}>
        <Text style={hs.streakNum}>7</Text>
        <Text style={hs.streakLabel}>rojan li pey hev</Text>
      </View>
    </View>
  );
}

function renderHero(kind: HeroKind, hs: HeroStyles, c: ThemeColors, pv: PreviewStrings) {
  switch (kind) {
    case 'welcome': return <RotatingSun size={176} />;
    case 'learn': return <LearnPreview hs={hs} c={c} pv={pv} />;
    case 'words': return <WordsPreview hs={hs} pv={pv} />;
    case 'stories': return <StoriesPreview hs={hs} pv={pv} />;
    case 'streak': return <StreakPreview hs={hs} />;
    default: return null;
  }
}

const makeHeroStyles = (c: ThemeColors) => StyleSheet.create({
  card: { width: width * 0.74, backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOWS.lg },
  kicker: { ...TYPOGRAPHY.kicker, color: c.fire[600], marginBottom: 8 },
  question: { fontSize: FONT_SIZE.md, fontWeight: '700', color: c.midnight[800], marginBottom: SPACING.md },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: c.gray[200], borderRadius: RADIUS.md, paddingVertical: 11, paddingHorizontal: SPACING.md, marginBottom: 8 },
  optionCorrect: { borderColor: c.kurdish[400], backgroundColor: c.successBg },
  optionText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.gray[600] },
  optionTextCorrect: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: c.successText },
  flashcard: { width: width * 0.62, minHeight: 188, backgroundColor: c.white, borderRadius: RADIUS.xl, padding: SPACING.xl, justifyContent: 'center', alignItems: 'center', ...SHADOWS.lg },
  flashLabel: { fontSize: 11, fontWeight: '700', color: c.gray[400], letterSpacing: 1.5, marginBottom: SPACING.sm },
  flashWord: { fontSize: 34, fontWeight: '800', color: c.fire[600] },
  flashDivider: { width: 40, height: 2, backgroundColor: c.gray[200], marginVertical: SPACING.md, borderRadius: 1 },
  flashHint: { fontSize: FONT_SIZE.xs, color: c.gray[400] },
  storyLine: { fontSize: 21, lineHeight: 32, color: c.midnight[800], fontWeight: '500' },
  storyWord: { color: c.fire[700], backgroundColor: c.fire[100], fontWeight: '700' },
  tooltip: { alignSelf: 'flex-start', marginTop: SPACING.md, backgroundColor: '#0F172A', borderRadius: RADIUS.md, paddingVertical: 8, paddingHorizontal: SPACING.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  tooltipKu: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: '#FFFFFF' },
  tooltipEn: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  streakPill: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: 'rgba(255,255,255,0.16)', borderColor: 'rgba(255,255,255,0.3)', borderWidth: 1, borderRadius: RADIUS.full, paddingVertical: 8, paddingHorizontal: SPACING.lg, marginTop: SPACING.lg },
  streakNum: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  streakLabel: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
});

export default function OnboardingScreen({ onComplete }: Props) {
  const insets = useSafeAreaInsets();
  const c = useColors();
  const t = useT();
  const up = useUpper();
  const s = useMemo(() => makeStyles(c), [c]);
  const hs = useMemo(() => makeHeroStyles(c), [c]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slideConfig[currentSlide];
  const copy = t.onboarding.slides[currentSlide];
  const isLast = currentSlide === slideConfig.length - 1;

  const handleNext = () => {
    haptics.selection();
    if (isLast) {
      onComplete();
    } else {
      setCurrentSlide((i) => i + 1);
    }
  };

  const goBack = () => {
    haptics.selection();
    setCurrentSlide((i) => Math.max(0, i - 1));
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero stage */}
      <View style={s.hero}>
        <LinearGradient
          colors={slide.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={s.dotLayer} pointerEvents="none">
          <DotPattern width={width} height={280} color="rgba(255,255,255,0.16)" spacing={26} />
        </View>
        <View style={s.mountainDecor} pointerEvents="none">
          <MountainSilhouette width={width} height={76} color="rgba(0,0,0,0.10)" />
        </View>

        {!isLast && (
          <TouchableOpacity style={[s.skipBtn, { top: insets.top + SPACING.sm }]} onPress={onComplete} hitSlop={8}>
            <Text style={s.skipText}>{t.common.skip}</Text>
          </TouchableOpacity>
        )}
        {currentSlide > 0 && (
          <TouchableOpacity style={[s.backBtn, { top: insets.top + SPACING.sm }]} onPress={goBack} hitSlop={8} accessibilityRole="button" accessibilityLabel={t.onboarding.goBack}>
            <Ionicons name="chevron-back" size={26} color="rgba(255,255,255,0.9)" />
          </TouchableOpacity>
        )}

        <View style={[s.heroContent, { paddingTop: insets.top }]}>
          <FloatingHero key={currentSlide}>
            <Animated.View entering={ZoomIn.springify().damping(20)}>
              {renderHero(slide.hero, hs, c, t.onboarding.preview)}
            </Animated.View>
          </FloatingHero>
        </View>
      </View>

      {/* Content sheet */}
      <View style={[s.sheet, { paddingBottom: insets.bottom + SPACING.lg }]}>
        <View style={s.progress}>
          {slideConfig.map((_, i) => (
            <View
              key={i}
              style={[
                s.segment,
                i === currentSlide && [s.segmentActive, { backgroundColor: slide.accent }],
                i < currentSlide && { backgroundColor: slide.accent, opacity: 0.4 },
              ]}
            />
          ))}
        </View>

        <View key={currentSlide}>
          <Animated.Text entering={FadeInDown.duration(380)} style={s.titleKu}>{slide.titleKu}</Animated.Text>
          <Animated.Text entering={FadeInDown.delay(70).duration(380)} style={[s.label, { color: slide.accent, textTransform: 'none' }]}>
            {up(copy.label)}
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(130).duration(440)} style={s.description}>
            {copy.description}
          </Animated.Text>
        </View>

        <TouchableOpacity style={[s.button, { backgroundColor: slide.accent }]} onPress={handleNext} activeOpacity={0.85}>
          <Text style={s.buttonText}>{isLast ? `Dest pê bike — ${t.onboarding.start}` : t.common.continue}</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },

  hero: { flex: 1, overflow: 'hidden' },
  dotLayer: { position: 'absolute', top: 0, left: 0, right: 0 },
  mountainDecor: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  skipBtn: { position: 'absolute', right: SPACING.lg, zIndex: 10, paddingVertical: 6, paddingHorizontal: 10 },
  skipText: { color: 'rgba(255,255,255,0.85)', fontSize: FONT_SIZE.sm, fontWeight: '700' },
  backBtn: { position: 'absolute', left: SPACING.md, zIndex: 10, padding: 4 },
  heroContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.lg },

  sheet: {
    backgroundColor: c.cream[50],
    marginTop: -26,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    ...SHADOWS.lg,
  },
  progress: { flexDirection: 'row', gap: 6, marginBottom: SPACING.lg, alignSelf: 'center' },
  segment: { width: 22, height: 5, borderRadius: 3, backgroundColor: c.gray[200] },
  segmentActive: { width: 34 },

  titleKu: { fontSize: 30, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.5 },
  label: { fontSize: FONT_SIZE.sm, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  description: { fontSize: FONT_SIZE.md, color: c.gray[600], lineHeight: 24, marginTop: SPACING.md, marginBottom: SPACING.xl },

  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    paddingVertical: 16, borderRadius: RADIUS.lg, ...SHADOWS.md,
  },
  buttonText: { fontSize: FONT_SIZE.md, fontWeight: '700', color: '#FFFFFF' },
});
