// Fêrbûn: the exercises for the twelve lessons of the Sorani course "First
// Words". Attached to their lessons in ./c1.ts, which is where the tree says
// which words each lesson draws on.
//
// WHAT MAKES THESE VERIFIABLE. Not a citation: an exercise is authored pedagogy
// and no page of Thackston prints one. What is checked instead is that no
// exercise asserts a word the glossary does not already carry. Every Sorani
// token below is a wordKu in ../vocabulary.ts, cited there to its own page, and
// LEX-01 in ../../validate.ts fails the build if one is not. So the provenance
// of an exercise is the provenance of the words it is built from, and nothing
// here adds a claim about the language on its own authority.
//
// ONE WORD AT A TIME, AND WHY. A Sorani sentence is a claim about Sorani
// grammar, and this corpus has no grammar milestone yet: it has a glossary. So
// no exercise below joins two Sorani words into a phrase. The single exception
// is bo çi "why?, what for?", which is two words on the page and one headword
// (THK06:173), cited as a unit and used as a unit.
// That rules out fill_blank, the sixth exercise type. Its shape is a sentence
// with a word missing, so authoring one means authoring a sentence. The other
// five types are here: multiple_choice in both directions, true_false,
// match_pairs, writing and translation.
//
// The English and Turkish sides are bridge copy, authored for this app and
// carrying no locator, exactly as a Turkish gloss does. The English glosses in
// the options and the prompts are Thackston's own, trimmed to fit an option
// row; the Turkish ones are the ../vocab entries' wordTr. No Sorani appears in
// an explanation: an explanation is prose, LEX-01 has no way to tell a taught
// form inside it from bridge copy, so the correction is given as a gloss.
//
// Distractors are drawn from the same lesson's pool wherever the pool allows
// it, so a wrong answer is still a word the learner is meeting.
// No native speaker has reviewed any of it: not the forms, not the glosses and
// not whether these are the right words to teach first.

import type { SoraniExercise } from '../exercises';

// ===== UNIT 1: GREETINGS & BASICS =====

// ckb-l1_1 Greetings & Friends: sllaw, spas, baş, awell, dost, mîwan, xatir
export const CKB_L1_1: SoraniExercise[] = [
  { id: 'ckb-l1_1-e1', lessonId: 'ckb-l1_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'sllaw', questionEn: 'What does this word mean?', options: ['greetings', 'thanks', 'good', 'guest'], correctAnswer: 'greetings', questionTr: 'Bu kelime ne demek?', optionsTr: ['selam', 'teşekkürler', 'iyi', 'misafir'], correctAnswerTr: 'selam', order: 1 },
  { id: 'ckb-l1_1-e2', lessonId: 'ckb-l1_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "thanks" in Sorani?', options: ['spas', 'sllaw', 'dost', 'baş'], correctAnswer: 'spas', questionTr: '"teşekkürler" Soranice nasıl denir?', order: 2 },
  { id: 'ckb-l1_1-e3', lessonId: 'ckb-l1_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'mîwan', questionEn: 'What does this word mean?', options: ['guest', 'friend', 'greetings', 'mind'], correctAnswer: 'guest', questionTr: 'Bu kelime ne demek?', optionsTr: ['misafir', 'arkadaş', 'selam', 'hatır'], correctAnswerTr: 'misafir', order: 3 },
  { id: 'ckb-l1_1-e4', lessonId: 'ckb-l1_1', type: 'true_false', answerIn: 'bridge', questionKu: 'dost', questionEn: 'Does this word mean "friend"?', correctAnswer: 'True', questionTr: 'Bu kelime "arkadaş" demek mi?', order: 4 },
  { id: 'ckb-l1_1-e5', lessonId: 'ckb-l1_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "good" in Sorani.', correctAnswer: 'baş', questionTr: '"iyi" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l1_1-e6', lessonId: 'ckb-l1_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "companion" in Sorani.', correctAnswer: 'awell', questionTr: '"yoldaş" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l1_2 Yes, No & Common Words: erê, ne, zor, tenha, hemû, u, bellam
export const CKB_L1_2: SoraniExercise[] = [
  { id: 'ckb-l1_2-e1', lessonId: 'ckb-l1_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "yes" in Sorani?', options: ['erê', 'ne', 'baş', 'u'], correctAnswer: 'erê', questionTr: '"evet" Soranice nasıl denir?', order: 1 },
  { id: 'ckb-l1_2-e2', lessonId: 'ckb-l1_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'zor', questionEn: 'What does this word mean?', options: ['very, a lot', 'only, alone', 'all, every', 'but'], correctAnswer: 'very, a lot', questionTr: 'Bu kelime ne demek?', optionsTr: ['çok, fazla', 'yalnız, sadece', 'hep, bütün', 'ama'], correctAnswerTr: 'çok, fazla', order: 2 },
  { id: 'ckb-l1_2-e3', lessonId: 'ckb-l1_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'bellam', questionEn: 'What does this word mean?', options: ['but', 'and', 'only, alone', 'all, every'], correctAnswer: 'but', questionTr: 'Bu kelime ne demek?', optionsTr: ['ama', 've', 'yalnız, sadece', 'hep, bütün'], correctAnswerTr: 'ama', order: 3 },
  { id: 'ckb-l1_2-e4', lessonId: 'ckb-l1_2', type: 'true_false', answerIn: 'bridge', questionKu: 'hemû', questionEn: 'Does this word mean "all, every"?', correctAnswer: 'True', questionTr: 'Bu kelime "hep, bütün" demek mi?', order: 4 },
  { id: 'ckb-l1_2-e5', lessonId: 'ckb-l1_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "no" in Sorani.', correctAnswer: 'ne', questionTr: '"hayır" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l1_2-e6', lessonId: 'ckb-l1_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "and" in Sorani.', correctAnswer: 'u', questionTr: '"ve" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l1_3 This, That & Questions: eme, ew, çi, kê, bo çi, çon, ke, be, le
export const CKB_L1_3: SoraniExercise[] = [
  { id: 'ckb-l1_3-e1', lessonId: 'ckb-l1_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'eme', questionEn: 'What does this word mean?', options: ['this', 'he, she, it; that', 'who?', 'what?'], correctAnswer: 'this', questionTr: 'Bu kelime ne demek?', optionsTr: ['bu', 'o; şu', 'kim?', 'ne?'], correctAnswerTr: 'bu', order: 1 },
  { id: 'ckb-l1_3-e2', lessonId: 'ckb-l1_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'çi', questionEn: 'What does this word mean?', options: ['what?', 'who?', 'how?', 'why?, what for?'], correctAnswer: 'what?', questionTr: 'Bu kelime ne demek?', optionsTr: ['ne?', 'kim?', 'nasıl?', 'neden?, ne için?'], correctAnswerTr: 'ne?', order: 2 },
  { id: 'ckb-l1_3-e3', lessonId: 'ckb-l1_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "who?" in Sorani?', options: ['kê', 'çi', 'çon', 'ke'], correctAnswer: 'kê', questionTr: '"kim?" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l1_3-e4', lessonId: 'ckb-l1_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'bo çi', questionEn: 'What does this phrase mean?', options: ['why?, what for?', 'how?', 'when; that', 'by, with'], correctAnswer: 'why?, what for?', questionTr: 'Bu ifade ne demek?', optionsTr: ['neden?, ne için?', 'nasıl?', 'ki; …dığı zaman', 'ile'], correctAnswerTr: 'neden?, ne için?', order: 4 },
  { id: 'ckb-l1_3-e5', lessonId: 'ckb-l1_3', type: 'true_false', answerIn: 'bridge', questionKu: 'çon', questionEn: 'Does this word mean "how"?', correctAnswer: 'True', questionTr: 'Bu kelime "nasıl" demek mi?', order: 5 },
  { id: 'ckb-l1_3-e6', lessonId: 'ckb-l1_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "in, at, from" in Sorani.', correctAnswer: 'le', questionTr: '"…de, …den" ekini Soranice yaz.', order: 6 },
];

// ckb-l1_4 Review: Basics, across all 23 words of the unit
export const CKB_L1_4: SoraniExercise[] = [
  { id: 'ckb-l1_4-e1', lessonId: 'ckb-l1_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'sllaw', en: 'greetings', tr: 'selam' }, { ku: 'spas', en: 'thanks', tr: 'teşekkürler' }, { ku: 'mîwan', en: 'guest', tr: 'misafir' }, { ku: 'dost', en: 'friend', tr: 'arkadaş' }], order: 1 },
  { id: 'ckb-l1_4-e2', lessonId: 'ckb-l1_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'tenha', questionEn: 'What does this word mean?', options: ['only, alone', 'all, every', 'very, a lot', 'but'], correctAnswer: 'only, alone', questionTr: 'Bu kelime ne demek?', optionsTr: ['yalnız, sadece', 'hep, bütün', 'çok, fazla', 'ama'], correctAnswerTr: 'yalnız, sadece', order: 2 },
  { id: 'ckb-l1_4-e3', lessonId: 'ckb-l1_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "mind" in Sorani?', options: ['xatir', 'awell', 'baş', 'spas'], correctAnswer: 'xatir', questionTr: '"hatır" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l1_4-e4', lessonId: 'ckb-l1_4', type: 'true_false', answerIn: 'bridge', questionKu: 'erê', questionEn: 'Does this word mean "no"?', correctAnswer: 'False', explanation: 'It means "yes".', questionTr: 'Bu kelime "hayır" demek mi?', explanationTr: '"Evet" demek.', order: 4 },
  { id: 'ckb-l1_4-e5', lessonId: 'ckb-l1_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "who?" in Sorani.', correctAnswer: 'kê', questionTr: '"kim?" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l1_4-e6', lessonId: 'ckb-l1_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "this" in Sorani.', correctAnswer: 'eme', questionTr: '"bu" kelimesini Soranice yaz.', order: 6 },
];

// ===== UNIT 2: PEOPLE & FAMILY =====

// ckb-l2_1 Parents & Siblings: bawk, dayk, bira, xwişk, mam
export const CKB_L2_1: SoraniExercise[] = [
  { id: 'ckb-l2_1-e1', lessonId: 'ckb-l2_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'bawk', questionEn: 'What does this word mean?', options: ['father', 'mother', 'brother', 'sister'], correctAnswer: 'father', questionTr: 'Bu kelime ne demek?', optionsTr: ['baba', 'anne', 'erkek kardeş', 'kız kardeş'], correctAnswerTr: 'baba', order: 1 },
  { id: 'ckb-l2_1-e2', lessonId: 'ckb-l2_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "mother" in Sorani?', options: ['dayk', 'bawk', 'xwişk', 'bira'], correctAnswer: 'dayk', questionTr: '"anne" Soranice nasıl denir?', order: 2 },
  { id: 'ckb-l2_1-e3', lessonId: 'ckb-l2_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'xwişk', questionEn: 'What does this word mean?', options: ['sister', 'brother', 'mother', 'paternal uncle'], correctAnswer: 'sister', questionTr: 'Bu kelime ne demek?', optionsTr: ['kız kardeş', 'erkek kardeş', 'anne', 'amca'], correctAnswerTr: 'kız kardeş', order: 3 },
  { id: 'ckb-l2_1-e4', lessonId: 'ckb-l2_1', type: 'true_false', answerIn: 'bridge', questionKu: 'mam', questionEn: 'Does this word mean "paternal uncle"?', correctAnswer: 'True', questionTr: 'Bu kelime "amca" demek mi?', order: 4 },
  { id: 'ckb-l2_1-e5', lessonId: 'ckb-l2_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "brother" in Sorani.', correctAnswer: 'bira', questionTr: '"erkek kardeş" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l2_1-e6', lessonId: 'ckb-l2_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "father" in Sorani.', correctAnswer: 'bawk', questionTr: '"baba" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l2_2 Children & Young People: kurr, kiç, minall, law, newe, pîremêrd
export const CKB_L2_2: SoraniExercise[] = [
  { id: 'ckb-l2_2-e1', lessonId: 'ckb-l2_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'minall', questionEn: 'What does this word mean?', options: ['child', 'boy, son', 'girl, daughter', 'grandchild'], correctAnswer: 'child', questionTr: 'Bu kelime ne demek?', optionsTr: ['çocuk', 'oğlan, oğul', 'kız, kız evlat', 'torun'], correctAnswerTr: 'çocuk', order: 1 },
  { id: 'ckb-l2_2-e2', lessonId: 'ckb-l2_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'kurr', questionEn: 'What does this word mean?', options: ['boy, son', 'girl, daughter', 'youth, young man', 'old man'], correctAnswer: 'boy, son', questionTr: 'Bu kelime ne demek?', optionsTr: ['oğlan, oğul', 'kız, kız evlat', 'genç, delikanlı', 'yaşlı adam'], correctAnswerTr: 'oğlan, oğul', order: 2 },
  { id: 'ckb-l2_2-e3', lessonId: 'ckb-l2_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "girl, daughter" in Sorani?', options: ['kiç', 'kurr', 'minall', 'newe'], correctAnswer: 'kiç', questionTr: '"kız, kız evlat" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l2_2-e4', lessonId: 'ckb-l2_2', type: 'true_false', answerIn: 'bridge', questionKu: 'pîremêrd', questionEn: 'Does this word mean "old man"?', correctAnswer: 'True', questionTr: 'Bu kelime "yaşlı adam" demek mi?', order: 4 },
  { id: 'ckb-l2_2-e5', lessonId: 'ckb-l2_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "grandchild" in Sorani.', correctAnswer: 'newe', questionTr: '"torun" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l2_2-e6', lessonId: 'ckb-l2_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "youth, young man" in Sorani.', correctAnswer: 'law', questionTr: '"genç, delikanlı" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l2_3 People & Nation: binemalle, jin, kes, xellk, netewe
export const CKB_L2_3: SoraniExercise[] = [
  { id: 'ckb-l2_3-e1', lessonId: 'ckb-l2_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'binemalle', questionEn: 'What does this word mean?', options: ['family', 'people', 'nation', 'person'], correctAnswer: 'family', questionTr: 'Bu kelime ne demek?', optionsTr: ['aile', 'halk', 'millet, ulus', 'kişi'], correctAnswerTr: 'aile', order: 1 },
  { id: 'ckb-l2_3-e2', lessonId: 'ckb-l2_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'jin', questionEn: 'What does this word mean?', options: ['woman, wife', 'girl, daughter', 'mother', 'person'], correctAnswer: 'woman, wife', questionTr: 'Bu kelime ne demek?', optionsTr: ['kadın, eş', 'kız, kız evlat', 'anne', 'kişi'], correctAnswerTr: 'kadın, eş', order: 2 },
  { id: 'ckb-l2_3-e3', lessonId: 'ckb-l2_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "person" in Sorani?', options: ['kes', 'xellk', 'netewe', 'jin'], correctAnswer: 'kes', questionTr: '"kişi" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l2_3-e4', lessonId: 'ckb-l2_3', type: 'true_false', answerIn: 'bridge', questionKu: 'netewe', questionEn: 'Does this word mean "people"?', correctAnswer: 'False', explanation: 'It means "nation".', questionTr: 'Bu kelime "halk" demek mi?', explanationTr: '"Millet, ulus" demek.', order: 4 },
  { id: 'ckb-l2_3-e5', lessonId: 'ckb-l2_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "people" in Sorani.', correctAnswer: 'xellk', questionTr: '"halk" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l2_3-e6', lessonId: 'ckb-l2_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "family" in Sorani.', correctAnswer: 'binemalle', questionTr: '"aile" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l2_4 Review: People, across all 16 words of the unit
export const CKB_L2_4: SoraniExercise[] = [
  { id: 'ckb-l2_4-e1', lessonId: 'ckb-l2_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'bawk', en: 'father', tr: 'baba' }, { ku: 'dayk', en: 'mother', tr: 'anne' }, { ku: 'bira', en: 'brother', tr: 'erkek kardeş' }, { ku: 'xwişk', en: 'sister', tr: 'kız kardeş' }], order: 1 },
  { id: 'ckb-l2_4-e2', lessonId: 'ckb-l2_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'xellk', questionEn: 'What does this word mean?', options: ['people', 'nation', 'family', 'person'], correctAnswer: 'people', questionTr: 'Bu kelime ne demek?', optionsTr: ['halk', 'millet, ulus', 'aile', 'kişi'], correctAnswerTr: 'halk', order: 2 },
  { id: 'ckb-l2_4-e3', lessonId: 'ckb-l2_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "child" in Sorani?', options: ['minall', 'kurr', 'kiç', 'law'], correctAnswer: 'minall', questionTr: '"çocuk" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l2_4-e4', lessonId: 'ckb-l2_4', type: 'true_false', answerIn: 'bridge', questionKu: 'kiç', questionEn: 'Does this word mean "boy, son"?', correctAnswer: 'False', explanation: 'It means "girl, daughter".', questionTr: 'Bu kelime "oğlan, oğul" demek mi?', explanationTr: '"Kız, kız evlat" demek.', order: 4 },
  { id: 'ckb-l2_4-e5', lessonId: 'ckb-l2_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "woman, wife" in Sorani.', correctAnswer: 'jin', questionTr: '"kadın, eş" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l2_4-e6', lessonId: 'ckb-l2_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "paternal uncle" in Sorani.', correctAnswer: 'mam', questionTr: '"amca" kelimesini Soranice yaz.', order: 6 },
];

// ===== UNIT 3: EVERYDAY WORDS =====

// ckb-l3_1 Food & Drink: nan, aw, çay, şîr, mast, penêr, xorak, çêşt
export const CKB_L3_1: SoraniExercise[] = [
  { id: 'ckb-l3_1-e1', lessonId: 'ckb-l3_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'nan', questionEn: 'What does this word mean?', options: ['bread, food', 'water', 'milk', 'cheese'], correctAnswer: 'bread, food', questionTr: 'Bu kelime ne demek?', optionsTr: ['ekmek, yemek', 'su', 'süt', 'peynir'], correctAnswerTr: 'ekmek, yemek', order: 1 },
  { id: 'ckb-l3_1-e2', lessonId: 'ckb-l3_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'şîr', questionEn: 'What does this word mean?', options: ['milk', 'tea', 'water', 'yoghurt'], correctAnswer: 'milk', questionTr: 'Bu kelime ne demek?', optionsTr: ['süt', 'çay', 'su', 'yoğurt'], correctAnswerTr: 'süt', order: 2 },
  { id: 'ckb-l3_1-e3', lessonId: 'ckb-l3_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "tea" in Sorani?', options: ['çay', 'aw', 'şîr', 'mast'], correctAnswer: 'çay', questionTr: '"çay" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l3_1-e4', lessonId: 'ckb-l3_1', type: 'true_false', answerIn: 'bridge', questionKu: 'mast', questionEn: 'Does this word mean "cheese"?', correctAnswer: 'False', explanation: 'It means "yoghurt".', questionTr: 'Bu kelime "peynir" demek mi?', explanationTr: '"Yoğurt" demek.', order: 4 },
  { id: 'ckb-l3_1-e5', lessonId: 'ckb-l3_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "water" in Sorani.', correctAnswer: 'aw', questionTr: '"su" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l3_1-e6', lessonId: 'ckb-l3_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "cheese" in Sorani.', correctAnswer: 'penêr', questionTr: '"peynir" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l3_2 At the Table: goşt, hêlke, xwê, ron, hengwên, mêwe, gull, mêz,
// çimçe, çeqo, çingall, fincan, lîwan
export const CKB_L3_2: SoraniExercise[] = [
  { id: 'ckb-l3_2-e1', lessonId: 'ckb-l3_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'goşt', questionEn: 'What does this word mean?', options: ['meat', 'egg', 'salt', 'honey'], correctAnswer: 'meat', questionTr: 'Bu kelime ne demek?', optionsTr: ['et', 'yumurta', 'tuz', 'bal'], correctAnswerTr: 'et', order: 1 },
  { id: 'ckb-l3_2-e2', lessonId: 'ckb-l3_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'çimçe', questionEn: 'What does this word mean?', options: ['spoon', 'fork', 'knife', 'cup'], correctAnswer: 'spoon', questionTr: 'Bu kelime ne demek?', optionsTr: ['kaşık', 'çatal', 'bıçak', 'fincan'], correctAnswerTr: 'kaşık', order: 2 },
  { id: 'ckb-l3_2-e3', lessonId: 'ckb-l3_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "egg" in Sorani?', options: ['hêlke', 'xwê', 'mêwe', 'gull'], correctAnswer: 'hêlke', questionTr: '"yumurta" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l3_2-e4', lessonId: 'ckb-l3_2', type: 'true_false', answerIn: 'bridge', questionKu: 'gull', questionEn: 'Does this word mean "flower"?', correctAnswer: 'True', questionTr: 'Bu kelime "çiçek" demek mi?', order: 4 },
  { id: 'ckb-l3_2-e5', lessonId: 'ckb-l3_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "salt" in Sorani.', correctAnswer: 'xwê', questionTr: '"tuz" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l3_2-e6', lessonId: 'ckb-l3_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "table, desk" in Sorani.', correctAnswer: 'mêz', questionTr: '"masa" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l3_3 Around the House: mall, hode, derga, pencere, dîwar, ban, hewşe,
// sennelî, çira, agir, ktaw, perraw, qellem, kaxez
export const CKB_L3_3: SoraniExercise[] = [
  { id: 'ckb-l3_3-e1', lessonId: 'ckb-l3_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'mall', questionEn: 'What does this word mean?', options: ['house, home', 'room', 'door', 'window'], correctAnswer: 'house, home', questionTr: 'Bu kelime ne demek?', optionsTr: ['ev, yuva', 'oda', 'kapı', 'pencere'], correctAnswerTr: 'ev, yuva', order: 1 },
  { id: 'ckb-l3_3-e2', lessonId: 'ckb-l3_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'derga', questionEn: 'What does this word mean?', options: ['door', 'window', 'wall', 'roof'], correctAnswer: 'door', questionTr: 'Bu kelime ne demek?', optionsTr: ['kapı', 'pencere', 'duvar', 'çatı, dam'], correctAnswerTr: 'kapı', order: 2 },
  { id: 'ckb-l3_3-e3', lessonId: 'ckb-l3_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "book" in Sorani?', options: ['ktaw', 'perraw', 'qellem', 'kaxez'], correctAnswer: 'ktaw', questionTr: '"kitap" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l3_3-e4', lessonId: 'ckb-l3_3', type: 'true_false', answerIn: 'bridge', questionKu: 'çira', questionEn: 'Does this word mean "fire"?', correctAnswer: 'False', explanation: 'It means "lamp".', questionTr: 'Bu kelime "ateş" demek mi?', explanationTr: '"Lamba" demek.', order: 4 },
  { id: 'ckb-l3_3-e5', lessonId: 'ckb-l3_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "room" in Sorani.', correctAnswer: 'hode', questionTr: '"oda" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l3_3-e6', lessonId: 'ckb-l3_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "chair" in Sorani.', correctAnswer: 'sennelî', questionTr: '"sandalye" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l3_4 Review: Everyday, across all 35 words of the unit
export const CKB_L3_4: SoraniExercise[] = [
  { id: 'ckb-l3_4-e1', lessonId: 'ckb-l3_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'nan', en: 'bread, food', tr: 'ekmek, yemek' }, { ku: 'aw', en: 'water', tr: 'su' }, { ku: 'çay', en: 'tea', tr: 'çay' }, { ku: 'mall', en: 'house, home', tr: 'ev, yuva' }], order: 1 },
  { id: 'ckb-l3_4-e2', lessonId: 'ckb-l3_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'xorak', questionEn: 'What does this word mean?', options: ['food', 'lunch', 'milk', 'flower'], correctAnswer: 'food', questionTr: 'Bu kelime ne demek?', optionsTr: ['yemek', 'öğle yemeği', 'süt', 'çiçek'], correctAnswerTr: 'yemek', order: 2 },
  { id: 'ckb-l3_4-e3', lessonId: 'ckb-l3_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "window" in Sorani?', options: ['pencere', 'derga', 'dîwar', 'ban'], correctAnswer: 'pencere', questionTr: '"pencere" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l3_4-e4', lessonId: 'ckb-l3_4', type: 'true_false', answerIn: 'bridge', questionKu: 'çêşt', questionEn: 'Does this word mean "lunch"?', correctAnswer: 'True', questionTr: 'Bu kelime "öğle yemeği" demek mi?', order: 4 },
  { id: 'ckb-l3_4-e5', lessonId: 'ckb-l3_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "fire" in Sorani.', correctAnswer: 'agir', questionTr: '"ateş" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l3_4-e6', lessonId: 'ckb-l3_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "fruit" in Sorani.', correctAnswer: 'mêwe', questionTr: '"meyve" kelimesini Soranice yaz.', order: 6 },
];
