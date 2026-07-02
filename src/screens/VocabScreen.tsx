import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TextInput, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { themeLabel } from '../i18n/content';
import { getVocabByTheme, VOCAB_THEMES, vocabulary } from '../data/vocabulary';
import { useProgressStore, selectDueVocabIds } from '../stores/progressStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { haptics } from '../utils/haptics';
import { toIconName } from '../utils/icons';
import { speakKurdish } from '../utils/speech';
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'learning' | 'familiar' | 'mastered' | 'not_studied'>('all');

  // Normalize Kurdish characters for diacritic-insensitive search
  const normalizeString = (str: string) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFC')
      .replace(/ê/g, 'e')
      .replace(/î/g, 'i')
      .replace(/û/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c');
  };

  const formatPartOfSpeech = (pos: string, gender?: string) => {
    const isTr = lang === 'tr';
    const p = pos.toLowerCase();
    if (p === 'f' || (p === 'noun' && gender === 'f')) {
      return isTr ? 'dişil isim' : 'feminine noun';
    }
    if (p === 'm' || (p === 'noun' && gender === 'm')) {
      return isTr ? 'eril isim' : 'masculine noun';
    }
    if (p === 'm/f') {
      return isTr ? 'eril/dişil isim' : 'masculine/feminine noun';
    }
    if (p === 'adj') {
      return isTr ? 'sıfat' : 'adjective';
    }
    if (p === 'verb') {
      return isTr ? 'fiil' : 'verb';
    }
    if (p === 'noun') {
      return isTr ? 'isim' : 'noun';
    }
    if (p === 'particle') {
      return isTr ? 'edat' : 'particle';
    }
    if (p === 'interj') {
      return isTr ? 'ünlem' : 'interjection';
    }
    return pos;
  };

  const filteredWords = useMemo(() => {
    if (!searchQuery.trim() && selectedFilter === 'all') return [];

    const queryNormalized = searchQuery.trim() ? normalizeString(searchQuery.trim()) : '';

    return vocabulary.filter((word) => {
      // 1. Search Query filter
      if (queryNormalized) {
        const kuNormalized = normalizeString(word.wordKu);
        const enNormalized = normalizeString(word.wordEn);
        const trNormalized = normalizeString(word.wordTr || '');
        const matchesQuery =
          kuNormalized.includes(queryNormalized) ||
          enNormalized.includes(queryNormalized) ||
          trNormalized.includes(queryNormalized);
        if (!matchesQuery) return false;
      }

      // 2. Mastery status filter
      const mastery = vocabMastery[word.id];
      if (selectedFilter === 'learning') {
        return mastery && mastery.masteryLevel <= 1;
      }
      if (selectedFilter === 'familiar') {
        return mastery && (mastery.masteryLevel === 2 || mastery.masteryLevel === 3);
      }
      if (selectedFilter === 'mastered') {
        return mastery && mastery.masteryLevel >= 4;
      }
      if (selectedFilter === 'not_studied') {
        return !mastery;
      }

      return true; // selectedFilter === 'all'
    });
  }, [searchQuery, selectedFilter, vocabMastery]);

  return (
    <View style={s.container}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={c.cream[50]} />
      <ScreenHeader titleEn={t.vocab.title} titleKu="Peyvên Kurdî" topInset={insets.top} emblem />
      
      {/* Search Input Bar */}
      <View style={s.searchContainer}>
        <Ionicons name="search" size={18} color={c.gray[400]} style={s.searchIcon} />
        <TextInput
          style={s.searchInput}
          placeholder={lang === 'tr' ? 'Sözcük ara...' : 'Search words...'}
          placeholderTextColor={c.gray[400]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => { haptics.selection(); setSearchQuery(''); }} style={s.clearBtn}>
            <Ionicons name="close-circle" size={16} color={c.gray[400]} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips Row */}
      <View style={s.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.filterScrollContent}
        >
          {([
            { id: 'all', label: t.vocab.filterAll },
            { id: 'learning', label: t.vocab.filterLearning },
            { id: 'familiar', label: t.vocab.filterFamiliar },
            { id: 'mastered', label: t.vocab.filterMastered },
            { id: 'not_studied', label: t.vocab.filterNotStudied },
          ] as const).map((filter) => {
            const active = selectedFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[s.filterChip, active && s.filterChipActive]}
                onPress={() => {
                  haptics.selection();
                  setSelectedFilter(filter.id);
                }}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[s.filterChipText, active && s.filterChipTextActive]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {searchQuery.length > 0 || selectedFilter !== 'all' ? (
        filteredWords.length === 0 ? (
          <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
            <View style={s.emptySearch}>
              <Ionicons name="search-outline" size={48} color={c.gray[300]} style={{ marginBottom: 12 }} />
              <Text style={s.emptySearchText}>
                {lang === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}
              </Text>
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={filteredWords}
            keyExtractor={(item) => item.id}
            renderItem={({ item: word }) => (
              <WordRow
                word={word}
                mastery={vocabMastery[word.id]}
                c={c}
                s={s}
                lang={lang}
                onPress={() => { haptics.selection(); setSelectedWord(word); }}
              />
            )}
            style={s.scroll}
            contentContainerStyle={[s.scrollContent, { paddingBottom: 40 }]}
            initialNumToRender={12}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
          />
        )
      ) : (
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

          {/* Word Marathon Banner */}
          <PressableScale
            style={s.maratonBanner}
            onPress={() => { haptics.selection(); navigation.navigate('RapidFire'); }}
            accessibilityRole="button"
            accessibilityLabel={lang === 'tr' ? 'Kelime maratonunu başlat' : 'Start word marathon'}
          >
            <View style={s.maratonIconWrap}>
              <Ionicons name="flame" size={20} color="#FFFFFF" />
            </View>
            <View style={s.maratonInfo}>
              <Text style={s.maratonTitle}>
                {lang === 'tr' ? 'Kelime Maratonu' : 'Word Marathon'}
              </Text>
              <Text style={s.maratonSub}>
                {lang === 'tr' ? 'Zamana karşı kaydırarak yarış!' : 'Race against the clock by swiping!'}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </PressableScale>

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
      )}

      {/* Word Detail Bottom Sheet Modal */}
      <Modal
        visible={selectedWord !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedWord(null)}
      >
        <Pressable style={s.modalOverlay} onPress={() => setSelectedWord(null)}>
          <Pressable style={[s.modalContent, { backgroundColor: c.white }]} onPress={(e) => e.stopPropagation()}>
            <View style={s.modalDragHandle} />
            {selectedWord && (
              <View style={s.detailContainer}>
                <View style={s.detailHeader}>
                  <View>
                    <Text style={s.detailWordKu}>{selectedWord.wordKu}</Text>
                    {selectedWord.partOfSpeech && (
                      <Text style={s.detailPartOfSpeech}>
                        {formatPartOfSpeech(selectedWord.partOfSpeech, selectedWord.gender)}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={[s.soundBtn, { backgroundColor: c.fireSoft }]}
                    onPress={() => {
                      haptics.light();
                      speakKurdish(selectedWord.wordKu);
                    }}
                  >
                    <Ionicons name="volume-medium-outline" size={24} color={c.fire[600]} />
                  </TouchableOpacity>
                </View>

                <View style={s.detailDivider} />

                <View style={s.detailSection}>
                  <Text style={s.detailLabel}>{lang === 'tr' ? 'ANLAMI' : 'MEANING'}</Text>
                  <Text style={s.detailTranslation}>
                    {lang === 'tr' ? selectedWord.wordTr || selectedWord.wordEn : selectedWord.wordEn}
                  </Text>
                </View>

                {selectedWord.exampleKu && (
                  <View style={s.detailSection}>
                    <Text style={s.detailLabel}>{lang === 'tr' ? 'ÖRNEK CÜMLE' : 'EXAMPLE SENTENCE'}</Text>
                    <Text style={s.detailExampleKu}>{selectedWord.exampleKu}</Text>
                    <Text style={s.detailExampleTranslation}>
                      {lang === 'tr' ? selectedWord.exampleTr || selectedWord.exampleEn : selectedWord.exampleEn}
                    </Text>
                  </View>
                )}

                <View style={s.detailSection}>
                  <Text style={s.detailLabel}>{lang === 'tr' ? 'ÖĞRENME DURUMU' : 'LEARNING STATUS'}</Text>
                  {(() => {
                    const mastery = vocabMastery[selectedWord.id];
                    let statusText = lang === 'tr' ? 'Henüz çalışılmadı' : 'Not studied yet';
                    let badgeColor = c.gray[400];
                    if (mastery) {
                      if (mastery.masteryLevel >= 4) {
                        statusText = lang === 'tr' ? 'Ustalaşıldı (SRS Seviye ' + mastery.masteryLevel + ')' : 'Mastered (SRS Level ' + mastery.masteryLevel + ')';
                        badgeColor = c.kurdish[500];
                      } else if (mastery.masteryLevel >= 2) {
                        statusText = lang === 'tr' ? 'Aşina (SRS Seviye ' + mastery.masteryLevel + ')' : 'Familiar (SRS Level ' + mastery.masteryLevel + ')';
                        badgeColor = c.warning;
                      } else {
                        statusText = lang === 'tr' ? 'Öğreniliyor (SRS Seviye ' + mastery.masteryLevel + ')' : 'Learning (SRS Level ' + mastery.masteryLevel + ')';
                        badgeColor = c.fire[400];
                      }
                    }
                    return (
                      <View style={s.masteryBadgeRow}>
                        <View style={[s.masteryDot, { backgroundColor: badgeColor }]} />
                        <Text style={s.masteryStatusText}>{statusText}</Text>
                      </View>
                    );
                  })()}
                </View>

                <TouchableOpacity
                  style={[s.closeBtn, { backgroundColor: c.fire[600] }]}
                  onPress={() => setSelectedWord(null)}
                >
                  <Text style={s.closeBtnText}>{lang === 'tr' ? 'Kapat' : 'Close'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

interface WordRowProps {
  word: any;
  mastery: any;
  c: ThemeColors;
  s: any;
  lang: string;
  onPress: () => void;
}

const WordRow = React.memo(({ word, mastery, c, s, lang, onPress }: WordRowProps) => {
  let masteryColor = c.gray[200];
  if (mastery) {
    if (mastery.masteryLevel >= 4) masteryColor = c.kurdish[500];
    else if (mastery.masteryLevel >= 2) masteryColor = c.warning;
    else masteryColor = c.fire[400];
  }

  return (
    <PressableScale
      style={s.wordRow}
      onPress={onPress}
    >
      <View style={s.wordRowLeft}>
        <Text style={s.wordRowKu}>{word.wordKu}</Text>
        <Text style={s.wordRowTranslation}>
          {lang === 'tr' ? word.wordTr || word.wordEn : word.wordEn}
        </Text>
      </View>
      <View style={s.wordRowRight}>
        <View style={[s.masteryIndicator, { backgroundColor: masteryColor }]} />
        <Ionicons name="chevron-forward" size={16} color={c.gray[300]} />
      </View>
    </PressableScale>
  );
});
WordRow.displayName = 'WordRow';

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xs },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.lg, marginBottom: 10, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm },
  info: { flex: 1, marginLeft: SPACING.md },
  labelKu: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.2 },
  labelEn: { fontSize: FONT_SIZE.xs, color: c.gray[400], marginTop: 2 },

  // Review banner (spaced-repetition deck)
  reviewBanner: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: c.kurdish[600], borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: 12, ...SHADOWS.md },
  reviewIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  reviewInfo: { flex: 1 },
  reviewTitle: { fontSize: FONT_SIZE.md, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.2 },
  reviewSub: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.8)', marginTop: 1 },

  // Maraton banner
  maratonBanner: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: c.fire[600], borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: 12, ...SHADOWS.md },
  maratonIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  maratonInfo: { flex: 1 },
  maratonTitle: { fontSize: FONT_SIZE.md, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.2 },
  maratonSub: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.8)', marginTop: 1 },

  // Search input bar
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.white, borderRadius: RADIUS.md, borderWidth: 1, borderColor: c.gray[100], marginHorizontal: SPACING.lg, marginVertical: SPACING.sm, paddingHorizontal: SPACING.md, ...SHADOWS.sm },
  searchIcon: { marginRight: SPACING.xs },
  searchInput: { flex: 1, height: 44, fontSize: FONT_SIZE.sm, color: c.midnight[800] },
  clearBtn: { padding: 4 },

  // Filter chips
  filterWrapper: { marginBottom: SPACING.md },
  filterScrollContent: { paddingHorizontal: SPACING.lg, gap: SPACING.xs },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.full, backgroundColor: c.white, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm },
  filterChipActive: { backgroundColor: c.fire[600], borderColor: c.fire[600] },
  filterChipText: { fontSize: FONT_SIZE.xs, fontWeight: '600', color: c.gray[500] },
  filterChipTextActive: { color: '#FFFFFF' },

  // Word list search row
  wordRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.lg, marginBottom: 8, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm },
  wordRowLeft: { flex: 1 },
  wordRowKu: { fontSize: FONT_SIZE.md, fontWeight: '800', color: c.midnight[800] },
  wordRowTranslation: { fontSize: FONT_SIZE.xs, color: c.gray[400], marginTop: 2 },
  wordRowRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  masteryIndicator: { width: 6, height: 6, borderRadius: 3 },
  emptySearch: { alignItems: 'center', paddingVertical: 48 },
  emptySearchText: { fontSize: FONT_SIZE.sm, color: c.gray[400] },

  // Bottom Sheet Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: RADIUS.xl, borderTopRightRadius: RADIUS.xl, padding: SPACING.lg, paddingBottom: 32 },
  modalDragHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: c.gray[200], alignSelf: 'center', marginBottom: SPACING.md },
  detailContainer: { gap: SPACING.md },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailWordKu: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: c.midnight[800] },
  detailPartOfSpeech: { fontSize: FONT_SIZE.xs, color: c.gray[400], textTransform: 'uppercase', marginTop: 2 },
  soundBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  detailDivider: { height: 1, backgroundColor: c.gray[100], marginVertical: SPACING.xs },
  detailSection: { gap: 4 },
  detailLabel: { fontSize: 10, fontWeight: '800', color: c.gray[400], letterSpacing: 1 },
  detailTranslation: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: c.midnight[800] },
  detailExampleKu: { fontSize: FONT_SIZE.md, fontWeight: '600', color: c.midnight[800], fontStyle: 'italic' },
  detailExampleTranslation: { fontSize: FONT_SIZE.sm, color: c.gray[500] },
  masteryBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  masteryDot: { width: 8, height: 8, borderRadius: 4 },
  masteryStatusText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.gray[600] },
  closeBtn: { borderRadius: RADIUS.md, paddingVertical: SPACING.md, alignItems: 'center', marginTop: SPACING.sm },
  closeBtnText: { fontSize: FONT_SIZE.md, fontWeight: '700', color: '#FFFFFF' },
});
