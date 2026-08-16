// Fêrbûn: Thackston's Sorani transcription into the Kurmanji Latin alphabet.
// The mapping is his own, "Conversion Table for the Sorani and Kurmanji
// Alphabets", which runs over the page break: a through v on p. 88, w through
// ayn on p. 89. Every row below carries the page that settles it. For all but
// one that is the page the row is printed on. The exception is the h with dot
// below, which the table has no line of its own for and which is read off the
// Arabic column of the line it does print; the row says so where it sits.
//
// This lives under tools/ because nothing in the running app converts anything.
// The app ships the output; a converter reachable from the bundle would invite
// conversion at runtime, where no one is checking the result against the book.
//
// Two properties of the table make a sequence of String.replace passes silently
// wrong. The five digraphs (ch gh kh sh zh) would be split by any pass over
// single letters, and j maps to c while zh maps to j, so the j the second rule
// produces is food for the first. The scan below is therefore one left-to-right
// walk that takes the longest matching row and never revisits what it wrote.

import { SORANI_LATIN } from '../src/data/orthography';

export interface ThackstonRow {
  /** Thackston's transcription, as the table prints it. */
  from: string;
  /** The Kurmanji alphabet form. Empty where the table says "not indicated". */
  to: string;
  src: string;
}

/** The table row for row, in Thackston's printed order. */
export const THACKSTON_TO_HAWAR: readonly ThackstonRow[] = [
  { from: 'a', to: 'e', src: 'THK06:88' },
  { from: '\u00E2', to: 'a', src: 'THK06:88' },
  { from: 'b', to: 'b', src: 'THK06:88' },
  { from: 'ch', to: '\u00E7', src: 'THK06:88' },
  { from: 'd', to: 'd', src: 'THK06:88' },
  { from: 'e', to: '\u00EA', src: 'THK06:88' },
  { from: 'f', to: 'f', src: 'THK06:88' },
  { from: 'g', to: 'g', src: 'THK06:88' },
  { from: 'gh', to: 'x', src: 'THK06:88' },
  { from: 'h', to: 'h', src: 'THK06:88' },
  // Derived through the Arabic column of the row above rather than printed as a
  // row of its own. That cell holds two letters, U+062D ARABIC LETTER HAH and
  // U+0647 ARABIC LETTER HEH, and the table sends both to Kurmanji h. Thackston
  // transcribes U+062D as this character: the alphabet chart at p. 4 sets the
  // letter against the transcription directly, the letter-shapes table at p. 6
  // heads its row with it, and p. 2 says it "is a voiceless pharyngeal
  // fricative, IPA [ħ], like the Arabic [U+062D]; otherwise it is not
  // distinguished from h". So the letter this stands for is one the h row
  // already routes to h, and the conversion is the table's, not a guess.
  { from: '\u1E25', to: 'h', src: 'THK06:88' },
  { from: 'i', to: 'i', src: 'THK06:88' },
  { from: '\u00EE', to: '\u00EE', src: 'THK06:88' },
  { from: 'j', to: 'c', src: 'THK06:88' },
  { from: 'k', to: 'k', src: 'THK06:88' },
  { from: 'kh', to: 'x', src: 'THK06:88' },
  { from: 'l', to: 'l', src: 'THK06:88' },
  { from: '\u0142', to: 'll', src: 'THK06:88' },
  { from: 'm', to: 'm', src: 'THK06:88' },
  { from: 'n', to: 'n', src: 'THK06:88' },
  { from: 'o', to: 'o', src: 'THK06:88' },
  { from: 'p', to: 'p', src: 'THK06:88' },
  { from: 'q', to: 'q', src: 'THK06:88' },
  { from: 'r', to: 'r', src: 'THK06:88' },
  { from: '\u0159', to: 'rr', src: 'THK06:88' },
  { from: 's', to: 's', src: 'THK06:88' },
  { from: 'sh', to: '\u015F', src: 'THK06:88' },
  { from: 't', to: 't', src: 'THK06:88' },
  { from: 'u', to: 'u', src: 'THK06:88' },
  { from: '\u00FB', to: '\u00FB', src: 'THK06:88' },
  { from: 'v', to: 'v', src: 'THK06:88' },
  { from: 'w', to: 'w', src: 'THK06:89' },
  { from: 'y', to: 'y', src: 'THK06:89' },
  { from: 'z', to: 'z', src: 'THK06:89' },
  { from: 'zh', to: 'j', src: 'THK06:89' },
  { from: '\u2018', to: '', src: 'THK06:89' },
];

// The acute Thackston writes on a vowel is a stress mark, not a letter, so it
// has no row in the table above and must come off before conversion. His
// licence for that is pp. 3 and 4. p. 3 opens "Stress. All nouns and adjectives
// are stressed on the final syllable: tanaká", and p. 4 sets out the verb
// hierarchy, "(3) The modal prefixes (d)a- and bi- as in dábînim 'I see' and
// bíbînim 'let me see.'" Three things on those pages settle it. The acute falls
// exactly where the IPA transcription printed beside each form puts its primary
// stress; the vowel carrying it is the same IPA sound with the acute and
// without; and it moves inside a single word, p. 4 setting hâtin "they came",
// acute on the first syllable, against hâtín "to come", acute on the second. A
// letter does not move.
// A row in THACKSTON_TO_HAWAR would have been the wrong home for this: every
// row there is bound to p. 88 or p. 89, and the self-check asserts exactly that.
const STRESS_MARKED = new Map<string, string>([
  ['\u00E1', 'a'], // á
  ['\u00E9', 'e'], // é
  ['\u00ED', 'i'], // í
  ['\u00F3', 'o'], // ó
  ['\u00FA', 'u'], // ú
  ['\u1EA5', '\u00E2'], // the acute sitting on the a-circumflex the table does have a row for
]);

/**
 * Drops Thackston's acute stress marks, leaving the plain letters the
 * conversion table has rows for. Never touches â î û ł ř, which are letters.
 * Combining U+0301 is handled by composing first: the glossary's own text layer
 * mixes the two forms.
 */
export function stripStress(text: string): string {
  const composed = text.normalize('NFC');
  let out = '';
  for (const ch of composed) out += STRESS_MARKED.get(ch) ?? ch;
  return out.normalize('NFC');
}

interface ScanRow {
  from: string;
  to: string;
  /**
   * A capitalised row may only open a word. Without that restriction the Z of
   * an all-capitals ZHER would match the single-letter row and the H after it
   * would pass as a letter, yielding ZHÊR with nothing raised.
   */
  wordStartOnly: boolean;
}

function capitalise(text: string): string {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

// Capitals are derived from the table rather than written out a second time, so
// there is no parallel list to drift: Ch is Ç, Ł is Ll, Zh is J, A is E.
const SCAN_ROWS: readonly ScanRow[] = [
  ...THACKSTON_TO_HAWAR.map((row) => ({ from: row.from, to: row.to, wordStartOnly: false })),
  ...THACKSTON_TO_HAWAR.filter((row) => capitalise(row.from) !== row.from).map((row) => ({
    from: capitalise(row.from),
    to: capitalise(row.to),
    wordStartOnly: true,
  })),
].sort((a, b) => b.from.length - a.from.length);

const LETTER = /\p{L}/u;
const PASSTHROUGH = new Set<string>(SORANI_LATIN.punctuation);

function isDigit(ch: string): boolean {
  return SORANI_LATIN.allowDigits && ch >= '0' && ch <= '9';
}

/**
 * Converts one Thackston transcription into the Kurmanji alphabet.
 * Space, the punctuation SORANI_LATIN admits and digits pass through, so the
 * output is legal under that alphabet by construction. Anything else throws
 * rather than passing through: a character with no row is a character the book
 * did not license, and letting it through would put it in a data file for
 * ORTH-01 to find later without ever naming what produced it.
 */
export function toHawar(text: string): string {
  const input = text.normalize('NFC');
  const out: string[] = [];
  let i = 0;

  while (i < input.length) {
    const row = SCAN_ROWS.find(
      (candidate) =>
        input.startsWith(candidate.from, i) &&
        (!candidate.wordStartOnly || i === 0 || !LETTER.test(input[i - 1])),
    );
    if (row) {
      out.push(row.to);
      i += row.from.length;
      continue;
    }

    const ch = input[i];
    if (PASSTHROUGH.has(ch) || isDigit(ch)) {
      out.push(ch);
      i += 1;
      continue;
    }

    const hex = (ch.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, '0');
    throw new Error(
      `toHawar: no conversion-table row for "${ch}" (U+${hex}) at index ${i} of "${input}"`,
    );
  }

  return out.join('').normalize('NFC');
}
