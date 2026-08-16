// Fêrbûn: Sorani body and health vocabulary, the third authored Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// All twenty slots the Kurmanji body theme fills (v031 to v050) are filled here
// too. Every one of them is a glossary headword with the sense the slot needs,
// which is what makes this theme cheap: no gap to explain, no form guessed.
//
// FIVE CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense the slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - body: lash (p. 203) over tan (p. 229, "body") and tarm (p. 230, "body,
//    corpse"). lash is the cognate of the Kurmanji slot word laş and Thackston
//    uses it in running text, "lashî dâwashâwa his body has ..." (p. 235).
//  - head: sar (p. 222) over kalla (p. 194, "head"). sar carries a long article
//    of verbal expressions; kalla is a bare one-line entry.
//  - mouth: dam (p. 177) over zâr (p. 238, "mouth"), because dam is the one
//    with the verbal expressions, "~-kirdin to speak".
//  - pain: esh (p. 183, "pain, ache") over zhân (p. 238, "pain, illness") and
//    ranj (p. 219, "pain, suffering"). esh is the only one of the three whose
//    senses stay inside the slot.
//  - ill: nakhosh (p. 209). Two things sit next to it and neither is this word.
//    nâkhosh, separately alphabetised on the same page, means "unpleasant", and
//    p. 199 prints the same word again as the sub-entry na~ under khosh,
//    glossed "ill, sick". A speaker should say whether p. 209 or p. 199 is the
//    entry a learner ought to be sent to.
//
// ONE SLOT IS HALF FILLED. The Kurmanji ling (v035) is glossed "foot, leg" and
// Sorani splits the two: pe is "foot" (p. 214) and qâch is "leg" (p. 217). The
// entry below teaches the foot half only, and its Turkish is trimmed to match.
// qâch is not added, because the Kurmanji theme has no second slot for it.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH. Each `wordEn` is the
// single sense that fills the Kurmanji slot, so a card cannot ask for a word by
// a meaning the theme never taught. Everything dropped is listed here rather
// than lost: dił "heart, interior"; châw "eye; expectation"; dast "hand, arm";
// goh "ear, hearing"; rû "face, aspect, mien"; sik "belly, womb"; pisht "back;
// reliance; generation"; nakhosh "ill, patient"; sâgh "whole, hail, healthy";
// darmân "medicine, remedy; gunpowder"; esh "pain, ache". Parenthesised
// cross-reference apparatus is dropped without comment: sar is glossed "head
// (verbal expressions involving sar are given below ...)" and birîn "a wound".
//
// TWO PLACES WHERE THE TWO TRACKS DISAGREE ON THE PAGE, both of them facts
// about the sources rather than decisions taken here:
//  - mil teaches "neck" here (p. 207) and "shoulder" in the Kurmanji file
//    (v042). Same string, different body part, one track each.
//  - lash converts by Thackston's own table to leş, and leş in Kurmanji is a
//    carcass, not a living body, which the Kurmanji file spells laş (v039). A
//    speaker should confirm that leş is what a Sorani learner should be taught
//    for "body" in this alphabet before this theme reaches anyone.
//
// The furtive i is not in play: dił, mil, pisht, sik and birîn were each read
// span by span off the page rather than out of the extracted text, which drops
// italics, and every one of them is a single upright Times-Bold headword.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_BODY: SoraniVocabWord[] = [
  { id: 'ckb-v032', wordKu: 'ser', wordEn: 'head', wordTr: 'baş, kafa', partOfSpeech: 'noun', theme: 'body', src: 'THK06:222', from: 'sar' },
  { id: 'ckb-v033', wordKu: 'dill', wordEn: 'heart', wordTr: 'kalp, gönül', partOfSpeech: 'noun', theme: 'body', src: 'THK06:181', from: 'dił' },
  { id: 'ckb-v034', wordKu: 'çaw', wordEn: 'eye', wordTr: 'göz', partOfSpeech: 'noun', theme: 'body', src: 'THK06:175', from: 'châw' },
  { id: 'ckb-v035', wordKu: 'dest', wordEn: 'hand', wordTr: 'el', partOfSpeech: 'noun', theme: 'body', src: 'THK06:178', from: 'dast' },
  // wordTr trimmed from the Kurmanji 'ayak, bacak': the leg half of that pair
  // is qâch (p. 217), a separate headword this theme has no slot for.
  {
    id: 'ckb-v036', wordKu: 'pê', wordEn: 'foot', wordTr: 'ayak', partOfSpeech: 'noun', theme: 'body', src: 'THK06:214',
    from: 'pe',
    fromNote: 'p. 214 prints this as pe2, the second of four homograph headwords. pe1 is an adjective ("fasting"), pe3 a postposition and pe4 a compound-verb element.',
  },
  {
    id: 'ckb-v037', wordKu: 'dem', wordEn: 'mouth', wordTr: 'ağız', partOfSpeech: 'noun', theme: 'body', src: 'THK06:177',
    from: 'dam',
    fromNote: 'p. 177 prints this as dam2. dam1, directly above it, is "moment".',
  },
  { id: 'ckb-v038', wordKu: 'goh', wordEn: 'ear', wordTr: 'kulak', partOfSpeech: 'noun', theme: 'body', src: 'THK06:187', from: 'goh' },
  { id: 'ckb-v039', wordKu: 'lût', wordEn: 'nose', wordTr: 'burun', partOfSpeech: 'noun', theme: 'body', src: 'THK06:205', from: 'lût' },
  { id: 'ckb-v040', wordKu: 'leş', wordEn: 'body', wordTr: 'vücut, beden', partOfSpeech: 'noun', theme: 'body', src: 'THK06:203', from: 'lash' },
  { id: 'ckb-v041', wordKu: 'rû', wordEn: 'face', wordTr: 'yüz', partOfSpeech: 'noun', theme: 'body', src: 'THK06:221', from: 'rû' },
  { id: 'ckb-v042', wordKu: 'mil', wordEn: 'neck', wordTr: 'boyun', partOfSpeech: 'noun', theme: 'body', src: 'THK06:207', from: 'mil' },
  { id: 'ckb-v043', wordKu: 'şan', wordEn: 'shoulder', wordTr: 'omuz', partOfSpeech: 'noun', theme: 'body', src: 'THK06:226', from: 'shân' },
  { id: 'ckb-v044', wordKu: 'sik', wordEn: 'belly', wordTr: 'karın', partOfSpeech: 'noun', theme: 'body', src: 'THK06:227', from: 'sik' },
  { id: 'ckb-v045', wordKu: 'pişt', wordEn: 'back', wordTr: 'sırt', partOfSpeech: 'noun', theme: 'body', src: 'THK06:216', from: 'pisht' },
  { id: 'ckb-v046', wordKu: 'nexoş', wordEn: 'ill', wordTr: 'hasta', partOfSpeech: 'adj', theme: 'body', src: 'THK06:209', from: 'nakhosh' },
  // wordTr trimmed from the Kurmanji 'sağlıklı, iyi': only the "healthy" sense
  // of sâgh is taught here.
  { id: 'ckb-v047', wordKu: 'sax', wordEn: 'healthy', wordTr: 'sağlıklı', partOfSpeech: 'adj', theme: 'body', src: 'THK06:225', from: 'sâgh' },
  { id: 'ckb-v048', wordKu: 'birîn', wordEn: 'wound', wordTr: 'yara', partOfSpeech: 'noun', theme: 'body', src: 'THK06:172', from: 'birîn' },
  { id: 'ckb-v049', wordKu: 'derman', wordEn: 'medicine', wordTr: 'ilaç', partOfSpeech: 'noun', theme: 'body', src: 'THK06:178', from: 'darmân' },
  { id: 'ckb-v050', wordKu: 'êş', wordEn: 'pain', wordTr: 'ağrı, acı', partOfSpeech: 'noun', theme: 'body', src: 'THK06:183', from: 'esh' },
  { id: 'ckb-v051', wordKu: 'xwên', wordEn: 'blood', wordTr: 'kan', partOfSpeech: 'noun', theme: 'body', src: 'THK06:200', from: 'khwen' },
];
