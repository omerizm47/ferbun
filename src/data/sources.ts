// Fêrbûn — provenance registry for taught content.
// Every Sorani entry cites a source declared here. Resolution is mechanical: it
// proves a locator is well formed and names a region this volume actually has.
// It does not prove the cited page says what the author claims — for that, read
// the page. Only sources actually cited are declared, so an unknown id is a hard
// error rather than a silent pass.

export type SourceId = 'THK06';

export interface Source {
  id: SourceId;
  author: string;
  title: string;
  publisher: string;
  /** Regions of the volume, from its own contents, that a locator may name. */
  contents: { label: string; pages: string }[];
  /** Numbered grammar sections a §n locator may name, and the pages they span. */
  sections: { from: number; to: number; pages: string };
  /** What a mechanical citation check does and does not establish. */
  note: string;
}

export const SOURCES: Record<SourceId, Source> = {
  THK06: {
    id: 'THK06',
    author: 'Thackston, W. M.',
    title: 'Sorani Kurdish: A Reference Grammar with Selected Readings',
    publisher: 'Harvard University, Faculty of Arts and Sciences',
    contents: [
      { label: 'Phonology', pages: '1-7' },
      { label: 'Grammar, sections 1 to 42', pages: '8-77' },
      { label: 'Verb tenses and moods', pages: '78-85' },
      { label: 'Synopsis of tenses', pages: '85-86' },
      { label: 'Conditional sentence types', pages: '86' },
      { label: 'Conversion table for the Sorani and Kurmanji alphabets', pages: '88' },
      { label: 'Transcribed Latin samples', pages: '89-90' },
      { label: 'Readings', pages: '91-161' },
      { label: 'Kurdish-English vocabulary, about 4,000 words per the preface (p. viii)', pages: '163-' },
    ],
    sections: { from: 1, to: 42, pages: '8-77' },
    note: 'Resolving a citation proves the locator is well formed and inside a region this volume actually has. It does not prove the form is correct, idiomatic or current. That needs a speaker.',
  },
};

export type CitationResult =
  | { ok: true; source: Source; locator: string }
  | { ok: false; reason: string };

// Known gap: no upper page bound is checked, because the contents above do not
// establish the volume's total page count. A too-high page number resolves.
const PAGE = /^\d{1,3}$/;
const PAGE_RANGE = /^(\d{1,3})-(\d{1,3})$/;
// U+00A7 as an escape so a lookalike cannot be pasted in.
const SECTION = /^\u00A7(\d{1,3})$/;

/** Resolves `'THK06:88'`, `'THK06:89-90'` or `'THK06:§27'`, or says why it cannot. */
export function resolveCitation(src: string): CitationResult {
  const colon = src.indexOf(':');
  const id = colon === -1 ? '' : src.slice(0, colon);
  const locator = colon === -1 ? '' : src.slice(colon + 1);
  if (id === '' || locator === '') {
    return {
      ok: false,
      reason: `citation "${src}" must look like "THK06:88", "THK06:89-90" or "THK06:§27"`,
    };
  }

  // Own-key check, not a plain index: otherwise "toString:88" resolves through
  // Object.prototype and the unknown-id error below never fires.
  const source: Source | undefined = Object.prototype.hasOwnProperty.call(SOURCES, id)
    ? (SOURCES as Record<string, Source>)[id]
    : undefined;
  if (!source) {
    return {
      ok: false,
      reason: `citation "${src}" names unknown source id "${id}" (declare it in src/data/sources.ts)`,
    };
  }

  const section = SECTION.exec(locator);
  if (section) {
    const n = Number(section[1]);
    const { from, to } = source.sections;
    if (n < from || n > to) {
      return {
        ok: false,
        reason: `citation "${src}" locator "${locator}" is outside ${id}'s grammar sections ${from}-${to}`,
      };
    }
    return { ok: true, source, locator };
  }

  const range = PAGE_RANGE.exec(locator);
  if (range && Number(range[1]) >= 1) {
    if (Number(range[2]) <= Number(range[1])) {
      return {
        ok: false,
        reason: `citation "${src}" page range "${locator}" does not ascend`,
      };
    }
    return { ok: true, source, locator };
  }

  if (PAGE.test(locator) && Number(locator) >= 1) {
    return { ok: true, source, locator };
  }

  return {
    ok: false,
    reason: `citation "${src}" locator "${locator}" is not a page, a page range or a §section`,
  };
}
