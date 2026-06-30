/**
 * Badge / achievement definitions for Fêrbûn.
 *
 * All badge IDs are stable strings — they are used as AsyncStorage keys and
 * must not be renamed once shipped (doing so forfeits earned badges on update).
 *
 * Badge categories:
 *   learning  — completing lessons and the course
 *   streak    — maintaining consecutive-day practice
 *   vocab     — mastering vocabulary
 *   quality   — perfect scores and combo achievements
 *   stories   — reading comprehension
 */

export interface BadgeDef {
  id: string;
  /** Kurmanji name (shown first). */
  nameKu: string;
  /** Turkish name. */
  nameTr: string;
  /** English name. */
  nameEn: string;
  /** Brief description. */
  descTr: string;
  descEn: string;
  /** Ionicons glyph name (fallback). */
  icon: string;
  /** Traditional Kurdish Motif identifier. */
  motif: 'horn' | 'sahmaran' | 'sun' | 'tree' | 'fire' | 'eagle' | 'kilim';
  /** Background tint for the badge card. */
  color: string;
  category: 'learning' | 'streak' | 'vocab' | 'quality' | 'stories';
}

export const ALL_BADGES: BadgeDef[] = [
  // ──────────────────────────────────────────── Learning
  {
    id: 'first_lesson',
    nameKu: 'Peyvên Pêşîn',
    nameTr: 'İlk Kelimeler',
    nameEn: 'First Words',
    descTr: 'İlk dersi tamamla',
    descEn: 'Complete your first lesson',
    icon: 'book-outline',
    motif: 'horn',
    color: '#3B82F6',
    category: 'learning',
  },
  {
    id: 'ten_lessons',
    nameKu: 'Xwendekar',
    nameTr: 'Öğrenci',
    nameEn: 'Student',
    descTr: '10 ders tamamla',
    descEn: 'Complete 10 lessons',
    icon: 'school-outline',
    motif: 'horn',
    color: '#8B5CF6',
    category: 'learning',
  },
  {
    id: 'all_lessons',
    nameKu: 'Mamosta',
    nameTr: 'Öğretmen',
    nameEn: 'Teacher',
    descTr: 'Tüm dersleri tamamla',
    descEn: 'Complete all lessons',
    icon: 'ribbon-outline',
    motif: 'sahmaran',
    color: '#F59E0B',
    category: 'learning',
  },
  // ──────────────────────────────────────────── Streak
  {
    id: 'streak_3',
    nameKu: 'Sê Roj',
    nameTr: '3 Günlük Seri',
    nameEn: '3-Day Streak',
    descTr: '3 gün üst üste pratik yap',
    descEn: 'Practice 3 days in a row',
    icon: 'flame-outline',
    motif: 'sun',
    color: '#F97316',
    category: 'streak',
  },
  {
    id: 'streak_7',
    nameKu: 'Heft Roj',
    nameTr: '7 Günlük Seri',
    nameEn: '7-Day Streak',
    descTr: '7 gün üst üste pratik yap',
    descEn: 'Practice 7 days in a row',
    icon: 'flash-outline',
    motif: 'sun',
    color: '#EF4444',
    category: 'streak',
  },
  {
    id: 'streak_30',
    nameKu: 'Sî Roj',
    nameTr: '30 Günlük Seri',
    nameEn: '30-Day Streak',
    descTr: '30 gün üst üste pratik yap',
    descEn: 'Practice 30 days in a row',
    icon: 'sunny-outline',
    motif: 'sun',
    color: '#DC2626',
    category: 'streak',
  },
  // ──────────────────────────────────────────── Vocab
  {
    id: 'vocab_10_mastered',
    nameKu: 'Peyvnas',
    nameTr: 'Kelime Ustası',
    nameEn: 'Word Keeper',
    descTr: '10 kelimede ustalaş',
    descEn: 'Master 10 vocabulary words',
    icon: 'sparkles-outline',
    motif: 'tree',
    color: '#10B981',
    category: 'vocab',
  },
  {
    id: 'vocab_50_mastered',
    nameKu: 'Çêrvanê Peyvê',
    nameTr: 'Kelime Koruyucusu',
    nameEn: 'Word Guardian',
    descTr: '50 kelimede ustalaş',
    descEn: 'Master 50 vocabulary words',
    icon: 'diamond-outline',
    motif: 'tree',
    color: '#059669',
    category: 'vocab',
  },
  // ──────────────────────────────────────────── Quality
  {
    id: 'perfect_lesson',
    nameKu: 'Roja Bêkêmasî',
    nameTr: 'Mükemmel Ders',
    nameEn: 'Perfect Lesson',
    descTr: 'Bir derste %100 al',
    descEn: 'Score 100% on any lesson',
    icon: 'star-outline',
    motif: 'fire',
    color: '#EA580C',
    category: 'quality',
  },
  {
    id: 'combo_master',
    nameKu: 'Şer-Komboyê',
    nameTr: 'Combo Ustası',
    nameEn: 'Combo Master',
    descTr: '10\'lu combo yap',
    descEn: 'Achieve a 10-answer combo',
    icon: 'flame',
    motif: 'eagle',
    color: '#EF4444',
    category: 'quality',
  },
  // ──────────────────────────────────────────── Stories
  {
    id: 'first_story',
    nameKu: 'Çîrokxwîn',
    nameTr: 'Hikaye Okuyucu',
    nameEn: 'Story Reader',
    descTr: 'İlk hikayeyi bitir',
    descEn: 'Complete your first story',
    icon: 'book',
    motif: 'kilim',
    color: '#6366F1',
    category: 'stories',
  },
  {
    id: 'all_stories',
    nameKu: 'Qehremanê Çîrokan',
    nameTr: 'Hikaye Kahramanı',
    nameEn: 'Story Champion',
    descTr: 'Tüm hikayeleri bitir',
    descEn: 'Complete all stories',
    icon: 'library-outline',
    motif: 'kilim',
    color: '#4F46E5',
    category: 'stories',
  },
];
