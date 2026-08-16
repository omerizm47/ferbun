// Fêrbûn: Sorani function words, the seventeenth authored Sorani theme and the
// last of the seventeen the Kurmanji track has.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// THE ONE THEME WHERE A MATCHING GLOSS IS NOT ENOUGH. Every other Sorani theme
// teaches words that point at things, and a Kurmanji slot and a Sorani headword
// glossed alike are teaching the same thing. These words carry grammar instead,
// and the two languages do not build their grammar the same way. Six of the
// twenty Kurmanji slots are therefore left empty although the glossary has a
// word whose English matches, because the Sorani word is bound where the
// Kurmanji one is free, or because one Sorani word already fills a second slot
// and a card teaching it twice would teach a construction rather than a word.
// Each of the six says which it is. Thackston's own labels decide it, not this
// file's reading: he marks -îsh an enclitic (p. 192), ná- a prefix (p. 208),
// 'dâ a postposition (p. 179) and -awa a postposition (p. 165), and a bound
// form has no card here.
//
// The Kurmanji function theme fills twenty slots (v241 to v260). Fourteen are
// filled here.
//
// SIX SLOTS LEFT EMPTY, EACH FOR A STRUCTURAL REASON:
//  - every, each (Kurmanji her): har (p. 189) is glossed "just", not "every",
//    and its sub-entries are the har chî and har chand of "whatever" and
//    "however much". The word that means every is hamû (p. 189), "all, every (+
//    indefinite): ~ rozhèk every day", and it fills the hemû slot below.
//    Kurmanji splits the distributive over her and hemû; Sorani puts it on one
//    word plus the indefinite suffix on the noun, so a second card would teach
//    the suffix, which is grammar this theme does not teach.
//  - from, of (Kurmanji ji): la (p. 203) is "in, at, from" and fills the li
//    slot below. Sorani runs one general preposition where Kurmanji has ji and
//    li, and reads the ablative off the same word, either bare or with the
//    circumposition la ...-awa. There is no second preposition to teach.
//  - in (Kurmanji di … de): the Sorani is la ...-dâ, which the page prints only
//    inside the la entry, as a frame with the noun phrase in the middle. Its
//    second element is not a word: p. 179 files it as "'dâ postposition with
//    the preposition la", so it attaches to what it encloses. The la half is
//    taught below, and the postposition is not a card.
//  - also, even (Kurmanji jî): p. 192 prints this with a leading hyphen and a
//    label, "-îsh (enclitic, after vowels 'sh and 'ysh) too, also, either". It
//    is bound to the word in front of it and changes shape after a vowel, where
//    Kurmanji jî is a free word that stands on its own. The headword îsh three
//    lines above it, which is printed without the hyphen, is a different word,
//    "work, labor, deed", and is taught in ./education.ts.
//  - not (Kurmanji ne): Sorani negates on the verb. p. 208 files "ná- negative
//    subjunctive prefix", again with the hyphen that marks a bound form. The
//    two free headwords are the answer word, not the negator: na (p. 208) is
//    "no" and nâ (p. 209) is "no, oh no". Kurmanji ne is a free particle and
//    has no Sorani counterpart that is one.
//  - many, very (Kurmanji gelek): the only glossed "many" outside zor is gal's
//    sub-entry ~è (p. 184), "a lot, a lot of, much, many". Its vowel è has no
//    row in the conversion table at p. 88, so tools/thackston-latin.ts throws on
//    it rather than inventing a letter, and no taught spelling can be produced.
//    zor (p. 239) covers "very; a lot, much" and fills the pir slot below; its
//    own "many" is the frame "...èk i zor", the noun's indefinite suffix again.
//
// FIVE CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense a slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - this: ama (p. 163, "this (demon. pron.)") over am on the same page, which
//    is printed as the frame "am ...á ..." and glossed "this (demon. adj.)".
//    The Sorani demonstrative adjective wraps the noun, so it has no single
//    printed string to cite and would not be one word on a card. ama is the
//    pronoun and is printed whole.
//  - what?: chi (p. 176) over chî further down the same page, which is printed
//    as the cross-reference "chî = chi" and carries no gloss of its own, the
//    same shape the present-stem entries have in ./verbs.ts.
//  - how?: chon (p. 176) over chito (p. 176, a bare "how?") and chilon (p. 176,
//    "how"), all three on the one page. chon is the one the book builds on:
//    its own entry gives chonî "how are you?" and ~èk "somehow", and har chonèk
//    be "somehow or other" is at p. 189.
//  - but: bałâm (p. 168, "but (conj.)") over báłka four entries below it ("but,
//    rather", which corrects rather than contrasts) and kachî (p. 194, "but, on
//    the other hand").
//  - only, alone: tanhâ (p. 229, "only; alone") over tanyâ (p. 230, "alone,
//    only"), whose entry is mostly the negative frame tanyâ...nabe "nothing but".
//
// TWO CARDS THAT LOOK ALIKE AND ARE NOT ONE WORD. ka (p. 194) converts to ke
// and ke (p. 195) converts to kê, so the conjunction and the interrogative sit
// one circumflex apart in the taught alphabet. That is the p. 88 table's doing
// and not a collision this file may fix by hand. A speaker should say whether
// two cards this close belong in one theme.
//
// ONE ENTRY IS A PHRASE. bo chi is two words, and it is here because bo alone
// (p. 173) is glossed "to, for; why?, what for?", which leads with the
// preposition, while the sub-entry ~ chi means only the question. The Kurmanji
// theme has a multi-word slot of its own, di … de, so a phrase is not new to it.
//
// GLOSSES TRIMMED, recorded rather than smoothed over. Thackston's part-of-
// speech parentheticals are dropped from every card in this file, because that
// is what the `partOfSpeech` field holds and a card should carry the sense:
//  - aw (p. 164) is "he, she, it (3rd-person sing. pronoun); that (sing. demon.
//    pron.); ~ ...á that, those (demon. adj.)". The card keeps the two senses
//    and drops the adjective frame with them.
//  - ama (p. 163) is "this (demon. pron.)".
//  - chi (p. 176) is "(1) what? (interrogative pronoun); (2) that which
//    (relative pronoun); (3) thing: chiyân nâbe they have nothing". Only the
//    first sense is taught.
//  - ka2 (p. 194) is "when (conj); that (subordinating conj.)".
//  - ba (p. 167) is "(with enclitic pronouns pre- or postposed, pe) to; by,
//    with (instrumental); by (with passives)". Only "by, with" is taught, which
//    is the Kurmanji slot's own sense. His "to" is the dative, and dropping it
//    loses a use of the word that a later theme will have to teach.
//  - la (p. 203) is "(with encl. pronouns, le) in, at, from; la ...-awa from;
//    la ...-dâ in, at". The card keeps the three bare senses.
//  - zor2 (p. 239) is "very; a lot, much; ...èk i ~ many: shitèk i zor many
//    things".
//  - tanhâ (p. 229) is "only; alone; ~î loneliness".
//  - hamû (p. 189) is "all, every (+ indefinite): ~ rozhèk every day".
//
// The furtive i is not in play. Every headword below was read span by span off
// the page rather than out of the extracted text, which drops italics, and each
// is a single upright Times-Bold span with no italic letter inside it. These
// words are mostly too short to hide one; bałâm, tanhâ and hamû were the ones
// worth checking.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_FUNCTION: SoraniVocabWord[] = [
  {
    id: 'ckb-v242', wordKu: 'eme', wordEn: 'this', wordTr: 'bu', partOfSpeech: 'demon', theme: 'function', src: 'THK06:163',
    from: 'ama',
    fromNote: 'p. 163 prints the demonstrative adjective one line above this entry as the frame "am ...á ...", so the two are separate headwords and only this one is a single string.',
  },
  { id: 'ckb-v243', wordKu: 'ew', wordEn: 'he, she, it; that', wordTr: 'o; şu', partOfSpeech: 'demon', theme: 'function', src: 'THK06:164', from: 'aw' },
  {
    id: 'ckb-v244', wordKu: 'çi', wordEn: 'what?', wordTr: 'ne?', partOfSpeech: 'pron', theme: 'function', src: 'THK06:176',
    from: 'chi',
    fromNote: 'p. 176 prints the headword bare and numbers its three senses after it. chî, further down the same page after chito, is the same word: its entry reads "chî = chi" and carries no gloss.',
  },
  { id: 'ckb-v245', wordKu: 'kê', wordEn: 'who?', wordTr: 'kim?', partOfSpeech: 'pron', theme: 'function', src: 'THK06:195', from: 'ke' },
  {
    id: 'ckb-v246', wordKu: 'bo çi', wordEn: 'why?, what for?', wordTr: 'neden?, ne için?', partOfSpeech: 'adv', theme: 'function', src: 'THK06:173',
    from: 'bo chi',
    fromNote: 'p. 173 prints this as the tilde sub-entry "~ chi" under the headword bo, "to, for; why?, what for?", and it is the only tilde in that entry apart from "~ awaî (+ subj.) in order that".',
  },
  { id: 'ckb-v247', wordKu: 'çon', wordEn: 'how?', wordTr: 'nasıl?', partOfSpeech: 'adv', theme: 'function', src: 'THK06:176', from: 'chon' },
  {
    id: 'ckb-v248', wordKu: 'ke', wordEn: 'when; that', wordTr: 'ki; …dığı zaman', partOfSpeech: 'conj', theme: 'function', src: 'THK06:194',
    from: 'ka',
    fromNote: 'p. 194 prints this as ka2. ka1, two lines above it, is "other, else", and ka- below it is the present stem of kirdin.',
  },
  { id: 'ckb-v249', wordKu: 'bellam', wordEn: 'but', wordTr: 'ama, fakat', partOfSpeech: 'conj', theme: 'function', src: 'THK06:168', from: 'bałâm' },
  { id: 'ckb-v250', wordKu: 'u', wordEn: 'and', wordTr: 've', partOfSpeech: 'conj', theme: 'function', src: 'THK06:234', from: 'u' },
  {
    id: 'ckb-v251', wordKu: 'be', wordEn: 'by, with', wordTr: 'ile', partOfSpeech: 'prep', theme: 'function', src: 'THK06:167',
    from: 'ba',
    fromNote: 'p. 167 prints the preposition bare. ba-1 and ba-2 below it are a different thing each: the first files the compound adjectives built on ba-, the second is the present stem of birdin.',
  },
  {
    id: 'ckb-v252', wordKu: 'le', wordEn: 'in, at, from', wordTr: '…de, …den', partOfSpeech: 'prep', theme: 'function', src: 'THK06:203',
    from: 'la',
    fromNote: 'p. 203 opens the gloss with the form this word takes before an enclitic pronoun, "(with encl. pronouns, le)". That le converts to lê, so the two shapes of one preposition are a circumflex apart in the taught alphabet and only the bare one is a card.',
  },
  {
    id: 'ckb-v253', wordKu: 'zor', wordEn: 'very; a lot, much', wordTr: 'çok, fazla', partOfSpeech: 'adv', theme: 'function', src: 'THK06:239',
    from: 'zor',
    fromNote: 'p. 239 prints this as zor2. zor1, six lines above it, is "force".',
  },
  { id: 'ckb-v254', wordKu: 'tenha', wordEn: 'only; alone', wordTr: 'yalnız, sadece', partOfSpeech: 'adv', theme: 'function', src: 'THK06:229', from: 'tanhâ' },
  { id: 'ckb-v255', wordKu: 'hemû', wordEn: 'all, every', wordTr: 'hep, bütün', partOfSpeech: 'adj', theme: 'function', src: 'THK06:189', from: 'hamû' },
];
