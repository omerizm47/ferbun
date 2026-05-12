import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../theme';
import { KurdishSun, NewrozFlame, MountainSilhouette } from '../components/ui/KurdishDecorations';

const { width } = Dimensions.get('window');

interface Props {
  onComplete: () => void;
}

const slides = [
  {
    renderIcon: () => <KurdishSun size={80} color="rgba(255,255,255,0.9)" />,
    title: 'Bi xêr hatî',
    subtitle: 'Welcome to Fêrbûn',
    description: 'Learn Kurmanji Kurdish through bite-sized lessons, building from your first words to full conversations.',
    gradient: [COLORS.fire[500], COLORS.fire[700]] as [string, string],
  },
  {
    renderIcon: () => <Ionicons name="book" size={48} color={COLORS.white} />,
    title: '260+ Words',
    subtitle: 'Themed Vocabulary',
    description: 'Master essential vocabulary organized by real-life themes — family, food, nature, emotions, and more.',
    gradient: [COLORS.kurdish[500], COLORS.kurdish[700]] as [string, string],
  },
  {
    renderIcon: () => <NewrozFlame size={60} intensity={3} />,
    title: 'Newroz Flame',
    subtitle: 'Earn XP & Build Streaks',
    description: 'Complete lessons, earn experience points, and keep your Newroz flame alive with daily practice.',
    gradient: ['#8B5CF6', '#6D28D9'] as [string, string],
  },
];

export default function OnboardingScreen({ onComplete }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentSlide((i) => i + 1);
    }
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={slide.gradient} style={s.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        {/* Mountain silhouette at bottom */}
        <View style={s.mountainDecor}>
          <MountainSilhouette width={width} height={60} color="rgba(255,255,255,0.06)" />
        </View>

        {/* Skip */}
        {!isLast && (
          <TouchableOpacity style={s.skipBtn} onPress={onComplete}>
            <Text style={s.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Content */}
        <View style={s.content}>
          <View style={s.iconContainer}>
            <View style={s.iconRing}>
              {slide.renderIcon()}
            </View>
          </View>

          <Text style={s.titleKu}>{slide.title}</Text>
          <Text style={s.subtitle}>{slide.subtitle}</Text>
          <Text style={s.description}>{slide.description}</Text>
        </View>

        {/* Dots */}
        <View style={s.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[s.dot, i === currentSlide && s.dotActive]} />
          ))}
        </View>

        {/* Button */}
        <View style={s.buttonArea}>
          <TouchableOpacity style={s.button} onPress={handleNext} activeOpacity={0.8}>
            <Text style={s.buttonText}>{isLast ? 'Dest pê bike — Start Learning' : 'Continue'}</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.midnight[800]} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, paddingTop: 60, overflow: 'hidden' },
  mountainDecor: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  skipBtn: { position: 'absolute', top: 56, right: SPACING.lg, zIndex: 10 },
  skipText: { color: 'rgba(255,255,255,0.7)', fontSize: FONT_SIZE.sm, fontWeight: '600' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.xl },
  iconContainer: { marginBottom: SPACING.xl },
  iconRing: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)',
  },
  titleKu: { fontSize: 36, fontWeight: '800', color: COLORS.white, marginBottom: 4, letterSpacing: -0.5 },
  subtitle: { fontSize: FONT_SIZE.lg, fontWeight: '600', color: 'rgba(255,255,255,0.85)', marginBottom: SPACING.lg },
  description: { fontSize: FONT_SIZE.md, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 24, maxWidth: 320 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: SPACING.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: COLORS.white, width: 24 },
  buttonArea: { paddingHorizontal: SPACING.lg, paddingBottom: 48 },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.white, paddingVertical: 16, borderRadius: RADIUS.lg,
    shadowColor: COLORS.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6,
  },
  buttonText: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.midnight[800] },
});
