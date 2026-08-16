// Fêrbûn: Sorani places and travel vocabulary, the fourteenth authored Sorani
// theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji places theme fills thirteen slots (v209 to v219, v289, v290).
// Twelve are filled here. The one that is not is listed below with what was
// rejected for it, so a gap reads as a decision.
//
// ONE SLOT LEFT EMPTY:
//  - market, bazaar (Kurmanji bazar): bâzâr is in the volume exactly once, on
//    p. 229, and not as a headword. It sits inside the example under takhta,
//    "bâzâr ~ ya the market's boarded shut", where it is the subject of somebody
//    else's sentence and carries no gloss of its own. The only headword with the
//    sense is bâzher (p. 171, "city, market"), and its first gloss is the city
//    this file already teaches as shâr; taking it would put two cards for one
//    town in one theme and teach the market on a word the page leads with
//    something else. dukân (p. 182) is the shop, which is a different slot and
//    is filled below.
//
// SIX CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word with
// the sense the slot wants and says nothing about which a beginner should meet
// first. Each pick is editorial and each needs a speaker's confirmation:
//  - city: shâr (p. 226, a bare "city") over bâzher (p. 171, "city, market").
//    shâr is the one the page builds on, with ~azâ "urbane, citified" and
//    ~badar "exiled, driven from".
//  - village: gund (p. 187, a bare "village") over de (p. 181, "village") and
//    lâga (p. 204, "village"). gund is the Kurmanji slot's own form and the one
//    with a sub-entry, ~nishîn "villager, village-dwelling".
//  - road, way: re (p. 220, "way, road") over rega and regâ on the same page,
//    "road, way" and "road", which Thackston prints as headwords of their own
//    without cross-referencing any of the three to the others, and over jâda
//    (p. 193, "road, street"). re converts to rê, the Kurmanji slot's own form.
//  - street: shaqâm (p. 225, a bare "street") over jâda (p. 193, "road,
//    street"), whose first sense is the road re already carries above.
//  - place: je (p. 193, "place") over makân (p. 205, "place") and shwen
//    (p. 227, "place"). All three are bare, and je is the one the page builds
//    on: la ~gâ i "instead of", ba ~ mân "to be left behind", ~ga "place, bed",
//    ~gâ "place, position". It is also this theme's label in ../vocabulary.ts,
//    the same doubling ./food.ts has with khorâk.
//  - near: nizîk (p. 211, a bare "near") over tak (p. 229, "near, next to,
//    opposite"), tikhun (p. 232, "near") and dastândast (p. 179, "nearby, next
//    to"). nizîk is the Kurmanji slot's own form, nêzîk.
//
// ONE PICK NO SPEAKER WILL LIKE. Kurdistan is taught lower case, kurdistan,
// because that is what the conversion table returns for what the page prints,
// and the entry's `fromNote` carries the evidence rather than the taught string
// being adjusted by hand to look right. The alternative was to capitalise it,
// which is exactly the kind of quiet correction the p. 88 rule exists to stop.
//
// TWO SENSES THIS FILE WIDENS INTO THE TURKISH rather than dropping: wiłât is
// "country, state; homeland", so the Kurmanji ülke, vatan gains devlet, and
// minâra is "tower, minaret", so kule gains minare.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH, listed rather than
// lost: nothing. Sub-entries and worked examples are dropped without comment:
// shâr is glossed "city; ~azâ urbane, citified; ~ângař world traveler; ~badar
// exiled", gund "village; ~nishîn villager", wiłât "country, state; homeland: ~
// a yekgirtûakân i Amerikâ the United States of America", re "way, road; ~-dân
// to admit, allow in; ~-girtin to commit highway robbery", dûr "far; la ~awa
// from afar; ~bîn telescope, camera", dukân "shop; ~dâr shopkeeper", je "place;
// la ~gâ i instead of; ~ga place, bed; ~gâ place, position; ~nishîn
// heir-apparent, successor".
//
// The furtive i is not in play. Every headword and sub-entry below was read span
// by span off the page rather than out of the extracted text, which drops
// italics, and each is a single upright Times-Bold span with no italic letter
// inside it. nizîk, gund, shaqâm, minâra and qutâbkhâna were the ones worth
// checking, each with an interior cluster where a furtive i would go.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_PLACES: SoraniVocabWord[] = [
  { id: 'ckb-v211', wordKu: 'şar', wordEn: 'city', wordTr: 'şehir', partOfSpeech: 'noun', theme: 'places', src: 'THK06:226', from: 'shâr' },
  { id: 'ckb-v212', wordKu: 'gund', wordEn: 'village', wordTr: 'köy', partOfSpeech: 'noun', theme: 'places', src: 'THK06:187', from: 'gund' },
  // wordTr widened from the Kurmanji 'ülke, vatan' for the state Thackston
  // glosses between the country and the homeland.
  { id: 'ckb-v213', wordKu: 'willat', wordEn: 'country, state; homeland', wordTr: 'ülke, devlet; vatan', partOfSpeech: 'noun', theme: 'places', src: 'THK06:236', from: 'wiłât' },
  { id: 'ckb-v214', wordKu: 'rê', wordEn: 'way, road', wordTr: 'yol', partOfSpeech: 'noun', theme: 'places', src: 'THK06:220', from: 're' },
  {
    id: 'ckb-v215', wordKu: 'qutabxane', wordEn: 'school', wordTr: 'okul', partOfSpeech: 'noun', theme: 'places', src: 'THK06:218',
    from: 'qutâbkhâna',
    fromNote: 'p. 218 prints this as the tilde sub-entry ~khâna under the headword qutâb, "book", and it is the only ~khâna on that page.',
  },
  {
    id: 'ckb-v216', wordKu: 'dukan', wordEn: 'shop', wordTr: 'dükkân', partOfSpeech: 'noun', theme: 'places', src: 'THK06:182',
    from: 'dukân',
    fromNote: 'p. 182 sets two spellings on the one headword line, "dukân, dukkân shop". dukân is the first of them and is what this entry cites.',
  },
  {
    id: 'ckb-v217', wordKu: 'kurdistan', wordEn: 'Kurdistan', wordTr: 'Kürdistan', partOfSpeech: 'noun', theme: 'places', src: 'THK06:202',
    from: 'kurdistân',
    fromNote: 'p. 202 prints this as the tilde sub-entry ~istân under the headword kurd, and it is the only ~istân on that page. Headword and sub-entry are both set lower case, so the conversion has no capital to carry and the taught form is kurdistan where the Kurmanji slot has Kurdistan. Thackston does capitalise the proper names he means to, Awrupâ "Europe" at p. 165 and Kaykâwis at p. 195, so the lower case here is his filing and not a house style this entry may correct.',
  },
  { id: 'ckb-v218', wordKu: 'cê', wordEn: 'place', wordTr: 'yer', partOfSpeech: 'noun', theme: 'places', src: 'THK06:193', from: 'je' },
  { id: 'ckb-v219', wordKu: 'şeqam', wordEn: 'street', wordTr: 'sokak', partOfSpeech: 'noun', theme: 'places', src: 'THK06:225', from: 'shaqâm' },
  { id: 'ckb-v220', wordKu: 'dûr', wordEn: 'far', wordTr: 'uzak', partOfSpeech: 'adj', theme: 'places', src: 'THK06:182', from: 'dûr' },
  { id: 'ckb-v221', wordKu: 'nizîk', wordEn: 'near', wordTr: 'yakın', partOfSpeech: 'adj', theme: 'places', src: 'THK06:211', from: 'nizîk' },
  // wordTr widened from the Kurmanji 'kule': Thackston glosses the minaret too,
  // and Turkish kule does not carry it.
  { id: 'ckb-v222', wordKu: 'minare', wordEn: 'tower, minaret', wordTr: 'kule, minare', partOfSpeech: 'noun', theme: 'places', src: 'THK06:207', from: 'minâra' },
];
