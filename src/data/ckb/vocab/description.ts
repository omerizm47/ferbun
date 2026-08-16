// Fêrbûn: Sorani colour and description vocabulary, the seventh authored
// Sorani theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji description theme fills twenty-two slots (v115 to v134, v291,
// v292). Twenty-one are filled here. The one that is not is listed below with
// the entries that were rejected for it, so a gap reads as a decision.
//
// The theme label was the thing worth checking first, because "Colors &
// Description" names a grammatical class rather than a thing and a class may
// have no headword at all. It has one: rang, p. 219, glossed "color" and
// nothing else, which is registered in ../vocabulary.ts.
//
// NINE CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense the slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - red: sûr (p. 228) over sija (p. 227, "red") and âl (p. 165, "red,
//    flushed"). sûr is the one the page builds sub-entries on.
//  - small: bichûk (p. 171) over bichkoł on the line directly above it,
//    "little, small", and bûchik (p. 174), the same gloss again.
//  - high: barz (p. 169) over bilind (p. 171, "high, exalted"). barz carries
//    the tall sense the Kurmanji slot wants; bilind does not.
//  - deep: qûł (p. 219) over kûř (p. 203, "deep, steep").
//  - short: qut (p. 218) over kurt (p. 202, "short"). Both are bare entries;
//    qut was taken because its gloss, "short, brief", is the Kurmanji slot's
//    gloss word for word.
//  - new: nwe (p. 212) over tâza (p. 231, "new, fresh").
//  - old: kawn (p. 194) over kon (p. 202, printed kon1, "old") and derîn
//    (p. 181, "ancient, old").
//  - clean: pâk (p. 213) over khâwen (p. 197, "clean, tidy") and tamez
//    (p. 229, "clean").
//  - heavy: girân (p. 186) over qurs (p. 218, "heavy, weighty") and sangîn
//    (p. 222, "heavy").
//
// ONE SLOT LEFT EMPTY:
//  - nice, pleasant (Kurmanji xweş): the cognate khosh (p. 199) is glossed
//    "good, well", which is the sense bâsh already carries on p. 170 and which
//    belongs to the greetings theme, not this one. shîrîn (p. 227) is "sweet,
//    nice", with the pleasantness second behind the taste. Neither is the slot,
//    so the slot stays open.
//
// ONE PICK NO SPEAKER WILL LIKE. soft is noł (p. 211), a bare entry glossed
// "soft" and the only one in the glossary. narm, the word the Kurmanji slot
// uses and the one a learner would expect, is not a headword anywhere: it
// appears exactly once in the volume, inside noł's own example sentence, "O my
// soft little one". fish (p. 184) is "flabby, soft", which is not a compliment.
// Taking noł is defensible from the page and doubtful as teaching, and it is
// the entry in this file most likely to be pulled at review.
//
// SENSES THACKSTON GIVES THAT THIS FILE DOES NOT TEACH, listed rather than
// lost: zard "yellow, blond"; barz "high, tall, loud", with the loud sense
// carried by an example, "ba dang i ~ in a loud voice". Sub-entries are dropped
// without comment: sûr is glossed "red; ~-kirdin-awa to fry, saute", spî
// "white; ~-kirdinawa to whiten, to bleach", kawn "old; ~ârâ old, ancient",
// pâk "pure, clean; ~-kirdin to clean", garm "warm, hot; ~â heat".
//
// TWO HOMOGRAPH SUPERSCRIPTS, both recorded in the entry's own fromNote rather
// than only here: shîn and rang are each printed with a raised 1 separating
// them from an unrelated second headword on the same page.
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// one is a single upright Times-Bold span with no italic letter inside it.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_DESCRIPTION: SoraniVocabWord[] = [
  { id: 'ckb-v108', wordKu: 'sûr', wordEn: 'red', wordTr: 'kırmızı', partOfSpeech: 'adj', theme: 'description', src: 'THK06:228', from: 'sûr' },
  { id: 'ckb-v109', wordKu: 'reş', wordEn: 'black', wordTr: 'siyah', partOfSpeech: 'adj', theme: 'description', src: 'THK06:219', from: 'rash' },
  { id: 'ckb-v110', wordKu: 'sewz', wordEn: 'green', wordTr: 'yeşil', partOfSpeech: 'adj', theme: 'description', src: 'THK06:224', from: 'sawz' },
  // wordTr trimmed from the Kurmanji 'sarı': zard also means blond, which is a
  // sense about hair rather than a colour card, and is not taught.
  { id: 'ckb-v111', wordKu: 'zerd', wordEn: 'yellow', wordTr: 'sarı', partOfSpeech: 'adj', theme: 'description', src: 'THK06:238', from: 'zard' },
  { id: 'ckb-v112', wordKu: 'spî', wordEn: 'white', wordTr: 'beyaz', partOfSpeech: 'adj', theme: 'description', src: 'THK06:228', from: 'spî' },
  // wordTr translates Thackston rather than reusing the Kurmanji 'mavi, yeşil':
  // he glosses both halves as dark, and a card that drops that would teach a
  // wider word than the page licenses.
  {
    id: 'ckb-v113', wordKu: 'şîn', wordEn: 'dark blue, dark green', wordTr: 'koyu mavi, koyu yeşil', partOfSpeech: 'adj', theme: 'description', src: 'THK06:227',
    from: 'shîn',
    fromNote: 'p. 227 prints this as shîn1. shîn2, nine lines below it, is "wail, lament".',
  },
  { id: 'ckb-v114', wordKu: 'gewre', wordEn: 'large, big, great', wordTr: 'büyük, ulu', partOfSpeech: 'adj', theme: 'description', src: 'THK06:185', from: 'gawra' },
  { id: 'ckb-v115', wordKu: 'biçûk', wordEn: 'small, little', wordTr: 'küçük, ufak', partOfSpeech: 'adj', theme: 'description', src: 'THK06:171', from: 'bichûk' },
  { id: 'ckb-v116', wordKu: 'germ', wordEn: 'warm, hot', wordTr: 'sıcak, ılık', partOfSpeech: 'adj', theme: 'description', src: 'THK06:184', from: 'garm' },
  { id: 'ckb-v117', wordKu: 'sard', wordEn: 'cold', wordTr: 'soğuk', partOfSpeech: 'adj', theme: 'description', src: 'THK06:225', from: 'sârd' },
  // wordEn takes the first two of Thackston's three senses. The third, loud, is
  // a property of a voice and would not belong on a card with tall.
  { id: 'ckb-v118', wordKu: 'berz', wordEn: 'high, tall', wordTr: 'yüksek, uzun', partOfSpeech: 'adj', theme: 'description', src: 'THK06:169', from: 'barz' },
  { id: 'ckb-v119', wordKu: 'qûll', wordEn: 'deep', wordTr: 'derin', partOfSpeech: 'adj', theme: 'description', src: 'THK06:219', from: 'qûł' },
  { id: 'ckb-v120', wordKu: 'drêj', wordEn: 'long', wordTr: 'uzun', partOfSpeech: 'adj', theme: 'description', src: 'THK06:182', from: 'drezh' },
  { id: 'ckb-v121', wordKu: 'qut', wordEn: 'short, brief', wordTr: 'kısa', partOfSpeech: 'adj', theme: 'description', src: 'THK06:218', from: 'qut' },
  { id: 'ckb-v122', wordKu: 'nwê', wordEn: 'new', wordTr: 'yeni', partOfSpeech: 'adj', theme: 'description', src: 'THK06:212', from: 'nwe' },
  // wordTr trimmed from the Kurmanji 'eski, kadim': Thackston glosses kawn as
  // "old" alone. The ancient sense sits on the sub-entry ~ârâ, not here.
  { id: 'ckb-v123', wordKu: 'kewn', wordEn: 'old', wordTr: 'eski', partOfSpeech: 'adj', theme: 'description', src: 'THK06:194', from: 'kawn' },
  { id: 'ckb-v124', wordKu: 'pak', wordEn: 'pure, clean', wordTr: 'saf, temiz', partOfSpeech: 'adj', theme: 'description', src: 'THK06:213', from: 'pâk' },
  { id: 'ckb-v125', wordKu: 'cwan', wordEn: 'pretty, beautiful', wordTr: 'güzel', partOfSpeech: 'adj', theme: 'description', src: 'THK06:193', from: 'jwân' },
  // wordTr trimmed from the Kurmanji 'ağır; ciddi': Thackston glosses girân as
  // "heavy" alone, so the serious sense is not his to teach.
  { id: 'ckb-v126', wordKu: 'giran', wordEn: 'heavy', wordTr: 'ağır', partOfSpeech: 'adj', theme: 'description', src: 'THK06:186', from: 'girân' },
  // wordTr trimmed from the Kurmanji 'yumuşak, nazik': noł is glossed "soft"
  // and carries no sense about manner.
  { id: 'ckb-v127', wordKu: 'noll', wordEn: 'soft', wordTr: 'yumuşak', partOfSpeech: 'adj', theme: 'description', src: 'THK06:211', from: 'noł' },
  { id: 'ckb-v128', wordKu: 'bor', wordEn: 'gray', wordTr: 'gri', partOfSpeech: 'adj', theme: 'description', src: 'THK06:173', from: 'bor' },
];
