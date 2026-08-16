// Fêrbûn: Sorani animal vocabulary, the fifth authored Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji animal theme fills twenty slots (v101 to v114, v269 to v274).
// Fifteen are filled here. The five that are not are listed below with the
// entry that was rejected for each, so a gap reads as a decision.
//
// FOUR CHOICES BETWEEN RIVAL HEADWORDS, each editorial and each needing a
// speaker's confirmation:
//  - wolf: gurg (p. 187) over gur on the same page, glossed "wolf; meeting".
//    gurg is the single-sense entry.
//  - bird: bâłinda (p. 170) over four others glossed "bird" and nothing else:
//    bâłdâr on the same line above it, mal (p. 205), pałahawr (p. 212) and
//    palawar, also p. 212, printed with the variant palawir. Five bare
//    one-word entries and no note anywhere saying which a beginner should meet.
//    This is the weakest pick in the file.
//  - calf: gûr (p. 188) over gol (p. 187, "calf; pool, pond; stupid").
//  - chicken: mirîshk (p. 207) over mâmir (p. 206, "chicken"). The same page
//    also prints mirîshk a second time as the sub-entry ~îshk under the
//    headword mir "hen", so p. 207 carries the form both ways; the entry below
//    cites the standalone headword, which is what verify-citations reads.
//
// FIVE SLOTS LEFT EMPTY:
//  - ox, cow (Kurmanji ga): Thackston glosses gâ (p. 185) as "cow" alone, with
//    no ox sense, and that gloss is the one mângâ already carries below. The
//    only ox in the glossary is gâmûsh (p. 185), "ox, buffalo", two animals on
//    one card.
//  - sheep, collective (pez): paz (p. 213) is glossed "sheep", the same gloss
//    as mař, with nothing on the page marking it as a collective.
//  - partridge (kew): the only line in the glossary offering "partridge" is
//    poř (p. 216), "hair (on the head); partridge", whose first sense is the
//    one the Kurmanji body theme teaches as por (v288). Sorani kew (p. 195) is
//    glossed "mountain".
//  - dog, second slot (kûçik): sag is the only dog headword in the glossary.
//    p. 222 also prints sa, but as a cross-reference, "sa = sag", not as a
//    second word with a gloss of its own.
//  - goose (qaz): no headword is glossed "goose". The word occurs once in the
//    glossary, inside the idiom "he's on a wild goose chase" at p. 227.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH: kar "donkey, ass".
// Sub-entries and worked examples are dropped without comment: sag is glossed
// "dog; ~ i pe-sûtâw wandering aimlessly" and pishî "cat; ~la kitten".
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// one is a single upright Times-Bold span with no italic letter inside it.
// wishtir and bizin were the two worth checking, both ending in a vowel between
// consonants where a furtive i would sit.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_ANIMALS: SoraniVocabWord[] = [
  { id: 'ckb-v073', wordKu: 'gurg', wordEn: 'wolf', wordTr: 'kurt', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:187', from: 'gurg' },
  { id: 'ckb-v074', wordKu: 'seg', wordEn: 'dog', wordTr: 'köpek', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:222', from: 'sag' },
  { id: 'ckb-v075', wordKu: 'merr', wordEn: 'sheep', wordTr: 'koyun', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:205', from: 'mař' },
  { id: 'ckb-v076', wordKu: 'bizin', wordEn: 'goat', wordTr: 'keçi', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:173', from: 'bizin' },
  { id: 'ckb-v077', wordKu: 'esp', wordEn: 'horse', wordTr: 'at', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:164', from: 'asp' },
  { id: 'ckb-v078', wordKu: 'ballinde', wordEn: 'bird', wordTr: 'kuş', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:170', from: 'bâłinda' },
  { id: 'ckb-v079', wordKu: 'mar', wordEn: 'snake', wordTr: 'yılan', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:206', from: 'mâr' },
  { id: 'ckb-v080', wordKu: 'pişî', wordEn: 'cat', wordTr: 'kedi', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:216', from: 'pishî' },
  { id: 'ckb-v081', wordKu: 'mîrûle', wordEn: 'ant', wordTr: 'karınca', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:208', from: 'mîrûla' },
  { id: 'ckb-v082', wordKu: 'rêwî', wordEn: 'fox', wordTr: 'tilki', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:220', from: 'rewî' },
  { id: 'ckb-v083', wordKu: 'ker', wordEn: 'donkey', wordTr: 'eşek', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:194', from: 'kar' },
  { id: 'ckb-v084', wordKu: 'manga', wordEn: 'cow', wordTr: 'inek', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:206', from: 'mângâ' },
  { id: 'ckb-v085', wordKu: 'gûr', wordEn: 'calf', wordTr: 'buzağı', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:188', from: 'gûr' },
  // wordTr kept from the Kurmanji 'tavuk': Thackston glosses mirîshk "chicken"
  // alone, and the hen half of the Kurmanji "chicken, hen" is his mir (p. 207).
  { id: 'ckb-v086', wordKu: 'mirîşk', wordEn: 'chicken', wordTr: 'tavuk', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:207', from: 'mirîshk' },
  { id: 'ckb-v087', wordKu: 'wiştir', wordEn: 'camel', wordTr: 'deve', partOfSpeech: 'noun', theme: 'animals', src: 'THK06:236', from: 'wishtir' },
];
