// Fêrbûn: Sorani house and household vocabulary, the sixth authored Sorani
// theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji home theme fills twenty-two slots (v051 to v065, v275 to v281).
// Twenty are filled here. The two that are not are listed below with the entry
// that was rejected for each, so a gap reads as a decision.
//
// This is the theme an earlier pass reported as poorly supported. It is not.
// Twenty of twenty-two slots take a bare, single-sense headword, which is the
// best ratio of any theme surveyed. The earlier reading came from searching the
// glossary for American spellings and for words Thackston files under a
// different lemma, not from the glossary being thin here.
//
// TWELVE CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense the slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - door: dargâ (p. 178) over dark on the same page, also "door", and qâpî
//    (p. 217, "door, gate"). dargâ is the entry the page builds an example on.
//  - table: mez (p. 207, "table, desk") over khwân (p. 200, "dining table").
//  - book: ktâw (p. 202) over partuk (p. 213, "book") and qutâb (p. 218,
//    "book"). p. 202 also prints ktew, but as the cross-reference "ktew =
//    ktâw", not as a rival with a gloss of its own.
//  - roof: bân (p. 170) over mîch (p. 208, "roof") and sarbân (p. 223, "roof").
//  - pen: qałam (p. 217) over khâma (p. 197, "pencil, pen"), âłâ (p. 165,
//    "pen; flag, banner") and kilk (p. 201, "finger; tail; pen"). qałam is the
//    only one of the four whose gloss carries nothing but the pen.
//  - paper: kâghaz (p. 195) over qâqaz (p. 217, "paper"). Two spellings of one
//    loanword, alphabetised apart, exactly the pair ./family.ts declined to
//    choose between for millat and mîllat. Taken here because the theme would
//    otherwise lose a slot over a spelling.
//  - fire: âgir (p. 165) over âtar (p. 167, "fire") and âwir (p. 167, "fire;
//    pregnant").
//  - spoon: chimcha (p. 176) over kawchik (p. 194, "spoon").
//  - knife: chaqo (p. 174) over kerd (p. 195, "knife").
//  - fork: chingâł (p. 176) over chatâł (p. 174), whose gloss runs "fork; a
//    wooden or metal fork on which a gun is set for stability".
//  - cup: finjân (p. 184) over pyâła (p. 216, "cup").
//  - glass: lîwân (p. 204, "drinking glass") over pardâkh (p. 213, "glass,
//    tumbler"), shûsha (p. 227, "glass") and jâm (p. 193, "mirror, glass,
//    pane; bowl"). lîwân is the only one that can only be the vessel.
//
// TWO SLOTS LEFT EMPTY:
//  - bed (Kurmanji nivîn): no headword in the glossary is glossed "bed" on its
//    own. nwen (p. 212) is "bedclothes, sheets", takht (p. 229) is "smooth,
//    flat; throne, bed" with the bed sense third behind two others, and the
//    sub-entry ~ga under heshtin (p. 193) is "place, bed".
//  - letter (name): p. 209 prints the headword as nâm|a, with a vertical bar
//    marking where the sub-entry ~îlka attaches. The bar is not a letter the
//    p. 88 table converts, so the printed string cannot go through the
//    converter, and the bare string nâma is not on the page for
//    verify-citations to find. Shipping nâma would mean typing a form by hand,
//    which is the one thing this corpus does not do. pît (p. 216) is "letter of
//    the alphabet", a different sense.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH, listed rather than
// lost: bân "roof; steppe", and the same headword also carries the month of
// Taurus. Sub-entries and worked examples are dropped without comment: mâł is
// glossed "house, home; ~akî like family, a member of the household; ~ât
// possessions; ~lakoł nomadic", âgir "fire; ~dân fireplace", ktâw "book; ~î
// student; ~khâna library", dargâ "door; la ~ drân for a knock to come at a
// door".
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// one is a single upright Times-Bold span with no italic letter inside it.
// chimcha, chingâł, qałam and kâghaz were the ones worth checking, each with a
// vowel sitting between consonants where a furtive i would go.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_HOME: SoraniVocabWord[] = [
  { id: 'ckb-v088', wordKu: 'mall', wordEn: 'house, home', wordTr: 'ev, yuva', partOfSpeech: 'noun', theme: 'home', src: 'THK06:206', from: 'mâł' },
  { id: 'ckb-v089', wordKu: 'hode', wordEn: 'room', wordTr: 'oda', partOfSpeech: 'noun', theme: 'home', src: 'THK06:192', from: 'hoda' },
  { id: 'ckb-v090', wordKu: 'derga', wordEn: 'door', wordTr: 'kapı', partOfSpeech: 'noun', theme: 'home', src: 'THK06:178', from: 'dargâ' },
  { id: 'ckb-v091', wordKu: 'pencere', wordEn: 'window', wordTr: 'pencere', partOfSpeech: 'noun', theme: 'home', src: 'THK06:212', from: 'panjara' },
  { id: 'ckb-v092', wordKu: 'mêz', wordEn: 'table, desk', wordTr: 'masa, yazı masası', partOfSpeech: 'noun', theme: 'home', src: 'THK06:207', from: 'mez' },
  { id: 'ckb-v093', wordKu: 'sennelî', wordEn: 'chair', wordTr: 'sandalye', partOfSpeech: 'noun', theme: 'home', src: 'THK06:222', from: 'sannalî' },
  { id: 'ckb-v094', wordKu: 'ktaw', wordEn: 'book', wordTr: 'kitap', partOfSpeech: 'noun', theme: 'home', src: 'THK06:202', from: 'ktâw' },
  { id: 'ckb-v095', wordKu: 'çira', wordEn: 'lamp', wordTr: 'lamba', partOfSpeech: 'noun', theme: 'home', src: 'THK06:176', from: 'chirâ' },
  { id: 'ckb-v096', wordKu: 'dîwar', wordEn: 'wall', wordTr: 'duvar', partOfSpeech: 'noun', theme: 'home', src: 'THK06:182', from: 'dîwâr' },
  // wordTr keeps the Kurmanji 'çatı, dam', both of which are the roof. bân also
  // carries "steppe", which is not a household word and is not taught.
  { id: 'ckb-v097', wordKu: 'ban', wordEn: 'roof', wordTr: 'çatı, dam', partOfSpeech: 'noun', theme: 'home', src: 'THK06:170', from: 'bân' },
  { id: 'ckb-v098', wordKu: 'hewşe', wordEn: 'courtyard', wordTr: 'avlu', partOfSpeech: 'noun', theme: 'home', src: 'THK06:190', from: 'hawsha' },
  { id: 'ckb-v099', wordKu: 'qellem', wordEn: 'pen', wordTr: 'kalem', partOfSpeech: 'noun', theme: 'home', src: 'THK06:217', from: 'qałam' },
  { id: 'ckb-v100', wordKu: 'kaxez', wordEn: 'paper', wordTr: 'kâğıt', partOfSpeech: 'noun', theme: 'home', src: 'THK06:195', from: 'kâghaz' },
  { id: 'ckb-v101', wordKu: 'agir', wordEn: 'fire', wordTr: 'ateş', partOfSpeech: 'noun', theme: 'home', src: 'THK06:165', from: 'âgir' },
  { id: 'ckb-v102', wordKu: 'çimçe', wordEn: 'spoon', wordTr: 'kaşık', partOfSpeech: 'noun', theme: 'home', src: 'THK06:176', from: 'chimcha' },
  { id: 'ckb-v103', wordKu: 'çeqo', wordEn: 'knife', wordTr: 'bıçak', partOfSpeech: 'noun', theme: 'home', src: 'THK06:174', from: 'chaqo' },
  { id: 'ckb-v104', wordKu: 'çingall', wordEn: 'fork', wordTr: 'çatal', partOfSpeech: 'noun', theme: 'home', src: 'THK06:176', from: 'chingâł' },
  // wordTr trimmed from the Kurmanji 'kadeh, bardak': Thackston glosses finjân
  // as "cup" alone, so the goblet half of the Kurmanji pair is not his claim.
  { id: 'ckb-v105', wordKu: 'fincan', wordEn: 'cup', wordTr: 'fincan', partOfSpeech: 'noun', theme: 'home', src: 'THK06:184', from: 'finjân' },
  { id: 'ckb-v106', wordKu: 'lîwan', wordEn: 'drinking glass', wordTr: 'bardak', partOfSpeech: 'noun', theme: 'home', src: 'THK06:204', from: 'lîwân' },
  { id: 'ckb-v107', wordKu: 'perraw', wordEn: 'notebook', wordTr: 'defter', partOfSpeech: 'noun', theme: 'home', src: 'THK06:213', from: 'pařâw' },
];
