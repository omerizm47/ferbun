import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../theme';
import { getStoryById, StoryWord } from '../data/stories';
import { RootStackParamList } from '../navigation/AppNavigator';

type RP = RouteProp<RootStackParamList, 'Story'>;

export default function StoryScreen() {
  const navigation = useNavigation();
  const route = useRoute<RP>();
  const story = getStoryById(route.params.storyId);
  const [selectedWord, setSelectedWord] = useState<StoryWord | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  if (!story) {
    return <View style={s.container}><Text>Story not found</Text></View>;
  }

  const handleWordTap = (word: StoryWord) => {
    setSelectedWord(word);
  };

  const handleQuizAnswer = (answer: string) => {
    if (quizAnswer) return;
    setQuizAnswer(answer);
    if (answer === story.comprehensionQuestions[quizIndex].correctAnswer) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNextQuestion = () => {
    setQuizAnswer(null);
    if (quizIndex + 1 < story.comprehensionQuestions.length) {
      setQuizIndex((i) => i + 1);
    } else {
      setShowQuiz(false);
      setQuizIndex(0);
    }
  };

  // Quiz mode
  if (showQuiz) {
    const q = story.comprehensionQuestions[quizIndex];
    const isLast = quizIndex === story.comprehensionQuestions.length - 1;

    return (
      <View style={s.container}>
        <StatusBar barStyle="dark-content" />
        <View style={s.quizHeader}>
          <TouchableOpacity onPress={() => setShowQuiz(false)} style={s.backBtn}>
            <Ionicons name="close" size={24} color={COLORS.gray[600]} />
          </TouchableOpacity>
          <Text style={s.quizProgress}>{quizIndex + 1}/{story.comprehensionQuestions.length}</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={s.quizContent}>
          <Text style={s.quizQuestion}>{q.question}</Text>
          <View style={s.quizOptions}>
            {q.options.map((opt) => {
              const isSelected = quizAnswer === opt;
              const isCorrect = opt === q.correctAnswer;
              const showResult = quizAnswer !== null;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[s.quizOption, showResult && isCorrect && s.quizCorrect, showResult && isSelected && !isCorrect && s.quizWrong]}
                  onPress={() => handleQuizAnswer(opt)}
                  activeOpacity={quizAnswer ? 1 : 0.7}
                >
                  <Text style={[s.quizOptionText, showResult && isCorrect && { color: COLORS.success }]}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {quizAnswer && (
            <TouchableOpacity style={s.quizNextBtn} onPress={handleNextQuestion}>
              <Text style={s.quizNextText}>{isLast ? 'Done' : 'Next'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.midnight[800]} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>{story.title}</Text>
          <Text style={s.headerSub}>{story.titleEn}</Text>
        </View>
        <View style={s.levelBadge}>
          <Text style={s.levelText}>{story.level}</Text>
        </View>
      </View>

      <Text style={s.hint}>Tap any word to see its translation</Text>

      {/* Story */}
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {story.paragraphs.map((paragraph, pi) => (
          <View key={pi} style={s.paragraph}>
            <Text style={s.paragraphText}>
              {paragraph.map((word, wi) => (
                <Text
                  key={wi}
                  style={[s.word, selectedWord?.ku === word.ku && s.wordHighlighted]}
                  onPress={() => handleWordTap(word)}
                >
                  {word.ku}{wi < paragraph.length - 1 ? ' ' : ''}
                </Text>
              ))}
            </Text>
          </View>
        ))}

        {/* Comprehension button */}
        <TouchableOpacity style={s.quizBtn} onPress={() => { setShowQuiz(true); setQuizIndex(0); setCorrectCount(0); setQuizAnswer(null); }}>
          <Ionicons name="help-circle-outline" size={20} color={COLORS.fire[600]} />
          <Text style={s.quizBtnText}>Test Comprehension</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Translation popup */}
      {selectedWord && (
        <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={() => setSelectedWord(null)}>
          <View style={s.tooltip}>
            <Text style={s.tooltipKu}>{selectedWord.ku}</Text>
            <View style={s.tooltipDivider} />
            <Text style={s.tooltipEn}>{selectedWord.en}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream[50] },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingTop: 56, paddingBottom: SPACING.sm },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerCenter: { alignItems: 'center', flex: 1 },
  headerTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.midnight[800] },
  headerSub: { fontSize: FONT_SIZE.xs, color: COLORS.gray[400] },
  levelBadge: { backgroundColor: COLORS.fire[50], paddingHorizontal: 10, paddingVertical: 3, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.fire[100] },
  levelText: { fontSize: 10, fontWeight: '600', color: COLORS.fire[600], textTransform: 'capitalize' },

  hint: { fontSize: FONT_SIZE.xs, color: COLORS.gray[400], textAlign: 'center', marginBottom: SPACING.md, fontStyle: 'italic' },

  // Story
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg },
  paragraph: { marginBottom: SPACING.lg, backgroundColor: COLORS.white, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.gray[100] },
  paragraphText: { flexDirection: 'row', flexWrap: 'wrap' },
  word: { fontSize: 18, lineHeight: 32, color: COLORS.midnight[800], fontWeight: '500' },
  wordHighlighted: { backgroundColor: COLORS.fire[100], color: COLORS.fire[700], borderRadius: 4, overflow: 'hidden' },

  // Tooltip
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  tooltip: {
    backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginBottom: 40, borderRadius: RADIUS.lg, padding: SPACING.lg,
    shadowColor: COLORS.black, shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 10,
    alignItems: 'center',
  },
  tooltipKu: { fontSize: 28, fontWeight: '800', color: COLORS.fire[600], marginBottom: SPACING.sm },
  tooltipDivider: { width: 40, height: 2, backgroundColor: COLORS.gray[200], marginBottom: SPACING.sm, borderRadius: 1 },
  tooltipEn: { fontSize: FONT_SIZE.md, color: COLORS.gray[600], fontWeight: '500' },

  // Quiz button
  quizBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.fire[50], paddingVertical: 14, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.fire[100], marginTop: SPACING.lg },
  quizBtnText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.fire[600] },

  // Quiz
  quizHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingTop: 56, paddingBottom: SPACING.md },
  quizProgress: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray[500] },
  quizContent: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl },
  quizQuestion: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.midnight[800], marginBottom: SPACING.xl, lineHeight: 28 },
  quizOptions: { gap: 8 },
  quizOption: { padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 2, borderColor: COLORS.gray[200], backgroundColor: COLORS.white },
  quizCorrect: { borderColor: COLORS.success, backgroundColor: '#F0FDF4' },
  quizWrong: { borderColor: COLORS.error, backgroundColor: '#FEF2F2' },
  quizOptionText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.midnight[800] },
  quizNextBtn: { backgroundColor: COLORS.fire[500], paddingVertical: 14, borderRadius: RADIUS.lg, alignItems: 'center', marginTop: SPACING.xl },
  quizNextText: { color: COLORS.white, fontSize: FONT_SIZE.md, fontWeight: '700' },
});
