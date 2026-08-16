// Fêrbûn: the exercises for the twelve lessons of the Sorani course "Building
// Sentences". Attached to their lessons in ./c2.ts, which is where the tree
// says which words each lesson draws on.
//
// The standing rules are set out at the head of ./c1-exercises.ts and hold here
// unchanged: an exercise carries no citation of its own, so every Sorani token
// in one is a wordKu the glossary already cites (LEX-01 in ../../validate.ts);
// no exercise joins two Sorani words into a phrase, because a phrase is a claim
// about grammar this corpus has not made; the English and Turkish sides are
// bridge copy with no locator; distractors come from the lesson's own pool.
// Each lesson carries six exercises in the shape course 1 settled on: two
// multiple_choice reading Sorani, one writing it, one true_false, one writing
// and one translation, with the review lesson trading a multiple_choice for a
// match_pairs.
//
// WHAT IS DIFFERENT ABOUT THIS COURSE. Nothing in the rules, and one thing in
// the material: unit 4 is adjectives and unit 6 is numerals, and an adjective
// or a numeral is the part of speech a sentence exercise would most want to put
// to work. None does. gewre is taught as the word for large, not as the large
// half of a noun phrase, because attributive order and the izafe that carries
// it are grammar and this is a glossary.
//
// Where two entries of one lesson share an English word, they are kept out of
// each other's option sets rather than glossed apart by hand: berz "high, tall"
// and drêj "long" both reach uzun in Turkish, and no option set below offers
// both.
//
// No native speaker has reviewed any of it: not the forms, not the glosses and
// not whether these are the right words to teach in this order.

import type { SoraniExercise } from '../exercises';

// ===== UNIT 4: DESCRIPTIONS =====

// ckb-l4_1 Colors: sûr, reş, sewz, zerd, spî, şîn, bor
export const CKB_L4_1: SoraniExercise[] = [
  { id: 'ckb-l4_1-e1', lessonId: 'ckb-l4_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'sûr', questionEn: 'What does this word mean?', options: ['red', 'black', 'green', 'yellow'], correctAnswer: 'red', questionTr: 'Bu kelime ne demek?', optionsTr: ['kırmızı', 'siyah', 'yeşil', 'sarı'], correctAnswerTr: 'kırmızı', order: 1 },
  { id: 'ckb-l4_1-e2', lessonId: 'ckb-l4_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'şîn', questionEn: 'What does this word mean?', options: ['dark blue, dark green', 'gray', 'white', 'black'], correctAnswer: 'dark blue, dark green', questionTr: 'Bu kelime ne demek?', optionsTr: ['koyu mavi, koyu yeşil', 'gri', 'beyaz', 'siyah'], correctAnswerTr: 'koyu mavi, koyu yeşil', order: 2 },
  { id: 'ckb-l4_1-e3', lessonId: 'ckb-l4_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "green" in Sorani?', options: ['sewz', 'zerd', 'spî', 'bor'], correctAnswer: 'sewz', questionTr: '"yeşil" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l4_1-e4', lessonId: 'ckb-l4_1', type: 'true_false', answerIn: 'bridge', questionKu: 'zerd', questionEn: 'Does this word mean "white"?', correctAnswer: 'False', explanation: 'It means "yellow".', questionTr: 'Bu kelime "beyaz" demek mi?', explanationTr: '"Sarı" demek.', order: 4 },
  { id: 'ckb-l4_1-e5', lessonId: 'ckb-l4_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "black" in Sorani.', correctAnswer: 'reş', questionTr: '"siyah" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l4_1-e6', lessonId: 'ckb-l4_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "gray" in Sorani.', correctAnswer: 'bor', questionTr: '"gri" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l4_2 Size & Shape: gewre, biçûk, berz, qûll, drêj, qut, giran
export const CKB_L4_2: SoraniExercise[] = [
  { id: 'ckb-l4_2-e1', lessonId: 'ckb-l4_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'gewre', questionEn: 'What does this word mean?', options: ['large, big, great', 'small, little', 'high, tall', 'deep'], correctAnswer: 'large, big, great', questionTr: 'Bu kelime ne demek?', optionsTr: ['büyük, ulu', 'küçük, ufak', 'yüksek, uzun', 'derin'], correctAnswerTr: 'büyük, ulu', order: 1 },
  { id: 'ckb-l4_2-e2', lessonId: 'ckb-l4_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'qut', questionEn: 'What does this word mean?', options: ['short, brief', 'long', 'deep', 'heavy'], correctAnswer: 'short, brief', questionTr: 'Bu kelime ne demek?', optionsTr: ['kısa', 'uzun', 'derin', 'ağır'], correctAnswerTr: 'kısa', order: 2 },
  { id: 'ckb-l4_2-e3', lessonId: 'ckb-l4_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "small, little" in Sorani?', options: ['biçûk', 'gewre', 'drêj', 'giran'], correctAnswer: 'biçûk', questionTr: '"küçük, ufak" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l4_2-e4', lessonId: 'ckb-l4_2', type: 'true_false', answerIn: 'bridge', questionKu: 'giran', questionEn: 'Does this word mean "heavy"?', correctAnswer: 'True', questionTr: 'Bu kelime "ağır" demek mi?', order: 4 },
  { id: 'ckb-l4_2-e5', lessonId: 'ckb-l4_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "long" in Sorani.', correctAnswer: 'drêj', questionTr: '"uzun" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l4_2-e6', lessonId: 'ckb-l4_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "deep" in Sorani.', correctAnswer: 'qûll', questionTr: '"derin" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l4_3 Quality & Condition: germ, sard, nwê, kewn, pak, cwan, noll
export const CKB_L4_3: SoraniExercise[] = [
  { id: 'ckb-l4_3-e1', lessonId: 'ckb-l4_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'germ', questionEn: 'What does this word mean?', options: ['warm, hot', 'cold', 'new', 'old'], correctAnswer: 'warm, hot', questionTr: 'Bu kelime ne demek?', optionsTr: ['sıcak, ılık', 'soğuk', 'yeni', 'eski'], correctAnswerTr: 'sıcak, ılık', order: 1 },
  { id: 'ckb-l4_3-e2', lessonId: 'ckb-l4_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'cwan', questionEn: 'What does this word mean?', options: ['pretty, beautiful', 'pure, clean', 'soft', 'new'], correctAnswer: 'pretty, beautiful', questionTr: 'Bu kelime ne demek?', optionsTr: ['güzel', 'saf, temiz', 'yumuşak', 'yeni'], correctAnswerTr: 'güzel', order: 2 },
  { id: 'ckb-l4_3-e3', lessonId: 'ckb-l4_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "cold" in Sorani?', options: ['sard', 'germ', 'nwê', 'noll'], correctAnswer: 'sard', questionTr: '"soğuk" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l4_3-e4', lessonId: 'ckb-l4_3', type: 'true_false', answerIn: 'bridge', questionKu: 'kewn', questionEn: 'Does this word mean "new"?', correctAnswer: 'False', explanation: 'It means "old".', questionTr: 'Bu kelime "yeni" demek mi?', explanationTr: '"Eski" demek.', order: 4 },
  { id: 'ckb-l4_3-e5', lessonId: 'ckb-l4_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "new" in Sorani.', correctAnswer: 'nwê', questionTr: '"yeni" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l4_3-e6', lessonId: 'ckb-l4_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "pure, clean" in Sorani.', correctAnswer: 'pak', questionTr: '"saf, temiz" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l4_4 Review: Descriptions, across all 21 words of the unit
export const CKB_L4_4: SoraniExercise[] = [
  { id: 'ckb-l4_4-e1', lessonId: 'ckb-l4_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'sûr', en: 'red', tr: 'kırmızı' }, { ku: 'reş', en: 'black', tr: 'siyah' }, { ku: 'sewz', en: 'green', tr: 'yeşil' }, { ku: 'spî', en: 'white', tr: 'beyaz' }], order: 1 },
  { id: 'ckb-l4_4-e2', lessonId: 'ckb-l4_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'noll', questionEn: 'What does this word mean?', options: ['soft', 'heavy', 'deep', 'short, brief'], correctAnswer: 'soft', questionTr: 'Bu kelime ne demek?', optionsTr: ['yumuşak', 'ağır', 'derin', 'kısa'], correctAnswerTr: 'yumuşak', order: 2 },
  { id: 'ckb-l4_4-e3', lessonId: 'ckb-l4_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "high, tall" in Sorani?', options: ['berz', 'gewre', 'qûll', 'giran'], correctAnswer: 'berz', questionTr: '"yüksek, uzun" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l4_4-e4', lessonId: 'ckb-l4_4', type: 'true_false', answerIn: 'bridge', questionKu: 'biçûk', questionEn: 'Does this word mean "large, big, great"?', correctAnswer: 'False', explanation: 'It means "small, little".', questionTr: 'Bu kelime "büyük, ulu" demek mi?', explanationTr: '"Küçük, ufak" demek.', order: 4 },
  { id: 'ckb-l4_4-e5', lessonId: 'ckb-l4_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "yellow" in Sorani.', correctAnswer: 'zerd', questionTr: '"sarı" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l4_4-e6', lessonId: 'ckb-l4_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "warm, hot" in Sorani.', correctAnswer: 'germ', questionTr: '"sıcak, ılık" kelimesini Soranice yaz.', order: 6 },
];

// ===== UNIT 5: NATURE & ANIMALS =====

// ckb-l5_1 Land & Sky: çya, çom, dar, zewî, berd, xak, asman, jûrû, cinûb
export const CKB_L5_1: SoraniExercise[] = [
  { id: 'ckb-l5_1-e1', lessonId: 'ckb-l5_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'çya', questionEn: 'What does this word mean?', options: ['mountain', 'river', 'tree', 'stone'], correctAnswer: 'mountain', questionTr: 'Bu kelime ne demek?', optionsTr: ['dağ', 'nehir', 'ağaç', 'taş'], correctAnswerTr: 'dağ', order: 1 },
  // earth and ground are Thackston's two glosses for two headwords, xak and
  // zewî, and ../vocab/nature.ts records that the split between them is this
  // corpus's and not his. They are the answer and a distractor here for that
  // reason: the pair is the thing to learn.
  { id: 'ckb-l5_1-e2', lessonId: 'ckb-l5_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'xak', questionEn: 'What does this word mean?', options: ['earth', 'ground', 'stone', 'sky'], correctAnswer: 'earth', questionTr: 'Bu kelime ne demek?', optionsTr: ['toprak', 'yer, zemin', 'taş', 'gökyüzü'], correctAnswerTr: 'toprak', order: 2 },
  { id: 'ckb-l5_1-e3', lessonId: 'ckb-l5_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "sky" in Sorani?', options: ['asman', 'çom', 'berd', 'dar'], correctAnswer: 'asman', questionTr: '"gökyüzü" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l5_1-e4', lessonId: 'ckb-l5_1', type: 'true_false', answerIn: 'bridge', questionKu: 'jûrû', questionEn: 'Does this word mean "south"?', correctAnswer: 'False', explanation: 'It means "north".', questionTr: 'Bu kelime "güney" demek mi?', explanationTr: '"Kuzey" demek.', order: 4 },
  { id: 'ckb-l5_1-e5', lessonId: 'ckb-l5_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "river" in Sorani.', correctAnswer: 'çom', questionTr: '"nehir" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l5_1-e6', lessonId: 'ckb-l5_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "tree" in Sorani.', correctAnswer: 'dar', questionTr: '"ağaç" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l5_2 Animals: gurg, seg, merr, bizin, esp, ballinde, mar, pişî, mîrûle,
// rêwî, ker, manga, gûr, mirîşk, wiştir
export const CKB_L5_2: SoraniExercise[] = [
  { id: 'ckb-l5_2-e1', lessonId: 'ckb-l5_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'seg', questionEn: 'What does this word mean?', options: ['dog', 'wolf', 'cat', 'fox'], correctAnswer: 'dog', questionTr: 'Bu kelime ne demek?', optionsTr: ['köpek', 'kurt', 'kedi', 'tilki'], correctAnswerTr: 'köpek', order: 1 },
  { id: 'ckb-l5_2-e2', lessonId: 'ckb-l5_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'pişî', questionEn: 'What does this word mean?', options: ['cat', 'dog', 'goat', 'ant'], correctAnswer: 'cat', questionTr: 'Bu kelime ne demek?', optionsTr: ['kedi', 'köpek', 'keçi', 'karınca'], correctAnswerTr: 'kedi', order: 2 },
  { id: 'ckb-l5_2-e3', lessonId: 'ckb-l5_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "horse" in Sorani?', options: ['esp', 'ker', 'manga', 'merr'], correctAnswer: 'esp', questionTr: '"at" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l5_2-e4', lessonId: 'ckb-l5_2', type: 'true_false', answerIn: 'bridge', questionKu: 'ballinde', questionEn: 'Does this word mean "bird"?', correctAnswer: 'True', questionTr: 'Bu kelime "kuş" demek mi?', order: 4 },
  { id: 'ckb-l5_2-e5', lessonId: 'ckb-l5_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "snake" in Sorani.', correctAnswer: 'mar', questionTr: '"yılan" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l5_2-e6', lessonId: 'ckb-l5_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "camel" in Sorani.', correctAnswer: 'wiştir', questionTr: '"deve" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l5_3 Weather & Seasons: befr, baran, ba, xor, mang, estêre, hewr, behar,
// hawîn, payiz, zistan
export const CKB_L5_3: SoraniExercise[] = [
  { id: 'ckb-l5_3-e1', lessonId: 'ckb-l5_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'befr', questionEn: 'What does this word mean?', options: ['snow', 'rain', 'wind', 'cloud'], correctAnswer: 'snow', questionTr: 'Bu kelime ne demek?', optionsTr: ['kar', 'yağmur', 'rüzgar', 'bulut'], correctAnswerTr: 'kar', order: 1 },
  { id: 'ckb-l5_3-e2', lessonId: 'ckb-l5_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'payiz', questionEn: 'What does this word mean?', options: ['autumn', 'spring', 'summer', 'winter'], correctAnswer: 'autumn', questionTr: 'Bu kelime ne demek?', optionsTr: ['sonbahar', 'ilkbahar', 'yaz', 'kış'], correctAnswerTr: 'sonbahar', order: 2 },
  { id: 'ckb-l5_3-e3', lessonId: 'ckb-l5_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "star" in Sorani?', options: ['estêre', 'mang', 'xor', 'hewr'], correctAnswer: 'estêre', questionTr: '"yıldız" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l5_3-e4', lessonId: 'ckb-l5_3', type: 'true_false', answerIn: 'bridge', questionKu: 'baran', questionEn: 'Does this word mean "snow"?', correctAnswer: 'False', explanation: 'It means "rain".', questionTr: 'Bu kelime "kar" demek mi?', explanationTr: '"Yağmur" demek.', order: 4 },
  { id: 'ckb-l5_3-e5', lessonId: 'ckb-l5_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "wind" in Sorani.', correctAnswer: 'ba', questionTr: '"rüzgar" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l5_3-e6', lessonId: 'ckb-l5_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "winter" in Sorani.', correctAnswer: 'zistan', questionTr: '"kış" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l5_4 Review: Nature & Animals, across all 35 words of the unit
export const CKB_L5_4: SoraniExercise[] = [
  { id: 'ckb-l5_4-e1', lessonId: 'ckb-l5_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'çya', en: 'mountain', tr: 'dağ' }, { ku: 'dar', en: 'tree', tr: 'ağaç' }, { ku: 'befr', en: 'snow', tr: 'kar' }, { ku: 'seg', en: 'dog', tr: 'köpek' }], order: 1 },
  { id: 'ckb-l5_4-e2', lessonId: 'ckb-l5_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'mîrûle', questionEn: 'What does this word mean?', options: ['ant', 'fox', 'calf', 'sheep'], correctAnswer: 'ant', questionTr: 'Bu kelime ne demek?', optionsTr: ['karınca', 'tilki', 'buzağı', 'koyun'], correctAnswerTr: 'karınca', order: 2 },
  { id: 'ckb-l5_4-e3', lessonId: 'ckb-l5_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "moon" in Sorani?', options: ['mang', 'xor', 'estêre', 'asman'], correctAnswer: 'mang', questionTr: '"ay" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l5_4-e4', lessonId: 'ckb-l5_4', type: 'true_false', answerIn: 'bridge', questionKu: 'hawîn', questionEn: 'Does this word mean "summer"?', correctAnswer: 'True', questionTr: 'Bu kelime "yaz" demek mi?', order: 4 },
  { id: 'ckb-l5_4-e5', lessonId: 'ckb-l5_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "cow" in Sorani.', correctAnswer: 'manga', questionTr: '"inek" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l5_4-e6', lessonId: 'ckb-l5_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "south" in Sorani.', correctAnswer: 'cinûb', questionTr: '"güney" kelimesini Soranice yaz.', order: 6 },
];

// ===== UNIT 6: NUMBERS & TIME =====

// ckb-l6_1 Numbers 1-10: yêk, dû, sê, çwar, pênc, şeş, hewt, heşt, no, de
export const CKB_L6_1: SoraniExercise[] = [
  { id: 'ckb-l6_1-e1', lessonId: 'ckb-l6_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'sê', questionEn: 'What does this word mean?', options: ['three', 'two', 'four', 'five'], correctAnswer: 'three', questionTr: 'Bu kelime ne demek?', optionsTr: ['üç', 'iki', 'dört', 'beş'], correctAnswerTr: 'üç', order: 1 },
  { id: 'ckb-l6_1-e2', lessonId: 'ckb-l6_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'heşt', questionEn: 'What does this word mean?', options: ['eight', 'seven', 'nine', 'ten'], correctAnswer: 'eight', questionTr: 'Bu kelime ne demek?', optionsTr: ['sekiz', 'yedi', 'dokuz', 'on'], correctAnswerTr: 'sekiz', order: 2 },
  { id: 'ckb-l6_1-e3', lessonId: 'ckb-l6_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "one" in Sorani?', options: ['yêk', 'dû', 'no', 'de'], correctAnswer: 'yêk', questionTr: '"bir" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l6_1-e4', lessonId: 'ckb-l6_1', type: 'true_false', answerIn: 'bridge', questionKu: 'şeş', questionEn: 'Does this word mean "six"?', correctAnswer: 'True', questionTr: 'Bu kelime "altı" demek mi?', order: 4 },
  { id: 'ckb-l6_1-e5', lessonId: 'ckb-l6_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "ten" in Sorani.', correctAnswer: 'de', questionTr: '"on" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l6_1-e6', lessonId: 'ckb-l6_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "five" in Sorani.', correctAnswer: 'pênc', questionTr: '"beş" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l6_2 Tens & Hundreds: bîst, sî, çil, penca, sed, hezar
export const CKB_L6_2: SoraniExercise[] = [
  { id: 'ckb-l6_2-e1', lessonId: 'ckb-l6_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'bîst', questionEn: 'What does this word mean?', options: ['twenty', 'thirty', 'forty', 'fifty'], correctAnswer: 'twenty', questionTr: 'Bu kelime ne demek?', optionsTr: ['yirmi', 'otuz', 'kırk', 'elli'], correctAnswerTr: 'yirmi', order: 1 },
  { id: 'ckb-l6_2-e2', lessonId: 'ckb-l6_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'hezar', questionEn: 'What does this word mean?', options: ['thousand', 'hundred', 'fifty', 'forty'], correctAnswer: 'thousand', questionTr: 'Bu kelime ne demek?', optionsTr: ['bin', 'yüz', 'elli', 'kırk'], correctAnswerTr: 'bin', order: 2 },
  { id: 'ckb-l6_2-e3', lessonId: 'ckb-l6_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "thirty" in Sorani?', options: ['sî', 'çil', 'penca', 'bîst'], correctAnswer: 'sî', questionTr: '"otuz" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l6_2-e4', lessonId: 'ckb-l6_2', type: 'true_false', answerIn: 'bridge', questionKu: 'sed', questionEn: 'Does this word mean "thousand"?', correctAnswer: 'False', explanation: 'It means "hundred".', questionTr: 'Bu kelime "bin" demek mi?', explanationTr: '"Yüz" demek.', order: 4 },
  { id: 'ckb-l6_2-e5', lessonId: 'ckb-l6_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "forty" in Sorani.', correctAnswer: 'çil', questionTr: '"kırk" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l6_2-e6', lessonId: 'ckb-l6_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "fifty" in Sorani.', correctAnswer: 'penca', questionTr: '"elli" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l6_3 Days & Times of Day: roj, şew, hefte, sall, seat, beyanî, êware,
// êsta, imrro, dwênê, zû, direng, hemîşe
export const CKB_L6_3: SoraniExercise[] = [
  { id: 'ckb-l6_3-e1', lessonId: 'ckb-l6_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'roj', questionEn: 'What does this word mean?', options: ['day', 'night', 'week', 'year'], correctAnswer: 'day', questionTr: 'Bu kelime ne demek?', optionsTr: ['gün', 'gece', 'hafta', 'yıl'], correctAnswerTr: 'gün', order: 1 },
  { id: 'ckb-l6_3-e2', lessonId: 'ckb-l6_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'beyanî', questionEn: 'What does this word mean?', options: ['morning', 'evening', 'night', 'today'], correctAnswer: 'morning', questionTr: 'Bu kelime ne demek?', optionsTr: ['sabah', 'akşam', 'gece', 'bugün'], correctAnswerTr: 'sabah', order: 2 },
  { id: 'ckb-l6_3-e3', lessonId: 'ckb-l6_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "now" in Sorani?', options: ['êsta', 'imrro', 'dwênê', 'hemîşe'], correctAnswer: 'êsta', questionTr: '"şimdi" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l6_3-e4', lessonId: 'ckb-l6_3', type: 'true_false', answerIn: 'bridge', questionKu: 'direng', questionEn: 'Does this word mean "early, soon"?', correctAnswer: 'False', explanation: 'It means "late".', questionTr: 'Bu kelime "erken, yakında" demek mi?', explanationTr: '"Geç" demek.', order: 4 },
  { id: 'ckb-l6_3-e5', lessonId: 'ckb-l6_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "week" in Sorani.', correctAnswer: 'hefte', questionTr: '"hafta" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l6_3-e6', lessonId: 'ckb-l6_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "yesterday" in Sorani.', correctAnswer: 'dwênê', questionTr: '"dün" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l6_4 Review: Numbers & Time, across all 29 words of the unit
export const CKB_L6_4: SoraniExercise[] = [
  { id: 'ckb-l6_4-e1', lessonId: 'ckb-l6_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'yêk', en: 'one', tr: 'bir' }, { ku: 'sê', en: 'three', tr: 'üç' }, { ku: 'de', en: 'ten', tr: 'on' }, { ku: 'sed', en: 'hundred', tr: 'yüz' }], order: 1 },
  { id: 'ckb-l6_4-e2', lessonId: 'ckb-l6_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'hemîşe', questionEn: 'What does this word mean?', options: ['always', 'now', 'late', 'early, soon'], correctAnswer: 'always', questionTr: 'Bu kelime ne demek?', optionsTr: ['her zaman', 'şimdi', 'geç', 'erken, yakında'], correctAnswerTr: 'her zaman', order: 2 },
  { id: 'ckb-l6_4-e3', lessonId: 'ckb-l6_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "night" in Sorani?', options: ['şew', 'roj', 'sall', 'hefte'], correctAnswer: 'şew', questionTr: '"gece" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l6_4-e4', lessonId: 'ckb-l6_4', type: 'true_false', answerIn: 'bridge', questionKu: 'çwar', questionEn: 'Does this word mean "four"?', correctAnswer: 'True', questionTr: 'Bu kelime "dört" demek mi?', order: 4 },
  { id: 'ckb-l6_4-e5', lessonId: 'ckb-l6_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "year" in Sorani.', correctAnswer: 'sall', questionTr: '"yıl" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l6_4-e6', lessonId: 'ckb-l6_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "hour, clock, o\'clock" in Sorani.', correctAnswer: 'seat', questionTr: '"saat" kelimesini Soranice yaz.', order: 6 },
];
