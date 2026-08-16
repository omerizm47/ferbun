// Fêrbûn: the Sorani stories corpus. One story so far, and it is the first
// Sorani prose this app ships: every Sorani string before it was a single word,
// a label or an exercise built out of single words.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts.
//
// WHY THIS FILE NEEDED A NEW RULE. An exercise answers to LEX-01: every taught
// token in one is a headword ../vocabulary.ts already cites. A story cannot,
// and the reason is grammatical rather than editorial. The 255 headwords are
// the lexical form of each word, "the form in which a noun is given in a
// vocabulary list or dictionary" (§ 1, THK06:8). Every construction that turns
// words into a sentence attaches something to that form: the copula is a set of
// enclitics (§ 15, THK06:25), the present tense is a prefix and a suffix on a
// stem (§ 17, THK06:26), the attributive adjective needs the izâfa vowel
// (§ 5, THK06:10). None of those affixed forms is a headword, and no glossary
// could list them. Under LEX-01 read literally, 255 headwords cannot produce
// one sentence.
//
// SO A STORY TOKEN IS ONE OF TWO THINGS, AND NEVER A THIRD.
//   (a) one of the 255 cited headwords, exactly as an exercise token is; or
//   (b) a declared derivation: an inflected form recorded in DERIVATIONS below
//       with the headword it is built on, the section that forms it, and
//       Thackston's transcription it converts from.
// An inflected form that appears in the prose without a declaration fails
// LEX-02 exactly as an untaught word fails LEX-01. That is the whole point of
// the list: it is a declaration, not an escape hatch. A declaration naming a
// base outside the 255 fails (DRV-01), naming a section this story does not
// declare fails (DRV-02), and one that no sentence actually uses fails (DRV-03),
// so the list cannot quietly pre-authorise forms.
//
// The mechanism is the one ./chrome.ts already set for hell-bijêre and
// wer-gêrrê: an authored arm carrying a note that names the section for the rule
// and the page for the stem. This extends it rather than opening a second way
// past the citation rule.
//
// WHAT NO CHECK HERE ESTABLISHES. The prose is composed for this app. No page
// of Thackston prints it, no other source prints it, and no native speaker has
// read it. What is checked is that every word is either cited or derived by a
// stated rule, that the derivation converts to the spelling shipped, and that
// each section quoted says on its page what this file claims it says. Whether
// the result is what a Sorani speaker would write is a question only a speaker
// can answer, and the answer is not known.

import type { ComprehensionQuestion, Story, StoryWord } from '../stories';

/**
 * A numbered section of Thackston's grammar that this story leans on, with the
 * sentences licensing that use quoted verbatim. Each quote carries its own
 * page, because a section can run over a page break: § 17 states the rule on
 * p. 26 and names the modal prefix on p. 27.
 */
export interface GrammarSection {
  /** Thackston's section number, as he prints it. */
  id: string;
  /** His section title, verbatim. */
  title: string;
  /** The sentences relied on, each verbatim and each with the page printing it. */
  quotes: { src: string; text: string }[];
}

/**
 * One inflected form the prose uses, declared with everything needed to check
 * it: the base it is built on, the section that forms it, and the transcription
 * the shipped spelling is derived from rather than typed.
 */
export interface StoryDerivation {
  /** The taught form exactly as the prose spells it, in the THK06:88 alphabet. */
  form: string;
  /** The headword it is built on. Must be one of the 255. */
  base: string;
  /** The section forming it. Must be one of this story's declared sections. */
  section: string;
  /**
   * Thackston's transcription of `form`. The self-check runs
   * toHawar(stripStress(from)) and requires it to equal `form`, so no derived
   * spelling in this file is typed by hand.
   */
  from: string;
  /** What the affix adds, in English. */
  gloss: string;
  /** How the form is built, and what about it is not proven. */
  note: string;
  /**
   * A form Thackston prints that shows this same rule applied. Optional: most
   * of these forms are not printed anywhere, which is why they are derived.
   * `npm run verify-citations` looks for `from` on `src`.
   */
  witness?: { src: string; from: string; note: string };
}

/** A Story plus the three things an authored Sorani story has to answer for. */
export interface SoraniStory extends Story {
  sections: GrammarSection[];
  derivations: StoryDerivation[];
  /** The provenance claim, carried with the data rather than left in a comment. */
  note: string;
}

// Five sections, and no more. Every extra construction is another claim about a
// language no one here speaks, so the prose uses the fewest that produce
// readable sentences.
export const CKB_STORY_SECTIONS: GrammarSection[] = [
  {
    id: '\u00A7 1',
    title: 'The Absolute State of the Noun',
    quotes: [
      {
        src: 'THK06:8',
        text:
          'A Kurdish noun in the absolute state, i.e. without any ending of any kind, gives a generic ' +
          'sense of the noun.',
      },
    ],
  },
  {
    id: '\u00A7 5',
    title: 'Attributive Adjectives: The Open Adjectival Iz\u00E2fa',
    quotes: [
      {
        src: 'THK06:10',
        text:
          'The attributive adjective following a noun that is (1) absolute singular, (2) indefinite ' +
          'singular, or (3) indefinite plural is linked to the noun by the unstressed vowel i (called ' +
          'the iz\u00E2fa vowel).',
      },
    ],
  },
  {
    id: '\u00A7 12',
    title: 'Cardinal Numbers',
    quotes: [
      {
        src: 'THK06:17',
        text:
          'All words having to do with time and instance follow the cardinal number immediately in the ' +
          'absolute state:',
      },
    ],
  },
  {
    id: '\u00A7 14',
    title: 'Prepositions, Postpositions, Circumpositions',
    quotes: [
      {
        src: 'THK06:20',
        text:
          'The postpositional element does not usually, in and of itself, add anything substantial to ' +
          'the meaning of the prepositional phrase',
      },
    ],
  },
  {
    id: '\u00A7 15',
    title: 'Present Copulas',
    quotes: [
      {
        src: 'THK06:25',
        text: 'The present-tense copulas (\u2018am, is, are\u2019) consist of the following enclitics:',
      },
    ],
  },
  {
    id: '\u00A7 17',
    title: 'The Present Habitual/Progressive',
    quotes: [
      {
        src: 'THK06:26',
        text:
          'It is formed from the present stem of the verb with a prefixed modal marker, which receives ' +
          'the stress, and the following suffixed personal endings.',
      },
      {
        src: 'THK06:27',
        text:
          'The modal prefix in Sulaymani Kurdish is \u00E1-; in most other dialects the modal prefix is ' +
          'd\u00E1-.',
      },
    ],
  },
];

// Written once, because it is true of every copula row below and repeating it
// twelve times would bury it. Thackston prints the copula forms with an acute on
// the stem, kúrda, because the enclitic is unstressed and the stress stays where
// the bare word had it. The `from` fields here carry no acute: stripStress()
// removes it before conversion anyway, and for a stem of more than one syllable
// this file does not know which syllable it would fall on, so writing one would
// be an invention rather than a transcription.
const UNSTRESSED = 'No acute is written: the mark is stress (THK06:3, THK06:4), it is stripped before conversion, and guessing where it falls on a longer stem would be an invention.';

const COPULA = (base: string, gloss: string, shape: 'postconsonantal' | 'postvocalic'): string =>
  `The 3rd-person singular present copula, the ${shape} -${shape === 'postvocalic' ? 'ya' : 'a'} of the ` +
  `\u00A7 15 table (THK06:25), attached to ${base} "${gloss}" in the absolute state (\u00A7 1, THK06:8). ` +
  `${UNSTRESSED}`;

// The present stem is the one fact about a Sorani verb that the infinitive does
// not give and the glossary does not print beside every entry. Both verbs used
// here are the two \u00A7 17 conjugates in full at THK06:27, "examples are -ch- 'go'
// and -n\u00FBs- 'write'", so the stem is read off the page rather than guessed, and
// no third verb appears in the prose for exactly that reason.
const PRESENT = (infinitive: string, stem: string, gloss: string): string =>
  `Present habitual, 3rd person singular: the modal prefix d\u00E1- and the ending -e on the present stem ` +
  `-${stem}- (\u00A7 17, THK06:26 and THK06:27). THK06:27 names that stem for ${infinitive} "${gloss}" in its own ` +
  `worked paradigm, so it is not inferred from the infinitive. The inherent (t) THK06:26 calls ` +
  `"characteristic of literary Kurdish and seldom appears in the more informal spoken language" is not written. ` +
  `${UNSTRESSED}`;

const IZAFA =
  'The iz\u00E2fa vowel of \u00A7 5 (THK06:10), linking the absolute singular noun to the adjective after it. ' +
  'Thackston\'s transcription sets it off with a space, "hotel i b\u00E2sh" for "good hotel", so the declared ' +
  'form is two words wide and the check matches it as one phrase. In the Arabic script of the same example ' +
  'the vowel is written onto the noun, which is why it is declared as a form of the noun and not as a word.';

export const CKB_STORY_DERIVATIONS: StoryDerivation[] = [
  {
    form: 'bi\u00E7\u00FBke', base: 'bi\u00E7\u00FBk', section: '\u00A7 15', from: 'bich\u00FBka',
    gloss: 'is small', note: COPULA('bich\u00FBk', 'small, little', 'postconsonantal'),
  },
  {
    form: 'gunde', base: 'gund', section: '\u00A7 15', from: 'gunda',
    gloss: 'is (the) village', note: COPULA('gund', 'village', 'postconsonantal'),
  },
  {
    form: 'malle', base: 'mall', section: '\u00A7 15', from: 'm\u00E2\u0142a',
    gloss: 'is (the) house', note: COPULA('m\u00E2\u0142', 'house, home', 'postconsonantal'),
  },
  {
    form: 'qutabxaneye', base: 'qutabxane', section: '\u00A7 15', from: 'qut\u00E2bkh\u00E2naya',
    gloss: 'is (the) school',
    note:
      COPULA('qut\u00E2bkh\u00E2na', 'school', 'postvocalic') +
      ' The postvocalic column is the one that applies, because the noun ends in -a; Thackston\'s own ' +
      'postvocalic example is l\u2019er\u00E1ya "s/he is here" (THK06:25).',
  },
  {
    form: 'kurde', base: 'kurd', section: '\u00A7 15', from: 'kurda',
    gloss: 'is Kurdish', note: COPULA('kurd', 'Kurd', 'postconsonantal'),
    witness: {
      src: 'THK06:25', from: 'k\u00FArda',
      note: 'THK06:25 prints this form itself, glossed "s/he is Kurdish", as the worked example of \u00A7 15.',
    },
  },
  {
    form: 'roje', base: 'roj', section: '\u00A7 15', from: 'rozha',
    gloss: 'is (a) day', note: COPULA('rozh', 'day', 'postconsonantal'),
  },
  {
    form: 'ba\u015Fe', base: 'ba\u015F', section: '\u00A7 15', from: 'b\u00E2sha',
    gloss: 'is good', note: COPULA('b\u00E2sh', 'good', 'postconsonantal'),
  },
  {
    form: 'xo\u015Fhale', base: 'xo\u015Fhal', section: '\u00A7 15', from: 'khosh\u1E25\u00E2la',
    gloss: 'is happy', note: COPULA('khosh\u1E25\u00E2l', 'happy, pleased', 'postconsonantal'),
  },
  {
    form: 'de\u00E7\u00EA', base: '\u00E7\u00FBn', section: '\u00A7 17', from: 'dache',
    gloss: 'goes', note: PRESENT('ch\u00FBn', 'ch', 'to go'),
    witness: {
      src: 'THK06:27', from: 'd\u00E1che',
      note: 'THK06:27 prints this form itself in the ch\u00FBn paradigm, in the third-person singular row.',
    },
  },
  {
    form: 'den\u00FBs\u00EA', base: 'n\u00FBs\u00EEn', section: '\u00A7 17', from: 'dan\u00FBse',
    gloss: 'writes', note: PRESENT('n\u00FBs\u00EEn', 'n\u00FBs', 'to write'),
    witness: {
      src: 'THK06:27', from: 'd\u00E1n\u00FBset',
      note:
        'THK06:27 prints the literary third-person singular with the inherent t. The taught form drops it, ' +
        'which THK06:26 licenses in as many words, and the bare d\u00E1n\u00FBse is on the page too but only ' +
        'against a glyph the extractor reads as a letter, so the form with the t is what this check can look for.',
    },
  },
  { form: 'mall i', base: 'mall', section: '\u00A7 5', from: 'm\u00E2\u0142 i', gloss: 'house (linked to what follows)', note: IZAFA },
  { form: 'ktaw i', base: 'ktaw', section: '\u00A7 5', from: 'kt\u00E2w i', gloss: 'book (linked to what follows)', note: IZAFA },
];

const STORY_NOTE =
  'The prose is composed for this app. No page of Thackston prints it, no other source prints it, and no ' +
  'native speaker has read it. What is checked is that every taught token is one of the 255 cited headwords ' +
  'or a form declared in `derivations` with its base, its section and the transcription it converts from; ' +
  'that each section quoted says on its page what this file claims it says; and that every shipped spelling ' +
  'is the THK06:88 conversion table\u2019s output on that transcription rather than typed by hand. ' +
  'FOUR THINGS A READER SHOULD WEIGH THAT NO CHECK HERE SETTLES. ' +
  '(1) The absolute state marks neither "a" nor "the" (\u00A7 1, THK06:8), so the English and Turkish glosses ' +
  'supply an article the Sorani does not carry; a speaker narrating this would more likely reach for the ' +
  'definite -ak\u00E1 of \u00A7 3 (THK06:9), which this story does not use. ' +
  '(2) A bare le is left open by \u00A7 14 (THK06:20): it is the postposition that fixes the sense between ' +
  '"in" and "from", and there is none here, so each le is read from context. ' +
  '(3) The word order, subject then prepositional phrase then verb, is copied from a printed example ' +
  '(pirsy\u00E2r\u00E8k la min d\u00E1k\u00E2, THK06:22) rather than from any rule Thackston states. ' +
  '(4) zor before an adjective is his "zor khosh" at THK06:180; the glossary gives zor as "very" ' +
  '(THK06:239), but the ordering is copied from that example, not stated anywhere.';

// One story, deliberately the shape of the easiest Kurmanji one: ten sentences,
// none longer than five words, all third person. Two constraints on the content
// came out of the corpus rather than out of taste. Only ew of the six personal
// pronouns is among the 255, so a first or second person story is not
// available. And the indefinite enclitic -(y)\u00E8k (\u00A7 2, THK06:8) carries a vowel
// with no row in the THK06:88 conversion table, so it cannot be spelled in this
// alphabet at all: there is no "a house" in this file, only the absolute state.
const CKB_STORY_1: SoraniStory = {
  id: 'ckb-s1',
  title: 'Ki\u00E7 u Qutabxane',
  titleEn: 'The Girl and the School',
  titleTr: 'K\u0131z ve Okul',
  level: 'beginner',
  description: 'A village, a house, a school and a girl who goes and writes. Ten sentences, none longer than five words.',
  descriptionTr: 'Bir k\u00F6y, bir ev, bir okul ve giden, yazan bir k\u0131z. On c\u00FCmle, hi\u00E7biri be\u015F kelimeden uzun de\u011Fil.',
  icon: 'school',
  accent: '#3F6F5B',
  paragraphs: [
    [
      { ku: 'Gund', en: 'village', tr: 'k\u00F6y' },
      { ku: 'bi\u00E7\u00FBke.', en: 'small + is.', tr: 'k\u00FC\u00E7\u00FCk + \u2026dir.' },
      { ku: 'Mall', en: 'house', tr: 'ev' },
      { ku: 'i', en: '(links it to the adjective)', tr: '(s\u0131fata ba\u011Flar)' },
      { ku: 'gewre', en: 'big', tr: 'b\u00FCy\u00FCk' },
      { ku: 'le', en: 'in', tr: '\u2026de' },
      { ku: 'gunde.', en: 'village + is.', tr: 'k\u00F6y + \u2026dir.' },
    ],
    [
      { ku: 'Ki\u00E7', en: 'girl', tr: 'k\u0131z' },
      { ku: 'le', en: 'in', tr: '\u2026de' },
      { ku: 'malle.', en: 'house + is.', tr: 'ev + \u2026dir.' },
      { ku: 'Ew', en: 'she', tr: 'o' },
      { ku: 'kurde.', en: 'Kurdish + is.', tr: 'K\u00FCrt + \u2026t\u00FCr.' },
    ],
    [
      { ku: 'Qutabxane', en: 'school', tr: 'okul' },
      { ku: 'le', en: 'in', tr: '\u2026de' },
      { ku: 'gunde.', en: 'village + is.', tr: 'k\u00F6y + \u2026dir.' },
      { ku: 'Mamosta', en: 'teacher', tr: '\u00F6\u011Fretmen' },
      { ku: 'le', en: 'at', tr: '\u2026de' },
      { ku: 'qutabxaneye.', en: 'school + is.', tr: 'okul + \u2026dur.' },
    ],
    [
      { ku: 'Hefte', en: 'week', tr: 'hafta' },
      { ku: 'hewt', en: 'seven', tr: 'yedi' },
      { ku: 'roje.', en: 'day + is.', tr: 'g\u00FCn + \u2026d\u00FCr.' },
      { ku: 'Ki\u00E7', en: 'girl', tr: 'k\u0131z' },
      { ku: 'de\u00E7\u00EA', en: 'goes', tr: 'gider' },
      { ku: 'u', en: 'and', tr: 've' },
      { ku: 'den\u00FBs\u00EA.', en: 'writes.', tr: 'yazar.' },
    ],
    [
      { ku: 'Ktaw', en: 'book', tr: 'kitap' },
      { ku: 'i', en: '(links it to the adjective)', tr: '(s\u0131fata ba\u011Flar)' },
      { ku: 'nw\u00EA', en: 'new', tr: 'yeni' },
      { ku: 'zor', en: 'very', tr: '\u00E7ok' },
      { ku: 'ba\u015Fe.', en: 'good + is.', tr: 'iyi + \u2026dir.' },
      { ku: 'Ki\u00E7', en: 'girl', tr: 'k\u0131z' },
      { ku: 'xo\u015Fhale.', en: 'happy + is.', tr: 'mutlu + \u2026dur.' },
    ],
  ] as StoryWord[][],
  comprehensionQuestions: [
    {
      question: 'Where is the big house?',
      options: ['In the village', 'In the city', 'On the mountain', 'By the river'],
      correctAnswer: 'In the village',
      questionTr: 'B\u00FCy\u00FCk ev nerede?',
      optionsTr: ['K\u00F6yde', '\u015Eehirde', 'Da\u011Fda', 'Nehir kenar\u0131nda'],
      correctAnswerTr: 'K\u00F6yde',
    },
    {
      question: 'Who is at the school?',
      options: ['The teacher', 'The mother', 'The father', 'The doctor'],
      correctAnswer: 'The teacher',
      questionTr: 'Okulda kim var?',
      optionsTr: ['\u00D6\u011Fretmen', 'Anne', 'Baba', 'Doktor'],
      correctAnswerTr: '\u00D6\u011Fretmen',
    },
    {
      question: 'How many days does the story say a week has?',
      options: ['Seven', 'Two', 'Ten', 'Twenty'],
      correctAnswer: 'Seven',
      questionTr: 'Hikayeye g\u00F6re bir haftada ka\u00E7 g\u00FCn var?',
      optionsTr: ['Yedi', '\u0130ki', 'On', 'Yirmi'],
      correctAnswerTr: 'Yedi',
    },
  ] as ComprehensionQuestion[],
  sections: CKB_STORY_SECTIONS,
  derivations: CKB_STORY_DERIVATIONS,
  note: STORY_NOTE,
};

export const CKB_STORIES: SoraniStory[] = [CKB_STORY_1];

export const getCkbStoryById = (id: string): SoraniStory | undefined =>
  CKB_STORIES.find((story) => story.id === id);
