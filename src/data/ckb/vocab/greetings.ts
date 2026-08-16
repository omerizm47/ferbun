// Fêrbûn: Sorani greetings and social vocabulary, the eighth authored Sorani
// theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji greetings theme fills ten slots (v001 to v010). Nine are filled
// here. The one that is not is listed below with what was rejected for it, so a
// gap reads as a decision.
//
// This is the theme where a phrase is easiest to invent. A greeting is usually
// a fixed phrase, and a phrase assembled from two headwords is something this
// corpus authored, not something Thackston printed. The rule applied here is
// the narrow one: a slot is filled only where the glossary carries a single
// headword for it. Where it does not, the slot stays open and the assembly that
// was declined is named.
//
// FOUR CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense the slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - friend (heval): âwał (p. 167, "friend, companion") over rafîq (p. 219,
//    "friend, comrade"), yâr (p. 237, "friend") and hâwře (p. 191, "comrade,
//    companion"). Note that p. 167 prints a near-homograph four lines below
//    this one: âwâł, with the long â, is "companion, mate", and its sub-entry
//    ~kirâs is "women's trousers". The two are different headwords and only the
//    short-a one is cited here.
//  - guest: mîwân (p. 208, a bare "guest") over mewân (p. 207, "guest; ~dâr"),
//    the closer cognate of Kurmanji mêvan. mîwân was taken because its line
//    carries the gloss and nothing else.
//  - yes: are (p. 164) over báłe (p. 168), also "yes". báłe is printed with an
//    acute accent, which is a stress mark and not a letter the p. 88 table
//    converts, so the printed string cannot go through the converter at all and
//    the entry could only be typed by hand.
//  - no: na (p. 208, a bare "no") over nâ (p. 209, "no, oh no"). This is the
//    entry in the file most likely to be pulled at review, and the reason is
//    worth stating plainly: na converts to ne, which a Kurmanji reader reads as
//    "not", while the rejected nâ converts to na, which is the Kurmanji word
//    for "no". The pick follows the rule this corpus uses everywhere else, the
//    cleanest single sense, and the conversion is never steered toward the form
//    a reader expects. A speaker may well say the rule picked wrong here.
//
// ONE SLOT LEFT EMPTY:
//  - good day (Kurmanji rojbaş): the glossary has no headword for it. p. 170
//    prints "rozh ~ good day" inside bâsh's entry, as a worked example with the
//    tilde standing for the headword. The string "rozh bâsh" is nowhere on the
//    page as a unit, so shipping it would mean joining two words this corpus
//    chose to join. Declined.
//
// ONE ONE-TO-MANY SPLIT. Kurmanji xatir is glossed "farewell, mind". Thackston
// glosses khâtir (p. 197) as "mind" alone; the farewell sense is not his and is
// dropped, along with the Turkish veda that carried it.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH, listed rather than
// lost: nothing beyond the split above. Sub-entries and worked examples are
// dropped without comment: słâw is glossed "greetings; ~-kirdin la to greet;
// ~-sandinawa to acknowledge a greeting", spâs "thanks; ~-kirdin to thank",
// dost "friend; ~âna friendly; ~âyatî friendship", khâtir "mind; ~ i for the
// sake of; ~jam with mind at ease", bâsh "good: rozh ~ good day; da ~a that's
// enough!".
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// one is a single upright Times-Bold span with no italic letter inside it.
// khâtir and mîwân were the ones worth checking, each with an i sitting where a
// furtive one would go; both are printed, not furtive.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_GREETINGS: SoraniVocabWord[] = [
  // wordTr trimmed from the Kurmanji 'selam, merhaba': Thackston glosses słâw
  // as "greetings" alone, so the hello half of the Kurmanji pair is not his.
  { id: 'ckb-v129', wordKu: 'sllaw', wordEn: 'greetings', wordTr: 'selam', partOfSpeech: 'noun', theme: 'greetings', src: 'THK06:228', from: 'słâw' },
  { id: 'ckb-v130', wordKu: 'spas', wordEn: 'thanks', wordTr: 'teşekkürler', partOfSpeech: 'noun', theme: 'greetings', src: 'THK06:228', from: 'spâs' },
  { id: 'ckb-v131', wordKu: 'awell', wordEn: 'friend, companion', wordTr: 'arkadaş, yoldaş', partOfSpeech: 'noun', theme: 'greetings', src: 'THK06:167', from: 'âwał' },
  { id: 'ckb-v132', wordKu: 'dost', wordEn: 'friend', wordTr: 'dost, arkadaş', partOfSpeech: 'noun', theme: 'greetings', src: 'THK06:182', from: 'dost' },
  { id: 'ckb-v133', wordKu: 'mîwan', wordEn: 'guest', wordTr: 'misafir', partOfSpeech: 'noun', theme: 'greetings', src: 'THK06:208', from: 'mîwân' },
  // wordTr trimmed from the Kurmanji 'veda; hatır' to match the gloss: the veda
  // half belongs to the farewell sense Thackston does not give this word.
  { id: 'ckb-v134', wordKu: 'xatir', wordEn: 'mind', wordTr: 'hatır', partOfSpeech: 'noun', theme: 'greetings', src: 'THK06:197', from: 'khâtir' },
  { id: 'ckb-v135', wordKu: 'erê', wordEn: 'yes', wordTr: 'evet', partOfSpeech: 'particle', theme: 'greetings', src: 'THK06:164', from: 'are' },
  { id: 'ckb-v136', wordKu: 'ne', wordEn: 'no', wordTr: 'hayır', partOfSpeech: 'particle', theme: 'greetings', src: 'THK06:208', from: 'na' },
  { id: 'ckb-v137', wordKu: 'baş', wordEn: 'good', wordTr: 'iyi', partOfSpeech: 'adj', theme: 'greetings', src: 'THK06:170', from: 'bâsh' },
];
