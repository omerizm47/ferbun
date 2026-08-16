// Fêrbûn: the one authored word the ten Sorani review lessons share.
// It lives in its own module because it is one string with one justification
// used ten times across three unit files, and a note copied ten times is a note
// that drifts. The unit files spread it into each review lesson.
// A runtime import from ../courses.ts would close a cycle, since that barrel
// imports the unit files; the type comes in with `import type`, which erases.

import type { AuthoredTitle } from '../courses';

/**
 * `dûbare`, the Sorani title on every "Review: …" lesson, and the only authored
 * title in the tree that is a single word rather than a phrase composed of
 * cited headwords. Read this one closely.
 */
export const REVIEW_TITLE: AuthoredTitle = {
  titleOrigin: 'authored',
  titleNote:
    'Authored for this app, and the only title in the tree that is neither cited nor composed out of cited ' +
    'parts. Nothing in the authored corpus is glossed "review", "revision" or "again", and four candidates ' +
    'were weighed against the sense and rejected: kirdinewe (THK06:201) is "to open"; gerran (THK06:184) is ' +
    '"to turn, wander, search"; zanîn (THK06:238) is "to know", which is what a review tests rather than what ' +
    'it is; and hemû (THK06:189), "all, every", is the closest of the four but names a quantity, so a lesson ' +
    'carrying it would read "all" to a speaker. dûbare is the Kurmanji track\'s own Dubare respelled in the ' +
    'p. 88 alphabet. No page this corpus cites prints it, which is why it holds no src, and no speaker has ' +
    'confirmed that Sorani uses it. It is authored on exactly the same footing as the Turkish "Tekrar".',
};

/** The taught string itself, kept beside its note so the two cannot be separated. */
export const REVIEW_TITLE_KU = 'dûbare';
