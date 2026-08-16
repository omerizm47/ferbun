// Fêrbûn: Sorani culture vocabulary, the sixteenth authored Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// WHY THIS THEME SHIPS AT ALL. An earlier survey of the glossary reported this
// theme unviable, on the ground that Newroz, govend, dengbêj, şoreş and kurdî
// are not headwords. Four of those five are, under Thackston's transcription
// rather than the Kurmanji spelling the survey searched for: nawroz p. 209,
// hałpařke p. 189, shorish p. 227, and kurdî as the ~î of the kurd entry at
// p. 202. A theme called Kurdish Culture with no word for Newroz would have
// been worse than no theme, so that one entry decided it. Ten of the eleven
// Kurmanji slots are filled below.
//
// The Kurmanji culture theme fills eleven slots (v230 to v240). Ten are filled
// here. The one that is not is listed below with what was rejected for it, so a
// gap reads as a decision.
//
// ONE SLOT LEFT EMPTY:
//  - singer, bard (Kurmanji dengbêj): no headword names the dengbêj, and the
//    figure is not a generic singer. What the glossary offers is âwâz "tune,
//    melody" with the sub-entries ~akhwân and ~akhwen, both "singer" (p. 167),
//    and lotî (p. 204), "a professional singer and entertainer", the travelling
//    showman who keeps the monkey of the proverb at p. 164. dang (p. 177) is
//    "sound, voice; vote", the deng of dengbêj, but on its own it is a voice
//    and this file already teaches nothing that would make it the singer.
//
// FIVE CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense a slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - dance: hałpařke (p. 189, "type of Kurdish dance") over samâ (p. 222,
//    "dance; ~-kirdin to dance") and sarchopî (p. 223, "leadership of a ring
//    dance"). The Kurmanji slot is a named Kurdish dance and samâ is the
//    activity in general; sarchopî names the person at the head of the line,
//    not the line.
//  - song: gorânî (p. 187, "~î Gorani; song") over the fourth sense of chiř
//    (p. 176), a headword whose first three senses are "dense", "firm" and
//    "steep" and whose song appears only in "~e bichira sing a song". chiřîn on
//    the same page is "to sing", the verb and not this slot.
//  - freedom: âzâdî (p. 167, "~î freedom" under âzâd "free") over sarbastî
//    (p. 223, "~î freedom, independence" under sarbast "free, independent").
//    âzâdî is the Kurmanji slot's own azadî; sarbastî leads with the
//    independence of a state.
//  - history: mezhû (p. 207, a bare "history") over târîkh (p. 231, "history"),
//    the Arabic loan. Thackston uses mezhû himself in the example at p. 194,
//    "la mezhû i kurd'dâ for the first time in the history of the Kurds".
//  - literature: adabiyât (p. 163, "~iyât literature") over its own base adab
//    (p. 163, "literature, culture"), bezha (p. 171, "literature") and wezha's
//    ~a (p. 236, "literature"). adabiyât is the Kurmanji slot's own edebiyat.
//    adab is the cleaner citation of the two, a bare headword, but it converts
//    to edeb, which in Kurmanji is good manners rather than letters, and
//    Thackston's own be~ "impolite" on that line shows the manners sense is
//    live in his Sorani too.
//
// FOUR TILDE SUB-ENTRIES, gorânî, âzâdî, kurdî and adabiyât, each naming its
// base in a `fromNote`. The text layer says which characters are printed, never
// which headword a ~ belongs to, so each note also names the other tildes on
// that page a reader could mistake it for. p. 167 prints ~î thirteen times, so
// that note names the Arabic column instead, which sets the sub-entry out in
// full and settles the reading where counting cannot.
//
// THREE GLOSSES THAT ARE NOT THE KURMANJI SLOT'S, recorded rather than smoothed
// over:
//  - nawroz is glossed "the vernal equinox", the astronomical event, where the
//    Kurmanji slot is "Kurdish New Year (March 21)". It is the same day, and
//    this card teaches the gloss the page carries, so the Turkish follows the
//    equinox and not the new year.
//  - gorânî is "Gorani; song". Only the second sense is taught. The first is
//    the dialect and the division of the Kurds the page names one line above,
//    in the base entry gorân.
//  - shorish is "uprising, rebelion", his spelling of rebellion. Only the first
//    sense is taught, so the Kurmanji şoreş's devrim gives way to ayaklanma.
//
// ONE PICK NO SPEAKER WILL LIKE, and it is the same one ./places.ts records for
// kurdistan: nawroz is taught lower case, because the page sets the headword
// lower case and the conversion has no capital to carry. Thackston does
// capitalise the proper names he means to, Awrupâ "Europe" at p. 165 and
// Karkûk at p. 194, so the lower case is his filing and not a house style this
// entry may correct.
//
// The furtive i is not in play. Every headword and sub-entry below was read span
// by span off the page rather than out of the extracted text, which drops
// italics, and each is a single upright Times-Bold span with no italic letter
// inside it. shorish, chîřok, kurdî, adabiyât and hałpařke were the ones worth
// checking, each with an interior cluster where a furtive i would go.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_CULTURE: SoraniVocabWord[] = [
  // wordTr translated from Thackston's gloss, not reused from the Kurmanji
  // slot: he glosses the day and not the festival.
  { id: 'ckb-v232', wordKu: 'newroz', wordEn: 'the vernal equinox', wordTr: 'ilkbahar ekinoksu', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:209', from: 'nawroz' },
  { id: 'ckb-v233', wordKu: 'hellperrkê', wordEn: 'type of Kurdish dance', wordTr: 'bir Kürt halk dansı türü', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:189', from: 'hałpařke' },
  {
    id: 'ckb-v234', wordKu: 'goranî', wordEn: 'song', wordTr: 'şarkı', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:187',
    from: 'gorânî',
    fromNote: 'p. 187 prints this as the tilde sub-entry ~î under the headword gorân, "the Goran division of the Kurds", glossed "Gorani; song". The only other ~î on that page stands alone the same way, the "ba ~î quickly, soon" of gurj, "quick, soon".',
  },
  {
    id: 'ckb-v235', wordKu: 'azadî', wordEn: 'freedom', wordTr: 'özgürlük', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:167',
    from: 'âzâdî',
    fromNote: 'p. 167 prints this as the tilde sub-entry ~î under the headword âzâd, "free". That page prints ~î thirteen times, and the one three lines above this is "bravery" under âzâ, so the count settles nothing: what settles it is the Arabic column of this sub-entry, which sets the word out in full as ئازادى rather than as a tilde.',
  },
  { id: 'ckb-v236', wordKu: 'çîrrok', wordEn: 'story', wordTr: 'hikaye', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:176', from: 'chîřok' },
  // wordTr narrowed from the Kurmanji 'devrim': the taught sense is the
  // uprising, which is the half of his gloss this card keeps.
  { id: 'ckb-v237', wordKu: 'şoriş', wordEn: 'uprising', wordTr: 'ayaklanma', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:227', from: 'shorish' },
  { id: 'ckb-v238', wordKu: 'kurd', wordEn: 'Kurd', wordTr: 'Kürt', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:202', from: 'kurd' },
  {
    id: 'ckb-v239', wordKu: 'kurdî', wordEn: 'Kurdish', wordTr: 'Kürtçe', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:202',
    from: 'kurdî',
    fromNote: 'p. 202 prints this as the tilde sub-entry ~î under the headword kurd, which this file teaches on the line above. Three more ~î are on that page: "~î student" under ktâw "book", "~î misery" under kor "blind", and the "ba ~î in short" of kurt, "short". The gloss is a bare "Kurdish", which does not say whether the adjective or the name of the language is meant; the Kurmanji slot reads it as the language and the Turkish follows that.',
  },
  { id: 'ckb-v240', wordKu: 'mêjû', wordEn: 'history', wordTr: 'tarih', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:207', from: 'mezhû' },
  {
    id: 'ckb-v241', wordKu: 'edebiyat', wordEn: 'literature', wordTr: 'edebiyat', partOfSpeech: 'noun', theme: 'culture', src: 'THK06:163',
    from: 'adabiyât',
    fromNote: 'p. 163 prints this as the tilde sub-entry ~iyât under the headword adab, "literature, culture", and it is the only ~iyât on that page. The rest of that entry runs ~î "literary", ~parwar "patron of literature", be~ "impolite" and be~î "impoliteness".',
  },
];
