import React, { useState, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../theme';
import { getVocabByTheme, VOCAB_THEMES } from '../data/vocabulary';
import { useProgressStore } from '../stores/progressStore';
import { RootStackParamList } from '../navigation/AppNavigator';

type RoutePropType = RouteProp<RootStackParamList, 'Flashcard'>;

export default function FlashcardScreen() {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const { theme } = route.params;
  const words = useMemo(() => getVocabByTheme(theme), [theme]);
  const themeInfo = VOCAB_THEMES.find((t) => t.id === theme);
  const { updateVocabMastery } = useProgressStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  if (words.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No words found for this theme.</Text>
      </SafeAreaView>
    );
  }

  const word = words[currentIndex];
  const isLast = currentIndex >= words.length - 1;
  const progress = (currentIndex + 1) / words.length;

  const handleKnow = () => {
    updateVocabMastery(word.id, true);
    setKnownCount((c) => c + 1);
    advance();
  };

  const handleDontKnow = () => {
    updateVocabMastery(word.id, false);
    advance();
  };

  const advance = () => {
    setIsFlipped(false);
    if (isLast) {
      setCurrentIndex(words.length); // trigger finish
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  // Finish screen
  if (currentIndex >= words.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishScreen}>
          <Ionicons name="checkmark-circle" size={64} color={COLORS.kurdish[500]} style={{ marginBottom: SPACING.lg }} />
          <Text style={styles.finishTitle}>Baş e!</Text>
          <Text style={styles.finishSub}>You reviewed {words.length} words</Text>
          <View style={styles.finishStats}>
            <View style={styles.fStatBox}>
              <Text style={styles.fStatVal}>{knownCount}</Text>
              <Text style={styles.fStatLabel}>Known</Text>
            </View>
            <View style={styles.fStatBox}>
              <Text style={styles.fStatVal}>{words.length - knownCount}</Text>
              <Text style={styles.fStatLabel}>Learning</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color={COLORS.gray[600]} />
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: themeInfo?.color || COLORS.fire[500] }]} />
        </View>
        <Text style={styles.counter}>{currentIndex + 1}/{words.length}</Text>
      </View>

      {/* Card */}
      <View style={styles.cardArea}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => setIsFlipped(!isFlipped)}
          activeOpacity={0.9}
        >
          {!isFlipped ? (
            <>
              <Text style={styles.cardLabel}>Kurdî</Text>
              <Text style={styles.cardWord}>{word.wordKu}</Text>
              {word.gender && (
                <Text style={styles.genderBadge}>
                  {word.gender === 'm' ? '♂ masculine' : '♀ feminine'}
                </Text>
              )}
              <Text style={styles.tapHint}>Tap to reveal</Text>
            </>
          ) : (
            <>
              <Text style={styles.cardLabel}>English</Text>
              <Text style={styles.cardTranslation}>{word.wordEn}</Text>
              <Text style={styles.cardPos}>{word.partOfSpeech}</Text>
              {word.exampleKu && (
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleKu}>{word.exampleKu}</Text>
                  <Text style={styles.exampleEn}>{word.exampleEn}</Text>
                </View>
              )}
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Actions */}
      {isFlipped && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.dontKnowBtn} onPress={handleDontKnow}>
            <Ionicons name="close" size={24} color={COLORS.error} />
            <Text style={styles.dontKnowText}>Still learning</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.knowBtn} onPress={handleKnow}>
            <Ionicons name="checkmark" size={24} color={COLORS.success} />
            <Text style={styles.knowText}>I know this!</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream[50] },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: SPACING.sm },
  closeBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  progressBarBg: { flex: 1, height: 10, backgroundColor: COLORS.gray[200], borderRadius: RADIUS.full, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: RADIUS.full },
  counter: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray[500], width: 45, textAlign: 'right' },
  cardArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.lg },
  card: {
    width: '100%', minHeight: 300, backgroundColor: COLORS.white, borderRadius: RADIUS.xl,
    padding: SPACING.xl, justifyContent: 'center', alignItems: 'center',
    shadowColor: COLORS.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 6,
  },
  cardLabel: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray[400], marginBottom: SPACING.sm, textTransform: 'uppercase', letterSpacing: 1 },
  cardWord: { fontSize: 40, fontWeight: '800', color: COLORS.fire[600], textAlign: 'center' },
  genderBadge: { fontSize: FONT_SIZE.sm, color: COLORS.gray[500], marginTop: SPACING.md, backgroundColor: COLORS.gray[100], paddingHorizontal: SPACING.md, paddingVertical: 4, borderRadius: RADIUS.full },
  tapHint: { fontSize: FONT_SIZE.sm, color: COLORS.gray[300], marginTop: SPACING.xl },
  cardTranslation: { fontSize: 32, fontWeight: '700', color: COLORS.midnight[800], textAlign: 'center' },
  cardPos: { fontSize: FONT_SIZE.sm, color: COLORS.gray[400], marginTop: SPACING.sm, fontStyle: 'italic' },
  exampleBox: { marginTop: SPACING.lg, backgroundColor: COLORS.cream[100], padding: SPACING.md, borderRadius: RADIUS.md, width: '100%' },
  exampleKu: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.fire[700], marginBottom: 4 },
  exampleEn: { fontSize: FONT_SIZE.sm, color: COLORS.gray[600], fontStyle: 'italic' },
  actions: { flexDirection: 'row', paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, gap: SPACING.md },
  dontKnowBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, backgroundColor: '#FEF2F2', paddingVertical: SPACING.md, borderRadius: RADIUS.lg, borderWidth: 2, borderColor: '#FECACA' },
  dontKnowText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.error },
  knowBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, backgroundColor: '#F0FDF4', paddingVertical: SPACING.md, borderRadius: RADIUS.lg, borderWidth: 2, borderColor: '#BBF7D0' },
  knowText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.success },
  finishScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  // finishEmoji removed — using Ionicons instead
  finishTitle: { fontSize: FONT_SIZE.xxxl, fontWeight: '800', color: COLORS.midnight[800] },
  finishSub: { fontSize: FONT_SIZE.md, color: COLORS.gray[500], marginBottom: SPACING.xl },
  finishStats: { flexDirection: 'row', gap: SPACING.lg, marginBottom: SPACING.xl },
  fStatBox: { alignItems: 'center', backgroundColor: COLORS.white, padding: SPACING.lg, borderRadius: RADIUS.lg, minWidth: 100 },
  fStatVal: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: COLORS.fire[600] },
  fStatLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray[500], marginTop: 4 },
  primaryBtn: { backgroundColor: COLORS.fire[500], paddingVertical: SPACING.md, paddingHorizontal: SPACING.xxl, borderRadius: RADIUS.lg },
  primaryBtnText: { color: COLORS.white, fontSize: FONT_SIZE.md, fontWeight: '700' },
});
