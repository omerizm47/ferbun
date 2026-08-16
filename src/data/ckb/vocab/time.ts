// Fêrbûn: Sorani time vocabulary, the twelfth authored Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji time theme fills fourteen slots (v151 to v164). Thirteen are
// filled here. The one that is not is listed below with what was rejected for
// it, so a gap reads as a decision.
//
// THE CALENDAR WAS READ IN THE GRAMMAR AS WELL AS THE GLOSSARY. p. 18 is the
// only page in the volume that sets either list out whole: "§ 12.2 Days of the
// Week and Months of the Year" runs shamma Saturday through jum'a Friday, and
// "§ 12.3 Months of the Year and the Kurdish Calendar" runs the twelve zodiac
// months. Neither list is taught, and not for want of a page to cite: this file
// fills Kurmanji slots, and the Kurmanji time theme has no weekday slot and no
// month-name slot. If it ever gets them, p. 18 is the citation and the glossary
// is not, because the glossary prints those words one at a time and off the
// list, a weekday under its number word (~shamma under se, p. 225, "Tuesday")
// and a month under its zodiac sign (jozardân, p. 193, "the month of Gemini").
//
// ONE SLOT LEFT EMPTY:
//  - month (Kurmanji meh): the only headword glossed "month" is mâng (p. 206,
//    "moon, month"), and mâng is already ckb-v060, the moon of ./nature.ts. One
//    headword cannot be two cards, exactly as nân could not be both bread and
//    food in ./food.ts. Nothing else in the volume is the bare noun. kânûn
//    (p. 195) has no gloss of its own at all, only the sub-entries "~ i yekam
//    December; ~ i dûham January", and every other month in the book names one
//    month rather than the class: âzâr2 (p. 167) is "March", jozardân (p. 193)
//    "the month of Gemini", rashama (p. 219) "the month of Pisces", and so on
//    down the zodiac.
//
// FOUR CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense the slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - today: imřo (p. 192) over amřo (p. 164). Both are bare "today", neither
//    cross-references the other, and each heads a parallel pair with its own
//    tonight, imshaw on p. 192 and amshaw on p. 164. imřo was taken because its
//    conversion, imrro, is the nearer of the two to the Kurmanji slot's îro.
//    This is the thinnest reason in the file and the entry most likely to be
//    swapped at review.
//  - now: estâ (p. 183, a bare "now") over amjâ (p. 164, "now, at this time")
//    and nûka (p. 211, "now, at that time"), which fix a moment rather than
//    name the present. al'ân (p. 163) is a bare "now" too, and it is the one
//    rival in this file with no mechanical spelling at all: p. 163 sets its
//    mark as U+2019, and the ayn row of the conversion table at p. 88 is
//    U+2018, so toHawar throws on it instead of deciding which mark was meant.
//  - yesterday: dwene (p. 183, a bare "yesterday") over dwe(ka) (p. 182,
//    "yesterday, last night"), whose final syllable is printed parenthesised
//    and optional and whose second gloss dwene carries on a sub-entry of its
//    own, "~ sháwe last night".
//  - early, soon: zû (p. 240) over gurj (p. 187, "quick, soon"), kherâ (p. 197,
//    "quick, soon, fast") and peshwakht (p. 215, "early, untimely"). zû is the
//    only one of the four glossed with the slot's two senses and nothing else,
//    and it is the Kurmanji slot's own form.
//
// ONE ONE-TO-MANY SPLIT. Kurmanji sibeh is glossed "morning; tomorrow".
// Thackston keeps the two apart, so the slot is filled at the morning sense
// with bayânî (p. 169) and the tomorrow half is dropped, taking the Turkish
// yarın with it. It is dropped rather than cited because his word for it cannot
// be cited: p. 225 prints sbayn|î, broken by the same bar as the khwen|din that
// kept "to read" out of ./verbs.ts, so no page prints the string sbaynî, and
// sbene on the next line is a cross-reference to it with no gloss of its own.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH, listed rather than
// lost: nothing beyond the split above. Sub-entries and worked examples are
// dropped without comment: rozh is glossed "day; ~âna daily; ~(h)alât east,
// orient, dawn", shaw "night; am~ tonight; ~chara banquet; ~è by night; ~gâr
// all night long", sâł "year; ~gâr a long period of time", dwene "yesterday;
// ~ sháwe last night", zû "early, soon; ba ~î quickly, fast", dirang "late;
// ~-bûn to be late", hamîsha "always; ~î constant", ewâra "evening; ~t bâsh
// good evening", estâ "now; l'~wa as of now, from now on", sa'ât "hour, clock,
// o'clock: la ~ (i) chwâr-dâ at four o'clock".
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// one is a single upright Times-Bold span with no italic letter inside it.
// dirang, hamîsha, bayânî, hafta and imřo were the ones worth checking, each
// with an interior consonant cluster or unstressed vowel where a furtive i
// would go.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_TIME: SoraniVocabWord[] = [
  { id: 'ckb-v186', wordKu: 'roj', wordEn: 'day', wordTr: 'gün', partOfSpeech: 'noun', theme: 'time', src: 'THK06:221', from: 'rozh' },
  { id: 'ckb-v187', wordKu: 'şew', wordEn: 'night', wordTr: 'gece', partOfSpeech: 'noun', theme: 'time', src: 'THK06:226', from: 'shaw' },
  { id: 'ckb-v188', wordKu: 'hefte', wordEn: 'week', wordTr: 'hafta', partOfSpeech: 'noun', theme: 'time', src: 'THK06:188', from: 'hafta' },
  { id: 'ckb-v189', wordKu: 'sall', wordEn: 'year', wordTr: 'yıl', partOfSpeech: 'noun', theme: 'time', src: 'THK06:225', from: 'sâł' },
  // wordTr stays the Kurmanji 'saat', which is the one Turkish word for all
  // three of Thackston's senses.
  { id: 'ckb-v190', wordKu: 'seat', wordEn: 'hour, clock, o\'clock', wordTr: 'saat', partOfSpeech: 'noun', theme: 'time', src: 'THK06:222', from: 'sa‘ât' },
  // wordTr trimmed from the Kurmanji 'sabah; yarın': bayânî is the morning
  // alone, and the word for tomorrow is the sbayn|î the header explains.
  { id: 'ckb-v191', wordKu: 'beyanî', wordEn: 'morning', wordTr: 'sabah', partOfSpeech: 'noun', theme: 'time', src: 'THK06:169', from: 'bayânî' },
  { id: 'ckb-v192', wordKu: 'êware', wordEn: 'evening', wordTr: 'akşam', partOfSpeech: 'noun', theme: 'time', src: 'THK06:183', from: 'ewâra' },
  { id: 'ckb-v193', wordKu: 'êsta', wordEn: 'now', wordTr: 'şimdi', partOfSpeech: 'adv', theme: 'time', src: 'THK06:183', from: 'estâ' },
  { id: 'ckb-v194', wordKu: 'imrro', wordEn: 'today', wordTr: 'bugün', partOfSpeech: 'adv', theme: 'time', src: 'THK06:192', from: 'imřo' },
  { id: 'ckb-v195', wordKu: 'dwênê', wordEn: 'yesterday', wordTr: 'dün', partOfSpeech: 'adv', theme: 'time', src: 'THK06:183', from: 'dwene' },
  // wordTr is the Kurmanji 'yakında, erken' in Thackston's order, because his
  // gloss leads with the early and the Kurmanji slot leads with the soon.
  { id: 'ckb-v196', wordKu: 'zû', wordEn: 'early, soon', wordTr: 'erken, yakında', partOfSpeech: 'adv', theme: 'time', src: 'THK06:240', from: 'zû' },
  { id: 'ckb-v197', wordKu: 'direng', wordEn: 'late', wordTr: 'geç', partOfSpeech: 'adj', theme: 'time', src: 'THK06:181', from: 'dirang' },
  { id: 'ckb-v198', wordKu: 'hemîşe', wordEn: 'always', wordTr: 'her zaman', partOfSpeech: 'adv', theme: 'time', src: 'THK06:189', from: 'hamîsha' },
];
