// Fêrbûn: Sorani clothing vocabulary, the ninth authored Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji clothing theme fills eight slots (v261 to v268). Six are filled
// here. The two that are not are listed below with the entries that were
// rejected for each, so a gap reads as a decision.
//
// THREE CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense the slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - baggy trousers: damałqopân (p. 177, "baggy Kurdish trousers") over
//    sharwâł (p. 225, "pants, trousers"), which is the cognate of the Kurmanji
//    şal this slot uses. damałqopân was taken because the Kurmanji slot is
//    glossed "traditional baggy trousers" and Thackston's gloss for this word
//    is that sense word for word, where sharwâł's is the plain garment. The
//    trade is a long word for an exact sense, and it is the pick in this file a
//    speaker is most likely to want reversed.
//  - shoe: kawsh (p. 194, "shoe") over pełâw (p. 215, "shoes"). Both are bare
//    entries; kawsh is glossed in the singular the card teaches.
//  - clothes: jil (p. 193) and barg (p. 169) both mean clothes and both are
//    taught, because the Kurmanji theme has two clothes slots, cil and kinc.
//    Which of the two a beginner should meet first is not settled here; they
//    are shipped in the order the Kurmanji slots run.
//
// TWO SLOTS LEFT EMPTY:
//  - dress (Kurmanji fîstan): no headword in the glossary is glossed "dress" as
//    a garment. fistân is not in the volume at all: p. 184 runs fish, fitwâ,
//    fînga, fîs, fîsâr, fîshak with no entry between them. The only "dress" the
//    glossary prints is the verb inside poshta's sub-entry (p. 216,
//    "~-kirdinawa to dress in fine clothes"), and dâmen (p. 180) is "skirt",
//    which is a different garment and not this slot.
//  - cap, hat (Kurmanji kum): this one is not the book's fault and is worth
//    reading twice. p. 201 does print kiłâw, glossed "hat", as a clean upright
//    Times-Bold span, and the p. 88 table takes it to killaw without
//    complaint. What fails is the check: the volume's text layer sets the
//    Arabic column of that line in a Latin-encoded font, and the glyph lands
//    hard against the headword, so the page reads kiłâwË and tools/
//    verify-citations.ts, which will not answer a lookup from inside a longer
//    word, cannot find kiłâw on its own cited page. It is the same shape of gap
//    ./home.ts records for nâma, arrived at from the other end: there the book
//    printed something the converter cannot take, here the book prints it
//    cleanly and the extraction does not. mezar (p. 207) is "turban", a
//    different garment, and no other headword in the glossary is glossed "hat"
//    or "cap". Shipping kiłâw would mean shipping the one entry in the corpus
//    whose citation nothing checks, so it stays out until the extractor is
//    taught to drop that font rather than that Unicode range.
//
// ONE ONE-TO-MANY SPLIT, recorded rather than smoothed over: Kurmanji cil is
// glossed "clothes, clothing". jil (p. 193) is "clothes, togs", and togs is the
// informal word, so the Turkish follows the register Thackston set rather than
// the Kurmanji slot's neutral one.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH, listed rather than
// lost: nothing beyond the split above. Sub-entries and worked examples are
// dropped without comment: jil is glossed "clothes, togs; ~-nân to put on
// clothes", barg "clothes; cover; da ~ girtin to wrap in a cover; ~dirû
// tailor".
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// one is a single upright Times-Bold span with no italic letter inside it.
// kirâs and khurî were the ones worth checking, each with an i sitting between
// consonants where a furtive one would go; both are printed.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_CLOTHING: SoraniVocabWord[] = [
  { id: 'ckb-v138', wordKu: 'cil', wordEn: 'clothes, togs', wordTr: 'giysi, üstbaş', partOfSpeech: 'noun', theme: 'clothing', src: 'THK06:193', from: 'jil' },
  { id: 'ckb-v139', wordKu: 'berg', wordEn: 'clothes; cover', wordTr: 'giysi; örtü', partOfSpeech: 'noun', theme: 'clothing', src: 'THK06:169', from: 'barg' },
  { id: 'ckb-v140', wordKu: 'kiras', wordEn: 'shirt', wordTr: 'gömlek', partOfSpeech: 'noun', theme: 'clothing', src: 'THK06:201', from: 'kirâs' },
  { id: 'ckb-v141', wordKu: 'demellqopan', wordEn: 'baggy Kurdish trousers', wordTr: 'bol Kürt şalvarı', partOfSpeech: 'noun', theme: 'clothing', src: 'THK06:177', from: 'damałqopân' },
  { id: 'ckb-v142', wordKu: 'kewş', wordEn: 'shoe', wordTr: 'ayakkabı', partOfSpeech: 'noun', theme: 'clothing', src: 'THK06:194', from: 'kawsh' },
  { id: 'ckb-v143', wordKu: 'xurî', wordEn: 'wool', wordTr: 'yün', partOfSpeech: 'noun', theme: 'clothing', src: 'THK06:200', from: 'khurî' },
];
