// Fêrbûn: Sorani family vocabulary. The first authored Sorani corpus in the app.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` below names
// the Kurdish-English glossary page carrying that headword and its English
// gloss, and nothing else.
//
// Provenance. This claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts,
// so it travels with the data and not only in this comment: each Sorani form and
// its English gloss come from Thackston at the page named in that entry's `src`.
// The Turkish gloss is not his. It is a translation of that English gloss,
// authored for this app, and it carries no locator, because Thackston glosses in
// English only. No native speaker has reviewed any of it, neither the forms nor
// the glosses.
//
// Forms are written in the Hawar alphabet by way of Thackston's conversion table
// (THK06:88). Accented letters are literal here, not escaped as they are in
// tracks.ts and orthography.ts, because these entries answer to a mechanical
// legality check (checkOrthography under SORANI_LATIN) that the display labels
// there do not, and because the speaker who reviews this file has to be able to
// read it.
//
// No `gender` on any entry. Sorani has no grammatical gender, so the field the
// Kurmanji corpus carries would be an invented grammatical claim here. No
// `exampleKu` either: a sentence is a far larger provenance claim than a
// headword, and this theme does not need one.
//
// SIX CHOICES BETWEEN RIVAL HEADWORDS. Thackston's glossary offers more than one
// word for each gloss below and says nothing about which one a beginner should
// meet first. Each pick is editorial, not a fact off the page, and each needs a
// speaker's confirmation:
//  - father: bawk over bâb, because Thackston uses this form as his own worked
//    example on p. 163.
//  - mother: dayk over dâya, because dâya also means "nurse" and a beginner
//    should not meet a second sense.
//  - person: kes over mirov and âdamî, because it is the clean single sense.
//    mirov also carries "man" and "one".
//  - family: binemalle over xizm, xanewade and xêzan. xizm reads closer to
//    "relative", and xanewade carries a "wealthy" register marker.
//  - nation: netewe, because millat and mîllat are two rival spellings of one
//    word and this pass will not pick between them.
//  - youth: law, the exact gloss match, over xort.
//
// FIVE SLOTS THE KURMANJI FAMILY THEME FILLS AND THIS ONE LEAVES EMPTY. Listed
// so the gap reads as a decision rather than as an oversight:
//  - old person: no gender-neutral noun exists in the glossary. pîr is an
//    adjective, "old, aged".
//  - man, husband: merd matches the gloss, but pyâw "man" and shû "husband"
//    split the two senses and are commoner. Kurmanji fuses them, Sorani may not.
//    Needs a speaker.
//  - paternal uncle, second slot: mamo exists beside mam on the same page, but
//    nothing in the glossary says they differ in meaning rather than in
//    familiarity or dialect.
//  - people, nation: neither candidate fits. el adds "tribe", and the direct
//    cognate gal is glossed "flock, herd, people" with no "nation" sense at all,
//    so the cognate does not carry the Kurmanji meaning.
//  - nation, second slot: millat and mîllat are separately alphabetised entries
//    differing only in i versus î.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_FAMILY: SoraniVocabWord[] = [
  { id: 'ckb-v001', wordKu: 'bawk', wordEn: 'father', wordTr: 'baba', partOfSpeech: 'noun', theme: 'family', src: 'THK06:171' },
  { id: 'ckb-v002', wordKu: 'dayk', wordEn: 'mother', wordTr: 'anne', partOfSpeech: 'noun', theme: 'family', src: 'THK06:181' },
  { id: 'ckb-v003', wordKu: 'bira', wordEn: 'brother', wordTr: 'erkek kardeş', partOfSpeech: 'noun', theme: 'family', src: 'THK06:172' },
  { id: 'ckb-v004', wordKu: 'xwişk', wordEn: 'sister', wordTr: 'kız kardeş', partOfSpeech: 'noun', theme: 'family', src: 'THK06:200' },
  { id: 'ckb-v005', wordKu: 'kurr', wordEn: 'boy, son', wordTr: 'oğlan, oğul', partOfSpeech: 'noun', theme: 'family', src: 'THK06:202' },
  { id: 'ckb-v006', wordKu: 'kiç', wordEn: 'girl, daughter', wordTr: 'kız, kız evlat', partOfSpeech: 'noun', theme: 'family', src: 'THK06:200' },
  { id: 'ckb-v007', wordKu: 'jin', wordEn: 'woman, wife', wordTr: 'kadın, eş', partOfSpeech: 'noun', theme: 'family', src: 'THK06:239' },
  { id: 'ckb-v008', wordKu: 'minall', wordEn: 'child', wordTr: 'çocuk', partOfSpeech: 'noun', theme: 'family', src: 'THK06:207' },
  // wordTr trimmed from the Kurmanji 'insan, kişi': Thackston glosses kas as
  // "person" alone, so the "human" half of that pair is not his claim to make.
  { id: 'ckb-v009', wordKu: 'kes', wordEn: 'person', wordTr: 'kişi', partOfSpeech: 'noun', theme: 'family', src: 'THK06:194' },
  { id: 'ckb-v010', wordKu: 'binemalle', wordEn: 'family', wordTr: 'aile', partOfSpeech: 'noun', theme: 'family', src: 'THK06:171' },
  { id: 'ckb-v011', wordKu: 'mam', wordEn: 'paternal uncle', wordTr: 'amca', partOfSpeech: 'noun', theme: 'family', src: 'THK06:206' },
  { id: 'ckb-v012', wordKu: 'law', wordEn: 'youth, young man', wordTr: 'genç, delikanlı', partOfSpeech: 'noun', theme: 'family', src: 'THK06:204' },
  // wordTr trimmed from the Kurmanji 'yaşlı adam, dede': "dede" is grandfather,
  // a sense Thackston's "old man" does not carry.
  { id: 'ckb-v013', wordKu: 'pîremêrd', wordEn: 'old man', wordTr: 'yaşlı adam', partOfSpeech: 'noun', theme: 'family', src: 'THK06:216' },
  { id: 'ckb-v014', wordKu: 'netewe', wordEn: 'nation', wordTr: 'millet, ulus', partOfSpeech: 'noun', theme: 'family', src: 'THK06:209' },
  { id: 'ckb-v015', wordKu: 'xellk', wordEn: 'people', wordTr: 'halk', partOfSpeech: 'noun', theme: 'family', src: 'THK06:196' },
  { id: 'ckb-v016', wordKu: 'newe', wordEn: 'grandchild', wordTr: 'torun', partOfSpeech: 'noun', theme: 'family', src: 'THK06:209' },
];
