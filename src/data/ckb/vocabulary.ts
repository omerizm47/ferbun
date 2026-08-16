// Fêrbûn: the Sorani vocabulary barrel. All seventeen themes the Kurmanji track
// has: greetings, family, body, home, clothing, food, nature, animals,
// description, numbers, time, verbs, emotions, places, education, culture and
// function, one file each under ./vocab.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts.
//
// Provenance, stated here and exported as CKB_GLOSS_PROVENANCE so the claim
// travels with the data instead of living only in a comment: each Sorani form
// and its English gloss come from Thackston at the page named in that entry's
// `src`. The Turkish gloss is not his. It is a translation of that English
// gloss, authored for this app, and it carries no locator, because Thackston
// glosses in English only. No native speaker has reviewed any of it, neither the
// forms nor the glosses.
//
// The two interfaces below are declared here rather than in src/data/types.ts,
// so the shared type file stays exactly as the Kurmanji track left it and a
// Sorani obligation cannot leak into a Kurmanji entry. Theme files under
// ./vocab import them with `import type`, which keeps the cycle back to this
// barrel a compile-time one that erases to nothing at runtime.

import type { VocabWord } from '../types';
import type { VocabTheme } from '../vocabulary';
import { CKB_ANIMALS } from './vocab/animals';
import { CKB_BODY } from './vocab/body';
import { CKB_CLOTHING } from './vocab/clothing';
import { CKB_CULTURE } from './vocab/culture';
import { CKB_DESCRIPTION } from './vocab/description';
import { CKB_EDUCATION } from './vocab/education';
import { CKB_EMOTIONS } from './vocab/emotions';
import { CKB_FAMILY } from './vocab/family';
import { CKB_FOOD } from './vocab/food';
import { CKB_FUNCTION } from './vocab/function';
import { CKB_GREETINGS } from './vocab/greetings';
import { CKB_HOME } from './vocab/home';
import { CKB_NATURE } from './vocab/nature';
import { CKB_NUMBERS } from './vocab/numbers';
import { CKB_PLACES } from './vocab/places';
import { CKB_TIME } from './vocab/time';
import { CKB_VERBS } from './vocab/verbs';

/** A Kurmanji VocabWord plus the locator CKB_POLICY.requireCitation demands. */
export interface SoraniVocabWord extends VocabWord {
  /** Page carrying the form and its English gloss, e.g. 'THK06:171'. Never a Turkish one. */
  src: string;
  /**
   * Thackston's own transcription of this headword, copied verbatim with his
   * â ł ř ch sh zh kh gh intact. wordKu is this string put through the p. 88
   * conversion table, and the self-check asserts that, so every shipped
   * spelling is reproducible from the page rather than trusted.
   */
  from: string;
  /** Why the cited page prints something other than `from`, or how the taught form was derived where the table alone does not show it. */
  fromNote?: string;
}

/** A VocabTheme whose `labelKu` is a headword Thackston prints, carrying the locator for it. */
export interface CitedVocabTheme extends VocabTheme {
  labelOrigin: 'cited';
  src: string;
  from: string;
  fromNote?: string;
}

/**
 * A VocabTheme whose `labelKu` names a class the glossary has no headword for,
 * so the label is authored for this app exactly as `labelTr` is. The three
 * citation fields are declared `never` rather than left off, so an authored
 * label cannot be given one: `{ labelOrigin: 'authored', src: 'THK06:163' }` is
 * a type error, not a comment someone has to notice.
 * This covers navigation chrome only. A vocabulary entry has no such variant.
 */
export interface AuthoredVocabTheme extends VocabTheme {
  labelOrigin: 'authored';
  /** Which headwords were considered and why none of them can carry this label. */
  labelNote: string;
  src?: never;
  from?: never;
  fromNote?: never;
}

/** Cited or authored, never both and never neither: `labelOrigin` fixes which fields the row may hold. */
export type SoraniVocabTheme = CitedVocabTheme | AuthoredVocabTheme;

/** Narrows to the cited half, so a consumer reading `src` or `from` has to say which rows it means. */
export const isCitedTheme = (theme: SoraniVocabTheme): theme is CitedVocabTheme => theme.labelOrigin === 'cited';

export const CKB_GLOSS_PROVENANCE =
  'Each Sorani form and its English gloss come from Thackston, "Sorani Kurdish: A Reference ' +
  'Grammar with Selected Readings", at the page named in that entry\'s src. The taught spelling ' +
  'is not transcribed by hand: the entry stores Thackston\'s transcription verbatim in its from ' +
  'field, and wordKu is that string put through his conversion table at THK06:88. The Turkish ' +
  'gloss is not his: it is a translation of that English gloss, authored for this app, and it ' +
  'carries no locator, because Thackston glosses in English only. One kind of taught string is ' +
  'exempt from the citation, and the exemption is declared in the data rather than left to a ' +
  'reader: a vocab theme whose labelOrigin is authored names a class no headword in the glossary ' +
  'names, so its labelKu is authored for this app on the same footing as its Turkish label, holds ' +
  'no src and no from, and says in its labelNote which headwords were rejected. It is still ' +
  'spelled in the THK06:88 alphabet, and the exemption reaches labels only: every vocabulary ' +
  'entry carries a page. No native speaker has reviewed any of it, neither the forms nor the ' +
  'glosses.';

// A fresh array rather than the theme arrays themselves, so adding the next
// theme is one spread and no caller can mutate a theme file through this
// export. Theme order follows VOCAB_THEMES, so the two Words screens list the
// themes they share in the same order.
export const CKB_VOCABULARY: SoraniVocabWord[] = [
  ...CKB_GREETINGS,
  ...CKB_FAMILY,
  ...CKB_BODY,
  ...CKB_HOME,
  ...CKB_CLOTHING,
  ...CKB_FOOD,
  ...CKB_NATURE,
  ...CKB_ANIMALS,
  ...CKB_DESCRIPTION,
  ...CKB_NUMBERS,
  ...CKB_TIME,
  ...CKB_VERBS,
  ...CKB_EMOTIONS,
  ...CKB_PLACES,
  ...CKB_EDUCATION,
  ...CKB_CULTURE,
  ...CKB_FUNCTION,
];

// id, icon and color match the Kurmanji themes, so the two Words screens read
// as the same screen in two languages. labelKu is the only taught string here,
// which is why it is the only part of a row that carries a locator, and the two
// rows whose label no headword can carry say so in labelOrigin instead.
export const CKB_VOCAB_THEMES: SoraniVocabTheme[] = [
  // słâw is the same headword ./vocab/greetings.ts teaches for "greetings", and
  // the only entry in the glossary glossed that way. It is the label for a
  // theme whose English is "Greetings & Social", and no headword names the
  // social half; the greeting is what the book can carry.
  {
    id: 'greetings',
    label: 'Greetings & Social',
    labelKu: 'sllaw',
    labelTr: 'Selamlaşma & Sosyal',
    icon: 'chatbubble-outline',
    color: '#D2693E',
    labelOrigin: 'cited',
    src: 'THK06:228',
    from: 'słâw',
  },
  {
    id: 'family',
    label: 'Family & People',
    labelKu: 'binemalle',
    labelTr: 'Aile & İnsanlar',
    icon: 'people-outline',
    color: '#1F8A4C',
    labelOrigin: 'cited',
    src: 'THK06:171',
    from: 'binamâła',
    fromNote: 'p. 171 prints this as the tilde sub-entry ~amâł(a) under the headword bin, with the final a optional.',
  },
  // leş is the same headword ./vocab/body.ts teaches for "body", and the same
  // caveat applies to it as a label: Thackston's lash converts to leş, which in
  // Kurmanji means a carcass. A speaker has to confirm it before this label is
  // shown to anyone.
  {
    id: 'body',
    label: 'Body & Health',
    labelKu: 'leş',
    labelTr: 'Vücut & Sağlık',
    icon: 'body-outline',
    color: '#C1432E',
    labelOrigin: 'cited',
    src: 'THK06:203',
    from: 'lash',
  },
  // mâł is the same headword ./vocab/home.ts teaches for "house, home", and it
  // is the only entry in the glossary glossed either way. khânû (p. 197) is
  // "house" with no home sense, so it would name the building and not the theme.
  {
    id: 'home',
    label: 'Home & Objects',
    labelKu: 'mall',
    labelTr: 'Ev & Eşyalar',
    icon: 'home-outline',
    color: '#8A5A38',
    labelOrigin: 'cited',
    src: 'THK06:206',
    from: 'mâł',
  },
  // jil is the same headword ./vocab/clothing.ts teaches for "clothes, togs".
  // barg (p. 169, "clothes; cover") carries the same sense and is taught too,
  // but its gloss runs on into the covering, which a theme label should not.
  {
    id: 'clothing',
    label: 'Clothing',
    labelKu: 'cil',
    labelTr: 'Giysiler',
    icon: 'shirt-outline',
    color: '#A8743C',
    labelOrigin: 'cited',
    src: 'THK06:193',
    from: 'jil',
  },
  // khorâk is a bare one-word entry, "food", and it is the same headword
  // ./vocab/food.ts teaches. The drink half of "Food & Drink" has no headword:
  // âw (p. 167) is "water", the liquid and not the category.
  {
    id: 'food',
    label: 'Food & Drink',
    labelKu: 'xorak',
    labelTr: 'Yiyecek & İçecek',
    icon: 'restaurant-outline',
    color: '#D99A1C',
    labelOrigin: 'cited',
    src: 'THK06:199',
    from: 'khorâk',
  },
  // sirusht is a bare one-word entry, "nature". p. 228 prints surisht beside
  // it as a cross-reference to this spelling, not as a rival with a gloss.
  {
    id: 'nature',
    label: 'Nature & Weather',
    labelKu: 'siruşt',
    labelTr: 'Doğa & Hava',
    icon: 'leaf-outline',
    color: '#6B8E4E',
    labelOrigin: 'cited',
    src: 'THK06:228',
    from: 'sirusht',
  },
  // jânawar is the only headword in the glossary glossed "animal" on its own.
  // gyândâr (p. 188) carries the same sense but as the sub-entry ~dâr under
  // gyân, glossed "animal, living creature".
  {
    id: 'animals',
    label: 'Animals',
    labelKu: 'canewer',
    labelTr: 'Hayvanlar',
    icon: 'paw-outline',
    color: '#B06A3B',
    labelOrigin: 'cited',
    src: 'THK06:193',
    from: 'jânawar',
  },
  // rang is a bare one-word entry, "color". It is the taught half of a label
  // whose English names a class, "Colors & Description", and no headword in the
  // glossary names that class; the colour half is what the book can carry.
  {
    id: 'description',
    label: 'Colors & Description',
    labelKu: 'reng',
    labelTr: 'Renkler & Niteleme',
    icon: 'color-palette-outline',
    color: '#A8324A',
    labelOrigin: 'cited',
    src: 'THK06:219',
    from: 'rang',
    fromNote: 'p. 219 prints this as rang1. rang2, eight lines below it, is "possible".',
  },
  // zhimâra is glossed "number, issue". Only the counting sense is meant here;
  // the other is the issue of a periodical.
  {
    id: 'numbers',
    label: 'Numbers',
    labelKu: 'jimare',
    labelTr: 'Sayılar',
    icon: 'calculator-outline',
    color: '#355C8A',
    labelOrigin: 'cited',
    src: 'THK06:239',
    from: 'zhimâra',
  },
  // kât is a bare one-word entry, "time". The two rivals are each narrower than
  // a theme label: jâr (p. 193) is "time, instance", the countable occasion, and
  // dawr (p. 179) is "era, time", a stretch of history.
  {
    id: 'time',
    label: 'Time',
    labelKu: 'kat',
    labelTr: 'Zaman',
    icon: 'time-outline',
    color: '#3E7C8C',
    labelOrigin: 'cited',
    src: 'THK06:195',
    from: 'kât',
    fromNote: 'p. 195 prints this as kât1. kât2, five lines below it, is "back of the neck".',
  },
  // The first authored label in the table. Everything about it except the
  // citation is held to the same rules as the cited rows, and the self-check
  // proves that by running both policies over an uncitable label.
  {
    id: 'verbs',
    label: 'Core Verbs',
    labelKu: 'kirdar',
    labelTr: 'Temel Fiiller',
    icon: 'flash-outline',
    color: '#E85D00',
    labelOrigin: 'authored',
    labelNote:
      'No headword in the glossary is glossed "verb". The only verb in the volume is in the p. 163 ' +
      'abbreviation key, where v.i., v.p. and v.t. expand to verb intransitive, passive and transitive, ' +
      'which glosses Thackston\'s own abbreviations and not a Sorani word. kâr (p. 195) is "work, thing" ' +
      'and kirda (p. 201) is "act"; neither names the class a theme label has to name. kirdar is the ' +
      'Sorani grammatical term, built on the kirdin this theme teaches, and it is authored for this app ' +
      'exactly as labelTr is: it is spelled as the p. 88 table would render Thackston\'s kirdâr, and no ' +
      'speaker has confirmed it.',
  },
  // hast is a bare one-word entry, "feeling", and it is the taught half of a
  // label whose English is "Emotions & States". No headword names the states
  // half: ḥâł (p. 190) and marad (p. 205) are both "state, condition", which is
  // a state of affairs and not a state a person is in.
  {
    id: 'emotions',
    label: 'Emotions & States',
    labelKu: 'hest',
    labelTr: 'Duygular & Durumlar',
    icon: 'heart-outline',
    color: '#B23A48',
    labelOrigin: 'cited',
    src: 'THK06:189',
    from: 'hast',
  },
  // je is the same headword ./vocab/places.ts teaches for "place", and the one
  // of the three bare "place" entries the page builds sub-entries on. The travel
  // half of "Places & Travel" has no headword: safar (p. 222) is "trip", one
  // journey rather than the category, and the travelling is its sub-entry
  // ~-kirdin, "to travel".
  {
    id: 'places',
    label: 'Places & Travel',
    labelKu: 'cê',
    labelTr: 'Yerler & Seyahat',
    icon: 'map-outline',
    color: '#2F6E4F',
    labelOrigin: 'cited',
    src: 'THK06:193',
    from: 'je',
  },
  // The education half of "Education & Work", not the work half. Both are
  // citable, which is unusual: kâr (p. 195) is a bare headword and would be the
  // cleaner citation, but it names only the work and ./vocab/education.ts
  // already teaches it as a card inside the theme. zânyârî is the half the
  // English, the Turkish and the Kurmanji Perwerde all lead with, and
  // Thackston's own example settles that his Sorani uses it institutionally:
  // "wazârat i zânyârî Ministry of Education".
  {
    id: 'education',
    label: 'Education & Work',
    labelKu: 'zanyarî',
    labelTr: 'Eğitim & İş',
    icon: 'school-outline',
    color: '#7A3B5E',
    labelOrigin: 'cited',
    src: 'THK06:238',
    from: 'zânyârî',
    fromNote:
      'p. 238 prints this as the tilde sub-entry ~yârî under the headword zân|â "learned", whose bar marks ' +
      'zân as the base: "~yârî knowledge, education: wazârat i ~ Ministry of Education". The ~yâr on the ' +
      'line above it is "learned, erudite", and ./vocab/education.ts reads that entry\'s ~istga the same way.',
  },
  // kaltur is a bare one-word entry, "culture". Two rivals carry the sense and
  // neither can be the label: farhang (p. 183, "culture") converts to ferheng,
  // which in Kurmanji is a dictionary, the same trap lash sets for the body
  // theme above; and adab (p. 163) is "literature, culture", whose first sense
  // ./vocab/culture.ts already teaches as adabiyât. The Kurdish half of
  // "Kurdish Culture" is not in the label: no headword names it, and kurdî
  // (p. 202) is a card inside the theme.
  {
    id: 'culture',
    label: 'Kurdish Culture',
    labelKu: 'keltur',
    labelTr: 'Kürt Kültürü',
    icon: 'flag-outline',
    color: '#C4521C',
    labelOrigin: 'cited',
    src: 'THK06:194',
    from: 'kaltur',
  },
  // The second authored label, and the harder of the two: this theme's class is
  // one the glossary labels other words with instead of naming.
  {
    id: 'function',
    label: 'Function Words',
    labelKu: 'amrraz',
    labelTr: 'İşlev Kelimeleri',
    icon: 'text-outline',
    color: '#5B6470',
    labelOrigin: 'authored',
    labelNote:
      'No headword in the glossary is glossed "particle" or "conjunction". "Particle" appears six times and ' +
      'every one of them is Thackston labelling a Sorani word: ay and ây "O (vocative particle)", âyâ ' +
      '"interrogative particle", bâ1 "hortatory particle", da1 "particle occurring with imperative", and ' +
      'zarra (p. 238), "particle, atom", which is the physics sense. "Conjunction" appears only inside his ' +
      'glosses, and "preposition" only where he files the postpositions -awa (p. 165) and \'dâ (p. 179). ' +
      'wisha and wâzha (p. 236) are "word", any word, and rezmân (p. 220) is "grammar", the subject rather ' +
      'than the class. The class term is âmřâz, which the glossary carries at p. 166 as a common noun, ' +
      '"instrument, implement, tool", so the grammatical sense is authored for this app exactly as labelTr ' +
      'is. The taught string is the p. 88 table run over his âmřâz, ř and all, and no speaker has confirmed ' +
      'either the term or the ř.',
  },
];

export const getCkbVocabByTheme = (theme: string): SoraniVocabWord[] =>
  CKB_VOCABULARY.filter((w) => w.theme === theme);

export const getCkbVocabById = (id: string): SoraniVocabWord | undefined =>
  CKB_VOCABULARY.find((w) => w.id === id);
