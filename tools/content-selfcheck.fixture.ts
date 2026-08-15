// Fêrbûn — fixtures for the content self-check: deliberately malformed data,
// one entry per rule, so every rule can be seen firing on its own.
// Nothing under src/ imports this file, so it is not reachable from the app
// entry graph, never bundled and never shipped.
//
// Taught-language forms come from Thackston, Sorani Kurdish: A Reference
// Grammar, converted through his Sorani/Kurmanji conversion table (p. 88).
// gull and xorr are members of the minimal pairs at p. 2; rêkkewtin and berrêz
// are lifted from the transcribed Latin samples at p. 89. Accented letters are
// escaped so a lookalike cannot be pasted in unnoticed.
//
// The glosses below exist only to satisfy the GLOSS rule. They are fixture
// data, not learner content, and no speaker has reviewed them.

import { SORANI_LATIN } from '../src/data/orthography';
import { CitedEntry, TrackPolicy } from '../src/data/validate';

// A policy no production code owns, so tightening it here cannot change what
// the app validates.
export const FIXTURE_CKB_POLICY: TrackPolicy = {
  id: 'ckb',
  label: 'Sorani',
  status: 'in_progress',
  orthography: SORANI_LATIN,
  requireCitation: true,
  requireBothGlosses: true,
};

/** Each entry is engineered to produce exactly one issue under FIXTURE_CKB_POLICY. */
export const BAD_ENTRIES: { expect: string; entry: CitedEntry }[] = [
  {
    // Dark l as U+0142: the character this orthography deliberately rejects.
    expect: 'ORTH-01',
    entry: {
      id: 'fx-orth01',
      taught: { wordKu: 'gu\u0142' },
      src: 'THK06:2',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // Decomposed ê (e + U+0302), legal once composed.
    expect: 'ORTH-02',
    entry: {
      id: 'fx-orth02',
      taught: { wordKu: 'berre\u0302z' },
      src: 'THK06:89',
      glossEn: 'esteemed',
      glossTr: 'sayın',
    },
  },
  {
    expect: 'SRC-01',
    entry: {
      id: 'fx-src01',
      taught: { wordKu: 'gull' },
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // Unknown source id.
    expect: 'SRC-02',
    entry: {
      id: 'fx-src02a',
      taught: { wordKu: 'gull' },
      src: 'XYZ99:12',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // §99 is outside the volume's numbered grammar sections.
    expect: 'SRC-02',
    entry: {
      id: 'fx-src02b',
      taught: { wordKu: 'gull' },
      src: 'THK06:\u00A799',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // Prose locator, not a page, a page range or a §section.
    expect: 'SRC-02',
    entry: {
      id: 'fx-src02c',
      taught: { wordKu: 'gull' },
      src: 'THK06:page 88',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // A member of Object.prototype, which an unguarded registry lookup would
    // resolve as if it were a declared source.
    expect: 'SRC-02',
    entry: {
      id: 'fx-src02d',
      taught: { wordKu: 'gull' },
      src: 'toString:88',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    expect: 'GLOSS-01',
    entry: {
      id: 'fx-gloss01a',
      taught: { wordKu: 'gull' },
      src: 'THK06:2',
      glossEn: 'flower',
      glossTr: '',
    },
  },
  {
    expect: 'GLOSS-01',
    entry: {
      id: 'fx-gloss01b',
      taught: { wordKu: 'gull' },
      src: 'THK06:2',
      glossTr: 'çiçek',
    },
  },
];

// ll, rr and a genuine doubled kk, all of which must pass unflagged.
export const CLEAN_ENTRY: CitedEntry = {
  id: 'fx-clean',
  taught: { wordKu: 'gull', contrastKu: 'xorr', sampleKu: 'r\u00EAkkewtin' },
  src: 'THK06:2',
  glossEn: 'flower',
  glossTr: 'çiçek',
};

export const FIXTURE_LESSONS = [
  { id: 'fx-l1', title: 'A', exerciseCount: 3 },
  { id: 'fx-l2', title: 'B', exerciseCount: 0 },
];
