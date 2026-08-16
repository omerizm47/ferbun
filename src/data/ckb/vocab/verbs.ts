// Fêrbûn: Sorani core verbs, the eleventh authored Sorani theme and the first
// that is not a theme of nouns.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// WHAT A `from` IS FOR A VERB. Thackston's glossary gives a verb twice: as an
// infinitive, which is the headword the gloss hangs on, and as a present stem
// with a trailing hyphen, which is printed inside that entry and often again as
// a cross-reference of its own. p. 173 has both, four lines apart: "bîs- pres.
// stem of bîstin" and "bîstin bîs- v.t. to hear". The stem entry carries no
// gloss; it points at the infinitive.
// The glossary front matter, p. 163, says this much about verbs and no more,
// verbatim:
//   "Abbreviations: adj. = adjective; cond. = conditional; demon. =
//   demonstrative; imprs. = impersonal (verb is always in the 3rd person
//   singular); impt. = imperative; pl. = plural; pron. = pronoun; sing. =
//   singular; subj. = subjunctive; pres. = present; v.i. = verb intransitive;
//   v.p. = verb passive; v.t. = verb transitive (transitive implies that the
//   past tense is formed on the ergative model, not that the verb necessarily
//   takes a direct object either in Kurdish or in English)."
//   "Generally, compound verbs are listed under the nonverbal element of the
//   compound; compounds with frequently-occurring elements like dâ-, hał-, and
//   pe- are listed under the verb."
// So the front matter licenses reading "pres. stem" as "present stem" and says
// where a compound verb is filed. The hyphen on a stem it never explains, there
// or anywhere else in the volume; the pages show what it does. That settles
// `from`: the taught form is the infinitive, because the infinitive is the
// string the page prints as a headword with a gloss on it, and `from` is that
// string. Nothing here is derived. Thackston states no rule that builds an
// infinitive from a stem, and there is none to state: Sorani present and past
// stems differ unpredictably, which is why he prints the present stem for every
// verb instead of leaving a reader to form it. Those stems are not stored in
// this file at all. A field holding one of them would teach half a paradigm
// this theme does not teach, and the Kurmanji verb slots are infinitives too,
// so the two tracks teach the same part of the verb.
//
// The Kurmanji verbs theme fills thirty slots (v165 to v194). Twenty-seven are
// filled here. The three that are not are listed below with what was rejected
// for each, so a gap reads as a decision.
//
// SEVEN ENTRIES ARE TILDE SUB-ENTRIES, more than the rest of the corpus holds
// put together, because Thackston files compound verbs under their nonverbal
// element by the rule quoted above and because his ~awa extensions carry senses
// English gives its own verb. Each of the seven names its base in a `fromNote`,
// and each note also names the other tildes on that page that a reader could
// mistake it for: the text layer says which characters are printed, never which
// headword a ~ belongs to.
//
// THREE SLOTS LEFT EMPTY:
//  - read, study (Kurmanji xwendin): p. 200 prints the headword as khwen|din,
//    the bar marking where its sub-entry tildes attach, glossed "to call; to
//    read". The bar sits inside the word, so no page prints the string khwendin
//    at all, and neither the verbatim rule nor the tilde rule in
//    tools/verify-citations.ts can confirm a form the page breaks in half.
//    dars ~khwendin (p. 178) is a compound under the noun dars and is glossed
//    "to study" only. Rather than add a rule to make one entry pass, the slot
//    waits for a reader with the page open.
//  - get up, rise (Kurmanji rabûn): the only glossed form is "hał~ to get up,
//    stand up", a sub-entry of wastân at p. 235 where the tilde stands for the
//    headword and follows a prefix instead of opening the string. hałssân
//    (p. 189) is printed whole but has no English gloss to take: its entry
//    reads "hałss- contraction of hał-wastân, q.v."
//  - walk (Kurmanji meşiyan): pyâsa (p. 216) is "walk, stroll" and its
//    sub-entry ~-kirdin breaks across the page foot. The form is the last line
//    of 216 and its gloss, "take a stroll, go for a walk", is the first line of
//    217. No single printed page carries both, and `src` names one page.
//
// TEN CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense a slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - go: chûn (p. 177, a bare "to go") over royshtin (p. 221, "to go (away,
//    off), leave"), which adds a direction the slot does not ask for.
//  - see: dîtin (p. 182) over dîn (p. 182) and bînîn (p. 173, "to see (see also
//    dîn)"). All three are glossed "to see" and all three share the present
//    stem bîn-; dîtin is the form the Kurmanji slot also teaches.
//  - drink: khwârdinawa, the ~awa inside the "to eat" entry at p. 200, over
//    noshân (p. 211, a bare "to drink"). Taking Thackston's own extension keeps
//    eat and drink on one root and one page, the way he sets them out. noshân
//    is the cleaner citation of the two and a speaker may prefer it.
//  - want: wîstin (p. 237, "to want") over khwâstin (p. 200, "to want,
//    desire"), even though khwâstin is the exact cognate of the Kurmanji slot's
//    xwestin. p. 34 settles it: "The Kurdish verb corresponding to the English
//    verb 'want' is wîstin (present stem we-)."
//  - say: gotin (p. 187) over gutin (p. 188, "to say (see witin)") and witin
//    (p. 237, "to say to, tell"). gotin is the Kurmanji slot's own form and the
//    only one of the three glossed with a bare "to say".
//  - know: zânîn (p. 238) over nâsîn (p. 210, "to know, be acquainted with,
//    recognize"), which is the acquaintance sense and not the slot's.
//  - hear: bîstin (p. 173, a bare "to hear") over zhinawtin (p. 239, "to hear,
//    listen to") and gwechka ~-girtin (p. 188), a compound under "ear".
//  - write: nûsîn (p. 211, "~în nûs-") over nûsândin (p. 211, "~ândin nûsên-").
//    Both are glossed "to write" in the same entry; nûsîn is the plain stem and
//    nûsândin has the -ândin shape Thackston's causatives take.
//  - speak: qsa-kirdin (p. 218, "to speak, to tell a story") over dwân (p. 182,
//    "to speak of, talk about", which governs la), dam-kirdin (p. 177, "to
//    speak") and wezhân (p. 236, "to speak, say"). wezhân is printed wezh|ân,
//    broken by the same bar as khwen|din, so it could not have been cited even
//    if it had been picked.
//  - learn: fer-bûn (p. 183) over hîn-bûn (p. 192), which is printed whole and
//    would be the cleaner citation of the two. fer-bûn is the Kurmanji slot's
//    own compound, fêr bûn, so the two tracks teach one word.
//
// FOUR TRIMMED GLOSSES, recorded rather than smoothed over:
//  - girtin (p. 186) is "to take; to pinch: ...; to hold, contain: ...". Only
//    the first sense is taught, and the Turkish loses tutmak and kapatmak with
//    the senses that carried them.
//  - kirdin (p. 201) is "to do" alone. The Kurmanji slot is "to do, to make",
//    and its etmek goes with the half the page does not give.
//  - nîshtin (p. 211) is "to sit"; the sub-entry dâ~, "to sit down, to dwell",
//    is a different headword and is not taught here.
//  - dîtin (p. 182) is "to see"; its ~awa, "to find", is not this entry.
//
// THREE WIDENED TURKISH GLOSSES, where Thackston gives a sense the Kurmanji
// slot's Turkish did not carry: dân "to give, pay" gains ödemek, kawtin "to
// fall, befall" gains başına gelmek, and gařân "to turn, wander, search" gains
// dönmek.
//
// The furtive i is not in play. Every headword and sub-entry below was read
// span by span off the page rather than out of the extracted text, which drops
// italics, and each is a single upright Times-Bold span with no italic letter
// inside it. girtin, kirdin, mirdin, bîstin, nîshtin and tirsân were the ones
// worth checking, each with an interior i between consonants where a furtive i
// would go.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_VERBS: SoraniVocabWord[] = [
  { id: 'ckb-v159', wordKu: 'çûn', wordEn: 'to go', wordTr: 'gitmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:177', from: 'chûn' },
  { id: 'ckb-v160', wordKu: 'hatin', wordEn: 'to come', wordTr: 'gelmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:190', from: 'hâtin' },
  { id: 'ckb-v161', wordKu: 'dîtin', wordEn: 'to see', wordTr: 'görmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:182', from: 'dîtin' },
  { id: 'ckb-v162', wordKu: 'xwardin', wordEn: 'to eat', wordTr: 'yemek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:200', from: 'khwârdin' },
  {
    id: 'ckb-v163', wordKu: 'xwardinewe', wordEn: 'to drink', wordTr: 'içmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:200',
    from: 'khwârdinawa',
    fromNote: 'p. 200 prints this as the sub-entry ~awa inside the khwârdin entry, "to eat; ~awa to drink". The other ~awa on that page hangs under khwâr and is "khistinà ~awa to throw down".',
  },
  {
    id: 'ckb-v164', wordKu: 'zanîn', wordEn: 'to know', wordTr: 'bilmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:238',
    from: 'zânîn',
    fromNote: 'p. 238 prints this as the sub-entry ~în under zân|â "learned", whose bar marks zân as the base: "~în zân- v.t. to know". Two more ~în are on that page, a second one under zân|â ("~în zân- ba to consider as") and one under zeř ("golden"). The separate headword zân on the same page is another verb, "to be born".',
  },
  { id: 'ckb-v165', wordKu: 'wîstin', wordEn: 'to want', wordTr: 'istemek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:237', from: 'wîstin' },
  // wordTr trimmed from the Kurmanji 'yapmak, etmek': p. 201 glosses kirdin
  // "to do" and files the making senses under each compound's first element.
  { id: 'ckb-v166', wordKu: 'kirdin', wordEn: 'to do', wordTr: 'yapmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:201', from: 'kirdin' },
  { id: 'ckb-v167', wordKu: 'gotin', wordEn: 'to say', wordTr: 'söylemek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:187', from: 'gotin' },
  { id: 'ckb-v168', wordKu: 'man', wordEn: 'to remain', wordTr: 'kalmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:206', from: 'mân' },
  // Turkish olmak carries all three of Thackston's senses, so the Kurmanji
  // slot's single word stands even though the English gloss is wider.
  { id: 'ckb-v169', wordKu: 'bûn', wordEn: 'to be, to become, to happen', wordTr: 'olmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:174', from: 'bûn' },
  {
    id: 'ckb-v170', wordKu: 'dan', wordEn: 'to give, pay', wordTr: 'vermek, ödemek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:180',
    from: 'dân',
    fromNote: 'p. 180 prints this as dân1. dân2, ten lines below it, is "grain, seed", and dân3 is "tooth".',
  },
  // wordEn takes the first of Thackston's senses; wordTr trimmed from the
  // Kurmanji 'almak, tutmak, kapatmak' with the senses that carried them.
  { id: 'ckb-v171', wordKu: 'girtin', wordEn: 'to take', wordTr: 'almak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:186', from: 'girtin' },
  {
    id: 'ckb-v172', wordKu: 'nûsîn', wordEn: 'to write', wordTr: 'yazmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:211',
    from: 'nûsîn',
    fromNote: 'p. 211 prints this as the sub-entry ~în under nûs|en-, whose bar marks nûs as the base: "~în nûs- v.t. to write". The other ~în on that page is the ~înawa two words later, "to copy, to transcribe".',
  },
  {
    id: 'ckb-v173', wordKu: 'qse-kirdin', wordEn: 'to speak, to tell a story', wordTr: 'konuşmak, hikâye anlatmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:218',
    from: 'qsa-kirdin',
    fromNote: 'p. 218 prints this as the sub-entry ~-kirdin under qsa, "words, speech, story". Three more ~-kirdin are on that page, under qułf ("to lock"), under qurbân and in a "to splinter" entry.',
  },
  { id: 'ckb-v174', wordKu: 'bîstin', wordEn: 'to hear', wordTr: 'duymak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:173', from: 'bîstin' },
  { id: 'ckb-v175', wordKu: 'twanîn', wordEn: 'to be able', wordTr: 'yapabilmek, muktedir olmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:234', from: 'twânîn' },
  { id: 'ckb-v176', wordKu: 'şurdin', wordEn: 'to wash', wordTr: 'yıkamak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:227', from: 'shurdin' },
  {
    id: 'ckb-v177', wordKu: 'kirdinewe', wordEn: 'to open', wordTr: 'açmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:201',
    from: 'kirdinawa',
    fromNote: 'p. 201 prints this as the sub-entry ~awa inside the kirdin entry, "~awa to open". Five more ~awa are on that page; the nearest, eight lines above, hangs under kirân and is "to be opened", the passive.',
  },
  { id: 'ckb-v178', wordKu: 'mirdin', wordEn: 'to die', wordTr: 'ölmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:207', from: 'mirdin' },
  {
    id: 'ckb-v179', wordKu: 'jyan', wordEn: 'to live', wordTr: 'yaşamak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:239',
    from: 'zhyân',
    fromNote: 'p. 239 prints zhyân twice and numbers neither. The entry above this one is the noun, "life"; this is the verb, printed with its present stem zhî-.',
  },
  // wordTr widened from the Kurmanji 'düşmek': Thackston glosses the befalling
  // sense too, and Turkish düşmek does not carry it on its own.
  { id: 'ckb-v180', wordKu: 'kewtin', wordEn: 'to fall, befall', wordTr: 'düşmek, başına gelmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:194', from: 'kawtin' },
  { id: 'ckb-v181', wordKu: 'nîştin', wordEn: 'to sit', wordTr: 'oturmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:211', from: 'nîshtin' },
  {
    id: 'ckb-v182', wordKu: 'xoş-wîstin', wordEn: 'to love, to like', wordTr: 'sevmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:199',
    from: 'khosh-wîstin',
    fromNote: 'p. 199 prints this as the sub-entry ~-wîstin under khosh, and it is the only ~-wîstin on that page.',
  },
  {
    id: 'ckb-v183', wordKu: 'fêr-bûn', wordEn: 'to learn', wordTr: 'öğrenmek', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:183',
    from: 'fer-bûn',
    fromNote: 'p. 183 prints this as the sub-entry ~-bûn under fer, "acquainted", and it is the only ~-bûn on that page.',
  },
  { id: 'ckb-v184', wordKu: 'tirsan', wordEn: 'to be afraid of, fear', wordTr: 'korkmak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:233', from: 'tirsân' },
  // wordTr widened from the Kurmanji 'dolaşmak, aramak' with the turning sense
  // Thackston gives first.
  { id: 'ckb-v185', wordKu: 'gerran', wordEn: 'to turn, wander, search', wordTr: 'dönmek, dolaşmak, aramak', partOfSpeech: 'verb', theme: 'verbs', src: 'THK06:184', from: 'gařân' },
];
