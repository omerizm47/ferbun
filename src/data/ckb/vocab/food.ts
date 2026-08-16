// Fêrbûn: Sorani food and drink vocabulary, the tenth authored Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji food theme fills seventeen slots (v066 to v080, v286, v287).
// Fifteen are filled here. The two that are not are listed below with what was
// rejected for each, so a gap reads as a decision.
//
// This is the widest theme in the corpus and the one with the best hit rate:
// eleven of the fifteen are bare single-word entries, and eight of them convert
// to the Kurmanji form letter for letter (nan, aw, çay, goşt, mast, şîr, mêwe,
// xwê), which is the closest the two dialects come anywhere in this data.
//
// FOUR CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense the slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - fruit: mewa (p. 207) over samar (p. 222, "fruit"), barham (p. 169,
//    "fruit, produce") and the second sense of bar (p. 168, "(2) fruit,
//    produce"). mewa converts to mêwe, exactly the Kurmanji slot's form.
//  - egg: helka (p. 191, a bare "egg") over khâya (p. 197, "egg; testicle").
//  - cheese: paner (p. 212, a bare "cheese"). hîz (p. 192) mentions cheese but
//    is "skein, leather bag for oil, cheese, &c.", the container and not the
//    food.
//  - food: khorâk (p. 199, a bare "food"). nân (p. 209) is also glossed
//    "bread, food", but it is this file's bread entry and cannot be both.
//
// TWO SLOTS LEFT EMPTY:
//  - sugar (Kurmanji şekir): the glossary has no headword for it. The only
//    sugar in the volume is inside kiło's entry at p. 201, "~ qand lump of
//    sugar", where qand is not a headword of its own; the qand- on p. 217 is
//    qandin, "to uproot, dig up", an unrelated verb. Lifting qand out of
//    another word's sub-entry would be reading a headword into the page.
//  - breakfast (Kurmanji taşt): the only breakfast in the volume is inside
//    teshu's sub-entry at p. 232, "~-kirdin to make a pile; to have breakfast",
//    where the headword teshu is "pile, heap". The breakfast sense belongs to
//    the compound verb, not to the noun, and there is no noun to teach.
//
// THREE ONE-TO-MANY SPLITS, recorded rather than smoothed over:
//  - Kurmanji rûn is glossed "oil, butter". ron (p. 221) is the exact cognate
//    and is glossed "oil, grease, fat", so the slot is filled at the oil sense
//    and the butter half is dropped: Thackston does not give it, and the
//    Turkish tereyağı that carried it goes with it. The Turkish kept is the
//    single word yağ, which covers all three of his senses.
//  - Kurmanji gul is glossed "flower; rose". guł (p. 187) is "flower"; the rose
//    is his sub-entry "~ a sûr", not the headword, so only the flower is
//    taught. Note the neighbour one line above: gul, with plain l, is "leper".
//    That pair is why the grader never folds ll to l, and it is checked as a
//    minimal pair in tools/content-selfcheck.ts.
//  - Kurmanji xwarin is glossed "food; to eat". khorâk (p. 199) is "food"
//    alone; the verb is khwârdin, a different headword, and this theme teaches
//    nouns.
//
// ONE TRIMMED GLOSS. shîr (p. 227) is glossed "milk; sword". Only the milk is
// taught: a card that put a sword on the back of a milk word would teach a
// homograph as if it were a sense.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH, listed rather than
// lost: nothing beyond the splits and the trim above. Sub-entries and worked
// examples are dropped without comment: nân is glossed "bread, food;
// ~-khwârdin to eat, have a meal; ~araq bread; ~awâ baker", âw "water; ~î
// watery; light blue", chây "tea; ~khâna teahouse", mewa "fruit; ~ron
// marmalade", khwe2 "salt", guł "flower; ~abarozha sunflower; ~âła red tulip;
// ~âw rosewater".
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// one is a single upright Times-Bold span with no italic letter inside it.
// gosht, chesht, helka, paner and hangwen were the ones worth checking, each
// with a vowel or a cluster where a furtive i would go.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_FOOD: SoraniVocabWord[] = [
  // wordTr widened from the Kurmanji 'ekmek': Thackston glosses nân as "bread,
  // food", the same double sense Turkish ekmek does not carry on its own.
  { id: 'ckb-v144', wordKu: 'nan', wordEn: 'bread, food', wordTr: 'ekmek, yemek', partOfSpeech: 'noun', theme: 'food', src: 'THK06:209', from: 'nân' },
  { id: 'ckb-v145', wordKu: 'aw', wordEn: 'water', wordTr: 'su', partOfSpeech: 'noun', theme: 'food', src: 'THK06:167', from: 'âw' },
  { id: 'ckb-v146', wordKu: 'çay', wordEn: 'tea', wordTr: 'çay', partOfSpeech: 'noun', theme: 'food', src: 'THK06:175', from: 'chây' },
  { id: 'ckb-v147', wordKu: 'goşt', wordEn: 'meat', wordTr: 'et', partOfSpeech: 'noun', theme: 'food', src: 'THK06:187', from: 'gosht' },
  { id: 'ckb-v148', wordKu: 'penêr', wordEn: 'cheese', wordTr: 'peynir', partOfSpeech: 'noun', theme: 'food', src: 'THK06:212', from: 'paner' },
  // wordEn keeps Thackston's British spelling. The Kurmanji slot says yogurt;
  // the page says yoghurt, and the page is what this field reports.
  { id: 'ckb-v149', wordKu: 'mast', wordEn: 'yoghurt', wordTr: 'yoğurt', partOfSpeech: 'noun', theme: 'food', src: 'THK06:206', from: 'mâst' },
  // wordTr trimmed from the Kurmanji 'yemek; yemek (fiil)': khorâk is the noun
  // only, and the verb sense lives under khwârdin, which is not this entry.
  { id: 'ckb-v150', wordKu: 'xorak', wordEn: 'food', wordTr: 'yemek', partOfSpeech: 'noun', theme: 'food', src: 'THK06:199', from: 'khorâk' },
  // wordEn takes the first of Thackston's two glosses. The second, sword, is a
  // homograph rather than a second sense of the milk word.
  { id: 'ckb-v151', wordKu: 'şîr', wordEn: 'milk', wordTr: 'süt', partOfSpeech: 'noun', theme: 'food', src: 'THK06:227', from: 'shîr' },
  // wordTr trimmed from the Kurmanji 'çiçek; gül': the rose is Thackston's
  // sub-entry ~ a sûr, not the headword this entry cites.
  { id: 'ckb-v152', wordKu: 'gull', wordEn: 'flower', wordTr: 'çiçek', partOfSpeech: 'noun', theme: 'food', src: 'THK06:187', from: 'guł' },
  { id: 'ckb-v153', wordKu: 'mêwe', wordEn: 'fruit', wordTr: 'meyve', partOfSpeech: 'noun', theme: 'food', src: 'THK06:207', from: 'mewa' },
  // wordTr is the single Turkish yağ, which covers oil, grease and fat alike.
  // The Kurmanji 'tereyağı' is dropped with the butter sense Thackston omits.
  { id: 'ckb-v154', wordKu: 'ron', wordEn: 'oil, grease, fat', wordTr: 'yağ', partOfSpeech: 'noun', theme: 'food', src: 'THK06:221', from: 'ron' },
  {
    id: 'ckb-v155', wordKu: 'xwê', wordEn: 'salt', wordTr: 'tuz', partOfSpeech: 'noun', theme: 'food', src: 'THK06:200',
    from: 'khwe',
    fromNote: 'p. 200 prints this as khwe2. khwe1, three lines above it, is "owner".',
  },
  { id: 'ckb-v156', wordKu: 'hengwên', wordEn: 'honey', wordTr: 'bal', partOfSpeech: 'noun', theme: 'food', src: 'THK06:189', from: 'hangwen' },
  { id: 'ckb-v157', wordKu: 'çêşt', wordEn: 'lunch', wordTr: 'öğle yemeği', partOfSpeech: 'noun', theme: 'food', src: 'THK06:175', from: 'chesht' },
  { id: 'ckb-v158', wordKu: 'hêlke', wordEn: 'egg', wordTr: 'yumurta', partOfSpeech: 'noun', theme: 'food', src: 'THK06:191', from: 'helka' },
];
