// Fêrbûn: the Sorani half of the taught-chrome table, the words the app says in
// the language it teaches. The mechanism stays in ../chrome.ts: ChromeSlot,
// TaughtChrome, PENDING, resolveChrome, bilingualKicker, badgeName and the
// Kurmanji table are all still there, and none of them changes shape here.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts.
//
// THREE STATES, NOT TWO. A vocabulary entry is cited or it does not exist; a
// theme label and a course title are cited or authored (./vocabulary.ts,
// ./courses.ts). Chrome needs a third, because a slot can be one the book gives
// no word for at all, and a table that could only say "cited" or "authored"
// would push those into "authored" and invent wording to fill them. So:
//   cited    the wording is a headword Thackston prints, carrying the page and
//            his transcription verbatim in `from`. wordKu is derived, never
//            typed: text is `from` put through the pp. 88 to 89 conversion
//            table, and the self-check asserts that of every cited slot.
//   authored the wording is composed or derived for this app out of cited
//            parts, exactly as a course title is, and `note` says out of what.
//            It holds no page, because no page prints the string.
//   pending  the slot is deliberately empty, and `reason` says what was looked
//            for and what was rejected. A pending slot resolves to '', so the
//            bridge word stands alone with no dangling separator.
// The citation fields are declared `never` on the arms that must not carry
// them, so a pending slot cannot hold a src and an authored slot cannot
// masquerade as cited: those are type errors, not comments someone has to spot.
//
// The acute in Thackston's transcription is a stress mark, not a letter. It is
// stripped by stripStress() in tools/thackston-latin.ts, which names pp. 3 and 4
// as its licence, and the stripping happens on conversion only: `from` holds the
// printed string accent and all, so tools/verify-citations.ts can find it on the
// page. bínûsa (p. 39) and bízhî (p. 239) are the two slots that need it.
//
// No native speaker has reviewed any of it. Every check this repository runs
// over these strings is a check of spelling, legality and provenance. Whether
// "tewaw" is what a Sorani speaker would put on an all-done card is a question
// only a speaker can answer.

import { PENDING, type ChromeSlot, type TaughtChrome } from '../chrome';

/** A slot whose wording is a headword Thackston prints, carrying the locator for it. */
export interface CitedChromeSlot {
  origin: 'cited';
  /** The taught wording, derived from `from` through the pp. 88 to 89 table. */
  text: string;
  /** Page carrying the form and its English gloss, e.g. 'THK06:219'. */
  src: string;
  /** Thackston's transcription, copied verbatim, acute stress marks included. */
  from: string;
  /** Why the cited page prints something other than `from`. */
  fromNote?: string;
  note?: never;
  reason?: never;
}

/**
 * A slot whose wording is composed or derived for this app out of parts cited
 * elsewhere. The three citation fields are `never` rather than absent, so
 * `{ origin: 'authored', src: 'THK06:39' }` cannot be written.
 */
export interface AuthoredChromeSlot {
  origin: 'authored';
  text: string;
  /** What the wording is built from, part by part with its page and the rule. */
  note: string;
  src?: never;
  from?: never;
  fromNote?: never;
  reason?: never;
}

/**
 * A slot left empty on purpose. `reason` is what makes it a decision rather
 * than an oversight: it says what sense was wanted, what the volume was
 * searched for, and which candidates were rejected and why.
 */
export interface PendingChromeSlot {
  origin: 'pending';
  text: null;
  reason: string;
  src?: never;
  from?: never;
  fromNote?: never;
  note?: never;
}

/** Cited, authored or pending: exactly one, and `origin` fixes which fields the row may hold. */
export type SoraniChromeSlot = CitedChromeSlot | AuthoredChromeSlot | PendingChromeSlot;

/** Narrows to the cited arm, so a consumer reading `src` or `from` has to say which slots it means. */
export const isCitedChrome = (slot: SoraniChromeSlot): slot is CitedChromeSlot => slot.origin === 'cited';

/** Narrows to the authored arm, the slots no page can be demanded of. */
export const isAuthoredChrome = (slot: SoraniChromeSlot): slot is AuthoredChromeSlot =>
  slot.origin === 'authored';

// Reused across several slots, so the reasoning is written once. Kurmanji fills
// each of these with a sentence, and a sentence needs the copula and the
// izâfa, neither of which this corpus has adopted anywhere.
const NO_SENTENCE = (what: string, considered: string): string =>
  `${what} The glossary is a word list: it carries no sentence, and building one here would need the copula ` +
  `and the izâfa, which no Sorani string this app ships uses. ${considered}`;

export const CKB_CHROME_SLOTS: Record<keyof TaughtChrome, SoraniChromeSlot> = {
  homeGreetMorning: {
    origin: 'pending',
    text: null,
    reason:
      'No headword and no example anywhere in the 242 pages is glossed "good morning". bayânî "morning" ' +
      '(THK06:169) and bâsh "good" (THK06:170) are both cited by this corpus, but p. 170 prints the greeting ' +
      'pattern for one noun only, "rozh ~ good day", and extending it to bayânî would be this app inventing a ' +
      'greeting rather than reporting one.',
  },
  homeGreetAfternoon: {
    origin: 'authored',
    text: 'roj baş',
    note:
      'Composed from roj (THK06:221, rozh "day") and baş (THK06:170, bâsh "good"). The pairing is Thackston\'s ' +
      'own, not this app\'s: p. 170 prints "rozh ~ good day" inside bâsh\'s entry, the tilde standing for the ' +
      'headword, so both the words and the gloss are his. It is authored rather than cited because no page ' +
      'prints the two words as one string, which is what a src would have to point at, and ./vocab/greetings.ts ' +
      'declined the same string for a vocabulary entry on exactly that ground.',
  },
  homeGreetEvening: {
    origin: 'pending',
    text: null,
    reason:
      'Nothing is glossed "good evening". ewâra "evening" (THK06:183) is cited by this corpus, and the "rozh ~ ' +
      'good day" example at p. 170 is the only greeting of this shape the volume prints.',
  },
  homeGreetNight: {
    origin: 'pending',
    text: null,
    reason:
      'Nothing is glossed "good night". shaw "night" (THK06:226) is cited by this corpus, and the "rozh ~ good ' +
      'day" example at p. 170 is the only greeting of this shape the volume prints.',
  },
  homeContinueKicker: {
    origin: 'pending',
    text: null,
    reason:
      'The only form glossed "to continue" is drezha-dân, the sub-entry ~a-dân under drezh "long" (THK06:182), ' +
      'and the slot wants an imperative of it. Its verbal element dân is one of the four verbs p. 39 singles ' +
      'out as having an irregular imperative (bídara), and § 19 (THK06:30) licenses dropping the bí- only for ' +
      'close compounds with prefixes like war- and hał-, which drezha- is not. So no rule the book states ' +
      'produces the form, and the slot waits rather than guessing between drezha-dara and drezha-bídara.',
  },
  homeAllDoneKicker: {
    origin: 'cited',
    text: 'tewaw',
    src: 'THK06:230',
    from: 'taw\u00E2w',
    fromNote:
      'p. 230 glosses it "complete", with ~-bûn "to be finished" and ~-kirdin "to finish" under it. The slot\'s ' +
      'bridge half is ALL DONE; only the bare adjective is taken, not either compound.',
  },
  homeAllDoneTitle: {
    origin: 'pending',
    text: null,
    reason: NO_SENTENCE(
      'The bridge half is "You\'ve finished every lesson".',
      'tawâw "complete" (THK06:230) already carries the kicker above this line, and repeating it as the title ' +
        'would say the same word twice rather than say the sentence.',
    ),
  },
  homeEmptyKicker: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is NO LESSONS YET, which is a claim about a track and not about a container. Three ' +
      'headwords glossed "empty" were weighed and rejected for saying the wrong thing: batâł (THK06:169) is ' +
      '"over, finished; empty; invalid", bosh (THK06:173) and hâłî (THK06:190) are the emptiness of a vessel. ' +
      'dars "lesson" (THK06:178) is cited by this corpus, but negating it needs a sentence.',
  },
  homeEmptyTitle: {
    origin: 'pending',
    text: null,
    reason: NO_SENTENCE(
      'The bridge half is "No lessons yet".',
      'Rejected on the same ground as the kicker above it: batâł, bosh and hâłî are all the emptiness of a ' +
        'container, not the absence of lessons.',
    ),
  },
  homeReviewKicker: {
    origin: 'cited',
    text: 'd\u00FBbare',
    src: 'THK06:182',
    from: 'd\u00FBb\u00E2ra',
    fromNote:
      'p. 182 prints this as the tilde sub-entry ~bâra under the headword dû "two", glossed "again, once ' +
      'more". Two more tildes sit in that entry, ~am "second" and ~dił "hesitant", and ~barakî is a different ' +
      'sub-entry again. Worth reading beside ./units/review.ts, whose note says nothing in the corpus is ' +
      'glossed "again"; that was true of the 255 vocabulary entries and is not true of the volume.',
  },
  streakDayNoun: {
    origin: 'cited',
    text: 'roj',
    src: 'THK06:221',
    from: 'rozh',
  },
  goalMetPraise: {
    origin: 'cited',
    text: 'aferîn',
    src: 'THK06:165',
    from: '\u00E2far\u00EEn',
    fromNote:
      'p. 165 glosses it "bravo", with ~-kirdin la "to praise" under it. The bare interjection is what this ' +
      'slot takes; it lands inside the bridge sentence "Goal reached — aferîn".',
  },
  feedbackCorrect: {
    origin: 'cited',
    text: 'dirust',
    src: 'THK06:181',
    from: 'dirust',
    fromNote:
      'p. 181 glosses it "right, correct", with ~-kirdin "to make, repair" under it. râst (THK06:219) is also ' +
      '"right, correct, true" and is the rival; it went to trueLabel below, where the true/false opposition ' +
      'against dro needs it, so the two slots do not print the same word.',
  },
  feedbackWrong: {
    origin: 'cited',
    text: 'nizîk',
    src: 'THK06:211',
    from: 'niz\u00EEk',
    fromNote:
      'p. 211 glosses it "near". The bridge half is "Not quite", so the slot wants the near-miss sense; ' +
      'Thackston gives the spatial one and says nothing about the figurative use, which is a speaker-review ' +
      'item. hała "error, mistake" (THK06:188) was rejected as too flat a verdict for a first wrong answer.',
  },
  congratsTitle: {
    origin: 'cited',
    text: 'pîroz',
    src: 'THK06:216',
    from: 'p\u00EEroz',
    fromNote:
      'p. 216 glosses it "happy, blessed, auspicious". No form of "congratulations" appears anywhere in the ' +
      'volume, so this is the nearest single word and it is an adjective, not the formula a speaker would use.',
  },
  coachKicker: {
    origin: 'cited',
    text: 'rêber',
    src: 'THK06:220',
    from: 'rebar',
    fromNote:
      'p. 220 glosses it "leader, guide". rewân on the same page is also "guide" and was rejected: its entry ' +
      'carries the sense of one who leads a journey, and the bridge half here is QUICK GUIDE.',
  },
  exChooseKicker: {
    origin: 'authored',
    text: 'hell-bijêre',
    note:
      'The singular imperative of hał-bizhârdin "to select, choose", printed at THK06:173 as the sub-entry ' +
      'hał-~ inside bizhârdin\'s entry, which also gives the present stem, bizher-. § 24 (THK06:38) states the ' +
      'rule: a present stem ending in a consonant takes bí- + stem + -a. § 19 (THK06:30) states the other ' +
      'half: the modal prefix is regularly omitted with close compound verbs with prefixes like war- and hał-, ' +
      'and p. 39 prints the same omission as optional in gwe-(bi)gira and dâ-(bi)nîsha. So hał-bizher- + -a ' +
      'gives hał-bizhera, which the pp. 88 to 89 table turns into hell-bijêre. Authored, not cited: no page ' +
      'prints the imperative, only the rule that builds it.',
  },
  exTranslateKicker: {
    origin: 'authored',
    text: 'wer-gêrrê',
    note:
      'The singular imperative of war-geřân "to translate" (THK06:235), whose present stem geře- is printed in ' +
      'the geřân entry at THK06:185. § 24 (THK06:38) states that a stem ending in a vowel takes bí- + the stem ' +
      'and no -a, and § 19 (THK06:30) names war- itself as a prefix whose close compounds drop the modal ' +
      'prefix. So war-geře, which the pp. 88 to 89 table turns into wer-gêrrê. Authored on the same footing as ' +
      'the choose kicker above: the rule is printed, the form is not.',
  },
  exMatchKicker: {
    origin: 'pending',
    text: null,
    reason:
      'Nothing in the volume means "match" or "pair up". The nearest is gunjân "to fit" (THK06:187), which is ' +
      'intransitive, so it cannot be commanded at a set of pairs the way the bridge half MATCH is. A learner ' +
      'told to fit would be told the wrong thing about the exercise, so the slot stays empty.',
  },
  exTrueFalseKicker: {
    origin: 'authored',
    text: 'rast yan dro',
    note:
      'Composed from rast (THK06:219, râst "right, correct, true"), yan (THK06:237, yân "or") and dro ' +
      '(THK06:182, dro "lie"), the same joined-headwords construction the course titles in ./courses.ts use. ' +
      'The opposition is Thackston\'s own: p. 176 prints "chi râst u chi diro whether right or wrong", and ' +
      'p. 181 gives "diro = dro". His joiner there is u "and"; yân was taken instead because the bridge half ' +
      'is TRUE OR FALSE and the two labels below it are alternatives, not a pair.',
  },
  exFillKicker: {
    origin: 'pending',
    text: null,
    reason:
      'No verb anywhere in the volume is glossed "to fill". The exercise asks a learner to put a word into a ' +
      'gap, and with no verb for it there is nothing to build an imperative on, so no rule in § 24 (THK06:38) ' +
      'has anything to work from.',
  },
  exWriteKicker: {
    origin: 'cited',
    text: 'binûse',
    src: 'THK06:39',
    from: 'b\u00EDn\u00FBsa',
    fromNote:
      'Printed on p. 39, in the § 24 table, under SINGULAR IMPERATIVE for nûsîn "to write" with its present ' +
      'stem nûs-. The acute is the stress mark pp. 3 and 4 describe, not a letter, so stripStress() takes it ' +
      'off before the pp. 88 to 89 table runs; `from` keeps it, because that is what the page prints. This is ' +
      'the one exercise kicker the book gives outright rather than by rule.',
  },
  trueLabel: {
    origin: 'cited',
    text: 'rast',
    src: 'THK06:219',
    from: 'r\u00E2st',
    fromNote:
      'p. 219 glosses it "right, correct, true", with ~-bûnawa and several compounds under it. Only the bare ' +
      'adjective is taken. Thackston prints the opposition this button belongs to himself, at p. 176: "chi ' +
      'râst u chi diro whether right or wrong".',
  },
  falseLabel: {
    origin: 'cited',
    text: 'dro',
    src: 'THK06:182',
    from: 'dro',
    fromNote:
      'p. 182 glosses it "lie", with ~-kirdin "to lie" under it, and p. 181 prints "diro = dro" so the two ' +
      'spellings are one headword. It is a noun where the bridge half False is an adjective; the reason for ' +
      'taking it is p. 176, where Thackston sets diro against râst as the two halves of right and wrong.',
  },
  encourage1: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is "Well done!". âfarîn "bravo" (THK06:165) is the volume\'s one interjection of praise ' +
      'and it already carries encourage2 and feedbackCorrect; printing it a third time would make two of the ' +
      'seven combo praises identical, which is the one thing the seven slots exist to avoid.',
  },
  encourage2: {
    origin: 'cited',
    text: 'aferîn',
    src: 'THK06:165',
    from: '\u00E2far\u00EEn',
    fromNote: 'p. 165 glosses it "bravo", which is this slot\'s bridge half exactly. Only the bare interjection is taken.',
  },
  encourage3: {
    origin: 'cited',
    text: 'bijî',
    src: 'THK06:239',
    from: 'b\u00EDzh\u00EE',
    fromNote:
      'Printed inside the zhyân entry at p. 239, "zhyân zhî- v.i. to live; bízhî ... long live ...", which is ' +
      'this slot\'s bridge half exactly. The acute is the stress mark of pp. 3 and 4 on the bí- of the ' +
      'imperative, so stripStress() takes it off before conversion and `from` keeps it.',
  },
  encourage4: {
    origin: 'cited',
    text: 'pîroz',
    src: 'THK06:216',
    from: 'p\u00EEroz',
    fromNote:
      'The same headword congratsTitle takes, "happy, blessed, auspicious" at p. 216, and for the same reason: ' +
      'the volume prints no form of "congratulations" at all.',
  },
  encourage5: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is "You are smart!", a sentence, and the four rival adjectives underneath it are all ' +
      'unranked: zît (THK06:239), wiryâ (THK06:236, "clever; observant"), zorzân (THK06:240) and the "genius, ' +
      'clever" headword at THK06:171. Thackston gives no basis for choosing among them and the copula that ' +
      'would turn one into the sentence is not a construction this app ships.',
  },
  encourage6: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is "Excellent!". The word "excellent" does not appear in the 242 pages, in any entry or ' +
      'any example, so there is nothing to weigh.',
  },
  encourage7: {
    origin: 'authored',
    text: 'zor baş',
    note:
      'Composed from zor (THK06:239, "very; a lot, much") and baş (THK06:170, bâsh "good"), both cited by this ' +
      'corpus, in the joined-headwords construction ./courses.ts uses for its titles. The bridge half is "Very ' +
      'good!". Thackston does not print the two together, which is why this is authored and not cited.',
  },
  lessonNotFoundTitle: {
    origin: 'pending',
    text: null,
    reason: NO_SENTENCE(
      'The bridge half is "Lesson not found".',
      'dars "lesson" (THK06:178) is cited by this corpus and dîtin "to see, find" (THK06:182) is too, but the ' +
        'title is a negated passive and no page prints one.',
    ),
  },
  lessonComingSoonTitle: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is "Coming soon". âmâda (THK06:166) is "ready", with ~-kirdin "to make ready, prepare" ' +
      'under it, and hâzir (THK06:191) and tayâr (THK06:230) are also "ready". All three say the lesson is ' +
      'finished, which is the opposite of what this title says, and the verbal noun that would say "in ' +
      'preparation" is not printed as a headword.',
  },
  comboKicker: {
    origin: 'cited',
    text: 'pirsyar',
    src: 'THK06:216',
    from: 'pirsy\u00E2r',
    fromNote:
      'p. 216 glosses it "question", with ~-kirdin la "to ask s.o." under it. The slot renders after a count, ' +
      '"5 pirsyar", so the noun is doing the work of the Kurmanji phrase "questions in a row" and says only ' +
      'the countable half of it. pirs- on p. 215 is the present stem of pirsîn "to ask" and is not this word.',
  },
  spellingLabel: {
    origin: 'pending',
    text: null,
    reason:
      'No headword in the volume is glossed "spelling" or "orthography". The word "spelling" occurs twice, ' +
      'both at THK06:185 and both in Thackston\'s own English prose about how the glossary is alphabetized, ' +
      'not as a gloss on anything.',
  },
  correctAnswerLabel: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is CORRECT ANSWER, two words. wałâm (THK06:235) and jwâb (THK06:193) are both "answer, ' +
      'response" and either could be cited alone, but alone each says "answer" and not "correct answer", ' +
      'which is a different label on a screen that also shows the wrong one. Joining either to râst ' +
      '(THK06:219) needs the izâfa, a construction no Sorani string this app ships uses.',
  },
  continueCta: {
    origin: 'pending',
    text: null,
    reason:
      'The same slot as homeContinueKicker in a different place: drezha-dân (THK06:182) is the only "to ' +
      'continue" the volume gives, its verbal element dân has one of the four irregular imperatives p. 39 ' +
      'names, and § 19 (THK06:30) does not license dropping the bí- for a compound of this shape.',
  },
  vocabHeader: {
    origin: 'cited',
    text: 'wajegel',
    src: 'THK06:236',
    from: 'w\u00E2zhagal',
    fromNote:
      'p. 236 prints this as the tilde sub-entry ~gal under the headword wâzha "word", glossed "vocabulary", ' +
      'which is the bridge half of this header exactly. wisha on the same page is also "word" and was ' +
      'rejected: it is the singular, and the header names the whole list.',
  },
  reviewDoneTitle: {
    origin: 'cited',
    text: 'baş',
    src: 'THK06:170',
    from: 'b\u00E2sh',
    fromNote:
      'p. 170 glosses it "good", with "rozh ~ good day" and "da ~a that\'s enough!" as its examples. Only the ' +
      'bare adjective is taken. The bridge half is "All caught up", so this says less than the English does.',
  },
  noWordsTitle: {
    origin: 'pending',
    text: null,
    reason: NO_SENTENCE(
      'The bridge half is "No words yet".',
      'wâzha and wisha (both THK06:236) are cited for the header above, but negating either into "there are ' +
        'none" is the sentence, not the noun.',
    ),
  },
  cardTaughtLabel: {
    origin: 'cited',
    text: 'kurdî',
    src: 'THK06:202',
    from: 'kurd\u00EE',
    fromNote:
      'p. 202 prints this as the tilde sub-entry ~î under the headword kurd, glossed a bare "Kurdish". The ' +
      'gloss does not say whether the adjective or the name of the language is meant; this slot, like ' +
      './vocab/culture.ts before it, reads it as the language. Three more ~î sit on that page, under ktâw, ' +
      'kor and kurt.',
  },
  genderM: {
    origin: 'pending',
    text: null,
    reason:
      'Nothing in the volume is glossed "masculine". The word "gender" appears once in 242 pages, at ' +
      'THK06:41, in a parenthesis about verb agreement in general rather than about Sorani nouns. No Sorani ' +
      'entry this app ships carries a gender field, so the badge this slot labels never renders for the track.',
  },
  genderF: {
    origin: 'pending',
    text: null,
    reason:
      'Nothing is glossed "feminine", on the same evidence as genderM: one occurrence of "gender" in the ' +
      'volume, at THK06:41, and no gender on any Sorani entry.',
  },
  knowPrompt: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is DO YOU KNOW IT?, a second-person question. zânîn "to know" (THK06:238) is cited by ' +
      'this corpus, but the present habitual needs the (d)a- prefix p. 4 describes plus the personal ending, ' +
      'and no page prints the resulting form. Unlike the two imperative kickers above, that is a paradigm ' +
      'this table would be building rather than a rule it would be applying.',
  },
  rapidFireTitle: {
    origin: 'cited',
    text: 'agir',
    src: 'THK06:165',
    from: '\u00E2gir',
    fromNote:
      'p. 165 glosses it "fire". The Kurmanji title is the phrase "light your fire"; the cited noun names the ' +
      'screen without claiming the phrase.',
  },
  timeUpTitle: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is "Time\'s up!". Nothing in the volume is glossed "time is up". tawâw "complete" ' +
      '(THK06:230) already carries homeAllDoneKicker and says a task finished, not a clock run out, and ' +
      'sa\u2018ât (THK06:222) is the instrument, "hour, clock".',
  },
  storiesHeader: {
    origin: 'cited',
    text: 'çîrrok',
    src: 'THK06:176',
    from: 'ch\u00EE\u0159ok',
    fromNote:
      'p. 176 glosses it "story". The bridge half is the plural Stories; the Sorani plural suffix is not a ' +
      'construction this app ships, so the header carries the bare noun.',
  },
  levelBeginner: {
    origin: 'cited',
    text: 'sereta',
    src: 'THK06:223',
    from: 'sarat\u00E2',
    fromNote:
      'p. 223 glosses it "beginning". sarabahâr four lines above it is "beginning of spring" and is a ' +
      'different headword. dast pe-kirdin (THK06:178) is "to begin, start" and was rejected: a story level is ' +
      'a stage, not an action.',
  },
  levelIntermediate: {
    origin: 'cited',
    text: 'nawerrast',
    src: 'THK06:210',
    from: 'n\u00E2wa\u0159\u00E2st',
    fromNote:
      'p. 210 prints this as the tilde sub-entry ~ařâst under the headword nâw1 "midst, middle; among, ' +
      'between", glossed "middle". Two more tildes sit in that entry, ~arok and ~châw-. nâwrâst on p. 221 is a ' +
      'different word, "the Middle East".',
  },
  levelAdvanced: {
    origin: 'cited',
    text: 'pêşkewtû',
    src: 'THK06:215',
    from: 'peshkawt\u00FB',
    fromNote:
      'p. 215 glosses it "advanced, progressive", one of a long run of pesh- headwords on that page. Only the ' +
      'first half of the gloss is what this slot means.',
  },
  questionsNoun: {
    origin: 'cited',
    text: 'pirsyar',
    src: 'THK06:216',
    from: 'pirsy\u00E2r',
    fromNote:
      'The same headword comboKicker takes, "question" at p. 216. It renders after a count here too, "3 ' +
      'pirsyar", and Sorani takes the singular noun after a numeral.',
  },
  storyRead: {
    origin: 'pending',
    text: null,
    reason:
      'The verb is khwendin "to call; to read", and p. 200 prints its headword broken as khwen|din, the bar ' +
      'marking where its sub-entry tildes attach. No page carries the string khwendin whole, which is the ' +
      'same reason ./vocab/verbs.ts leaves its read slot empty; a slot that cannot be verified against a ' +
      'printed string is not filled here either.',
  },
  storyReadCta: {
    origin: 'authored',
    text: 'bixwêne',
    note:
      'The singular imperative of khwendin "to read", whose present stem khwen- is printed at THK06:200 in the ' +
      'khwen|din entry. § 24 (THK06:38) gives the rule for a stem ending in a consonant: bí- + stem + -a, as ' +
      'p. 39 prints it for nûs- as bínûsa. So bí- + khwen- + -a gives bíkhwena, which stripStress() and the ' +
      'pp. 88 to 89 table turn into bixwêne. The infinitive cannot be cited because p. 200 breaks it with a ' +
      'bar, but the stem it is built from is printed whole.',
  },
  storyNotFoundTitle: {
    origin: 'pending',
    text: null,
    reason: NO_SENTENCE(
      'The bridge half is "Story not found".',
      'chîřok "story" (THK06:176) carries the header above; the title is the same negated passive that ' +
        'lessonNotFoundTitle wants and no page prints one.',
    ),
  },
  comprehensionKicker: {
    origin: 'cited',
    text: 'pirsyar',
    src: 'THK06:216',
    from: 'pirsy\u00E2r',
    fromNote:
      'The same "question" headword at p. 216. The bridge half is COMPREHENSION; nothing in the volume is ' +
      'glossed that, so the slot says the countable thing the section holds instead.',
  },
  unitNotFoundTitle: {
    origin: 'pending',
    text: null,
    reason: NO_SENTENCE(
      'The bridge half is "Unit not found".',
      'The same negated passive as the lesson and story titles, and nothing in the volume is glossed "unit" ' +
        'in the sense of a part of a course either.',
    ),
  },
  storyDoneTitle: {
    origin: 'pending',
    text: null,
    reason: NO_SENTENCE(
      'The bridge half is a second-person past, "You read it!".',
      'The verb behind it is the khwendin p. 200 breaks with a bar, so even its infinitive is unciteable, ' +
        'which is what storyRead above records.',
    ),
  },
  onbTitle1: {
    origin: 'cited',
    text: 'sllaw',
    src: 'THK06:228',
    from: 's\u0142\u00E2w',
    fromNote:
      'p. 228 glosses it "greetings", with ~-kirdin la "to greet" and ~-sandinawa "to acknowledge a greeting" ' +
      'under it. The first onboarding slide is the welcome; the bare noun is what the page carries and the ' +
      'formula "bi xêr hatî" the Kurmanji slide uses is not in the volume at all.',
  },
  onbTitle2: {
    origin: 'pending',
    text: null,
    reason:
      'The Kurmanji title is "Rê li pêş te", the road ahead of you, which is a sentence. re "way, road" ' +
      '(THK06:220) is cited by this corpus, but a one-word slide title reading "road" says nothing about ' +
      'learning, and the sentence needs the copula.',
  },
  onbTitle3: {
    origin: 'cited',
    text: 'wajegel',
    src: 'THK06:236',
    from: 'w\u00E2zhagal',
    fromNote:
      'The same "vocabulary" sub-entry ~gal under wâzha at p. 236 that vocabHeader takes. This slide is the ' +
      'words slide, so it names what the slide is about.',
  },
  onbTitle4: {
    origin: 'cited',
    text: 'çîrrok',
    src: 'THK06:176',
    from: 'ch\u00EE\u0159ok',
    fromNote: 'The same "story" headword at p. 176 that storiesHeader takes. This slide is the stories slide.',
  },
  onbTitle5: {
    origin: 'cited',
    text: 'agir',
    src: 'THK06:165',
    from: '\u00E2gir',
    fromNote:
      'The same "fire" headword at p. 165 that rapidFireTitle takes. This slide is the streak slide, whose ' +
      'Kurmanji title is the phrase "light your fire".',
  },
  onbFlashLabel: {
    origin: 'cited',
    text: 'kurdî',
    src: 'THK06:202',
    from: 'kurd\u00EE',
    fromNote: 'The same ~î sub-entry under kurd at p. 202 that cardTaughtLabel takes; this is the same label on a mock-up card.',
  },
  onbSampleWord: {
    origin: 'cited',
    text: 'sllaw',
    src: 'THK06:228',
    from: 's\u0142\u00E2w',
    fromNote:
      'The "greetings" headword at p. 228. The Kurmanji mock-up shows the phrase "roj baş" on its sample card; ' +
      'a single cited headword is what a flashcard face carries anyway, so the phrase is not needed here.',
  },
  onbStoryBefore: {
    origin: 'pending',
    text: null,
    reason:
      'The first half of the mock-up sentence "Ez li mal im", I am at home. le "in, at, from" (THK06:203) is ' +
      'cited by this corpus and min "I" is not taught by it at all; the fragment is part of a sentence and ' +
      'the sentence needs the copula that closes it, which onbStoryAfter records.',
  },
  onbStoryWord: {
    origin: 'cited',
    text: 'mall',
    src: 'THK06:206',
    from: 'm\u00E2\u0142',
    fromNote:
      'p. 206 glosses it "house, home". This is the one word of the mock-up story that is highlighted and ' +
      'glossed in the tooltip, so it is the one word that has to be real.',
  },
  onbStoryAfter: {
    origin: 'pending',
    text: null,
    reason:
      'The Kurmanji is " im.", the first-person copula and a full stop. Thackston sets the copula out in the ' +
      'grammar rather than the glossary, so there is no headword to cite, and this table cites headwords.',
  },
  onbStreakLabel: {
    origin: 'cited',
    text: 'roj',
    src: 'THK06:221',
    from: 'rozh',
    fromNote:
      'The same "day" headword at p. 221 that streakDayNoun takes. The Kurmanji label is the phrase "days in ' +
      'a row"; the mock-up already shows the number, so the noun alone carries the label.',
  },
  onbStartCta: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is "Start learning". dast pe-kirdin "to begin, start" is printed at THK06:178 as ' +
      '~ pe-kirdin under dast and again at THK06:214 under pe, and its imperative would need kirdin\'s own ' +
      'imperative bíka plus a decision about where the bí- goes in a two-part compound the § 19 rule ' +
      '(THK06:30) does not name. Two derivations deep is one more than this table takes.',
  },
  welcome: {
    origin: 'cited',
    text: 'sllaw',
    src: 'THK06:228',
    from: 's\u0142\u00E2w',
    fromNote:
      'The "greetings" headword at p. 228, greeting the learner on the first-run language picker. The ' +
      'Kurmanji "Bi xêr hatî" has no counterpart in the volume: no headword and no example is glossed ' +
      '"welcome".',
  },
  avatarSun: {
    origin: 'cited',
    text: 'xor',
    src: 'THK06:199',
    from: 'khor',
    fromNote: 'p. 199 glosses it "sun". kh and gh both land on x under the pp. 88 to 89 table, which is the loss SORANI_LATIN records.',
  },
  avatarFlame: {
    origin: 'cited',
    text: 'agir',
    src: 'THK06:165',
    from: '\u00E2gir',
    fromNote: 'The "fire" headword at p. 165. The Kurmanji emblem is "Agirê Newrozê", the Newroz fire; only the noun is cited.',
  },
  avatarMountain: {
    origin: 'cited',
    text: 'çya',
    src: 'THK06:177',
    from: 'chy\u00E2',
  },
  avatarWheat: {
    origin: 'cited',
    text: 'genim',
    src: 'THK06:184',
    from: 'ganim',
    fromNote: 'p. 184 glosses it "wheat". shâro on p. 226 is "a sheaf of reaped wheat" and is the sheaf, not the grain.',
  },
  avatarTulip: {
    origin: 'cited',
    text: 'gullalle',
    src: 'THK06:187',
    from: 'gu\u0142\u00E2\u0142a',
    fromNote:
      'p. 187 prints this as the tilde sub-entry ~âła under the headword guł "flower", glossed "red tulip". ' +
      'Two more tildes sit in that entry, "~ a sûr rose" and "~âw rosewater". guł alone is cited by ' +
      './vocab/food.ts as "flower"; the emblem is a tulip, so the sub-entry is what this slot takes.',
  },
  avatarStar: {
    origin: 'cited',
    text: 'estêre',
    src: 'THK06:164',
    from: 'astera',
  },
  avatarHeart: {
    origin: 'cited',
    text: 'dill',
    src: 'THK06:181',
    from: 'di\u0142',
  },
  avatarBook: {
    origin: 'cited',
    text: 'ktaw',
    src: 'THK06:202',
    from: 'kt\u00E2w',
    fromNote:
      'p. 202 glosses it "book". partuk (THK06:213) is also "book" and is cited by ./vocab/education.ts; ktâw ' +
      'is the one ./vocab/home.ts teaches and is on the same page as the kurdî this table cites twice.',
  },
  appSystem: {
    origin: 'pending',
    text: null,
    reason:
      'The bridge half is System, meaning follow the device. Nothing in the volume is glossed "automatic", ' +
      '"system" in that sense, or anything the Kurmanji "Bixweber" translates.',
  },
  appLight: {
    origin: 'cited',
    text: 'roşin',
    src: 'THK06:221',
    from: 'roshin',
    fromNote:
      'p. 221 glosses it "bright", with ~bîr "intellectual" under it. rûn and rûnâk (both THK06:222) are also ' +
      '"bright" and were rejected: rûn leads with "clear" and rûnâk is the same root as rûn with a suffix, so ' +
      'roshin is the one of the three whose entry is the plain adjective.',
  },
  appDark: {
    origin: 'cited',
    text: 'tarîk',
    src: 'THK06:231',
    from: 't\u00E2r\u00EEk',
    fromNote: 'p. 231 glosses it "dark". târîkh on the line below it is "history" and is a different headword.',
  },
  learnerNoun: {
    origin: 'cited',
    text: 'qutabî',
    src: 'THK06:218',
    from: 'qut\u00E2b\u00EE',
    fromNote:
      'p. 218 prints this as the tilde sub-entry ~î under the headword qutâb, glossed "student". The only ' +
      'other ~î on that page is ~î-kirdin under bân. It stands in for a display name the learner has not set, ' +
      'where the bridge fallback is Learner.',
  },
  taughtName: {
    origin: 'cited',
    text: 'kurdî',
    src: 'THK06:202',
    from: 'kurd\u00EE',
    fromNote:
      'The same ~î sub-entry under kurd at p. 202. This is the language\'s name for itself on the ' +
      'card-direction control, which is the reading of that bare "Kurdish" this corpus takes.',
  },
  badge_first_lesson: {
    origin: 'pending',
    text: null,
    reason:
      'The badge is "First Words". yêk "one" (THK06:17) and the wâzha and wisha of THK06:236 are all cited, ' +
      'but "first" is an ordinal and the ordinal suffix is a construction this app does not ship: p. 182 ' +
      'prints ~am "second" under dû, and nothing gives the first.',
  },
  badge_ten_lessons: {
    origin: 'cited',
    text: 'qutabî',
    src: 'THK06:218',
    from: 'qut\u00E2b\u00EE',
    fromNote: 'The same "student" sub-entry under qutâb at p. 218 that learnerNoun takes. The badge\'s English name is Student.',
  },
  badge_all_lessons: {
    origin: 'cited',
    text: 'mamosta',
    src: 'THK06:206',
    from: 'm\u00E2most\u00E2',
    fromNote: 'p. 206 glosses it "teacher", which is this badge\'s English name.',
  },
  badge_streak_3: {
    origin: 'authored',
    text: 'sê roj',
    note:
      'Composed from sê (THK06:17, se) and roj (THK06:221, rozh "day"), both cited by this corpus, in the ' +
      'joined-headwords construction ./courses.ts uses. Sorani takes the singular noun after a numeral, which ' +
      'is why roj is not pluralised. No page prints the two words together.',
  },
  badge_streak_7: {
    origin: 'authored',
    text: 'hewt roj',
    note: 'Composed from hewt (THK06:17) and roj (THK06:221, rozh "day"), on the same footing as badge_streak_3 above.',
  },
  badge_streak_30: {
    origin: 'authored',
    text: 'sî roj',
    note: 'Composed from sî (THK06:17) and roj (THK06:221, rozh "day"), on the same footing as badge_streak_3 above.',
  },
  badge_vocab_10_mastered: {
    origin: 'pending',
    text: null,
    reason:
      'The badge names someone who has mastered ten words. Nothing in the volume is glossed "master" in that ' +
      'sense: bag (THK06:167) and the p. 197 headword are "lord, master" of a household, and the p. 235 one is ' +
      '"master, professor". None of them is a person who knows a set of words.',
  },
  badge_vocab_50_mastered: {
    origin: 'pending',
    text: null,
    reason:
      'The badge is a word-hunter. The hunting words the volume gives are literal, ~chî and ~kar at THK06:220 ' +
      'and the p. 224 headword, all of them someone who hunts animals. Putting one beside "word" would be a ' +
      'metaphor this app made up, not one Thackston records.',
  },
  badge_perfect_lesson: {
    origin: 'pending',
    text: null,
    reason:
      'The badge is "Perfect Day". The volume\'s only "perfect" is sip at THK06:227, inside an entry about ' +
      'colour, and kołka at THK06:202 is "imperfect, pseudo-" in a compounding sense. tawâw "complete" ' +
      '(THK06:230) is a task finished rather than one finished without error.',
  },
  badge_combo_master: {
    origin: 'pending',
    text: null,
    reason:
      'The badge name is the Kurmanji coinage "Şer-Komboyê", combo warrior, built on a loanword. There is no ' +
      'Sorani headword for a combo, and the master half fails for the same reason badge_vocab_10_mastered ' +
      'does.',
  },
  badge_first_story: {
    origin: 'cited',
    text: 'çîrrok',
    src: 'THK06:176',
    from: 'ch\u00EE\u0159ok',
    fromNote:
      'The "story" headword at p. 176. The badge\'s English name is Story Reader; the reader half is the ' +
      'khwendin p. 200 breaks with a bar, so only the story half is cited.',
  },
  badge_all_stories: {
    origin: 'cited',
    text: 'pallewan',
    src: 'THK06:214',
    from: 'p\u00E2\u0142aw\u00E2n',
    fromNote:
      'p. 214 glosses it "champion, hero", with ~etî "heroism" under it, which is this badge\'s English name ' +
      '(Story Hero) minus the story. The p. 217 headword is also "hero" and was rejected: its entry leads with ' +
      'the heroism abstract rather than the person.',
  },
};

// A pending row hands back the frozen PENDING sentinel rather than a fresh
// object, so a stray write cannot fill one in place. An authored row carries no
// src, which is the whole of its claim: the wording is this app's, not a page's.
function toChromeSlot(row: SoraniChromeSlot): ChromeSlot {
  if (row.origin === 'pending') return PENDING;
  return { text: row.text, src: row.origin === 'cited' ? row.src : null };
}

const table = {} as TaughtChrome;
// Own enumerable keys only: a bare for..in would walk Object.prototype.
for (const key of Object.keys(CKB_CHROME_SLOTS) as (keyof TaughtChrome)[]) {
  table[key] = toChromeSlot(CKB_CHROME_SLOTS[key]);
}

/** The Sorani table in the shape every consumer of TaughtChrome already reads. */
export const CKB_CHROME: TaughtChrome = table;

/**
 * The slots CKB_POLICY may not demand a page of. Authored wording is composed
 * for this app out of cited parts and has no locator of its own, the same
 * exemption ./vocabulary.ts and ./courses.ts declare for a label and a title.
 */
export const CKB_AUTHORED_CHROME_KEYS: ReadonlySet<string> = new Set(
  Object.keys(CKB_CHROME_SLOTS).filter((key) => isAuthoredChrome(CKB_CHROME_SLOTS[key as keyof TaughtChrome])),
);
