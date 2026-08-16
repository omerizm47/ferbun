// Fêrbûn: Sorani cardinal numbers, the second authored Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Provenance, spelling and
// review status are exactly as ./family.ts states them, and the claim also
// ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// Unlike family, this theme does not come from the glossary. All sixteen forms
// are printed together in § 12, "Cardinal Numbers", on printed page 17, where
// Thackston sets the whole series out in order with worked examples in running
// text: dû rozh "two days", shash mâng "six months", sad sâł "a hundred years".
// One systematic page beats sixteen separate glossary lookups.
//
// Every `src` here is THK06:17 rather than THK06:§12 for a mechanical reason:
// tools/verify-citations.ts opens the printed page named in `src` and looks for
// `from` on it, and a section locator names no one page, so §12 would be
// reported as unchecked. The page and the section are the same sheet of paper.
//
// WHAT § 12 GLOSSES, AND WHAT IT DOES NOT. The section gives each form against
// a digit, "1 yek", not against an English word, so `wordEn` below is the
// English name of Thackston's digit and not a string lifted off the page. Eleven
// of the sixteen are also glossary headwords with an English word attached, and
// each of those confirms the reading: yek "one" (p. 237), dû "two" (p. 182), se
// "three" (p. 225), chwâr "four" (p. 177), penj "five" (p. 215), shash "six"
// (p. 225), ḥawt "seven" (p. 190), no "nine" (p. 211), bîst "twenty" (p. 173),
// chil "forty" (p. 176), sad "hundred" (p. 222). The other five, hasht, da, sî,
// panjâ and hazâr, are not glossary headwords at all, which is the second reason
// the section is cited for all sixteen instead of splitting the theme across two
// provenances.
//
// SEVEN, AND THE ROW THAT SETTLES IT. Thackston prints 7 as ḥawt, with ḥ
// (U+1E25, h with dot below) for the pharyngeal, and his conversion table at
// pp. 88 to 89 gives that character no line of its own. The line it does print
// settles it anyway: the h row's Arabic cell holds U+062D and U+0647 and sends
// both to Kurmanji h, the alphabet chart at p. 4 pairs U+062D with ḥ, and p. 2
// says of ḥ that it is "a voiceless pharyngeal fricative, IPA [ħ], like the
// Arabic [U+062D]; otherwise it is not distinguished from h". So hewt below is
// derived through the table like every other form here, not typed. The id
// breaks the run because 001 to 051 were already spent when this gap was filled.
//
// The furtive i is not in play anywhere in this theme: every numeral on p. 17
// is set as a single upright Times-Bold span, checked span by span rather than
// in the extracted text, which drops italics. The only italics on the page are
// the three worked examples above, italic end to end as examples.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_NUMBERS: SoraniVocabWord[] = [
  { id: 'ckb-v017', wordKu: 'yêk', wordEn: 'one', wordTr: 'bir', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'yek' },
  { id: 'ckb-v018', wordKu: 'dû', wordEn: 'two', wordTr: 'iki', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'dû' },
  { id: 'ckb-v019', wordKu: 'sê', wordEn: 'three', wordTr: 'üç', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'se' },
  { id: 'ckb-v020', wordKu: 'çwar', wordEn: 'four', wordTr: 'dört', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'chwâr' },
  { id: 'ckb-v021', wordKu: 'pênc', wordEn: 'five', wordTr: 'beş', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'penj' },
  { id: 'ckb-v022', wordKu: 'şeş', wordEn: 'six', wordTr: 'altı', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'shash' },
  {
    id: 'ckb-v052', wordKu: 'hewt', wordEn: 'seven', wordTr: 'yedi', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17',
    from: 'ḥawt',
    fromNote: 'p. 17 prints ḥawt verbatim. The ḥ has no row of its own in the conversion table: it is read off the Arabic column of the h row at p. 88, whose cell holds U+062D and U+0647 and sends both to Kurmanji h, with p. 4 pairing U+062D with ḥ in the alphabet chart. Hence hewt.',
  },
  { id: 'ckb-v023', wordKu: 'heşt', wordEn: 'eight', wordTr: 'sekiz', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'hasht' },
  { id: 'ckb-v024', wordKu: 'no', wordEn: 'nine', wordTr: 'dokuz', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'no' },
  { id: 'ckb-v025', wordKu: 'de', wordEn: 'ten', wordTr: 'on', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'da' },
  { id: 'ckb-v026', wordKu: 'bîst', wordEn: 'twenty', wordTr: 'yirmi', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'bîst' },
  { id: 'ckb-v027', wordKu: 'sî', wordEn: 'thirty', wordTr: 'otuz', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'sî' },
  { id: 'ckb-v028', wordKu: 'çil', wordEn: 'forty', wordTr: 'kırk', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'chil' },
  { id: 'ckb-v029', wordKu: 'penca', wordEn: 'fifty', wordTr: 'elli', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'panjâ' },
  { id: 'ckb-v030', wordKu: 'sed', wordEn: 'hundred', wordTr: 'yüz', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'sad' },
  { id: 'ckb-v031', wordKu: 'hezar', wordEn: 'thousand', wordTr: 'bin', partOfSpeech: 'num', theme: 'numbers', src: 'THK06:17', from: 'hazâr' },
];
