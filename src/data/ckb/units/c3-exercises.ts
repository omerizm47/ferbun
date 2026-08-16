// Fêrbûn: the exercises for the sixteen lessons of the Sorani course "Actions
// & Verbs". Attached to their lessons in ./c3.ts, which is where the tree says
// which words each lesson draws on.
//
// The standing rules are set out at the head of ./c1-exercises.ts and hold here
// unchanged: an exercise carries no citation of its own, so every Sorani token
// in one is a wordKu the glossary already cites (LEX-01 in ../../validate.ts);
// no exercise joins two Sorani words into a phrase; the English and Turkish
// sides are bridge copy with no locator; distractors come from the lesson's own
// pool. Six exercises a lesson, in course 1's shape.
//
// THE INFINITIVE IS THE WHOLE OF WHAT UNIT 7 TEACHES. ../vocab/verbs.ts stores
// an infinitive and nothing else, because that is the string Thackston prints
// as a headword with a gloss on it, and the present stems he prints beside them
// are not in this corpus at all. So no exercise below conjugates anything. A
// past tense would need a past stem, which Sorani forms unpredictably and which
// this corpus does not hold; a present tense would need the stem and a prefix,
// which is grammar. "How do you say 'to come' in Sorani?" is the whole question
// a glossary can ask about a verb, and it is the question asked.
//
// THREE VERBS THIS COURSE CANNOT PUT IN AN EXERCISE. qse-kirdin, fêr-bûn and
// xoş-wîstin are compounds Thackston files under their nonverbal element, and
// they are stored with the hyphen he prints. The hyphen is legal Sorani
// punctuation (p. 89) and it is not a letter, so LEX-01 reads such a string as
// two words either side of a break and asks the glossary for each half: kirdin
// is a headword, qse is not, and the exercise fails. That is the rule working,
// not misfiring, and it is left alone. The three words are taught by the vocab
// cards of ckb-l7_3, which show the headword whole, and the six exercises of
// that lesson are built from the other six verbs in its pool. Widening LEX-01
// to admit the halves, or to treat the hyphen as a letter, would be the escape
// hatch the rule exists to refuse.
//
// UNIT 10 AND THE GLOSSES THAT ARE NOT THE OBVIOUS ONES. ../vocab/culture.ts
// records three: newroz is glossed "the vernal equinox", the astronomical event
// and not the festival; goranî is taught on the second of its two senses, the
// song and not the Gorani dialect; şoriş is "uprising" and not revolution. The
// exercises below teach exactly those glosses. A card asking a learner to
// produce newroz for "Kurdish New Year" would be teaching a claim the page does
// not make.
//
// Where two entries of one lesson share an English word they are kept out of
// each other's option sets: xoşhal "happy, pleased" and şad "happy" are never
// offered together, and no exercise asks for "happy" in Sorani, because two of
// this lesson's words would answer it.
//
// No native speaker has reviewed any of it: not the forms, not the glosses and
// not whether these are the right words to teach in this order.

import type { SoraniExercise } from '../exercises';

// ===== UNIT 7: COMMON VERBS =====

// ckb-l7_1 Go, Come & Be: çûn, hatin, bûn, man, nîştin, kewtin, gerran, jyan,
// mirdin
export const CKB_L7_1: SoraniExercise[] = [
  { id: 'ckb-l7_1-e1', lessonId: 'ckb-l7_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'çûn', questionEn: 'What does this word mean?', options: ['to go', 'to come', 'to remain', 'to sit'], correctAnswer: 'to go', questionTr: 'Bu kelime ne demek?', optionsTr: ['gitmek', 'gelmek', 'kalmak', 'oturmak'], correctAnswerTr: 'gitmek', order: 1 },
  { id: 'ckb-l7_1-e2', lessonId: 'ckb-l7_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'jyan', questionEn: 'What does this word mean?', options: ['to live', 'to die', 'to remain', 'to sit'], correctAnswer: 'to live', questionTr: 'Bu kelime ne demek?', optionsTr: ['yaşamak', 'ölmek', 'kalmak', 'oturmak'], correctAnswerTr: 'yaşamak', order: 2 },
  { id: 'ckb-l7_1-e3', lessonId: 'ckb-l7_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "to come" in Sorani?', options: ['hatin', 'çûn', 'man', 'bûn'], correctAnswer: 'hatin', questionTr: '"gelmek" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l7_1-e4', lessonId: 'ckb-l7_1', type: 'true_false', answerIn: 'bridge', questionKu: 'mirdin', questionEn: 'Does this word mean "to live"?', correctAnswer: 'False', explanation: 'It means "to die".', questionTr: 'Bu kelime "yaşamak" demek mi?', explanationTr: '"Ölmek" demek.', order: 4 },
  { id: 'ckb-l7_1-e5', lessonId: 'ckb-l7_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "to sit" in Sorani.', correctAnswer: 'nîştin', questionTr: '"oturmak" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l7_1-e6', lessonId: 'ckb-l7_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "to be, to become, to happen" in Sorani.', correctAnswer: 'bûn', questionTr: '"olmak" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l7_2 Eat, Drink & See: xwardin, xwardinewe, dîtin, bîstin, girtin, dan,
// kirdin, kirdinewe, şurdin
export const CKB_L7_2: SoraniExercise[] = [
  { id: 'ckb-l7_2-e1', lessonId: 'ckb-l7_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'xwardin', questionEn: 'What does this word mean?', options: ['to eat', 'to drink', 'to see', 'to hear'], correctAnswer: 'to eat', questionTr: 'Bu kelime ne demek?', optionsTr: ['yemek', 'içmek', 'görmek', 'duymak'], correctAnswerTr: 'yemek', order: 1 },
  { id: 'ckb-l7_2-e2', lessonId: 'ckb-l7_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'kirdinewe', questionEn: 'What does this word mean?', options: ['to open', 'to do', 'to wash', 'to take'], correctAnswer: 'to open', questionTr: 'Bu kelime ne demek?', optionsTr: ['açmak', 'yapmak', 'yıkamak', 'almak'], correctAnswerTr: 'açmak', order: 2 },
  { id: 'ckb-l7_2-e3', lessonId: 'ckb-l7_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "to see" in Sorani?', options: ['dîtin', 'bîstin', 'girtin', 'dan'], correctAnswer: 'dîtin', questionTr: '"görmek" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l7_2-e4', lessonId: 'ckb-l7_2', type: 'true_false', answerIn: 'bridge', questionKu: 'şurdin', questionEn: 'Does this word mean "to wash"?', correctAnswer: 'True', questionTr: 'Bu kelime "yıkamak" demek mi?', order: 4 },
  { id: 'ckb-l7_2-e5', lessonId: 'ckb-l7_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "to drink" in Sorani.', correctAnswer: 'xwardinewe', questionTr: '"içmek" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l7_2-e6', lessonId: 'ckb-l7_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "to give, pay" in Sorani.', correctAnswer: 'dan', questionTr: '"vermek, ödemek" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l7_3 Say, Know & Want: gotin, zanîn, nûsîn, twanîn, wîstin, tirsan. The
// other three words of the lesson, qse-kirdin, fêr-bûn and xoş-wîstin, are the
// hyphenated compounds the header explains, and no exercise can hold them.
export const CKB_L7_3: SoraniExercise[] = [
  { id: 'ckb-l7_3-e1', lessonId: 'ckb-l7_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'gotin', questionEn: 'What does this word mean?', options: ['to say', 'to know', 'to write', 'to want'], correctAnswer: 'to say', questionTr: 'Bu kelime ne demek?', optionsTr: ['söylemek', 'bilmek', 'yazmak', 'istemek'], correctAnswerTr: 'söylemek', order: 1 },
  { id: 'ckb-l7_3-e2', lessonId: 'ckb-l7_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'twanîn', questionEn: 'What does this word mean?', options: ['to be able', 'to want', 'to know', 'to be afraid of, fear'], correctAnswer: 'to be able', questionTr: 'Bu kelime ne demek?', optionsTr: ['yapabilmek, muktedir olmak', 'istemek', 'bilmek', 'korkmak'], correctAnswerTr: 'yapabilmek, muktedir olmak', order: 2 },
  { id: 'ckb-l7_3-e3', lessonId: 'ckb-l7_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "to know" in Sorani?', options: ['zanîn', 'gotin', 'nûsîn', 'wîstin'], correctAnswer: 'zanîn', questionTr: '"bilmek" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l7_3-e4', lessonId: 'ckb-l7_3', type: 'true_false', answerIn: 'bridge', questionKu: 'tirsan', questionEn: 'Does this word mean "to be afraid of, fear"?', correctAnswer: 'True', questionTr: 'Bu kelime "korkmak" demek mi?', order: 4 },
  { id: 'ckb-l7_3-e5', lessonId: 'ckb-l7_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "to write" in Sorani.', correctAnswer: 'nûsîn', questionTr: '"yazmak" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l7_3-e6', lessonId: 'ckb-l7_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "to want" in Sorani.', correctAnswer: 'wîstin', questionTr: '"istemek" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l7_4 Review: Verbs, across the 24 words of the unit an exercise can hold
export const CKB_L7_4: SoraniExercise[] = [
  { id: 'ckb-l7_4-e1', lessonId: 'ckb-l7_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'çûn', en: 'to go', tr: 'gitmek' }, { ku: 'hatin', en: 'to come', tr: 'gelmek' }, { ku: 'xwardin', en: 'to eat', tr: 'yemek' }, { ku: 'dîtin', en: 'to see', tr: 'görmek' }], order: 1 },
  { id: 'ckb-l7_4-e2', lessonId: 'ckb-l7_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'gerran', questionEn: 'What does this word mean?', options: ['to turn, wander, search', 'to fall, befall', 'to remain', 'to open'], correctAnswer: 'to turn, wander, search', questionTr: 'Bu kelime ne demek?', optionsTr: ['dönmek, dolaşmak, aramak', 'düşmek, başına gelmek', 'kalmak', 'açmak'], correctAnswerTr: 'dönmek, dolaşmak, aramak', order: 2 },
  { id: 'ckb-l7_4-e3', lessonId: 'ckb-l7_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "to hear" in Sorani?', options: ['bîstin', 'dîtin', 'gotin', 'zanîn'], correctAnswer: 'bîstin', questionTr: '"duymak" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l7_4-e4', lessonId: 'ckb-l7_4', type: 'true_false', answerIn: 'bridge', questionKu: 'kewtin', questionEn: 'Does this word mean "to fall, befall"?', correctAnswer: 'True', questionTr: 'Bu kelime "düşmek, başına gelmek" demek mi?', order: 4 },
  { id: 'ckb-l7_4-e5', lessonId: 'ckb-l7_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "to do" in Sorani.', correctAnswer: 'kirdin', questionTr: '"yapmak" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l7_4-e6', lessonId: 'ckb-l7_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "to remain" in Sorani.', correctAnswer: 'man', questionTr: '"kalmak" kelimesini Soranice yaz.', order: 6 },
];

// ===== UNIT 8: BODY & FEELINGS =====

// ckb-l8_1 Body Parts: ser, dill, çaw, dest, pê, dem, goh, lût, rû, mil, şan,
// sik, pişt, leş
export const CKB_L8_1: SoraniExercise[] = [
  { id: 'ckb-l8_1-e1', lessonId: 'ckb-l8_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'çaw', questionEn: 'What does this word mean?', options: ['eye', 'ear', 'mouth', 'nose'], correctAnswer: 'eye', questionTr: 'Bu kelime ne demek?', optionsTr: ['göz', 'kulak', 'ağız', 'burun'], correctAnswerTr: 'göz', order: 1 },
  { id: 'ckb-l8_1-e2', lessonId: 'ckb-l8_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'mil', questionEn: 'What does this word mean?', options: ['neck', 'shoulder', 'back', 'belly'], correctAnswer: 'neck', questionTr: 'Bu kelime ne demek?', optionsTr: ['boyun', 'omuz', 'sırt', 'karın'], correctAnswerTr: 'boyun', order: 2 },
  { id: 'ckb-l8_1-e3', lessonId: 'ckb-l8_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "hand" in Sorani?', options: ['dest', 'pê', 'ser', 'rû'], correctAnswer: 'dest', questionTr: '"el" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l8_1-e4', lessonId: 'ckb-l8_1', type: 'true_false', answerIn: 'bridge', questionKu: 'dill', questionEn: 'Does this word mean "heart"?', correctAnswer: 'True', questionTr: 'Bu kelime "kalp, gönül" demek mi?', order: 4 },
  { id: 'ckb-l8_1-e5', lessonId: 'ckb-l8_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "head" in Sorani.', correctAnswer: 'ser', questionTr: '"baş, kafa" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l8_1-e6', lessonId: 'ckb-l8_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "face" in Sorani.', correctAnswer: 'rû', questionTr: '"yüz" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l8_2 Sick & Well: nexoş, sax, êş, birîn, derman, xwên
export const CKB_L8_2: SoraniExercise[] = [
  { id: 'ckb-l8_2-e1', lessonId: 'ckb-l8_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'nexoş', questionEn: 'What does this word mean?', options: ['ill', 'healthy', 'wound', 'pain'], correctAnswer: 'ill', questionTr: 'Bu kelime ne demek?', optionsTr: ['hasta', 'sağlıklı', 'yara', 'ağrı, acı'], correctAnswerTr: 'hasta', order: 1 },
  { id: 'ckb-l8_2-e2', lessonId: 'ckb-l8_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'derman', questionEn: 'What does this word mean?', options: ['medicine', 'blood', 'wound', 'pain'], correctAnswer: 'medicine', questionTr: 'Bu kelime ne demek?', optionsTr: ['ilaç', 'kan', 'yara', 'ağrı, acı'], correctAnswerTr: 'ilaç', order: 2 },
  { id: 'ckb-l8_2-e3', lessonId: 'ckb-l8_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "healthy" in Sorani?', options: ['sax', 'nexoş', 'birîn', 'xwên'], correctAnswer: 'sax', questionTr: '"sağlıklı" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l8_2-e4', lessonId: 'ckb-l8_2', type: 'true_false', answerIn: 'bridge', questionKu: 'xwên', questionEn: 'Does this word mean "blood"?', correctAnswer: 'True', questionTr: 'Bu kelime "kan" demek mi?', order: 4 },
  { id: 'ckb-l8_2-e5', lessonId: 'ckb-l8_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "pain" in Sorani.', correctAnswer: 'êş', questionTr: '"ağrı, acı" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l8_2-e6', lessonId: 'ckb-l8_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "wound" in Sorani.', correctAnswer: 'birîn', questionTr: '"yara" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l8_3 Feelings: xoşhal, şad, xemgîn, tûrre, mandû, birsî, xamoş, ewîn,
// tirs, hîwa, derd, çermeserê
export const CKB_L8_3: SoraniExercise[] = [
  { id: 'ckb-l8_3-e1', lessonId: 'ckb-l8_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'xemgîn', questionEn: 'What does this word mean?', options: ['sorrowful, sad', 'angry, mad', 'tired', 'hungry'], correctAnswer: 'sorrowful, sad', questionTr: 'Bu kelime ne demek?', optionsTr: ['kederli, üzgün', 'kızgın, öfkeli', 'yorgun', 'aç'], correctAnswerTr: 'kederli, üzgün', order: 1 },
  { id: 'ckb-l8_3-e2', lessonId: 'ckb-l8_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'hîwa', questionEn: 'What does this word mean?', options: ['hope', 'fear', 'love', 'pain, trouble'], correctAnswer: 'hope', questionTr: 'Bu kelime ne demek?', optionsTr: ['umut', 'korku', 'aşk, sevgi', 'dert, sıkıntı'], correctAnswerTr: 'umut', order: 2 },
  { id: 'ckb-l8_3-e3', lessonId: 'ckb-l8_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "tired" in Sorani?', options: ['mandû', 'birsî', 'tûrre', 'xamoş'], correctAnswer: 'mandû', questionTr: '"yorgun" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l8_3-e4', lessonId: 'ckb-l8_3', type: 'true_false', answerIn: 'bridge', questionKu: 'birsî', questionEn: 'Does this word mean "hungry"?', correctAnswer: 'True', questionTr: 'Bu kelime "aç" demek mi?', order: 4 },
  { id: 'ckb-l8_3-e5', lessonId: 'ckb-l8_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "fear" in Sorani.', correctAnswer: 'tirs', questionTr: '"korku" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l8_3-e6', lessonId: 'ckb-l8_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "love" in Sorani.', correctAnswer: 'ewîn', questionTr: '"aşk, sevgi" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l8_4 Review: Body & Feelings, across all 32 words of the unit
export const CKB_L8_4: SoraniExercise[] = [
  { id: 'ckb-l8_4-e1', lessonId: 'ckb-l8_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'ser', en: 'head', tr: 'baş, kafa' }, { ku: 'çaw', en: 'eye', tr: 'göz' }, { ku: 'dest', en: 'hand', tr: 'el' }, { ku: 'dill', en: 'heart', tr: 'kalp, gönül' }], order: 1 },
  { id: 'ckb-l8_4-e2', lessonId: 'ckb-l8_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'çermeserê', questionEn: 'What does this word mean?', options: ['suffering, hardship', 'pain, trouble', 'fear', 'hope'], correctAnswer: 'suffering, hardship', questionTr: 'Bu kelime ne demek?', optionsTr: ['ıstırap, zorluk', 'dert, sıkıntı', 'korku', 'umut'], correctAnswerTr: 'ıstırap, zorluk', order: 2 },
  { id: 'ckb-l8_4-e3', lessonId: 'ckb-l8_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "angry, mad" in Sorani?', options: ['tûrre', 'xemgîn', 'mandû', 'birsî'], correctAnswer: 'tûrre', questionTr: '"kızgın, öfkeli" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l8_4-e4', lessonId: 'ckb-l8_4', type: 'true_false', answerIn: 'bridge', questionKu: 'goh', questionEn: 'Does this word mean "nose"?', correctAnswer: 'False', explanation: 'It means "ear".', questionTr: 'Bu kelime "burun" demek mi?', explanationTr: '"Kulak" demek.', order: 4 },
  { id: 'ckb-l8_4-e5', lessonId: 'ckb-l8_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "body" in Sorani.', correctAnswer: 'leş', questionTr: '"vücut, beden" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l8_4-e6', lessonId: 'ckb-l8_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "quiet, peaceful; silent" in Sorani.', correctAnswer: 'xamoş', questionTr: '"sakin, huzurlu; sessiz" kelimesini Soranice yaz.', order: 6 },
];

// ===== UNIT 9: CLOTHES & AROUND TOWN =====

// ckb-l9_1 Clothes: cil, berg, kiras, demellqopan, kewş, xurî. Six words, which
// is the whole clothing theme and the thinnest pool in the track. cil "clothes,
// togs" and berg "clothes; cover" are two headwords whose glosses open on the
// same English word, so neither is ever the answer to a question the other
// would also answer: the two production exercises below quote each gloss whole.
export const CKB_L9_1: SoraniExercise[] = [
  { id: 'ckb-l9_1-e1', lessonId: 'ckb-l9_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'kiras', questionEn: 'What does this word mean?', options: ['shirt', 'shoe', 'wool', 'clothes, togs'], correctAnswer: 'shirt', questionTr: 'Bu kelime ne demek?', optionsTr: ['gömlek', 'ayakkabı', 'yün', 'giysi, üstbaş'], correctAnswerTr: 'gömlek', order: 1 },
  { id: 'ckb-l9_1-e2', lessonId: 'ckb-l9_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'demellqopan', questionEn: 'What does this word mean?', options: ['baggy Kurdish trousers', 'shirt', 'shoe', 'clothes; cover'], correctAnswer: 'baggy Kurdish trousers', questionTr: 'Bu kelime ne demek?', optionsTr: ['bol Kürt şalvarı', 'gömlek', 'ayakkabı', 'giysi; örtü'], correctAnswerTr: 'bol Kürt şalvarı', order: 2 },
  { id: 'ckb-l9_1-e3', lessonId: 'ckb-l9_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "shoe" in Sorani?', options: ['kewş', 'kiras', 'xurî', 'demellqopan'], correctAnswer: 'kewş', questionTr: '"ayakkabı" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l9_1-e4', lessonId: 'ckb-l9_1', type: 'true_false', answerIn: 'bridge', questionKu: 'xurî', questionEn: 'Does this word mean "wool"?', correctAnswer: 'True', questionTr: 'Bu kelime "yün" demek mi?', order: 4 },
  { id: 'ckb-l9_1-e5', lessonId: 'ckb-l9_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "clothes, togs" in Sorani.', correctAnswer: 'cil', questionTr: '"giysi, üstbaş" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l9_1-e6', lessonId: 'ckb-l9_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "clothes; cover" in Sorani.', correctAnswer: 'berg', questionTr: '"giysi; örtü" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l9_2 City & Village: şar, gund, willat, kurdistan, cê, minare
export const CKB_L9_2: SoraniExercise[] = [
  { id: 'ckb-l9_2-e1', lessonId: 'ckb-l9_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'şar', questionEn: 'What does this word mean?', options: ['city', 'village', 'place', 'tower, minaret'], correctAnswer: 'city', questionTr: 'Bu kelime ne demek?', optionsTr: ['şehir', 'köy', 'yer', 'kule, minare'], correctAnswerTr: 'şehir', order: 1 },
  { id: 'ckb-l9_2-e2', lessonId: 'ckb-l9_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'willat', questionEn: 'What does this word mean?', options: ['country, state; homeland', 'city', 'village', 'place'], correctAnswer: 'country, state; homeland', questionTr: 'Bu kelime ne demek?', optionsTr: ['ülke, devlet; vatan', 'şehir', 'köy', 'yer'], correctAnswerTr: 'ülke, devlet; vatan', order: 2 },
  { id: 'ckb-l9_2-e3', lessonId: 'ckb-l9_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "village" in Sorani?', options: ['gund', 'şar', 'cê', 'minare'], correctAnswer: 'gund', questionTr: '"köy" Soranice nasıl denir?', order: 3 },
  // Thackston files this headword lower case and the taught form follows him,
  // as ../vocab/places.ts records, so the prompt asks about the string the
  // corpus holds rather than the capitalised name a learner expects.
  { id: 'ckb-l9_2-e4', lessonId: 'ckb-l9_2', type: 'true_false', answerIn: 'bridge', questionKu: 'kurdistan', questionEn: 'Does this word mean "Kurdistan"?', correctAnswer: 'True', questionTr: 'Bu kelime "Kürdistan" demek mi?', order: 4 },
  { id: 'ckb-l9_2-e5', lessonId: 'ckb-l9_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "place" in Sorani.', correctAnswer: 'cê', questionTr: '"yer" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l9_2-e6', lessonId: 'ckb-l9_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "tower, minaret" in Sorani.', correctAnswer: 'minare', questionTr: '"kule, minare" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l9_3 Streets & Shops: rê, şeqam, dukan, qutabxane, dûr, nizîk
export const CKB_L9_3: SoraniExercise[] = [
  { id: 'ckb-l9_3-e1', lessonId: 'ckb-l9_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'şeqam', questionEn: 'What does this word mean?', options: ['street', 'way, road', 'shop', 'school'], correctAnswer: 'street', questionTr: 'Bu kelime ne demek?', optionsTr: ['sokak', 'yol', 'dükkân', 'okul'], correctAnswerTr: 'sokak', order: 1 },
  { id: 'ckb-l9_3-e2', lessonId: 'ckb-l9_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'qutabxane', questionEn: 'What does this word mean?', options: ['school', 'shop', 'street', 'way, road'], correctAnswer: 'school', questionTr: 'Bu kelime ne demek?', optionsTr: ['okul', 'dükkân', 'sokak', 'yol'], correctAnswerTr: 'okul', order: 2 },
  { id: 'ckb-l9_3-e3', lessonId: 'ckb-l9_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "near" in Sorani?', options: ['nizîk', 'dûr', 'rê', 'dukan'], correctAnswer: 'nizîk', questionTr: '"yakın" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l9_3-e4', lessonId: 'ckb-l9_3', type: 'true_false', answerIn: 'bridge', questionKu: 'dûr', questionEn: 'Does this word mean "near"?', correctAnswer: 'False', explanation: 'It means "far".', questionTr: 'Bu kelime "yakın" demek mi?', explanationTr: '"Uzak" demek.', order: 4 },
  { id: 'ckb-l9_3-e5', lessonId: 'ckb-l9_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "shop" in Sorani.', correctAnswer: 'dukan', questionTr: '"dükkân" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l9_3-e6', lessonId: 'ckb-l9_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "way, road" in Sorani.', correctAnswer: 'rê', questionTr: '"yol" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l9_4 Review: Clothes & Town, across all 18 words of the unit
export const CKB_L9_4: SoraniExercise[] = [
  { id: 'ckb-l9_4-e1', lessonId: 'ckb-l9_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'cil', en: 'clothes, togs', tr: 'giysi, üstbaş' }, { ku: 'kewş', en: 'shoe', tr: 'ayakkabı' }, { ku: 'şar', en: 'city', tr: 'şehir' }, { ku: 'gund', en: 'village', tr: 'köy' }], order: 1 },
  { id: 'ckb-l9_4-e2', lessonId: 'ckb-l9_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'cê', questionEn: 'What does this word mean?', options: ['place', 'city', 'street', 'way, road'], correctAnswer: 'place', questionTr: 'Bu kelime ne demek?', optionsTr: ['yer', 'şehir', 'sokak', 'yol'], correctAnswerTr: 'yer', order: 2 },
  { id: 'ckb-l9_4-e3', lessonId: 'ckb-l9_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "shirt" in Sorani?', options: ['kiras', 'kewş', 'xurî', 'dukan'], correctAnswer: 'kiras', questionTr: '"gömlek" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l9_4-e4', lessonId: 'ckb-l9_4', type: 'true_false', answerIn: 'bridge', questionKu: 'nizîk', questionEn: 'Does this word mean "near"?', correctAnswer: 'True', questionTr: 'Bu kelime "yakın" demek mi?', order: 4 },
  { id: 'ckb-l9_4-e5', lessonId: 'ckb-l9_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "street" in Sorani.', correctAnswer: 'şeqam', questionTr: '"sokak" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l9_4-e6', lessonId: 'ckb-l9_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "school" in Sorani.', correctAnswer: 'qutabxane', questionTr: '"okul" kelimesini Soranice yaz.', order: 6 },
];

// ===== UNIT 10: LANGUAGE & CULTURE =====

// ckb-l10_1 School & Work: mamosta, qutabî, ders, zanistge, kar, xebat
export const CKB_L10_1: SoraniExercise[] = [
  { id: 'ckb-l10_1-e1', lessonId: 'ckb-l10_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'mamosta', questionEn: 'What does this word mean?', options: ['teacher', 'student', 'lesson', 'university'], correctAnswer: 'teacher', questionTr: 'Bu kelime ne demek?', optionsTr: ['öğretmen', 'öğrenci', 'ders', 'üniversite'], correctAnswerTr: 'öğretmen', order: 1 },
  // "struggle" is the whole of Thackston's gloss for khabât, which is why the
  // Turkish is mücadele alone and çalışma is not offered as its answer.
  { id: 'ckb-l10_1-e2', lessonId: 'ckb-l10_1', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'xebat', questionEn: 'What does this word mean?', options: ['struggle', 'work', 'lesson', 'university'], correctAnswer: 'struggle', questionTr: 'Bu kelime ne demek?', optionsTr: ['mücadele', 'iş', 'ders', 'üniversite'], correctAnswerTr: 'mücadele', order: 2 },
  { id: 'ckb-l10_1-e3', lessonId: 'ckb-l10_1', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "student" in Sorani?', options: ['qutabî', 'mamosta', 'ders', 'kar'], correctAnswer: 'qutabî', questionTr: '"öğrenci" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l10_1-e4', lessonId: 'ckb-l10_1', type: 'true_false', answerIn: 'bridge', questionKu: 'zanistge', questionEn: 'Does this word mean "university"?', correctAnswer: 'True', questionTr: 'Bu kelime "üniversite" demek mi?', order: 4 },
  { id: 'ckb-l10_1-e5', lessonId: 'ckb-l10_1', type: 'writing', answerIn: 'ckb', questionEn: 'Write "work" in Sorani.', correctAnswer: 'kar', questionTr: '"iş" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l10_1-e6', lessonId: 'ckb-l10_1', type: 'translation', answerIn: 'ckb', questionEn: 'Write "lesson" in Sorani.', correctAnswer: 'ders', questionTr: '"ders" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l10_2 Books & Language: ziman, pertuk, govar, çîrrok, edebiyat, mêjû,
// goranî
export const CKB_L10_2: SoraniExercise[] = [
  { id: 'ckb-l10_2-e1', lessonId: 'ckb-l10_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'pertuk', questionEn: 'What does this word mean?', options: ['book', 'magazine, journal', 'story', 'literature'], correctAnswer: 'book', questionTr: 'Bu kelime ne demek?', optionsTr: ['kitap', 'dergi', 'hikaye', 'edebiyat'], correctAnswerTr: 'kitap', order: 1 },
  { id: 'ckb-l10_2-e2', lessonId: 'ckb-l10_2', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'ziman', questionEn: 'What does this word mean?', options: ['tongue, language', 'story', 'history', 'song'], correctAnswer: 'tongue, language', questionTr: 'Bu kelime ne demek?', optionsTr: ['dil', 'hikaye', 'tarih', 'şarkı'], correctAnswerTr: 'dil', order: 2 },
  { id: 'ckb-l10_2-e3', lessonId: 'ckb-l10_2', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "history" in Sorani?', options: ['mêjû', 'edebiyat', 'govar', 'goranî'], correctAnswer: 'mêjû', questionTr: '"tarih" Soranice nasıl denir?', order: 3 },
  // The song is the second of Thackston's two senses for this sub-entry and the
  // only one taught; the first is the Gorani dialect, as ../vocab/culture.ts
  // records. The prompt names the taught sense and nothing else.
  { id: 'ckb-l10_2-e4', lessonId: 'ckb-l10_2', type: 'true_false', answerIn: 'bridge', questionKu: 'goranî', questionEn: 'Does this word mean "song"?', correctAnswer: 'True', questionTr: 'Bu kelime "şarkı" demek mi?', order: 4 },
  { id: 'ckb-l10_2-e5', lessonId: 'ckb-l10_2', type: 'writing', answerIn: 'ckb', questionEn: 'Write "story" in Sorani.', correctAnswer: 'çîrrok', questionTr: '"hikaye" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l10_2-e6', lessonId: 'ckb-l10_2', type: 'translation', answerIn: 'ckb', questionEn: 'Write "magazine, journal" in Sorani.', correctAnswer: 'govar', questionTr: '"dergi" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l10_3 Kurdish Culture: newroz, hellperrkê, azadî, şoriş, kurd, kurdî.
// Three of these six are glossed by the page in a way the Kurmanji slot is not,
// and the exercises teach the page: newroz is the vernal equinox and not the
// festival, şoriş is an uprising and not a revolution, and kurdî is read as the
// language because Thackston's bare "Kurdish" does not say which it is.
export const CKB_L10_3: SoraniExercise[] = [
  { id: 'ckb-l10_3-e1', lessonId: 'ckb-l10_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'newroz', questionEn: 'What does this word mean?', options: ['the vernal equinox', 'freedom', 'uprising', 'type of Kurdish dance'], correctAnswer: 'the vernal equinox', questionTr: 'Bu kelime ne demek?', optionsTr: ['ilkbahar ekinoksu', 'özgürlük', 'ayaklanma', 'bir Kürt halk dansı türü'], correctAnswerTr: 'ilkbahar ekinoksu', order: 1 },
  { id: 'ckb-l10_3-e2', lessonId: 'ckb-l10_3', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'hellperrkê', questionEn: 'What does this word mean?', options: ['type of Kurdish dance', 'the vernal equinox', 'uprising', 'freedom'], correctAnswer: 'type of Kurdish dance', questionTr: 'Bu kelime ne demek?', optionsTr: ['bir Kürt halk dansı türü', 'ilkbahar ekinoksu', 'ayaklanma', 'özgürlük'], correctAnswerTr: 'bir Kürt halk dansı türü', order: 2 },
  { id: 'ckb-l10_3-e3', lessonId: 'ckb-l10_3', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "freedom" in Sorani?', options: ['azadî', 'şoriş', 'newroz', 'kurdî'], correctAnswer: 'azadî', questionTr: '"özgürlük" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l10_3-e4', lessonId: 'ckb-l10_3', type: 'true_false', answerIn: 'bridge', questionKu: 'şoriş', questionEn: 'Does this word mean "uprising"?', correctAnswer: 'True', questionTr: 'Bu kelime "ayaklanma" demek mi?', order: 4 },
  { id: 'ckb-l10_3-e5', lessonId: 'ckb-l10_3', type: 'writing', answerIn: 'ckb', questionEn: 'Write "Kurd" in Sorani.', correctAnswer: 'kurd', questionTr: '"Kürt" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l10_3-e6', lessonId: 'ckb-l10_3', type: 'translation', answerIn: 'ckb', questionEn: 'Write "Kurdish" in Sorani.', correctAnswer: 'kurdî', questionTr: '"Kürtçe" kelimesini Soranice yaz.', order: 6 },
];

// ckb-l10_4 Review: Language & Culture, across all 19 words of the unit
export const CKB_L10_4: SoraniExercise[] = [
  { id: 'ckb-l10_4-e1', lessonId: 'ckb-l10_4', type: 'match_pairs', answerIn: 'bridge', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [{ ku: 'mamosta', en: 'teacher', tr: 'öğretmen' }, { ku: 'qutabî', en: 'student', tr: 'öğrenci' }, { ku: 'pertuk', en: 'book', tr: 'kitap' }, { ku: 'ziman', en: 'tongue, language', tr: 'dil' }], order: 1 },
  { id: 'ckb-l10_4-e2', lessonId: 'ckb-l10_4', type: 'multiple_choice', answerIn: 'bridge', questionKu: 'azadî', questionEn: 'What does this word mean?', options: ['freedom', 'uprising', 'history', 'literature'], correctAnswer: 'freedom', questionTr: 'Bu kelime ne demek?', optionsTr: ['özgürlük', 'ayaklanma', 'tarih', 'edebiyat'], correctAnswerTr: 'özgürlük', order: 2 },
  { id: 'ckb-l10_4-e3', lessonId: 'ckb-l10_4', type: 'multiple_choice', answerIn: 'ckb', questionEn: 'How do you say "song" in Sorani?', options: ['goranî', 'çîrrok', 'govar', 'edebiyat'], correctAnswer: 'goranî', questionTr: '"şarkı" Soranice nasıl denir?', order: 3 },
  { id: 'ckb-l10_4-e4', lessonId: 'ckb-l10_4', type: 'true_false', answerIn: 'bridge', questionKu: 'newroz', questionEn: 'Does this word mean "the vernal equinox"?', correctAnswer: 'True', questionTr: 'Bu kelime "ilkbahar ekinoksu" demek mi?', order: 4 },
  { id: 'ckb-l10_4-e5', lessonId: 'ckb-l10_4', type: 'writing', answerIn: 'ckb', questionEn: 'Write "teacher" in Sorani.', correctAnswer: 'mamosta', questionTr: '"öğretmen" kelimesini Soranice yaz.', order: 5 },
  { id: 'ckb-l10_4-e6', lessonId: 'ckb-l10_4', type: 'translation', answerIn: 'ckb', questionEn: 'Write "university" in Sorani.', correctAnswer: 'zanistge', questionTr: '"üniversite" kelimesini Soranice yaz.', order: 6 },
];
