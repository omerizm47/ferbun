// Fêrbûn: the Sorani vocabulary barrel. One theme so far, family.
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
import { CKB_FAMILY } from './vocab/family';

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
  /** Why the cited page prints something other than `from`. Absent when it prints `from` itself. */
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

// A fresh array rather than CKB_FAMILY itself, so adding the second theme is one
// spread and no caller can mutate a theme file through this export.
export const CKB_VOCABULARY: SoraniVocabWord[] = [...CKB_FAMILY];

// id, icon and color match the Kurmanji family theme, so the two Words screens
// read as the same screen in two languages. labelKu is the only taught string
// here, which is why it is the only part of the row that carries a locator.
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
];

export const getCkbVocabByTheme = (theme: string): SoraniVocabWord[] =>
  CKB_VOCABULARY.filter((w) => w.theme === theme);

export const getCkbVocabById = (id: string): SoraniVocabWord | undefined =>
  CKB_VOCABULARY.find((w) => w.id === id);
