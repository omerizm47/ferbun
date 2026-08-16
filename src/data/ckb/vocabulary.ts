// Fêrbûn: the Sorani vocabulary barrel. Seven themes so far: family, body,
// home, nature, animals, description and numbers, one file each under ./vocab.
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
import { CKB_DESCRIPTION } from './vocab/description';
import { CKB_FAMILY } from './vocab/family';
import { CKB_HOME } from './vocab/home';
import { CKB_NATURE } from './vocab/nature';
import { CKB_NUMBERS } from './vocab/numbers';

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

/** A VocabTheme plus the locator for `labelKu`, the taught half of the label. */
export interface SoraniVocabTheme extends VocabTheme {
  src: string;
  from: string;
  fromNote?: string;
}

export const CKB_GLOSS_PROVENANCE =
  'Each Sorani form and its English gloss come from Thackston, "Sorani Kurdish: A Reference ' +
  'Grammar with Selected Readings", at the page named in that entry\'s src. The taught spelling ' +
  'is not transcribed by hand: the entry stores Thackston\'s transcription verbatim in its from ' +
  'field, and wordKu is that string put through his conversion table at THK06:88. The Turkish ' +
  'gloss is not his: it is a translation of that English gloss, authored for this app, and it ' +
  'carries no locator, because Thackston glosses in English only. No native speaker has reviewed ' +
  'any of it, neither the forms nor the glosses.';

// A fresh array rather than the theme arrays themselves, so adding the next
// theme is one spread and no caller can mutate a theme file through this
// export. Theme order follows VOCAB_THEMES, so the two Words screens list the
// themes they share in the same order.
export const CKB_VOCABULARY: SoraniVocabWord[] = [
  ...CKB_FAMILY,
  ...CKB_BODY,
  ...CKB_HOME,
  ...CKB_NATURE,
  ...CKB_ANIMALS,
  ...CKB_DESCRIPTION,
  ...CKB_NUMBERS,
];

// id, icon and color match the Kurmanji themes, so the two Words screens read
// as the same screen in two languages. labelKu is the only taught string here,
// which is why it is the only part of a row that carries a locator.
export const CKB_VOCAB_THEMES: SoraniVocabTheme[] = [
  {
    id: 'family',
    label: 'Family & People',
    labelKu: 'binemalle',
    labelTr: 'Aile & İnsanlar',
    icon: 'people-outline',
    color: '#1F8A4C',
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
    src: 'THK06:206',
    from: 'mâł',
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
    src: 'THK06:239',
    from: 'zhimâra',
  },
];

export const getCkbVocabByTheme = (theme: string): SoraniVocabWord[] =>
  CKB_VOCABULARY.filter((w) => w.theme === theme);

export const getCkbVocabById = (id: string): SoraniVocabWord | undefined =>
  CKB_VOCABULARY.find((w) => w.id === id);
