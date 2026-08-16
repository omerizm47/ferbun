// Fêrbûn: Sorani nature and weather vocabulary, the fourth authored Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji nature theme fills twenty-four slots (v081 to v100, v282 to
// v285). Twenty are filled here. The four that are not are listed below with
// the entry that was rejected for each, so a gap reads as a decision.
//
// SIX CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense the slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - mountain: chyâ (p. 177) over kew (p. 195, "mountain") and shâkh (p. 226,
//    "mountain; horn"). chyâ is the single-sense entry and the cognate of the
//    Kurmanji slot word çiya.
//  - river: chom (p. 176) over cham (p. 174, "river, stream") and rûbâr
//    (p. 222, "river"). chom and rûbâr are both bare one-sense entries; chom
//    was taken because cham and chom are two spellings a beginner would have to
//    tell apart, and chom is the one whose gloss carries nothing but "river".
//  - tree: dâr (p. 180) over dirakht (p. 181) and drakht (p. 182), which are
//    two separately alphabetised spellings of one loanword, both glossed
//    "tree". Picking between those two is exactly the choice ./family.ts
//    declined to make for millat and mîllat.
//  - summer: hâwîn (p. 191) over tâwistân (p. 231, "summer").
//  - autumn: pâyiz (p. 214) over khazân (p. 196, "autumn") and gałârezân
//    (p. 184, "autumn; the month of Scorpio").
//  - earth: khâk (p. 197, "earth, dust") over arz (p. 164, "earth, land") and
//    âkh (p. 165, "earth, grave"). Only khâk keeps the second sense inside the
//    same idea as the first.
//
// TWO SLOTS THAT BOTH WANT THE WORD "earth". The Kurmanji theme has erd
// "earth, ground" (v090) and ax "earth, soil" (v094), and Thackston's two
// entries are zawî "earth, ground, floor" (p. 238) and khâk "earth, dust"
// (p. 197). Teaching both by their first gloss would put two cards on one theme
// asking for the same English word, so zawî is taught as "ground" and khâk as
// "earth". Both senses are Thackston's own; the split between them is not.
//
// FOUR SLOTS LEFT EMPTY:
//  - lake (Kurmanji gol): the nearest entry is gom (p. 187), "deep, stagnant
//    water; indistinct; lake, pond", where the lake sense sits third behind a
//    different primary. Sorani gol on the same page is "calf; pool, pond;
//    stupid" and has no lake sense at all.
//  - sea (derya): no headword in the glossary is glossed "sea". The word occurs
//    once, inside the gloss of bazh (p. 169), "dry land (opp. to sea)".
//  - grass (giya): the cognate gyâ (p. 188) is glossed "plant", which is not
//    the slot, and pûsh (p. 216) is "dried grass".
//  - sunlight (tav): no headword is glossed "sunlight" or "sunshine". The
//    sub-entries under khor are compass points, "east, sunrise" and "west,
//    sunset", not the light itself.
//
// ONE SENSE THE KURMANJI THEME FUSES AND SORANI SPLITS. Kurmanji roj (v087) is
// "sun; day". Thackston has khor "sun" (p. 199) and rozh "day" (p. 221) as two
// headwords. Only the sun half is taught here, and the Turkish is trimmed to
// match. rozh belongs to the time theme, which has no Sorani file yet.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH, listed rather than
// lost: dâr "tree, wood; staff, rod, stick"; mâng "moon, month"; zawî "earth,
// ground, floor"; khâk "earth, dust". Sub-entries and worked examples are
// dropped without comment: bard is glossed "stone: dawr i ~ the Stone Age",
// bafr "snow; ~-girtin for snow to cover s.th.", khor "sun; ~ałât east,
// sunrise; ~atâw sun; ~âwâ west, sunset", âsmân "sky; ~ i dûr la zawîawa outer
// space". khoratâw, the sub-entry under khor, is glossed "sun" as well, so the
// page offers the compound beside the simple word.
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// one is a single upright Times-Bold span with no italic letter inside it.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_NATURE: SoraniVocabWord[] = [
  { id: 'ckb-v053', wordKu: 'çya', wordEn: 'mountain', wordTr: 'dağ', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:177', from: 'chyâ' },
  { id: 'ckb-v054', wordKu: 'çom', wordEn: 'river', wordTr: 'nehir', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:176', from: 'chom' },
  { id: 'ckb-v055', wordKu: 'dar', wordEn: 'tree', wordTr: 'ağaç', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:180', from: 'dâr' },
  { id: 'ckb-v056', wordKu: 'befr', wordEn: 'snow', wordTr: 'kar', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:167', from: 'bafr' },
  { id: 'ckb-v057', wordKu: 'baran', wordEn: 'rain', wordTr: 'yağmur', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:170', from: 'bârân' },
  {
    id: 'ckb-v058', wordKu: 'ba', wordEn: 'wind', wordTr: 'rüzgar', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:169',
    from: 'bâ',
    fromNote: 'p. 169 prints this as bâ2. bâ1, directly above it, is a hortatory particle.',
  },
  // wordTr trimmed from the Kurmanji 'güneş; gün': the day half of that pair is
  // rozh (p. 221), a separate headword this theme has no slot for.
  { id: 'ckb-v059', wordKu: 'xor', wordEn: 'sun', wordTr: 'güneş', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:199', from: 'khor' },
  // wordTr trimmed from the Kurmanji 'ay; ay (zaman)': mâng carries the month
  // sense too, but only the moon is taught here.
  { id: 'ckb-v060', wordKu: 'mang', wordEn: 'moon', wordTr: 'ay', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:206', from: 'mâng' },
  { id: 'ckb-v061', wordKu: 'estêre', wordEn: 'star', wordTr: 'yıldız', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:164', from: 'astera' },
  {
    id: 'ckb-v062', wordKu: 'zewî', wordEn: 'ground', wordTr: 'yer, zemin', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:238',
    from: 'zawî',
    fromNote: 'p. 238 prints the headword as zawî(n), with the final n parenthesised as optional. The taught form is the shorter reading.',
  },
  // wordTr trimmed from the Kurmanji 'taş, kaya': Thackston glosses bard as
  // "stone" alone, so the rock half of that pair is not his claim to make.
  { id: 'ckb-v063', wordKu: 'berd', wordEn: 'stone', wordTr: 'taş', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:168', from: 'bard' },
  { id: 'ckb-v064', wordKu: 'xak', wordEn: 'earth', wordTr: 'toprak', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:197', from: 'khâk' },
  { id: 'ckb-v065', wordKu: 'behar', wordEn: 'spring', wordTr: 'ilkbahar', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:168', from: 'bahâr' },
  { id: 'ckb-v066', wordKu: 'hawîn', wordEn: 'summer', wordTr: 'yaz', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:191', from: 'hâwîn' },
  { id: 'ckb-v067', wordKu: 'payiz', wordEn: 'autumn', wordTr: 'sonbahar', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:214', from: 'pâyiz' },
  { id: 'ckb-v068', wordKu: 'zistan', wordEn: 'winter', wordTr: 'kış', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:239', from: 'zistân' },
  { id: 'ckb-v069', wordKu: 'asman', wordEn: 'sky', wordTr: 'gökyüzü', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:166', from: 'âsmân' },
  { id: 'ckb-v070', wordKu: 'jûrû', wordEn: 'north', wordTr: 'kuzey', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:239', from: 'zhûrû' },
  { id: 'ckb-v071', wordKu: 'cinûb', wordEn: 'south', wordTr: 'güney', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:193', from: 'jinûb' },
  { id: 'ckb-v072', wordKu: 'hewr', wordEn: 'cloud', wordTr: 'bulut', partOfSpeech: 'noun', theme: 'nature', src: 'THK06:190', from: 'hawr' },
];
